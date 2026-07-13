const estimateTokens = (systemPrompt, userMessage, responseText) => {
  const inputChars = (systemPrompt || "").length + (userMessage || "").length;
  const outputChars = (responseText || "").length;
  return Math.ceil(inputChars / 4) + Math.ceil(outputChars / 4);
};

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = req.body;
    const token = process.env.VITE_HF_TOKEN || process.env.HF_TOKEN;
    let text = '';
    let success = false;
    let tokensUsed = 0;

    // 1. Try Hugging Face
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
        }
      } catch (hfErr) {
        console.warn("[Vercel API] Hugging Face connection failed:", hfErr.message);
      }
    }

    // 2. Fallback to Pollinations AI
    if (!success) {
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

    // Token logging omitted on Vercel as filesystem is read-only.
    // Return the response
    return res.status(200).json({ text });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
