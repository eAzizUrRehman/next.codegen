'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const VanishingText = ({
  texts,
  className,
}: {
  texts: string[];
  className?: string;
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== 'visible' && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (document.visibilityState === 'visible') {
      startAnimation();
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [texts, startAnimation, handleVisibilityChange]);

  return (
    <AnimatePresence mode="wait">
      <motion.p
        initial={{
          y: 5,
          opacity: 0,
        }}
        key={`current-placeholder-${currentTextIndex}`}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          y: -15,
          opacity: 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'linear',
        }}
        className={className}
      >
        {texts[currentTextIndex]}
      </motion.p>
    </AnimatePresence>
  );
};

export default VanishingText;
