import { getSystemPrompt } from '../config/agentConfig';

/**
 * Service to call Hugging Face Inference API via our local backend proxy.
 */
export async function callHuggingFaceAI(systemPrompt = getSystemPrompt(), userMessage) {
  try {
    const response = await fetch('/api/chat', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ systemPrompt, userMessage })
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `HTTP Error ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error) {
          errorMessage += `: ${errorJson.error}`;
        }
      } catch (e) {
        if (errorText) {
          errorMessage += ` (${errorText.slice(0, 100)})`;
        }
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return { content: data.text || "No response generated." };
  } catch (error) {
    console.error("[AI Service Proxy Error]:", error);
    return {
      error: `Proxy Connection Failed: ${error.message}`,
      type: "PROXY_ERROR"
    };
  }
}
