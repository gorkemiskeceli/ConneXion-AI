import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const estimateTokens = (systemPrompt, userMessage, responseText) => {
  const inputChars = (systemPrompt || "").length + (userMessage || "").length;
  const outputChars = (responseText || "").length;
  return Math.ceil(inputChars / 4) + Math.ceil(outputChars / 4);
};

const hfChatApiPlugin = (env) => ({
  name: 'hf-chat-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/chat') {
        // Handle CORS Preflight and headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method === 'POST') {
          let bodyStr = '';
          req.on('data', chunk => { bodyStr += chunk; });
          req.on('end', async () => {
            try {
              const body = JSON.parse(bodyStr);
              const token = env.VITE_HF_TOKEN;
              let text = '';
              let success = false;
              let tokensUsed = 0;

              // 1. Try Hugging Face first (from backend Node context)
              if (token) {
                try {
                  const endpoint = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct/v1/chat/completions";
                  const hfRes = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                      "Authorization": `Bearer ${token}`,
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      model: "meta-llama/Llama-3.1-8B-Instruct",
                      messages: [
                        { role: "system", content: body.systemPrompt },
                        { role: "user", content: body.userMessage }
                      ],
                      max_tokens: 300
                    })
                  });

                  if (hfRes.ok) {
                    const hfJson = await hfRes.json();
                    text = hfJson.choices?.[0]?.message?.content || '';
                    if (text) {
                      success = true;
                      tokensUsed = hfJson.usage?.total_tokens || estimateTokens(body.systemPrompt, body.userMessage, text);
                    }
                  } else {
                    console.warn(`[Vite Proxy] Hugging Face returned status: ${hfRes.status}`);
                  }
                } catch (hfErr) {
                  console.warn("[Vite Proxy] Hugging Face connection failed on backend:", hfErr.message);
                }
              }

              // 2. Fallback to Pollinations AI (from backend Node context)
              if (!success) {
                console.log("[Vite Proxy] Attempting Pollinations AI fallback...");
                const pollRes = await fetch("https://text.pollinations.ai/", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    messages: [
                      { role: "system", content: body.systemPrompt },
                      { role: "user", content: body.userMessage }
                    ]
                  })
                });

                if (pollRes.ok) {
                  text = await pollRes.text();
                  success = true;
                  tokensUsed = estimateTokens(body.systemPrompt, body.userMessage, text);
                } else {
                  throw new Error(`Fallback also failed. Status: ${pollRes.status}`);
                }
              }

              // 3. Persist Token usage to db.json
              if (tokensUsed > 0) {
                try {
                  const dbPath = path.resolve(process.cwd(), 'db.json');
                  if (fs.existsSync(dbPath)) {
                    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
                    if (dbData.dashboard && dbData.dashboard.kpis && dbData.dashboard.kpis.totalTokensUsed) {
                      const currentVal = parseInt(dbData.dashboard.kpis.totalTokensUsed.value) || 0;
                      dbData.dashboard.kpis.totalTokensUsed.value = String(currentVal + tokensUsed);
                      fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
                      console.log(`[Vite Proxy] Logged ${tokensUsed} tokens. New total: ${dbData.dashboard.kpis.totalTokensUsed.value}`);
                    }
                  }
                } catch (dbErr) {
                  console.warn("[Vite Proxy] Failed to update token count in db.json:", dbErr.message);
                }
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ text }));
            } catch (e) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: e.message }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method Not Allowed" }));
        }
      } else {
        next();
      }
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), hfChatApiPlugin(env)],
    server: {
      watch: {
        ignored: ['**/db.json', '**/public/db.json']
      }
    }
  }
})
