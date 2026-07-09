import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const hfChatApiPlugin = (env) => ({
  name: 'hf-chat-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/chat' && req.method === 'POST') {
        let bodyStr = '';
        req.on('data', chunk => { bodyStr += chunk; });
        req.on('end', async () => {
          try {
            const body = JSON.parse(bodyStr);
            const token = env.VITE_HF_TOKEN;
            let text = '';
            let success = false;

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
              } else {
                throw new Error(`Fallback also failed. Status: ${pollRes.status}`);
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
  }
})
