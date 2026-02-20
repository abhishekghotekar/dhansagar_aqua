import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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

  const getAnswer = (question) => {
    const q = question.toLowerCase();
    
    // Language detection patterns
    const isMarathi = /[\u0900-\u097F]/.test(q) && (q.includes("नाव") || q.includes("सेवा") || q.includes("संपर्क") || q.includes("दर") || q.includes("भा") || q.includes("किती"));
    const isHindi = /[\u0900-\u097F]/.test(q) && (q.includes("नाम") || q.includes("काम") || q.includes("कीमत") || q.includes("कॉल"));
    
    // Determine which language dictionary to use for responses
    let langKey = 'en';
    if (isMarathi) langKey = 'mr';
    else if (isHindi || /[\u0900-\u097F]/.test(q)) langKey = 'hi';

    const translations = {
      en: {
        greeting: "Hello! How can I help you today?",
        name: "Dhansagar Aqua",
        service: "We provide aqua farming solutions and pure water delivery.",
        contact: "Call us at 9922616054.",
        default: "Please contact support for more details."
      },
      mr: {
        greeting: "नमस्कार! मी तुम्हाला आज कशी मदत करू शकतो?",
        name: "धनसागर ॲक्वा (Dhansagar Aqua)",
        service: "आम्ही शुद्ध पाणी पुरवठा आणि ॲक्वा फार्मिंग सोल्यूशन्स प्रदान करतो.",
        contact: "आम्हाला 9922616054 वर कॉल करा.",
        default: "अधिक माहितीसाठी कृपया आमच्या टीमशी संपर्क साधा."
      },
      hi: {
        greeting: "नमस्ते! मैं आज आपकी क्या सहायता कर सकता हूँ?",
        name: "धनसागर एक्वा (Dhansagar Aqua)",
        service: "हम शुद्ध जल आपूर्ति और एक्वा फार्मिंग समाधान प्रदान करते हैं।",
        contact: "हमें 9876543210 पर कॉल करें।",
        default: "अधिक जानकारी के लिए कृपया हमारी टीम से संपर्क करें।"
      }
    };

    const dict = translations[langKey];

    if (q.includes("hi") || q.includes("hello") || q.includes("नमस्कार") || q.includes("नमस्ते")) {
      return dict.greeting;
    }
    if (q.includes("name") || q.includes("नाव") || q.includes("नाम")) {
      return dict.name;
    }
    if (q.includes("service") || q.includes("सेवा") || q.includes("शुद्ध") || q.includes("काम")) {
      return dict.service;
    }
    if (q.includes("contact") || q.includes("संपर्क") || q.includes("कॉल") || q.includes("फोन")) {
      return dict.contact;
    }
    if (q.includes("price") || q.includes("cost") || q.includes("दर") || q.includes("किंमत") || q.includes("भाव")) {
      // Use existing translation system if available for specific price responses
      return t('chatbot.priceResponse');
    }

    return dict.default;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputValue;
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getAnswer(currentInput);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
    }, 1000);
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
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && <span className="notification-dot"></span>}
      </motion.button>
    </div>
  );
};

export default Chatbot;
