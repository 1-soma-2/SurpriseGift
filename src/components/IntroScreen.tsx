import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Heart, Gift } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (step === 3) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        onComplete();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center z-50">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          colors={['#F9A8D4', '#C084FC', '#818CF8', '#60A5FA', '#34D399']}
        />
      )}

      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        key={`intro-step-${step}`}
      >
        {step === 1 && (
          <>
            <motion.div className="text-center mb-8" variants={itemVariants}>
              <div className="inline-block p-4 bg-pink-100 rounded-full mb-4">
                <Gift size={40} className="text-pink-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">A Special Gift</h1>
              <p className="text-gray-600">I've created something special just for you</p>
            </motion.div>

            <motion.p
              className="text-gray-700 mb-8 text-center"
              variants={itemVariants}
            >
              This is a collection of some special moments, memories, and messages that I wanted to share with you.
            </motion.p>

            <motion.button
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold transition-all hover:shadow-lg focus:outline-none flex items-center justify-center gap-2"
              onClick={handleNextStep}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart size={20} />
              <span>Continue</span>
            </motion.button>
          </>
        )}

        {step === 2 && (
          <>
            <motion.div className="text-center mb-8" variants={itemVariants}>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">How It Works</h1>
              <p className="text-gray-600">Browse through our memories together</p>
            </motion.div>

            <motion.div className="space-y-4 mb-8" variants={itemVariants}>
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <span className="font-semibold text-purple-600">1</span>
                </div>
                <p className="text-gray-700">Read the message</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-pink-100 p-2 rounded-full">
                  <span className="font-semibold text-pink-600">2</span>
                </div>
                <p className="text-gray-700">Give the password for the next surprise to appear</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <span className="font-semibold text-indigo-600">3</span>
                </div>
                <p className="text-gray-700">Go for the last one and listen till the end</p>
              </div>
            </motion.div>

            <motion.button
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold transition-all hover:shadow-lg focus:outline-none"
              onClick={handleNextStep}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Open Your Gift
            </motion.button>
          </>
        )}

        {step === 3 && (
          <motion.div
            className="text-center"
            variants={itemVariants}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: 1 }}
          >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
              With Love
            </h1>
            <p className="text-xl text-gray-700 mb-4">From the bottom of my heart</p>
            <div className="flex justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <Heart size={80} fill="#ec4899" stroke="#ec4899" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default IntroScreen;