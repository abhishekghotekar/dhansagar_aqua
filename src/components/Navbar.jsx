import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Droplet, Globe, ChevronDown, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { t, lang, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'mr', name: 'मराठी' },
    { code: 'hi', name: 'हिंदी' }
  ];

  const currentLangName = languages.find(l => l.code === lang)?.name;

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <motion.div 
        className="logo"
        whileHover={{ scale: 1.05 }}
      >
        <Droplet className="logo-icon" />
        <span>Dhansagar Aqua</span>
      </motion.div>

      <ul className="nav-links">
        {['home', 'about', 'process', 'services', 'pricing', 'contact'].map((item) => (
          <motion.li key={item} whileHover={{ y: -2 }}>
            <a href={`#${item}`}>{t(`nav.${item}`)}</a>
          </motion.li>
        ))}
      </ul>

      <div className="nav-actions">
        <motion.button 
          className="theme-toggle" 
          onClick={toggleTheme}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>

        <div className="lang-switcher">
          <button className="lang-btn" onClick={() => setIsLangOpen(!isLangOpen)}>
            <Globe size={18} />
            <span>{currentLangName}</span>
            <ChevronDown size={14} className={isLangOpen ? 'rotate' : ''} />
          </button>
          
          <AnimatePresence>
            {isLangOpen && (
              <motion.div 
                className="lang-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {languages.map(l => (
                  <button 
                    key={l.code} 
                    onClick={() => { changeLanguage(l.code); setIsLangOpen(false); }}
                    className={lang === l.code ? 'active' : ''}
                  >
                    {l.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
