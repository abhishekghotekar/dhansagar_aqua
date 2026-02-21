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

    // Helper to extract numeric value regardless of language (handles Devanagari digits)
    const getNumericAmount = (priceStr) => {
        if (!priceStr) return 0;
        // Convert Devanagari digits to English digits
        const devanagariRange = "०१२३४५६७८९";
        const englishDigits = priceStr.replace(/[०-९]/g, d => devanagariRange.indexOf(d));
        // Extract the first sequence of numbers
        const match = englishDigits.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    };

    const numericAmount = getNumericAmount(price);
    
    // Links for direct UPI fallback
    const transactionNote = encodeURIComponent(`Payment for ${product}`);
    const genericUpi = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR${numericAmount ? `&am=${numericAmount}` : ''}&tn=${transactionNote}`;
    const phonepeLink = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR${numericAmount ? `&am=${numericAmount}` : ''}&tn=${transactionNote}`;

    const handleRazorpayPayment = async () => {
        try {
            setIsLoading(true);
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const rzpKey = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_pJSvR5A5nN4nJS";

            if (!numericAmount || numericAmount <= 0) {
                throw new Error("Invalid amount detected");
            }
            
            console.log("Initializing payment:", { product, numericAmount, backendUrl });

            // 1. Create order on backend
            const orderResponse = await fetch(`${backendUrl}/api/v1/payments/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: numericAmount * 100, // Amount in paise
                    currency: "INR",
                    receipt: `rcpt_${Math.random().toString(36).substring(7)}`,
                    notes: { 
                        product_name: product,
                        platform: "web_vercel"
                    }
                })
            });

            if (!orderResponse.ok) {
                const errorData = await orderResponse.json().catch(() => ({}));
                console.error("Backend order error:", errorData);
                throw new Error(errorData.detail || "Failed to create order");
            }
            
            const orderData = await orderResponse.json();
            console.log("Order created successfully:", orderData);

            // 2. Open Razorpay Checkout
            const options = {
                key: rzpKey,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Dhansagar Aqua",
                description: product,
                order_id: orderData.id,
                handler: async (response) => {
                    try {
                        setIsLoading(true);
                        console.log("Payment authorized, verifying...", response);
                        
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
                            console.log("Payment verified successfully");
                            alert("Payment Successful! Thank you for choosing Dhansagar Aqua.");
                            onClose();
                        } else {
                            const verifyError = await verifyRes.json().catch(() => ({}));
                            throw new Error(verifyError.detail || "Verification failed");
                        }
                    } catch (err) {
                        console.error("Verification error:", err);
                        alert(`Payment verification failed: ${err.message}. Please contact 9922616054.`);
                    } finally {
                        setIsLoading(false);
                    }
                },
                prefill: {
                    name: "Customer",
                    contact: "9922616054"
                },
                theme: {
                    color: "#00b4d8"
                },
                modal: {
                    ondismiss: () => {
                        console.log("Payment modal closed by user");
                        setIsLoading(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment initialization error:", error);
            alert(`Could not initialize payment: ${error.message}. Please use the QR code or try again.`);
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
