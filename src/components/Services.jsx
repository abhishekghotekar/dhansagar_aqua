import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Home, Building2, PartyPopper, CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    { icon: <Home size={32} />, title: t('services.s1'), desc: t('services.s1Desc') },
    { icon: <Building2 size={32} />, title: t('services.s2'), desc: t('services.s2Desc') },
    { icon: <PartyPopper size={32} />, title: t('services.s3'), desc: t('services.s3Desc') },
    { icon: <CalendarClock size={32} />, title: t('services.s4'), desc: t('services.s4Desc') },
  ];

  return (
    <section id="services" className="section">
      <h2 className="section-title">{t('services.title')}</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <TiltCard className="glass-card service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
