import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessageSquare, Send, X, Bot, Sparkles, AlertCircle, Trash2 } from "lucide-react";
import { sendMessageToAI, clearChat, clearError } from "../../homepage/store/aiSlice";
import { getSystemPrompt } from "../../config/agentConfig";
import { useGetAiAgentsQuery, useGetWidgetSettingsQuery } from "../../services/api";
import { service } from "../../services/service";

function renderMessageText(text) {
  if (!text) return "";
  
  let formatted = text;

  // 1. Parse markdown tables into clean blocks
  if (formatted.includes('|')) {
    const lines = formatted.split('\n');
    const parsedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        // Skip separator line or main header labels
        if (trimmed.includes('---') || (trimmed.toLowerCase().includes('bölüm') && trimmed.toLowerCase().includes('içerik'))) {
          return '';
        }
        const cells = trimmed.split('|').map(c => c.trim()).filter(Boolean);
        if (cells.length === 2) {
          return `<strong class="block text-slate-800 font-bold mt-2.5">${cells[0]}</strong>${cells[1]}`;
        }
        return cells.join(' • ');
      }
      return line;
    }).filter(l => l !== '');
    formatted = parsedLines.join('\n');
  }

  // 2. Clean list headers like "* **Hizmetler:**" or "* **Adres:**" into styled headers
  formatted = formatted.replace(/\*\s+\*\*(.*?)\*\*:/g, '<strong class="block text-slate-800 font-bold mt-2.5">$1:</strong>');
  formatted = formatted.replace(/\*\s+\*\*(.*?)\*\*/g, '<strong class="block text-slate-800 font-bold mt-2.5">$1</strong>');
  
  // 3. Format standard markdown headings
  formatted = formatted.replace(/###\s+(.*)/g, '<strong class="block text-slate-800 font-bold mt-2.5">$1</strong>');
  formatted = formatted.replace(/##\s+(.*)/g, '<strong class="block text-slate-900 font-extrabold mt-3 text-base">$1</strong>');
  
  // 4. Format standard bold markers **bold** to <strong>bold</strong>
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // 5. Convert inline lists to clean, line-broken list items: e.g. " - Saç kesimi" -> "<br/>• Saç kesimi"
  formatted = formatted.replace(/\s*-\s+/g, '<br/>• ');
  
  // 6. Clean up any leading asterisks used as lists: e.g. "* " -> "• "
  formatted = formatted.replace(/^\s*\*\s+/gm, '• ');

  // 7. Convert newlines to HTML line breaks
  formatted = formatted.replace(/\n/g, '<br />');
  
  return formatted;
}

export default function EmbedChatWidget({ systemPrompt = getSystemPrompt() }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const { messages, loading, error } = useSelector((state) => state.ai);
  const currentUser = useSelector((state) => state.auth?.user);

  const [widgetConvId, setWidgetConvId] = useState(null);
  const [widgetCustId, setWidgetCustId] = useState(null);

  const messagesEndRef = useRef(null);

  const { data: agents = [] } = useGetAiAgentsQuery();
  const { data: settings } = useGetWidgetSettingsQuery();
  const activeAgent = agents.find((a) => a.active);

  const languageMap = { tr: "Turkish", en: "English", auto: "Turkish" };
  const toneMap = {
    professional: "Professional, polite, concise, and helpful",
    friendly: "Friendly, warm, polite, and helper",
    formal: "Formal, respectful, and standard",
    concise: "Concise, extremely short, and plain",
  };

  const dynamicSystemPrompt = activeAgent
    ? `
You are the official support assistant named "${activeAgent.name}".
Description: ${activeAgent.description || ""}
Role: Customer Support Agent
Tone: ${toneMap[activeAgent.tone] || activeAgent.tone || "Friendly"}
Language: ${languageMap[activeAgent.language] || activeAgent.language || "Turkish"}

STRICT GUARDRAILS:
${activeAgent.blockedTerms ? `- Do not reply to or discuss these blocked terms/topics: ${activeAgent.blockedTerms}` : ""}
${activeAgent.maxLength ? `- Keep your response under ${activeAgent.maxLength} characters.` : ""}

ODAK ANAHTAR KELİMELER / FOCUS KEYWORDS:
${activeAgent.keywords && activeAgent.keywords.length > 0 ? `- Focus on these keywords and related topics: ${activeAgent.keywords.join(", ")}` : ""}

INSTRUCTIONS:
${activeAgent.instructions || "Kibar, kısa ve yardımsever yanıtlar ver. Emin olmadığında konuşmayı bir temsilciye aktar."}
    `.trim()
    : systemPrompt;

  const themeColor = activeAgent?.themeColor || settings?.brandColor || "#4f46e5";
  const themeTextColor = activeAgent?.themeTextColor || "#ffffff";

  // Auto scroll to bottom when messages or window open state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");

    // Guardrails Check (Local filter)
    const isBlocked = activeAgent && activeAgent.blockedTerms && activeAgent.blockedTerms.split(",")
      .map(t => t.trim().toLowerCase())
      .filter(Boolean)
      .some(term => userMessage.toLowerCase().includes(term));

    let activeConvId = widgetConvId;
    let activeCustId = widgetCustId;

    try {
      // If no conversation session is tracked, initialize it
      if (!activeConvId) {
        activeCustId = `cus_${Math.random().toString(36).substr(2, 9)}`;
        activeConvId = `conv_${Math.random().toString(36).substr(2, 9)}`;
        const customerName = `Web Ziyaretçisi #${Math.floor(1000 + Math.random() * 9000)}`;

        setWidgetConvId(activeConvId);
        setWidgetCustId(activeCustId);

        // 1. Create customer in database
        await service.post("/customers", {
          id: activeCustId,
          name: customerName,
          email: `${activeCustId}@visitor.com`,
          phone: "-",
          company: "Web Ziyaretçisi",
          status: "active",
          tags: ["Web Widget"],
          tenantId: currentUser?.tenantId || "tnt_standard"
        });

        // 2. Create conversation in database
        await service.post("/conversations", {
          id: activeConvId,
          customerId: activeCustId,
          name: customerName,
          email: `${activeCustId}@visitor.com`,
          preview: userMessage,
          time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          unread: 1,
          status: "open",
          priority: "medium",
          channel: "web",
          assignedAgentId: currentUser?.id || "usr_004",
          aiSummary: "Yapay zeka asistanı görüşmesi başladı.",
          aiSuggestions: [],
          tenantId: currentUser?.tenantId || "tnt_standard"
        });
      }

      // 3. Post User Message to DB
      await service.post("/messages", {
        conversationId: activeConvId,
        sender: "customer",
        text: userMessage,
        timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        tenantId: currentUser?.tenantId || "tnt_standard"
      });

      // 4. Dispatch user message to UI state and AI API
      const resultAction = await dispatch(
        sendMessageToAI({ systemPrompt: dynamicSystemPrompt, userMessage, isBlocked })
      );
      
      const assistantReply = resultAction.payload;

      if (assistantReply) {
        // 5. Post Assistant Reply to DB
        await service.post("/messages", {
          conversationId: activeConvId,
          sender: "agent",
          text: assistantReply,
          timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          tenantId: currentUser?.tenantId || "tnt_standard"
        });

        // 6. Update Conversation Preview
        await service.put(`/conversations/${activeConvId}`, {
          preview: assistantReply,
          lastActivity: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          unread: 1
        });
      }
    } catch (err) {
      console.error("Widget conversation persistence failed:", err);
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Sohbet geçmişini silmek istediğinize emin misiniz?")) {
      dispatch(clearChat());
    }
  };

  const position = settings?.position || "bottom-right";
  const isLeft = position.includes("left");

  return (
    <div className={`fixed bottom-20 z-50 font-sans ${isLeft ? "left-4" : "right-4"}`}>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: isOpen ? "#000000" : themeColor,
          color: isOpen ? "#ffffff" : themeTextColor,
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        aria-label="AI Destek Asistanı"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`absolute bottom-16 flex h-[500px] w-96 max-h-[calc(100vh-140px)] flex-col rounded-2xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${isLeft ? "left-0" : "right-0"}`}>
          
          {/* Header */}
          <div 
            style={{
              backgroundColor: themeColor,
              color: themeTextColor,
            }}
            className="flex items-center justify-between rounded-t-2xl px-4 py-3.5"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
                <Bot className="h-5 w-5" style={{ color: themeTextColor }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide flex items-center gap-1.5" style={{ color: themeTextColor }}>
                  {activeAgent ? activeAgent.name : "ConneXion-AI Assistant"}
                  <Sparkles className="h-3 w-3 opacity-80 animate-pulse" />
                </h3>
                <span className="text-[10px] font-medium opacity-80" style={{ color: themeTextColor }}>
                  {activeAgent ? `${activeAgent.name} • Aktif` : "ConneXion-AI • Aktif"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                title="Sohbeti Temizle"
                className="rounded-lg p-1.5 opacity-80 hover:bg-white/15 hover:opacity-100 transition-all"
                style={{ color: themeTextColor }}
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 opacity-80 hover:bg-white/15 hover:opacity-100 transition-all"
                style={{ color: themeTextColor }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {messages.map((msg) => {
              const isAssistant = msg.sender === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  {isAssistant && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 border border-slate-200 text-slate-600">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm shadow-sm ${isAssistant
                        ? "bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none"
                        : "text-white rounded-tr-none"
                    }`}
                    style={!isAssistant ? { backgroundColor: themeColor, color: themeTextColor } : {}}
                  >
                    <p 
                      className="leading-relaxed whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: renderMessageText(
                        msg.id === "ai-init"
                          ? (activeAgent && activeAgent.greeting ? activeAgent.greeting : msg.text)
                          : msg.text
                      ) }}
                    />
                    <span
                      className={`block mt-1 text-[9px] text-right font-medium ${
                        isAssistant ? "text-slate-400" : "opacity-80"
                      }`}
                      style={!isAssistant ? { color: themeTextColor } : {}}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Thinking / Loading State */}
            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 border border-slate-200 text-slate-600">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="max-w-[75%] rounded-2xl rounded-tl-none bg-slate-50 border border-slate-100 px-3.5 py-3 text-sm shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Diagnostic/Error Alert inside chat flow */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50/70 p-3.5 shadow-sm text-slate-800 animate-in fade-in duration-200">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1.5 flex-1">
                    <p className="font-semibold text-red-700">Bağlantı Hatası / Error</p>
                    <p className="text-slate-600 leading-normal">{error}</p>
                    <div className="flex flex-col gap-1.5 pt-1">
                      <button
                        onClick={() => dispatch(clearError())}
                        className="w-fit flex items-center gap-1 rounded bg-white px-2.5 py-1 text-[10px] font-bold text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
                      >
                        Hatayı Temizle
                      </button>
                      <span className="text-[9px] text-slate-400 leading-normal">
                        Detaylar için tarayıcı konsolunu (F12 &rarr; Console) inceleyin. CORS veya Ad-blocker engellerini kontrol edebilirsiniz.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Area */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-slate-100 p-3.5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder={
                loading
                  ? "Asistan yanıt veriyor..."
                  : "Bir şeyler yazın..."
              }
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:bg-white transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              style={input.trim() && !loading ? { backgroundColor: themeColor, color: themeTextColor } : {}}
              className="flex h-9 w-9 items-center justify-center rounded-xl shadow-md hover:opacity-90 active:scale-95 transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
