import { useEffect, useState, useRef, memo } from 'react';
import { useScrollTriggerManager } from '../../hooks/useScrollTriggerManager';

// Animated Text Component with mask animation
export const AnimatedText = memo(({ children, className = '' }) => {
  const [maskValue, setMaskValue] = useState(-64.6102);
  const elementRef = useRef(null);
  const { createTrigger } = useScrollTriggerManager();
  const rafRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const trigger = createTrigger({
      trigger: elementRef.current,
      start: 'top 90%',
      end: 'top 40%',
      scrub: true,
      // markers: true,
      onUpdate: (self) => {
        // Cancel any pending animation frame
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        
        // Use requestAnimationFrame for smooth updates
        rafRef.current = requestAnimationFrame(() => {
          // Map scroll progress (0 to 1) to mask value (-64.6102 to 100)
          const startValue = -64.6102;
          const endValue = 100;
          const newMaskValue = startValue + (self.progress * (endValue - startValue));
          setMaskValue(newMaskValue);
          rafRef.current = null;
        });
      },
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      trigger.kill();
    };
  }, [createTrigger]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        maskImage: `linear-gradient(38deg, black ${maskValue}%, black ${maskValue + 10}%, transparent ${maskValue + 30}%)`,
        WebkitMaskImage: `linear-gradient(38deg, black ${maskValue}%, black ${maskValue + 10}%, transparent ${maskValue + 30}%)`
      }}
    >
      {children}
    </div>
  );
});

AnimatedText.displayName = 'AnimatedText';

// Title Component with glowing bar and white/silver gradient
export const Title = memo(({ children, className = '', variant = 'default' }) => {
  const isRed = variant === 'red';
  
  return (
    <div className={`relative ${className}`}>
      <h2 
        className={`font-sf-pro-display text-4xl md:text-[6vw] leading-[120%] tracking-[-0.04em] font-semibold text-center ${
          isRed 
            ? 'text-red-300' 
            : 'bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent'
        }`}
      >
        {children}
      </h2>
      {/* Glowing bar */}
      <div className="relative mt-6 md:mt-8 lg:mt-10 flex justify-center">
        <div 
          className={`h-[3px] w-32 md:w-40 lg:w-48 xl:w-56 rounded-full ${
            isRed ? '' : 'opacity-90'
          }`}
          style={{
            background: isRed
              ? 'linear-gradient(90deg, transparent, rgba(252, 165, 165, 0.6), rgba(239, 68, 68, 0.9), rgba(252, 165, 165, 0.6), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8), rgba(200, 200, 200, 0.6), transparent)',
            boxShadow: isRed
              ? '0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.4), 0 0 60px rgba(239, 68, 68, 0.2)'
              : '0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3), 0 0 90px rgba(200, 200, 200, 0.2)',
          }}
        />
      </div>
    </div>
  );
});

Title.displayName = 'Title';

