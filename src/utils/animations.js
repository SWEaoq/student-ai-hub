/**
 * Animation variants and configurations for framer-motion
 * Centralized animation system for consistent animations across the app
 */

// Common animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

// Stagger container variants
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Stagger item variants (used with staggerContainer)
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Card hover animations
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

// Button press animation
export const buttonPress = {
  scale: 0.95,
  transition: { duration: 0.1 }
};

// Float animation - subtle floating motion
export const float = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Glow animation - pulsing glow effect
export const glow = {
  rest: { 
    opacity: 0.5,
    filter: "blur(20px)"
  },
  hover: {
    opacity: 0.8,
    filter: "blur(30px)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Shimmer animation - shimmer effect
export const shimmer = {
  backgroundPosition: ["-1000px 0", "1000px 0"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "linear"
  }
};

// Magnetic hover effect - slight pull toward cursor
export const magnetic = {
  rest: { x: 0, y: 0 },
  hover: {
    x: (_, info) => {
      // This will be handled by component logic
      return 0;
    },
    y: (_, info) => {
      return 0;
    },
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Parallax scroll effect
export const parallax = {
  y: (progress) => progress * 50, // Adjust multiplier for parallax intensity
  transition: {
    duration: 0,
    ease: "linear"
  }
};

// Enhanced card hover with rotation and glow
export const enhancedCardHover = {
  rest: { 
    scale: 1, 
    y: 0, 
    rotateZ: 0,
    boxShadow: "0 0 0px rgba(176, 38, 255, 0)"
  },
  hover: { 
    scale: 1.05, 
    y: -8,
    rotateZ: 1,
    boxShadow: "0 10px 40px rgba(176, 38, 255, 0.3)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Respect reduced motion preference
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get animation config with reduced motion support
export const getAnimationConfig = (defaultConfig) => {
  if (shouldReduceMotion()) {
    return {
      ...defaultConfig,
      transition: { duration: 0.01 }
    };
  }
  return defaultConfig;
};

