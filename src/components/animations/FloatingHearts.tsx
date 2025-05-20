import React from 'react';
import { motion } from 'framer-motion';

const FloatingHearts: React.FC = () => {
  // Create 20 hearts with random positions and animations
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 20,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: heart.left,
            bottom: '-50px',
            width: heart.size,
            height: heart.size,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: `-${100 + Math.random() * 20}vh`,
            opacity: [0, 0.5, 0],
            rotate: [0, 10, -10, 5, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={`rgba(236, 72, 153, ${Math.random() * 0.4 + 0.1})`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;