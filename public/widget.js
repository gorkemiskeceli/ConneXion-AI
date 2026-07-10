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
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        box-sizing: border-box;
        --connex-brand-color: ${brandColor};
        --connex-brand-text-color: ${brandTextColor};
        --connex-position-left: ${isLeft ? "20px" : "auto"};
        --connex-position-right: ${isLeft ? "auto" : "20px"};
      }
      .connex-widget-container * {
        box-sizing: border-box;
      }
      
      /* Toggle Button - Brutalist style */
      .connex-toggle-btn {
        position: fixed;
        bottom: 20px;
        left: var(--connex-position-left);
        right: var(--connex-position-right);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #000;
        color: #fff;
        border: 3px solid #000;
        box-shadow: 4px 4px 0px var(--connex-brand-color);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999999;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        outline: none;
      }
      .connex-toggle-btn:hover {
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0px var(--connex-brand-color);
      }
      .connex-toggle-btn:active {
        transform: translate(2px, 2px);
        box-shadow: 0px 0px 0px var(--connex-brand-color);
      }
      
      /* Chat Box - Brutalist style */
      .connex-chat-box {
        position: fixed;
        bottom: 95px;
        left: var(--connex-position-left);
        right: var(--connex-position-right);
        width: 380px;
        height: 520px;
        max-height: calc(100vh - 130px);
        background-color: #fff;
        border: 3px solid #000;
        box-shadow: 8px 8px 0px #000;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        z-index: 999999;
        overflow: hidden;
        transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease;
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
        padding: 16px;
        border-bottom: 3px solid #000;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .connex-header-title {
        font-weight: 800;
        font-size: 15px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0;
        flex: 1;
        color: var(--connex-brand-text-color);
      }
      .connex-online-dot {
        width: 10px;
        height: 10px;
        background-color: #10b981;
        border-radius: 50%;
        display: inline-block;
        border: 2px solid #000;
      }
      .connex-close-btn {
        background: #000;
        border: 2px solid #000;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: transform 0.1s ease;
      }
      .connex-close-btn:hover {
        transform: scale(1.1);
      }
      
      /* Message List */
      .connex-msg-list {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        background-color: #f7f7f9;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .connex-msg-bubble {
        max-w: 80%;
        padding: 12px 16px;
        font-size: 13px;
        line-height: 1.5;
        position: relative;
      }
      .connex-msg-bubble.user {
        align-self: flex-end;
        background-color: #fff;
        color: #000;
        border: 2px solid #000;
        box-shadow: 3px 3px 0px #000;
        border-radius: 14px 14px 0 14px;
      }
      .connex-msg-bubble.assistant {
        align-self: flex-start;
        background-color: #000;
        color: #fff;
        border: 2px solid #000;
        box-shadow: 3px 3px 0px var(--connex-brand-color);
        border-radius: 14px 14px 14px 0;
      }
      .connex-msg-timestamp {
        font-size: 9px;
        margin-top: 6px;
        opacity: 0.6;
        text-align: right;
        font-family: monospace;
      }
      
      /* Suggested Questions */
      .connex-suggested-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 6px;
        align-self: flex-start;
      }
      .connex-suggested-chip {
        background-color: #fff;
        color: #000;
        border: 2px solid #000;
        box-shadow: 2px 2px 0px #000;
        padding: 8px 12px;
        font-size: 11px;
        font-weight: 700;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.1s ease, box-shadow 0.1s ease;
      }
      .connex-suggested-chip:hover {
        transform: translate(-1px, -1px);
        box-shadow: 3px 3px 0px #000;
      }
      .connex-suggested-chip:active {
        transform: translate(1px, 1px);
        box-shadow: 0px 0px 0px #000;
      }
      
      /* Input Area */
      .connex-input-form {
        display: flex;
        padding: 14px;
        border-top: 3px solid #000;
        background-color: #fff;
        gap: 10px;
      }
      .connex-input-field {
        flex: 1;
        border: 2px solid #000;
        border-radius: 8px;
        padding: 12px 14px;
        font-size: 13px;
        outline: none;
        color: #000 !important;
        background-color: #fff !important;
        transition: border-color 0.15s ease;
      }
      .connex-input-field:focus {
        border-color: var(--connex-brand-color);
      }
      .connex-send-btn {
        background-color: #000;
        color: #fff;
        border: 2px solid #000;
        box-shadow: 2px 2px 0px var(--connex-brand-color);
        font-weight: bold;
        padding: 0 18px;
        font-size: 13px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.1s ease, box-shadow 0.15s ease;
      }
      .connex-send-btn:hover {
        transform: translate(-1px, -1px);
        box-shadow: 3px 3px 0px var(--connex-brand-color);
      }
      .connex-send-btn:active {
        transform: translate(1px, 1px);
        box-shadow: 0px 0px 0px var(--connex-brand-color);
      }
      
      /* Loader */
      .connex-loader {
        display: flex;
        gap: 6px;
        padding: 10px 14px;
        align-self: flex-start;
        background-color: #000;
        border: 2px solid #000;
        border-radius: 14px 14px 14px 0;
        box-shadow: 3px 3px 0px var(--connex-brand-color);
      }
      .connex-loader-dot {
        width: 8px;
        height: 8px;
        background-color: #fff;
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

    // Add Welcome Message
    appendMessage("assistant", activeAgent && activeAgent.greeting ? activeAgent.greeting : widgetSettings.welcomeMessage);
    
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

    function appendMessage(sender, text) {
      const bubble = document.createElement("div");
      bubble.className = `connex-msg-bubble ${sender}`;
      
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      bubble.innerHTML = `
        <div>${text}</div>
        <div class="connex-msg-timestamp">${time}</div>
      `;
      
      msgList.appendChild(bubble);
      scrollToBottom();
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
          appendMessage("assistant", data.text || "Bir sorun oluştu.");
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
