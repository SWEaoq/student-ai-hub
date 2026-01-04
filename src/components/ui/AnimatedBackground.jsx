import React from 'react';

/**
 * AnimatedBackground - Reusable animated gradient background
 * Creates animated gradient orbs that move subtly
 */
const AnimatedBackground = () => {
  return (
    <>
      {/* Global Background Gradients with Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-neon-purple/30 rounded-full blur-[128px] animate-gradient-float-1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-neon-green/20 rounded-full blur-[128px] animate-gradient-float-2" />
        <div className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-neon-pink/15 rounded-full blur-[128px] animate-gradient-float-3" />
      </div>

      {/* Grainy texture overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
    </>
  );
};

export default AnimatedBackground;

