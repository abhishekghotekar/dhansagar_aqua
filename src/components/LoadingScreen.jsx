import React from 'react';
import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <Droplet size={80} color="var(--primary)" fill="var(--primary)" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '20px', color: 'var(--primary-dark)', fontWeight: 700 }}
      >
        Dhansagar Aqua
      </motion.h2>
      <motion.div 
        style={{ 
          width: '150px', 
          height: '4px', 
          background: 'var(--accent)', 
          borderRadius: '2px',
          marginTop: '15px',
          overflow: 'hidden'
        }}
      >
        <motion.div 
          animate={{ x: [-150, 150] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ width: '100%', height: '100%', background: 'var(--primary)' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
