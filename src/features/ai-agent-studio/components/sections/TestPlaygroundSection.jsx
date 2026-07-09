import { useState } from "react";
import { Send, Bot } from "lucide-react";
import { callHuggingFaceAI } from "../../../../services/aiService";

/**
 * TestPlaygroundSection — real-time sandbox for testing.
 */
export default function TestPlaygroundSection({ enabled, agent }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const text = draft.trim();
    if (!text || loading) return;

    // Add user message
    const userMsg = { id: `${Date.now()}-user`, sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");
    setLoading(true);

    try {
      // Guardrails Check (Local filter)
      const isBlocked = agent && agent.blockedTerms && agent.blockedTerms.split(",")
        .map(t => t.trim().toLowerCase())
        .filter(Boolean)
        .some(term => text.toLowerCase().includes(term));

      if (isBlocked) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-ai`,
            sender: "assistant",
            text: "Üzgünüm, bu konuda yardımcı olamıyorum. Belirttiğiniz ifadeler asistan politikalarımıza uygun değildir.",
          },
        ]);
        setLoading(false);
        return;
      }

      const languageMap = { tr: "Turkish", en: "English", auto: "Turkish" };
      const toneMap = {
        professional: "Professional, polite, concise, and helpful",
        friendly: "Friendly, warm, polite, and helper",
        formal: "Formal, respectful, and standard",
        concise: "Concise, extremely short, and plain",
      };

      // Build dynamic system prompt from current selected agent
      const systemPrompt = agent
        ? `
You are the official support assistant named "${agent.name}".
Description: ${agent.description || ""}
Role: Customer Support Agent
Tone: ${toneMap[agent.tone] || agent.tone || "Friendly"}
Language: ${languageMap[agent.language] || agent.language || "Turkish"}

STRICT GUARDRAILS:
${agent.blockedTerms ? `- Do not reply to or discuss these blocked terms/topics: ${agent.blockedTerms}` : ""}
${agent.maxLength ? `- Keep your response under ${agent.maxLength} characters.` : ""}

INSTRUCTIONS:
${agent.instructions || "Kibar, kısa ve yardımsever yanıtlar ver. Emin olmadığında konuşmayı bir temsilciye aktar."}
        `.trim()
        : "You are a customer support agent.";

      const res = await callHuggingFaceAI(systemPrompt, text);
      const aiReply = res.content || "Bir yanıt oluşturulamadı.";

      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-ai`, sender: "assistant", text: aiReply },
      ]);
    } catch (error) {
      console.error("Test Playground error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-err`,
          sender: "assistant",
          text: "Bağlantı hatası: Yapay zekaya ulaşılamadı.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!enabled) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <Bot className="h-12 w-12 text-slate-300" />
        <h3 className="mt-4 text-sm font-semibold text-slate-900">
          Yetki Yok
        </h3>
        <p className="mt-1 max-w-xs text-xs text-slate-500">
          Test Alanı'nı kullanmak için gerekli izinlere sahip değilsiniz.
        </p>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-slate-400">
        Yükleniyor veya seçili asistan bulunamadı...
      </div>
    );
  }

  return (
    <div className="flex h-[560px] flex-col bg-slate-50">
      {/* Playground Header */}
      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-700">
          Test Alanı — {agent.name}
        </h3>
        <p className="text-xs text-slate-500">
          Asistanın dil, ton ve talimat ayarlarını canlı olarak test edin.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center text-slate-400">
            <Bot className="h-8 w-8 text-slate-300" />
            <p className="mt-2 text-xs">Henüz mesaj yok. Test etmek için bir şeyler yazın.</p>
          </div>
        )}
        {messages.map((msg) => {
          const isAi = msg.sender === "assistant";
          return (
            <div key={msg.id} className={`flex ${isAi ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                isAi ? "bg-white text-slate-800 border border-slate-100 rounded-tl-none" : "bg-primary text-white rounded-tr-none"
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-white border border-slate-100 px-4 py-3.5 text-sm shadow-sm">
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 bg-white p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Asistana bir mesaj gönderin..."
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-sm hover:bg-primary-600 active:scale-95 transition-all disabled:opacity-50"
            disabled={!draft.trim() || loading}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
