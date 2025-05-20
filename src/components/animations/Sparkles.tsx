import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Sparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);
  const colors = ['#F9A8D4', '#C084FC', '#818CF8', '#60A5FA', '#34D399'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.7) { // Only create sparkles sometimes for performance
        const newSparkle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 15 + 5,
          color: colors[Math.floor(Math.random() * colors.length)]
        };
        
        setSparkles(prevSparkles => [...prevSparkles, newSparkle]);
        
        // Remove oldest sparkle if there are more than 30
        if (sparkles.length > 30) {
          setSparkles(prevSparkles => prevSparkles.slice(1));
        }
      }
    };
    
    // Add initial sparkles
    const initialSparkles = [];
    for (let i = 0; i < 20; i++) {
      initialSparkles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 15 + 5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setSparkles(initialSparkles);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          initial={{ opacity: 1, scale: 0 }}
          animate={{
            opacity: [1, 0.8, 0],
            scale: [0, 1, 0.5],
            rotate: [0, 90, 180],
          }}
          transition={{ duration: 1.5 }}
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
              fill={sparkle.color}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default Sparkles;