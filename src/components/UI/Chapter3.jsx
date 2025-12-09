import { Canvas } from "@react-three/fiber";
import { useRef, useMemo, useEffect, memo } from "react";
import { gsap } from "gsap";
import RevealImage from "./ImageRevealEffect.jsx/RevealImage";
import { useScrollTriggerManager } from "../../hooks/useScrollTriggerManager";
import { AnimatedText, Title } from "./AnimatedComponents";

const Chapter3 = memo(() => {
  const containerRef = useRef(null);
  const { createTrigger } = useScrollTriggerManager();
  // Start hidden (value: 0)
  const progressRef = useRef({ value: 0 });

  // Create revealProgress object with .get() method for compatibility
  const revealProgress = useMemo(
    () => ({
      get: () => progressRef.current.value,
    }),
    []
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = createTrigger({
      trigger: containerRef.current,
      start: "top center",
      once: true, // Only trigger once
      onEnter: () => {
        // Animate progress from 0 to 1 when entering viewport
        gsap.to(progressRef.current, {
          value: 1,
          duration: 1.5,
          ease: "power2.inOut",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [createTrigger]);

  return (
    <div 
      ref={containerRef} 
      className="w-full  flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 py-24 md:py-32 lg:py-40 transform-gpu will-change-contents"
      style={{ contain: 'layout style paint' }}
    >
      <AnimatedText className="mb-12 md:mb-16 lg:mb-20 font-sf-pro-display">
        <Title>
          About Me
        </Title>
      </AnimatedText>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
        <Canvas className="z-10">
          <RevealImage
            imageTexture="./images/ahmed.jpg"
            revealProgress={revealProgress}
          />
        </Canvas>

        {/* Right Column - Content */}
        <div className="space-y-6 md:space-y-8">
          <AnimatedText>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              I've been building things for the web and mobile for <span className="text-white font-semibold">3+ years</span> now. What keeps me going is solving actual problems—not just making things look pretty, but making them work better for the people who use them every day.
            </p>
          </AnimatedText>

          <AnimatedText>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              My path started with web development, then I got curious about 3D. I spent a lot of time tinkering with Three.js, React Three Fiber, and diving into shaders with GLSL. That curiosity led me to work on some wild projects—interactive 3D experiences, AR experiments, and web apps where the creative side actually matters.
            </p>
          </AnimatedText>

          <AnimatedText>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              When I'm not coding, you'll probably find me reading philosophy or just thinking about ideas. I like taking time to reflect on things, and I'm always playing around with new concepts—both in code and in life.
            </p>
          </AnimatedText>
        </div>
      </div>
    </div>
  );
});

Chapter3.displayName = 'Chapter3';

export default Chapter3;