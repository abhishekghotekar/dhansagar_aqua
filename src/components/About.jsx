import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section">
      <h2 className="section-title">{t('about.title')}</h2>
      <div className="about-container">
        <motion.div 
          className="glass-card about-card"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, type: "spring" }}
          viewport={{ once: true }}
        >
          <p>{t('about.desc')}</p>
          <div className="stats">
            <div className="stat-item">
              <h3>5+</h3>
              <p>{t('about.experience')}</p>
            </div>
            <div className="stat-item">
              <h3>1000+</h3>
              <p>{t('about.customers')}</p>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className="about-image"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img src="https://images.unsplash.com/photo-1555624151-689b0d1e0f0b?auto=format&fit=crop&q=80&w=800" alt="About Dhansagar Aqua" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
