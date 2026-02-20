import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Filter, Zap, Wind, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';

const Process = () => {
    const { t } = useLanguage();

    const steps = [
        { icon: <Filter size={40} />, title: t('process.step1'), desc: t('process.step1Desc') },
        { icon: <Zap size={40} />, title: t('process.step2'), desc: t('process.step2Desc') },
        { icon: <Wind size={40} />, title: t('process.step3'), desc: t('process.step3Desc') },
        { icon: <FlaskConical size={40} />, title: t('process.step4'), desc: t('process.step4Desc') },
    ];

    return (
        <section id="process" className="section bg-light">
            <h2 className="section-title">{t('process.title')}</h2>
            <div className="process-grid">
                {steps.map((step, index) => (
                    <motion.div 
                        key={index}
                        className="glass-card process-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="process-icon">{step.icon}</div>
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Process;
