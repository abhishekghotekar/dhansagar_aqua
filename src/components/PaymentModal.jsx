import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X, Smartphone, CreditCard, ChevronRight, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PaymentModal = ({ isOpen, onClose, product, price }) => {
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    
    if (!isOpen) return null;

    // Business details
    const upiId = "9922616054@ybl";
    const payeeName = "ABHISHEK CHAGAN GHOTEKAR";
    const amount = price ? price.replace(/[^0-9]/g, '') : '';
    
    // Links for direct UPI fallback
    const transactionNote = encodeURIComponent(`Payment for ${product}`);
    const genericUpi = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR${amount ? `&am=${amount}` : ''}&tn=${transactionNote}`;
    const phonepeLink = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR${amount ? `&am=${amount}` : ''}&tn=${transactionNote}`;

    const handleRazorpayPayment = async () => {
        try {
            setIsLoading(true);
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            
            // 1. Create order on backend
            const orderResponse = await fetch(`${backendUrl}/api/v1/payments/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: parseInt(amount) * 100, // Amount in paise
                    currency: "INR",
                    receipt: `rcpt_${Math.random().toString(36).substring(7)}`,
                    notes: { product_name: product }
                })
            });

            if (!orderResponse.ok) throw new Error("Failed to create order");
            
            const orderData = await orderResponse.json();

            // 2. Open Razorpay Checkout
            // Note: Replace with actual Key ID or use env variable
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_pJSvR5A5nN4nJS", 
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Dhansagar Aqua",
                description: product,
                order_id: orderData.id,
                handler: async (response) => {
                    try {
                        setIsLoading(true);
                        // 3. Verify payment on backend
                        const verifyRes = await fetch(`${backendUrl}/api/v1/payments/verify-payment`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        if (verifyRes.ok) {
                            alert("Payment Successful!");
                            onClose();
                        } else {
                            throw new Error("Verification failed");
                        }
                    } catch (err) {
                        console.error(err);
                        alert("Payment verification failed. Please contact support.");
                    } finally {
                        setIsLoading(false);
                    }
                },
                prefill: {
                    name: "Customer",
                    email: "",
                    contact: "9922616054"
                },
                theme: {
                    color: "#00b4d8"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment initialization error:", error);
            alert("Could not initialize payment. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

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
                    <button className="close-modal" onClick={onClose} disabled={isLoading}>
                        <X size={24} />
                    </button>

                    <div className="modal-header">
                        <div className="brand-badge">Secure Payment Gateway</div>
                        <h2>{t('pricing.payOnline')}</h2>
                        <p>{product} - <span className="highlight">{price}</span></p>
                    </div>

                    <div className="payment-options">
                        <div className="direct-pay-section">
                            <motion.button 
                                onClick={handleRazorpayPayment}
                                className="upi-btn razorpay-btn primary-btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isLoading}
                                style={{
                                    background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
                                    color: 'white',
                                    width: '100%',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(0, 180, 216, 0.3)',
                                    marginBottom: '20px'
                                }}
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={24} />
                                ) : (
                                    <CreditCard size={24} />
                                )}
                                <span>{isLoading ? "Processing..." : "Pay Securely Now"}</span>
                                {!isLoading && <ChevronRight size={18} />}
                            </motion.button>
                        </div>

                        <div className="divider">
                            <span>OR SCAN QR FOR UPI</span>
                        </div>

                        <div className="qr-section">
                            <div className="qr-container">
                                <QRCodeSVG 
                                    value={genericUpi} 
                                    size={180}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>
                            <p className="qr-hint">Scan to pay with Any UPI App</p>
                        </div>

                        <div className="fallback-section" style={{ marginTop: '20px' }}>
                            <div className="divider" style={{ marginBottom: '15px' }}>
                                <span>DIRECT UPI APPS</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <motion.a 
                                    href={phonepeLink}
                                    className="upi-btn phonepe-btn-mini"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        padding: '12px',
                                        background: '#f8f9fa',
                                        borderRadius: '10px',
                                        textDecoration: 'none',
                                        color: '#5f259f',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        border: '1px solid #e9ecef'
                                    }}
                                >
                                    <Smartphone size={16} />
                                    <span>PhonePe</span>
                                </motion.a>

                                <motion.a 
                                    href={genericUpi}
                                    className="upi-btn generic-upi-mini"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        padding: '12px',
                                        background: '#f8f9fa',
                                        borderRadius: '10px',
                                        textDecoration: 'none',
                                        color: '#333',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        border: '1px solid #e9ecef'
                                    }}
                                >
                                    <Smartphone size={16} />
                                    <span>Other UPI</span>
                                </motion.a>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <div className="security-note">
                            <CreditCard size={14} />
                            <span>100% Secure Transaction via Razorpay</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PaymentModal;
