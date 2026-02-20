import React from 'react';
import { motion } from 'framer-motion';

const FloatingBubbles = () => {
  const bubbles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 10,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 10,
  }));

  return (
    <div className="bubbles-container">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
          }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.3, 0.3, 0],
            x: ['-20px', '20px', '-10px', '10px'],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
            x: {
              duration: bubble.duration / 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;
