import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import PaymentModal from './PaymentModal';

const Hero = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const yContent = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityContent = useTransform(scrollY, [0, 300], [1, 0]);

  const droplets = [...Array(10)].map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10
  }));

  return (
    <section className="hero" id="home">
      {/* Floating Droplets Background */}
      <div className="droplets-bg" style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
        {droplets.map(d => (
          <motion.div
            key={d.id}
            initial={{ y: '110vh', x: `${d.x}%`, opacity: 0 }}
            animate={{ 
              y: '-10vh',
              opacity: [0, 0.4, 0]
            }}
            transition={{ 
              duration: d.duration, 
              repeat: Infinity, 
              delay: d.delay,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              width: d.size,
              height: d.size,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(72, 202, 228, 0.2))',
              borderRadius: '50%',
              backdropFilter: 'blur(2px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          />
        ))}
      </div>

      <motion.div 
        className="hero-content"
        style={{ y: yContent, opacity: opacityContent }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ delay: 0.2, duration: 1, ease: "circOut" }}
        >
          <span>{t('hero.title1')}</span>
          <span className="accent">
            {t('hero.title2')}
          </span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {t('hero.subtitle')}
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.a 
            href="tel:+919922616054" 
            className="cta-btn ripple-button"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(0, 119, 182, 0.3)",
              background: "var(--primary-dark)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {t('hero.cta')}
          </motion.a>
          
          <motion.button 
            className="cta-btn pay-now-hero ripple-button"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(95, 37, 159, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <CreditCard size={20} />
            {t('hero.payNow')}
          </motion.button>
        </motion.div>
      </motion.div>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={t('pricing.jar')} 
        price={t('pricing.jarPrice')} 
      />

      <div className="waves-container">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax-waves">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(202, 240, 248, 0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="var(--white)" />
          </g>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
