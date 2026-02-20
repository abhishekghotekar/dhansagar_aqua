import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Droplet, Globe, ChevronDown, Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { t, lang, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navItems = ['home', 'about', 'process', 'services', 'pricing', 'contact'];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-left desktop-only">
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

      <motion.div 
        className="logo"
        whileHover={{ scale: 1.05 }}
      >
        <Droplet className="logo-icon" />
        <span>Dhansagar Aqua</span>
      </motion.div>

      {/* Desktop Links */}
      <ul className="nav-links desktop-only">
        {navItems.map((item) => (
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

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <ul className="mobile-nav-links">
              {navItems.map((item) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <a href={`#${item}`} onClick={() => setIsMobileMenuOpen(false)}>
                    {t(`nav.${item}`)}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mobile-lang-switcher">
              <p>{t('nav.selectLanguage') || 'Select Language'}:</p>
              <div className="mobile-lang-btns">
                {languages.map(l => (
                  <button 
                    key={l.code}
                    className={lang === l.code ? 'active' : ''}
                    onClick={() => { changeLanguage(l.code); setIsMobileMenuOpen(false); }}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
