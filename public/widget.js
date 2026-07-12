/**
 * ConneXion-AI Chat Widget
 * Dynamically injects a brutalist floating chat widget UI into host websites.
 */
(function () {
  // 1. Detect ConneXionConfig or fallback
  const config = window.ConneXionConfig || {
    tenantId: "usr_001",
    apiUrl: "http://localhost:3000"
  };

  let activeConvId = sessionStorage.getItem("connex_conv_id") || null;
  let activeCustId = sessionStorage.getItem("connex_cust_id") || null;
  let renderedMessageCount = 0;

  // Detect the origin from which the script is loaded (handles when port 5173 is occupied and Vite runs on 5174 etc.)
  const scriptTag = document.currentScript;
  const scriptOrigin = scriptTag ? new URL(scriptTag.src).origin : "http://localhost:5173";

  // Collect host site metadata
  const siteMetadata = {
    title: document.title,
    url: window.location.href,
    description: document.querySelector('meta[name="description"]')?.content || ''
  };

  let activeAgent = null;
  let widgetSettings = {
    brandColor: "#5b63f0",
    welcomeMessage: "Merhaba! Nasıl yardımcı olabilirim?",
    suggestedQuestions: []
  };

  // Fetch settings & agents from the API
  Promise.all([
    fetch(`${config.apiUrl}/widgetSettings`).then(r => r.json()).catch(() => null),
    fetch(`${config.apiUrl}/aiAgents`).then(r => r.json()).catch(() => null)
  ]).then(([settings, agents]) => {
    if (settings) widgetSettings = { ...widgetSettings, ...settings };
    if (agents && Array.isArray(agents)) {
      activeAgent = agents.find(a => a.active) || agents[0];
    }
    initWidget();
  });

  function initWidget() {
    const brandColor = (activeAgent && activeAgent.themeColor) || widgetSettings.brandColor || "#5b63f0";
    const brandTextColor = (activeAgent && activeAgent.themeTextColor) || "#ffffff";
    const position = widgetSettings.position || "bottom-right";
    const isLeft = position.includes("left");

    // 2. Inject Styles (Modern Brutalist Design)
    const style = document.createElement("style");
    style.innerHTML = `
      .connex-widget-container {
        font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
        box-sizing: border-box;
        --connex-brand-color: ${brandColor};
        --connex-brand-text-color: ${brandTextColor};
        --connex-position-left: ${isLeft ? "24px" : "auto"};
        --connex-position-right: ${isLeft ? "auto" : "24px"};
      }
      .connex-widget-container * {
        box-sizing: border-box;
      }
      
      /* Toggle Button - Modern Premium style */
      .connex-toggle-btn {
        position: fixed;
        bottom: 24px;
        left: var(--connex-position-left);
        right: var(--connex-position-right);
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: var(--connex-brand-color);
        color: var(--connex-brand-text-color);
        border: none;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999999;
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;
        outline: none;
      }
      .connex-toggle-btn:hover {
        transform: scale(1.08);
        box-shadow: 0 14px 30px -5px rgba(0, 0, 0, 0.2), 0 10px 15px -6px rgba(0, 0, 0, 0.15);
      }
      .connex-toggle-btn:active {
        transform: scale(0.95);
      }
      
      /* Chat Box - Sleek modern card */
      .connex-chat-box {
        position: fixed;
        bottom: 96px;
        left: var(--connex-position-left);
        right: var(--connex-position-right);
        width: 380px;
        height: 540px;
        max-height: calc(100vh - 140px);
        background-color: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.08);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.02);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        z-index: 999999;
        overflow: hidden;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
        transform: translateY(30px) scale(0.95);
        opacity: 0;
        pointer-events: none;
      }
      .connex-chat-box.open {
        transform: translateY(0) scale(1);
        opacity: 1;
        pointer-events: auto;
      }
      
      /* Header */
      .connex-header {
        background-color: var(--connex-brand-color);
        color: var(--connex-brand-text-color);
        padding: 18px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .connex-header-title {
        font-weight: 700;
        font-size: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 0;
        flex: 1;
        color: var(--connex-brand-text-color);
      }
      .connex-online-dot {
        width: 8px;
        height: 8px;
        background-color: #10b981;
        border-radius: 50%;
        display: inline-block;
        box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
      }
      .connex-close-btn {
        background: rgba(255, 255, 255, 0.15);
        border: none;
        color: var(--connex-brand-text-color);
        font-size: 16px;
        cursor: pointer;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease, transform 0.2s ease;
      }
      .connex-close-btn:hover {
        background: rgba(255, 255, 255, 0.25);
        transform: scale(1.05);
      }
      
      /* Message List */
      .connex-msg-list {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        background-color: #f8fafc;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .connex-msg-bubble {
        max-w: 80%;
        padding: 12px 16px;
        font-size: 13.5px;
        line-height: 1.5;
        position: relative;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }
      .connex-msg-bubble.user {
        align-self: flex-end;
        background-color: var(--connex-brand-color);
        color: var(--connex-brand-text-color);
        border-radius: 18px 18px 0 18px;
      }
      .connex-msg-bubble.assistant {
        align-self: flex-start;
        background-color: #ffffff;
        color: #1e293b;
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-radius: 18px 18px 18px 0;
      }
      .connex-msg-timestamp {
        font-size: 9px;
        margin-top: 6px;
        opacity: 0.5;
        text-align: right;
      }
      .connex-msg-bubble.user .connex-msg-timestamp {
        color: var(--connex-brand-text-color);
      }
      .connex-msg-bubble.assistant .connex-msg-timestamp {
        color: #64748b;
      }
      
      /* Suggested Questions */
      .connex-suggested-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 8px;
        align-self: flex-start;
      }
      .connex-suggested-chip {
        background-color: #ffffff;
        color: var(--connex-brand-color);
        border: 1px solid rgba(0, 0, 0, 0.08);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.02);
        padding: 8px 14px;
        font-size: 11px;
        font-weight: 600;
        border-radius: 9999px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .connex-suggested-chip:hover {
        background-color: var(--connex-brand-color);
        color: var(--connex-brand-text-color);
        border-color: var(--connex-brand-color);
        transform: translateY(-1px);
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.05);
      }
      
      /* Input Area */
      .connex-input-form {
        display: flex;
        padding: 16px;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        background-color: #ffffff;
        gap: 10px;
        align-items: center;
      }
      .connex-input-field {
        flex: 1;
        border: 1px solid #cbd5e1;
        border-radius: 9999px;
        padding: 10px 18px;
        font-size: 13.5px;
        outline: none;
        color: #1e293b !important;
        background-color: #f8fafc !important;
        transition: all 0.2s ease;
      }
      .connex-input-field:focus {
        border-color: var(--connex-brand-color);
        background-color: #ffffff !important;
        box-shadow: 0 0 0 3px rgba(91, 99, 240, 0.15);
      }
      .connex-send-btn {
        background-color: var(--connex-brand-color);
        color: var(--connex-brand-text-color);
        border: none;
        padding: 10px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }
      .connex-send-btn:hover {
        transform: scale(1.08);
        filter: brightness(1.05);
      }
      .connex-send-btn:active {
        transform: scale(0.95);
      }
      
      /* Loader */
      .connex-loader {
        display: flex;
        gap: 6px;
        padding: 12px 16px;
        align-self: flex-start;
        background-color: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-radius: 18px 18px 18px 0;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }
      .connex-loader-dot {
        width: 6px;
        height: 6px;
        background-color: #64748b;
        border-radius: 50%;
        animation: connex-bounce 1.4s infinite ease-in-out both;
      }
      .connex-loader-dot:nth-child(1) { animation-delay: -0.32s; }
      .connex-loader-dot:nth-child(2) { animation-delay: -0.16s; }
      
      @keyframes connex-bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1.0); }
      }
    `;
    document.head.appendChild(style);

    // 3. Create DOM Structure
    const widgetWrap = document.createElement("div");
    widgetWrap.className = "connex-widget-container";
    
    // Toggle Button
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "connex-toggle-btn";
    toggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;
    
    // Chat Box
    const chatBox = document.createElement("div");
    chatBox.className = "connex-chat-box";
    
    // Header
    const header = document.createElement("div");
    header.className = "connex-header";
    header.innerHTML = `
      <h3 class="connex-header-title">
        <span class="connex-online-dot"></span>
        ${activeAgent ? activeAgent.name : "ConneXion-AI"}
      </h3>
      <button class="connex-close-btn">&times;</button>
    `;
    
    // Message List
    const msgList = document.createElement("div");
    msgList.className = "connex-msg-list";
    
    // Form Input
    const inputForm = document.createElement("form");
    inputForm.className = "connex-input-form";
    inputForm.innerHTML = `
      <input type="text" class="connex-input-field" placeholder="Bir şeyler yazın..." required />
      <button type="submit" class="connex-send-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    `;
    
    chatBox.appendChild(header);
    chatBox.appendChild(msgList);
    chatBox.appendChild(inputForm);
    
    widgetWrap.appendChild(toggleBtn);
    widgetWrap.appendChild(chatBox);
    document.body.appendChild(widgetWrap);

    // 4. Wire Up Events
    const closeBtn = header.querySelector(".connex-close-btn");
    const inputField = inputForm.querySelector(".connex-input-field");
    
    let isChatOpen = false;

    function toggleChat() {
      isChatOpen = !isChatOpen;
      if (isChatOpen) {
        chatBox.classList.add("open");
        toggleBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
      } else {
        chatBox.classList.remove("open");
        toggleBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        `;
      }
    }

    toggleBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", toggleChat);

    // Add History or Welcome Message
    if (activeConvId) {
      fetch(`${config.apiUrl}/messages?conversationId=${activeConvId}`)
        .then(r => r.json())
        .then(messages => {
          messages.forEach(m => {
            appendMessage(m.sender === "customer" ? "user" : "assistant", m.text);
          });
        })
        .catch(err => {
          console.warn("Failed to load chat history:", err);
          appendMessage("assistant", activeAgent && activeAgent.greeting ? activeAgent.greeting : widgetSettings.welcomeMessage);
        });
    } else {
      appendMessage("assistant", activeAgent && activeAgent.greeting ? activeAgent.greeting : widgetSettings.welcomeMessage);
    }

    // Periodically poll for new agent messages from database
    setInterval(() => {
      if (activeConvId) {
        fetch(`${config.apiUrl}/messages?conversationId=${activeConvId}`)
          .then(r => r.json())
          .then(messages => {
            if (messages.length > renderedMessageCount) {
              const newMsgs = messages.slice(renderedMessageCount);
              newMsgs.forEach(m => {
                appendMessage(m.sender === "customer" ? "user" : "assistant", m.text);
              });
            }
          })
          .catch(err => console.warn("Failed to sync messages:", err));
      }
    }, 3000);
    
    // Render Suggested Questions
    if (widgetSettings.suggestedQuestions && widgetSettings.suggestedQuestions.length > 0) {
      const suggestWrap = document.createElement("div");
      suggestWrap.className = "connex-suggested-container";
      widgetSettings.suggestedQuestions.forEach(q => {
        const chip = document.createElement("button");
        chip.className = "connex-suggested-chip";
        chip.textContent = q;
        chip.addEventListener("click", () => {
          handleSendMessage(q);
        });
        suggestWrap.appendChild(chip);
      });
      msgList.appendChild(suggestWrap);
      scrollToBottom();
    }

    inputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = inputField.value.trim();
      if (!text) return;
      inputField.value = "";
      handleSendMessage(text);
    });

    function formatMessageText(text) {
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
              return `<strong style="display: block; font-weight: 700; margin-top: 10px; color: inherit;">${cells[0]}</strong>${cells[1]}`;
            }
            return cells.join(' • ');
          }
          return line;
        }).filter(l => l !== '');
        formatted = parsedLines.join('\n');
      }

      // 2. Clean list headers like "* **Hizmetler:**" or "* **Adres:**" into styled headers
      formatted = formatted.replace(/\*\s+\*\*(.*?)\*\*:/g, '<strong style="display: block; font-weight: 700; margin-top: 10px; color: inherit;">$1:</strong>');
      formatted = formatted.replace(/\*\s+\*\*(.*?)\*\*/g, '<strong style="display: block; font-weight: 700; margin-top: 10px; color: inherit;">$1</strong>');
      
      // 3. Format standard markdown headings
      formatted = formatted.replace(/###\s+(.*)/g, '<strong style="display: block; font-weight: 700; margin-top: 10px; color: inherit;">$1</strong>');
      formatted = formatted.replace(/##\s+(.*)/g, '<strong style="display: block; font-weight: 800; margin-top: 12px; font-size: 14px; color: inherit;">$1</strong>');
      
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

    function appendMessage(sender, text) {
      const bubble = document.createElement("div");
      bubble.className = `connex-msg-bubble ${sender}`;
      
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      bubble.innerHTML = `
        <div>${formatMessageText(text)}</div>
        <div class="connex-msg-timestamp">${time}</div>
      `;
      
      msgList.appendChild(bubble);
      scrollToBottom();
      renderedMessageCount++;
    }

    function scrollToBottom() {
      msgList.scrollTop = msgList.scrollHeight;
    }

    function showTypingLoader() {
      const loader = document.createElement("div");
      loader.className = "connex-loader";
      loader.id = "connex-active-loader";
      loader.innerHTML = `
        <div class="connex-loader-dot"></div>
        <div class="connex-loader-dot"></div>
        <div class="connex-loader-dot"></div>
      `;
      msgList.appendChild(loader);
      scrollToBottom();
    }

    function removeTypingLoader() {
      const loader = msgList.querySelector("#connex-active-loader");
      if (loader) loader.remove();
    }

    async function handleSendMessage(userMessage) {
      appendMessage("user", userMessage);
      showTypingLoader();

      // Guardrails local filter
      const isBlocked = activeAgent && activeAgent.blockedTerms && activeAgent.blockedTerms.split(",")
        .map(t => t.trim().toLowerCase())
        .filter(Boolean)
        .some(term => userMessage.toLowerCase().includes(term));

      if (isBlocked) {
        removeTypingLoader();
        appendMessage("assistant", "Bu konu hakkında yanıt veremiyorum.");
        return;
      }

      // DB Persistence
      try {
        if (!activeConvId) {
          activeCustId = `cus_${Math.random().toString(36).substr(2, 9)}`;
          activeConvId = `conv_${Math.random().toString(36).substr(2, 9)}`;
          sessionStorage.setItem("connex_conv_id", activeConvId);
          sessionStorage.setItem("connex_cust_id", activeCustId);

          const customerName = `Web Ziyaretçisi #${Math.floor(1000 + Math.random() * 9000)}`;

          // 1. Create customer
          await fetch(`${config.apiUrl}/customers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: activeCustId,
              name: customerName,
              email: `${activeCustId}@visitor.com`,
              phone: "-",
              company: "Web Ziyaretçisi",
              status: "active",
              tags: ["Web Widget"],
              tenantId: config.tenantId
            })
          });

          // 2. Create conversation
          await fetch(`${config.apiUrl}/conversations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
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
              assignedAgentId: "usr_004",
              aiSummary: "Yapay zeka asistanı görüşmesi başladı.",
              aiSuggestions: [],
              tenantId: config.tenantId
            })
          });
        }

        // 3. Post User Message
        await fetch(`${config.apiUrl}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversationId: activeConvId,
            sender: "customer",
            text: userMessage,
            timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
            tenantId: config.tenantId
          })
        });
      } catch (dbErr) {
        console.warn("Failed to persist message to local DB:", dbErr);
      }

      // Build system prompt for this agent
      const languageMap = { tr: "Turkish", en: "English", auto: "Turkish" };
      const toneMap = {
        professional: "Professional, polite, concise, and helpful",
        friendly: "Friendly, warm, polite, and helper",
        formal: "Formal, respectful, and standard",
        concise: "Concise, extremely short, and plain",
      };
      
      // Scrape host page text context to provide context about what is on screen
      let pageTextContext = "";
      try {
        // Clone document body to safely extract text without widget container interference
        const bodyClone = document.body.cloneNode(true);
        const widgetInClone = bodyClone.querySelector('.connex-widget-container');
        if (widgetInClone) {
          widgetInClone.remove();
        }
        
        // Remove style, script, noscript tags from the clone
        const scriptsAndStyles = bodyClone.querySelectorAll('script, style, noscript');
        scriptsAndStyles.forEach(el => el.remove());

        const fullText = bodyClone.textContent || "";
        const cleanedText = fullText
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 2000); // Limit to keep prompt token size reasonable (increased limit to 2000 for textContent)

        if (cleanedText) {
          pageTextContext += `\n\n[USER SCREEN CONTENT / PAGE TEXT CONTENT]:\n${cleanedText}`;
        }
      } catch (e) {
        console.warn("Could not scrape page text content:", e);
      }

      // Read developer-provided custom context
      if (window.ConneXionConfig && window.ConneXionConfig.contextData) {
        try {
          pageTextContext += `\n\n[APPLICATION CONTEXT DATA / DATABASE]:\n${JSON.stringify(window.ConneXionConfig.contextData, null, 2)}`;
        } catch (e) {
          console.warn("Could not serialize contextData:", e);
        }
      }

      const systemPrompt = (activeAgent
        ? `You are the official support assistant named "${activeAgent.name}". Description: ${activeAgent.description || ""}. Role: Customer Support Agent. Tone: ${toneMap[activeAgent.tone] || activeAgent.tone || "Friendly"}. Language: ${languageMap[activeAgent.language] || activeAgent.language || "Turkish"}. Instructions: ${activeAgent.instructions || "Kibar, kısa ve yardımsever yanıtlar ver."} ÖNEMLİ: Sayfadaki verileri ([USER SCREEN CONTENT / PAGE TEXT CONTENT]) en öncelikli bilgi kaynağı olarak kullan. Kullanıcı sayfadaki maçlar, skorlar, takımlar veya bilgiler hakkında soru sorduğunda, her zaman bu verileri esas alarak kesin ve doğru cevap ver. Sayfada yer almayan hiçbir bilgiyi uydurma.`
        : `You are the official support assistant. Role: Customer Support Agent. Tone: Friendly. Language: Turkish. ÖNEMLİ: Sayfadaki verileri ([USER SCREEN CONTENT / PAGE TEXT CONTENT]) en öncelikli bilgi kaynağı olarak kullan. Kullanıcı ekrandaki/sayfadaki bilgiler hakkında soru sorduğunda bu verileri esas alarak kesin ve doğru cevap ver.`) + pageTextContext;

      try {
        // Send to Vite's local AI API endpoint
        const response = await fetch(`${scriptOrigin}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ systemPrompt, userMessage })
        });

        removeTypingLoader();

        if (response.ok) {
          const data = await response.json();
          const assistantReply = data.text || "Bir sorun oluştu.";
          appendMessage("assistant", assistantReply);

          // Persist Assistant Reply to DB
          try {
            await fetch(`${config.apiUrl}/messages`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                conversationId: activeConvId,
                sender: "agent",
                text: assistantReply,
                timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
                tenantId: config.tenantId
              })
            });

            // Update Conversation Preview
            await fetch(`${config.apiUrl}/conversations/${activeConvId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                preview: assistantReply,
                lastActivity: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
                unread: 1
              })
            });
          } catch (dbErr2) {
            console.warn("Failed to persist assistant reply:", dbErr2);
          }
        } else {
          appendMessage("assistant", "Bir bağlantı hatası oluştu.");
        }
      } catch (err) {
        removeTypingLoader();
        appendMessage("assistant", "Sunucuya bağlanılamadı.");
      }
    }
  }
})();
