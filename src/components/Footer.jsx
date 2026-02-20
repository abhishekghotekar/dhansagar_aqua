import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Droplet, Facebook, Instagram, Phone } from 'lucide-react';

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
                    <a href="#"><Facebook /></a>
                    <a href="#"><Instagram /></a>
                    <a href="tel:+919922616054"><Phone /></a>
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
