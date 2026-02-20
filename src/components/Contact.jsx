import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, MessageSquare, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    const { t } = useLanguage();

    return (
        <section id="contact" className="section">
            <h2 className="section-title">{t('contact.title')}</h2>
            <div className="contact-container">
                <motion.div 
                    className="contact-info"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="contact-item">
                        <MapPin className="contact-icon" />
                        <span>{t('contact.address')}</span>
                    </div>
                    <div className="contact-item">
                        <Phone className="contact-icon" />
                        <a href="tel:+919922616054">{t('contact.phone')}</a>
                    </div>
                    <div className="contact-item">
                        <MessageSquare className="contact-icon" />
                        <a href="https://wa.me/919922616054" target="_blank" rel="noopener noreferrer">{t('contact.whatsapp')}</a>
                    </div>
                    <div className="contact-item">
                        <User className="contact-icon" />
                        <span>{t('contact.owner')}</span>
                    </div>
                </motion.div>

                <motion.form 
                    className="contact-form glass-card"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}
                >
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit" className="send-btn">Send Message</button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
