import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFloatingChat, setFloatingChatOpen } from '../store/uiSlice.js';
import { addFloatingMessage, setFloatingLoading } from '../store/chatSlice.js';
import { callHuggingFaceAI } from '../../services/aiService';
import { MessageSquare, X, Send, Sparkles, Loader2, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FloatingChat() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.floatingChatOpen);
  const messages = useSelector((state) => state.chat.floatingMessages);
  const isLoading = useSelector((state) => state.chat.floatingLoading);
  
  const [input, setInput] = useState('');
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');

    // Add user message to state
    const userMsg = {
      id: Math.random().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    dispatch(addFloatingMessage(userMsg));
    dispatch(setFloatingLoading(true));

    try {
      const systemPrompt = "Sen ConneXion-AI canlı destek asistanısın. Müşterilerin platform ile ilgili canlı yardım sorularına kısa ve net yanıtlar ver.";
      const data = await callHuggingFaceAI(systemPrompt, userText);
      
      if (data.error) {
        throw new Error(data.error);
      }

      dispatch(addFloatingMessage({
        id: Math.random().toString(),
        sender: 'assistant',
        text: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));
    } catch (err) {
      console.error('Chat failed:', err);
      dispatch(addFloatingMessage({
        id: Math.random().toString(),
        sender: 'assistant',
        text: 'Destek sistemimiz şu anda yoğun. Lütfen tekrar deneyin veya İletişim sayfasından bize yazın!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));
    } finally {
      dispatch(setFloatingLoading(false));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 h-[450px] w-[350px] sm:w-[380px] rounded-2xl bg-white border border-gray-200 shadow-2xl flex flex-col overflow-hidden"
            id="floating-chat-container"
          >
            {/* Header */}
            <div className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <Bot className="h-5 w-5 text-emerald-400" />
                <div>
                  <h3 className="font-semibold text-sm">Canlı Destek Asistanı</h3>
                  <p className="text-[10px] text-gray-400">Aktif ve çevrimiçi</p>
                </div>
              </div>
              <button 
                onClick={() => dispatch(toggleFloatingChat())}
                className="text-gray-400 hover:text-white transition-colors"
                id="close-floating-chat-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages body */}
            <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-emerald-200' : 'text-gray-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                    <span className="text-xs text-gray-500">Asistan yazıyor...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-gray-100 bg-white flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
                id="floating-chat-input-field"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gray-900 text-white hover:bg-emerald-600 transition-colors disabled:opacity-40"
                id="floating-chat-submit-btn"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => dispatch(toggleFloatingChat())}
        className="h-14 w-14 rounded-full bg-gray-900 hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center cursor-pointer transition-colors border border-gray-800"
        id="floating-chat-launcher-btn"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
