import React from 'react';

/**
 * AnimatedBackground - Enhanced animated gradient background with mesh gradients and grid overlay
 * Creates dynamic animated gradient orbs with faster movement and animated grid pattern
 */
const AnimatedBackground = () => {
  return (
    <>
      {/* Global Background Gradients with Enhanced Animation - Optimized for mobile */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Primary gradient orbs with faster, more dynamic movement - Reduced blur on mobile */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-neon-purple/30 rounded-full blur-[60px] sm:blur-[80px] md:blur-[128px] animate-gradient-float-1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-neon-green/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[128px] animate-gradient-float-2" />
        <div className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-neon-pink/15 rounded-full blur-[60px] sm:blur-[80px] md:blur-[128px] animate-gradient-float-3" />
        
        {/* Additional smaller gradient orbs for depth - Hidden on mobile for performance */}
        <div className="hidden sm:block absolute top-[60%] right-[20%] w-[30vw] h-[30vw] bg-purple-500/15 rounded-full blur-[50px] sm:blur-[60px] md:blur-[80px] animate-gradient-float-4" />
        <div className="hidden sm:block absolute bottom-[30%] left-[10%] w-[35vw] h-[35vw] bg-green-500/10 rounded-full blur-[50px] sm:blur-[70px] md:blur-[90px] animate-gradient-float-5" />
      </div>

      {/* Animated Grid Pattern Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      {/* Mesh Gradient Overlay for smoother transitions - Reduced opacity on mobile */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 sm:opacity-25 md:opacity-30">
        <div 
          className="w-full h-full animate-mesh-gradient"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(176, 38, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(57, 255, 20, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Grainy texture overlay - Reduced opacity on mobile */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 sm:opacity-15 md:opacity-20 pointer-events-none z-0"></div>
    </>
  );
};

export default AnimatedBackground;

