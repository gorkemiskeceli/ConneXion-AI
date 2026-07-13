import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callHuggingFaceAI } from '../../services/aiService';
import { 
  addPlaygroundMessage, setPlaygroundLoading, setPlaygroundLatency, 
  setEngineStatus, clearPlaygroundChat 
} from '../store/chatSlice.js';
import { 
  Cpu, Zap, BookOpen, Send, Bot, RefreshCw, Trash2, 
  Sparkles, CheckCircle2, ShieldAlert, Loader2
} from 'lucide-react';

export default function PlaygroundView() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.playgroundMessages);
  const isLoading = useSelector((state) => state.chat.playgroundLoading);
  const latency = useSelector((state) => state.chat.playgroundLatency);
  const engineStatus = useSelector((state) => state.chat.engineStatus);

  const [input, setInput] = useState('');
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (textToSend) => {
    if (!textToSend.trim() || isLoading) return;

    const userText = textToSend;
    setInput('');

    // Dispatch user message
    const userMsg = {
      id: Math.random().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    dispatch(addPlaygroundMessage(userMsg));
    dispatch(setPlaygroundLoading(true));

    try {
      const systemPrompt = "Sen ConneXion-AI platformunun akıllı müşteri hizmetleri asistanısın. Müşterilere yardımcı ol, profesyonel ve teknik bir dille yanıt ver.";
      const data = await callHuggingFaceAI(systemPrompt, userText);

      if (data.error) {
        throw new Error(data.error);
      }

      dispatch(addPlaygroundMessage({
        id: Math.random().toString(),
        sender: 'assistant',
        text: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));
      dispatch(setPlaygroundLatency(Math.floor(100 + Math.random() * 300)));
    } catch (err) {
      console.error('Playground chat failed:', err);
      dispatch(addPlaygroundMessage({
        id: Math.random().toString(),
        sender: 'assistant',
        text: 'Bir bağlantı hatası oluştu. Lütfen Hugging Face token ayarlarınızı kontrol edin veya simülasyon modunda devam edin.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));
    } finally {
      dispatch(setPlaygroundLoading(false));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };

  const quickPills = [
    { label: "API Taslağı", prompt: "ConneXion-AI API'sini kullanarak Node.js ile nasıl analiz isteği gönderebilirim? Örnek bir istek şeması göster." },
    { label: "Veri Güvenliği", prompt: "Verilerimizin güvenliğini nasıl sağlıyorsunuz? SOC-2, HIPAA ve veri maskeleme prosedürlerini detaylandır." },
    { label: "Sağlık Triyajı", prompt: "Sağlık AI Asistanı hasta triyaj akışlarında nasıl karar destek sunar? Bir hasta ön kabul örneği hazırla." },
    { label: "Sözleşme Analizi", prompt: "Hukuk AI Asistanı sözleşmelerdeki riskli maddeleri nasıl yakalar? Örnek bir kiralama sözleşmesi riski bul." }
  ];

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-6 sm:py-8" id="playground-view-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-6 border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-flex items-center space-x-1 rounded bg-sky-50 px-2 py-0.5 text-[11px] font-mono font-bold text-sky-800 border border-sky-150">// SANDBOX ORTAMI</span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">Test Sürüşü</h1>
            <p className="text-xs text-slate-500 mt-0.5">Sektör modellerimizi ve karar destek yeteneklerimizi canlı olarak deneyimleyin.</p>
          </div>
          
          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={() => dispatch(clearPlaygroundChat())}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors bg-white font-mono font-bold text-[10px]"
              id="clear-chat-btn"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>// SIFIRLA</span>
            </button>
          </div>
        </div>

        {/* Layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Status cards */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Engine Status Card */}
            <div className="border border-slate-200 bg-white rounded p-4 shadow-2xs" id="engine-status-card">
              <h3 className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                <Cpu className="h-3.5 w-3.5 text-sky-600" />
                <span>// MOTOR DURUMU</span>
              </h3>
              
              <div className="space-y-3">
                
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-[11px] font-mono text-slate-500">SİSTEM BAĞLANTISI</span>
                  <div className="flex items-center space-x-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold text-sky-700 capitalize">ÇEVRİMİÇİ ({engineStatus})</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-[11px] font-mono text-slate-500">YANIT GECİKMESİ</span>
                  <span className="text-xs font-mono font-bold text-slate-900">{latency}ms</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono text-slate-500">GÜVENLİK KATMANI</span>
                  <span className="text-[9px] font-mono font-bold bg-sky-50 text-sky-800 px-1.5 py-0.5 rounded border border-sky-150">
                    SOC-2: AKTIF
                  </span>
                </div>

              </div>
            </div>

            {/* Documentation quick Card */}
            <div className="border border-slate-200 bg-white rounded p-4 shadow-2xs flex items-start space-x-3">
              <div className="h-8 w-8 rounded bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                <BookOpen className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900">Dokümantasyonu İnceleyin</h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Entegre edilebilir API istekleri, webhook parametreleri ve SDK'lar için dökümantasyonu inceleyin.
                </p>
                <a 
                  href="#doc"
                  className="inline-flex text-[10px] font-mono font-bold text-sky-600 hover:text-sky-700 mt-1 transition-colors cursor-not-allowed"
                >
                  // DOKUMANLAR.EXE →
                </a>
              </div>
            </div>

            {/* Quick warning banner */}
            <div className="border border-amber-150 bg-amber-50/60 rounded p-3 flex items-start space-x-2">
              <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-amber-800 leading-normal font-mono">
                [UYARI] Bu alanda yapacağınız sorgular test amaçlıdır. Kişisel veya gizli verilerinizi paylaşmadan önce "Yetenekler" sekmesindeki maskeleme katmanımızı inceleyebilirsiniz.
              </p>
            </div>

          </div>

          {/* Right Column: Active Interactive Chatbox */}
          <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded h-[500px] flex flex-col overflow-hidden shadow-2xs">
            
            {/* Chatbox Header */}
            <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="h-8 w-8 bg-sky-500 text-white rounded flex items-center justify-center border border-sky-400">
                  <Bot className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-100 tracking-wider">CONNEXION-AI ASSISTANT</h3>
                  <span className="text-[9px] text-sky-400 block font-mono font-bold mt-0.5">// HUGGING FACE ENGINE</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-[9px] font-mono text-slate-400 font-bold">LATENCY: {latency}ms</span>
              </div>
            </div>

            {/* Chat Messages area */}
            <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded px-3 py-2 text-xs shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-slate-800 text-slate-100 border border-slate-700 rounded-br-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                    <span className={`block text-[9px] text-right mt-1 font-mono ${msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded px-3 py-2 shadow-2xs flex items-center space-x-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-sky-500" />
                    <span className="text-[11px] text-slate-500 font-mono font-bold">// ANALIZ EDIYOR VE YANIT HAZIRLIYOR...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Pills under input */}
            <div className="bg-white px-3 py-1.5 border-t border-slate-200 flex items-center space-x-2 overflow-x-auto scrollbar-none">
              <span className="text-[9px] text-slate-400 uppercase font-mono font-bold shrink-0">// HIZLI_SOR:</span>
              {quickPills.map((pill, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(pill.prompt)}
                  disabled={isLoading}
                  className="text-[10px] bg-slate-50 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 border border-slate-200 rounded px-2.5 py-0.5 font-bold text-slate-600 shrink-0 cursor-pointer disabled:opacity-45"
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Form Input area */}
            <form onSubmit={handleFormSubmit} className="bg-white p-2 border-t border-slate-200 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Yapay zeka asistanına bir soru sorun..."
                className="flex-1 border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 bg-slate-50/50"
                id="playground-chat-input"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded bg-slate-900 text-white hover:bg-sky-500 transition-colors disabled:opacity-40 cursor-pointer"
                id="playground-send-btn"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
