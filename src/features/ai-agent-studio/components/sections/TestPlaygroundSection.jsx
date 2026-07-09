import { useState } from "react";
import { Send, FlaskConical, Sparkles } from "lucide-react";

import StudioSection from "../StudioSection";
import EmptyState from "../../../../shared/components/ui/EmptyState";
import { callHuggingFaceAI } from "../../../../services/aiService";

/**
 * TestPlaygroundSection — a chat surface for trying the agent.
 *
 * Runs live queries against the HF AI/Pollinations proxy using the selected agent's settings.
 */
export default function TestPlaygroundSection({ enabled = true, agent }) {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([]);
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

  return (
    <StudioSection
      title="Test Alanı"
      description="Asistanı yayına almadan önce burada deneyin. (Canlı Yapay Zeka Testi)"
    >
      <div className="flex h-full min-h-[380px] flex-col rounded-xl border border-slate-100 bg-slate-50/40">
        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4 max-h-[360px]">
          {messages.length === 0 ? (
            <EmptyState
              icon={FlaskConical}
              title="Test etmeye başlayın"
              description="Bir mesaj gönderin; asistanın yanıtı burada görünecek."
              className="h-full"
            />
          ) : (
            messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[78%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                      isUser
                        ? "bg-primary text-white rounded-tr-none"
                        : m.text.startsWith("Bağlantı hatası")
                        ? "bg-rose-50 border border-rose-200 text-rose-800 rounded-tl-none"
                        : "bg-white border border-slate-150 text-slate-800 rounded-tl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })
          )}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[78%] rounded-2xl rounded-tl-none bg-white border border-slate-150 px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Simulation hint */}
        {messages.length > 0 && (
          <p className="flex items-center gap-1.5 px-4 pb-1 font-mono text-[11px] text-slate-400">
            <Sparkles className="h-3 w-3 text-primary animate-pulse" />
            Canlı mod — AI yanıtları seçili asistanın ("{agent?.name || "Varsayılan"}") ayarlarına göre üretiliyor.
          </p>
        )}

        {/* Composer */}
        <div className="flex items-center gap-2 border-t border-slate-100 p-3">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            disabled={!enabled || loading}
            placeholder={loading ? "Asistan yazıyor..." : "Bir mesaj yazın..."}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:bg-slate-50"
          />
          <button
            type="button"
            onClick={send}
            disabled={!enabled || !draft.trim() || loading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Gönder
          </button>
        </div>
      </div>
    </StudioSection>
  );
}

