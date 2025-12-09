import { useRef, memo } from 'react';
import { AnimatedText, Title } from './AnimatedComponents';

const Chapter2 = memo(() => {
  const containerRef = useRef(null);

  return (
    <div 
      ref={containerRef} 
      className="w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 py-24 md:py-32 lg:py-40 transform-gpu will-change-contents"
      style={{ contain: 'layout style paint' }}
    >
      <div className="max-w-4xl space-y-12 md:space-y-16 lg:space-y-20">
        {/* Animated Paragraph */}
        <AnimatedText>
          <p className="text-white text-xl font-sf-pro-display md:text-2xl lg:text-3xl leading-[145%] tracking-[-0.02em] font-light">
            Remember when the web felt like an adventure? These days, most sites feel like they're built from the same template—clunky, predictable, and honestly, kind of boring. I build the kind of experiences that make you want to stick around. Where every interaction feels intentional, where motion has meaning, and where design actually serves the people using it. That's the stuff I care about.
          </p>
        </AnimatedText>

        {/* Animated Title with glowing bar */}
        <AnimatedText>
          <Title variant="red">
            Simple as that.
          </Title>
        </AnimatedText>
      </div>
    </div>
  );
});

Chapter2.displayName = 'Chapter2';

export default Chapter2;