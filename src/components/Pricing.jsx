import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { PhoneCall, CreditCard } from 'lucide-react';
import TiltCard from './TiltCard';
import PaymentModal from './PaymentModal';

const Pricing = () => {
    const { t } = useLanguage();
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handlePayOnline = (plan, price) => {
        setSelectedPlan({ plan, price });
    };

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
                        <div className="pricing-actions">
                            <motion.a 
                                href="tel:+919922616054" 
                                className="cta-btn call-btn ripple-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <PhoneCall size={20} />
                                {t('pricing.order')}
                            </motion.a>
                            <motion.button 
                                className="pay-online-btn"
                                onClick={() => handlePayOnline(t('pricing.jar'), t('pricing.jarPrice'))}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <CreditCard size={20} />
                                {t('pricing.payOnline')}
                            </motion.button>
                        </div>
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
                        <div className="pricing-actions">
                            <motion.a 
                                href="tel:+919922616054" 
                                className="cta-btn call-btn ripple-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <PhoneCall size={20} />
                                {t('pricing.order')}
                            </motion.a>
                            <motion.button 
                                className="pay-online-btn"
                                onClick={() => handlePayOnline(t('pricing.liter'), t('pricing.literPrice'))}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <CreditCard size={20} />
                                {t('pricing.payOnline')}
                            </motion.button>
                        </div>
                    </TiltCard>
                </motion.div>
            </div>

            <PaymentModal 
                isOpen={!!selectedPlan} 
                onClose={() => setSelectedPlan(null)}
                product={selectedPlan?.plan}
                price={selectedPlan?.price}
            />
        </section>
    );
};

export default Pricing;
