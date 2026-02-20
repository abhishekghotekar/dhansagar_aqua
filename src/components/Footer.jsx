import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Droplet, Facebook, Instagram, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <Droplet className="logo-icon" />
                    <span>Dhansagar Aqua</span>
                </div>
                <div className="footer-socials">
                    <a href="#" aria-label="Facebook"><Facebook /></a>
                    <a href="#" aria-label="Instagram"><Instagram /></a>
                    <a href="https://wa.me/919922616054" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle /></a>
                    <a href="tel:+919922616054" aria-label="Phone"><Phone /></a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Dhansagar Aqua. {t('footer.rights')}</p>
                <p>{t('footer.designed')}</p>
            </div>
        </footer>
    );
};

export default Footer;
