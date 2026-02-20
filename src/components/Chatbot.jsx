import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getGeminiResponse } from '../services/aiService';

const Chatbot = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: t('chatbot.welcome') }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputValue;
    setInputValue('');

    // Add a temporary "typing" message or indicator if desired
    // For now, we'll just wait for the response

    try {
      // Get history for Gemini (excluding the last message we just added)
      const history = messages
        .filter(m => m.id !== 1) // exclude welcome message if you want, or include it
        .map(m => ({
          role: m.type === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        }));

      const botResponse = await getGeminiResponse(currentInput, history);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: t('chatbot.error') || "Something went wrong. Please try again." }]);
    }
  };

  return (
    <div className="chatbot-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-window glass-card"
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="bot-avatar">
                  <Bot size={20} />
                </div>
                <div>
                  <h4>{t('chatbot.assistant')}</h4>
                  <span>{t('chatbot.online')}</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-chat">
                <X size={20} />
              </button>
            </div>

            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-bubble ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input" onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder={t('chatbot.placeholder')}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        className="chatbot-fab"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
        {!isOpen && <span className="notification-dot"></span>}
      </motion.button>
    </div>
  );
};

export default Chatbot;
