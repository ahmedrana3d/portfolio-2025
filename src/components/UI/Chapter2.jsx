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
          <p className="text-white text-xl md:text-2xl lg:text-3xl leading-[145%] tracking-[-0.02em] font-light">
            The web used to feel exciting — but today, digital experiences are scattered across clunky interfaces, boring templates, broken interactions, and endless tabs. There's no way to explore, engage, or feel anything meaningful without getting lost in the noise. Not anymore. I take ideas, motion, and design, and turn them into interactive, intuitive, and immersive spaces where people actually enjoy being.
          </p>
        </AnimatedText>

        {/* Animated Title with glowing bar */}
        <AnimatedText>
          <Title variant="red">
            That's what I do, that's why I'm here.
          </Title>
        </AnimatedText>
      </div>
    </div>
  );
});

Chapter2.displayName = 'Chapter2';

export default Chapter2;