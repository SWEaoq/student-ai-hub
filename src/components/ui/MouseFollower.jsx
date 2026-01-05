import React, { useEffect, useState, useRef } from 'react';

/**
 * MouseFollower - Subtle glow effect that follows mouse cursor
 * Creates an interactive cursor trail effect
 */
const MouseFollower = ({ enabled = true, size = 400, opacity = 0.1 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef(null);
  const targetPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Smooth follow animation
      const animate = () => {
        setPosition((prev) => {
          const dx = targetPosition.current.x - prev.x;
          const dy = targetPosition.current.y - prev.y;
          
          // Smooth interpolation
          return {
            x: prev.x + dx * 0.1,
            y: prev.y + dy * 0.1,
          };
        });

        rafRef.current = requestAnimationFrame(animate);
      };

      if (!rafRef.current) {
        animate();
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled]);

  if (!enabled || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)',
        opacity: opacity,
        background: 'radial-gradient(circle, rgba(176, 38, 255, 0.3) 0%, rgba(57, 255, 20, 0.2) 50%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        transition: 'opacity 0.3s ease-out',
        willChange: 'transform',
      }}
    />
  );
};

export default MouseFollower;


