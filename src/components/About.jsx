import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { MapPin, Phone, CheckCircle2, Droplets, Snowflake, IceCream } from 'lucide-react';
import posterImage from '../assets/about-poster.jpg';

const About = () => {
    const { t } = useLanguage();

    // Proper way to handle assets in Vite is by importing them
    const posterPath = posterImage;
    const fallbackImage = "https://images.unsplash.com/photo-1559839734-2b71f1e3c7e0?q=80&w=1000";

    return (
        <section id="about" className="section bg-light">
            <h2 className="section-title">{t('about.title')}</h2>
            
            <div className="about-container">
                {/* Left Side: Professional Description */}
                <motion.div 
                    className="about-content"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="glass-card about-card-v2">
                        <div className="card-header">
                            <Droplets className="header-icon" />
                            <h3>{t('about.title')}</h3>
                        </div>
                        
                        <p className="about-text-v2">
                            {t('about.desc')}
                        </p>

                        <div className="features-list">
                            <div className="feature-item">
                                <CheckCircle2 size={20} className="check-icon" />
                                <span>Pure Purified Water</span>
                            </div>
                            <div className="feature-item">
                                <Snowflake size={20} className="check-icon" />
                                <span>Chilled & Refreshing</span>
                            </div>
                            <div className="feature-item">
                                <IceCream size={20} className="check-icon" />
                                <span>Ice & Ice Cream Services</span>
                            </div>
                        </div>

                        <div className="about-info-pills">
                            <div className="info-pill">
                                <MapPin size={16} />
                                <span>{t('about.address')}</span>
                            </div>
                            <div className="info-pill highlight">
                                <Phone size={16} />
                                <span>+91 9922616054</span>
                            </div>
                        </div>

                        <div className="stats-v2">
                            <div className="stat-v2-item">
                                <span className="stat-number">5+</span>
                                <span className="stat-label">Years of Service</span>
                            </div>
                            <div className="divider-v"></div>
                            <div className="stat-v2-item">
                                <span className="stat-number">1000+</span>
                                <span className="stat-label">Happy Home</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Poster Visual */}
                <motion.div 
                    className="about-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="digital-poster">
                        <div className="poster-overlay">
                            <img 
                                src={posterPath} 
                                alt="Dhansagar Aqua" 
                                className="poster-image-v2"
                                onLoad={() => console.log("Poster loaded successfully")}
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop
                                    e.target.src = fallbackImage;
                                    console.log("Using fallback image as local poster not found");
                                }}
                            />
                            <div className="poster-info-overlay">
                                <h4>Dhansagar Aqua & Ice</h4>
                                <p>Premium Quality Water</p>
                            </div>
                        </div>
                        {/* Decorative floating elements */}
                        <div className="ice-cube cube-1"></div>
                        <div className="ice-cube cube-2"></div>
                    </div>
                    
                    <div className="image-caption">
                        <p>📍 Talegaon Dighe, Loni Road</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
