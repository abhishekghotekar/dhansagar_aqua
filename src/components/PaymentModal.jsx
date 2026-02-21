import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X, Smartphone, CreditCard, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PaymentModal = ({ isOpen, onClose, product, price }) => {
    const { t } = useLanguage();
    
    if (!isOpen) return null;

    // Business details
    const upiId = "9922616054@ybl";
    const payeeName = "ABHISHEK CHAGAN GHOTEKAR";
    const amount = price ? price.replace(/[^0-9]/g, '') : '';
    
    // Links
    const transactionNote = encodeURIComponent(`Payment for ${product}`);
    const genericUpi = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR${amount ? `&am=${amount}` : ''}&tn=${transactionNote}`;
    const phonepeLink = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR${amount ? `&am=${amount}` : ''}&tn=${transactionNote}`;

    return (
        <AnimatePresence>
            <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div 
                    className="payment-modal"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close-modal" onClick={onClose}>
                        <X size={24} />
                    </button>

                    <div className="modal-header">
                        <div className="brand-badge">PhonePe Verified</div>
                        <h2>{t('pricing.payOnline')}</h2>
                        <p>{product} - <span className="highlight">{price}</span></p>
                    </div>

                    <div className="payment-options">
                        <div className="qr-section">
                            <div className="qr-container">
                                <QRCodeSVG 
                                    value={genericUpi} 
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                    imageSettings={{
                                        src: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-logo-icon.png",
                                        x: undefined,
                                        y: undefined,
                                        height: 40,
                                        width: 40,
                                        excavate: true,
                                    }}
                                />
                            </div>
                            <p className="qr-hint">Scan to pay with any UPI App</p>
                        </div>

                        <div className="divider">
                            <span>OR PAY DIRECTLY</span>
                        </div>

                        <div className="direct-pay-section">
                            <motion.a 
                                href={phonepeLink}
                                className="upi-btn phonepe-btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-logo-icon.png" alt="PhonePe" className="btn-icon" />
                                <span>Pay via PhonePe</span>
                                <ChevronRight size={18} />
                            </motion.a>

                            <motion.a 
                                href={genericUpi}
                                className="upi-btn secondary-upi"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Smartphone size={20} />
                                <span>Other UPI Apps</span>
                                <ChevronRight size={18} />
                            </motion.a>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <div className="security-note">
                            <CreditCard size={14} />
                            <span>100% Secure Transaction via PhonePe</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PaymentModal;
