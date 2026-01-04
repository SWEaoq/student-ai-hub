import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollToTop } from '../../hooks/useScrollToTop';

/**
 * ScrollToTop - Floating button to scroll to top of page
 */
const ScrollToTop = () => {
  const { isVisible, scrollToTop } = useScrollToTop(300);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-full backdrop-blur-md transition-colors shadow-lg shadow-purple-500/20"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className="text-purple-400" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;

