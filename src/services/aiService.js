import { getSystemPrompt } from '../config/agentConfig';
import { getCleanPageText } from './domScraper';

const IS_VERCEL = typeof window !== 'undefined' && 
  (window.location.hostname.includes('vercel.app') || 
   (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'));

/**
 * Service to call Hugging Face Inference API via our local backend proxy,
 * or fall back directly to Pollinations AI client-side on Vercel.
 */
export async function callHuggingFaceAI(systemPrompt = getSystemPrompt(), userMessage) {
  try {
    const scrapedDomText = getCleanPageText();
    let finalSystemPrompt = systemPrompt;

    if (scrapedDomText && !finalSystemPrompt.includes("[HOST WEBSITE LIVE SCREEN CONTENT]")) {
      finalSystemPrompt += `\n\n[HOST WEBSITE LIVE SCREEN CONTENT]\n${scrapedDomText}\n\nTALİMAT: ASLA bu sayfa içeriğini doğrudan kopyalayıp yapıştırma. Ziyaretçinin sorduğu soruya göre son derece kısa, cana yakın, düzenli paragraflar halinde cevap ver. Her konuyu (Çalışma Saatleri, Adres, Hizmetler vb.) aralarında boş bir satır olacak şekilde ayrı paragraflarda ve başlıklar altında yaz. Ham yıldız (* veya **), '#' işaretleri veya tablo oluşturmak için kullanılan dikey çizgi (|) ve tire (-) işaretlerini asla kullanma. Bilgileri düzgün satırlar halinde sun.`;
    }

    if (IS_VERCEL) {
      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: finalSystemPrompt },
            { role: "user", content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status} from Pollinations AI`);
      }

      const text = await response.text();
      return { content: text || "No response generated." };
    } else {
      const response = await fetch('/api/chat', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ systemPrompt: finalSystemPrompt, userMessage })
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
    }
  } catch (error) {
    console.error("[AI Service Proxy Error]:", error);
    return {
      error: `Proxy Connection Failed: ${error.message}`,
      type: "PROXY_ERROR"
    };
  }
}
