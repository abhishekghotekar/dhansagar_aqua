import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';
import TiltCard from './TiltCard';

const Pricing = () => {
    const { t } = useLanguage();

    return (
        <section id="pricing" className="section bg-light">
            <h2 className="section-title">{t('pricing.title')}</h2>
            <div className="pricing-grid">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <TiltCard className="glass-card pricing-card">
                        <h3>{t('pricing.jar')}</h3>
                        <div className="price">{t('pricing.jarPrice')}</div>
                        <motion.a 
                            href="tel:+919922616054" 
                            className="cta-btn call-btn ripple-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <PhoneCall size={20} />
                            {t('pricing.order')}
                        </motion.a>
                    </TiltCard>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <TiltCard className="glass-card pricing-card">
                        <h3>{t('pricing.liter')}</h3>
                        <div className="price">{t('pricing.literPrice')}</div>
                        <motion.a 
                            href="tel:+919922616054" 
                            className="cta-btn call-btn ripple-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <PhoneCall size={20} />
                            {t('pricing.order')}
                        </motion.a>
                    </TiltCard>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
