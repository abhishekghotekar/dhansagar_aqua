import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, MessageSquare, User, Instagram } from 'lucide-react';
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
                        <div className="contact-details">
                            <h4>{t('contact.title_address', { defaultValue: 'Address' })}</h4>
                            <span>{t('contact.address')}</span>
                        </div>
                    </div>
                    <div className="contact-item">
                        <Phone className="contact-icon" />
                        <div className="contact-details">
                            <h4>{t('contact.title_phone', { defaultValue: 'Phone Number' })}</h4>
                            <a href="tel:+919922616054">{t('contact.phone')}</a>
                        </div>
                    </div>
                    <div className="contact-item">
                        <MessageSquare className="contact-icon" />
                        <div className="contact-details">
                            <h4>WhatsApp</h4>
                            <a href="https://wa.me/919922616054" target="_blank" rel="noopener noreferrer">{t('contact.whatsapp')}</a>
                        </div>
                    </div>
                    <div className="contact-item">
                        <Instagram className="contact-icon" />
                        <div className="contact-details">
                            <h4>Instagram</h4>
                            <a href="https://www.instagram.com/dhansagar_aqua?igsh=Y2M4NHN1ZWU3aXRk" target="_blank" rel="noopener noreferrer">@dhansagar_aqua</a>
                        </div>
                    </div>
                    <div className="contact-item">
                        <User className="contact-icon" />
                        <div className="contact-details">
                            <h4>{t('contact.title_owner', { defaultValue: 'Owner' })}</h4>
                            <span>{t('contact.owner')}</span>
                        </div>
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
