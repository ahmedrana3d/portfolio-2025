import { Canvas } from "@react-three/fiber";
import { useRef, useMemo, useEffect, memo, useState } from "react";
import { gsap } from "gsap";
import RevealImage from "./ImageRevealEffect.jsx/RevealImage";
import { useScrollTriggerManager } from "../../hooks/useScrollTriggerManager";
import { AnimatedText } from "./AnimatedComponents";
import LogoSection from "./Components/LogoSection";

const Chapter3 = memo(() => {
  const containerRef = useRef(null);
  const { createTrigger } = useScrollTriggerManager();
  const progressRef = useRef({ value: 0 });
  const [yearsExperience] = useState(() => {
    const startYear = 2021;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  });

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
      once: true,
      onEnter: () => {
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
    <>
    <div
      ref={containerRef}
      className="relative w-full min-h-screen py-20 md:py-28 lg:py-36 transform-gpu will-change-contents"
      style={{ contain: "layout style" }}
      >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Accent gradient orb */}
        <div
          className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{
            background:
            "radial-gradient(circle, rgba(138, 43, 226, 0.6) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Top Section - Title */}
        <div className="mb-16 md:mb-24 lg:mb-32">
          <AnimatedText>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-white/40 to-white/60" />
              <span className="text-white/50 text-xs md:text-sm tracking-[0.3em] uppercase font-light">
                About
              </span>
            </div>
            <h2 className="font-sf-pro-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-semibold tracking-[-0.04em] leading-[0.9]">
              <span className="bg-gradient-to-br from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                So,
              </span>
              <br />
              <span className="bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                Who Am I?
              </span>
            </h2>
          </AnimatedText>
        </div>

        {/* Main Content - Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Left Column - Image with creative framing */}
          <div className="lg:col-span-5 relative mb-12 md:mb-16 lg:mb-0">
              <div className="relative p-4 md:p-6">
                {/* Frame accent */}
                <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 border-l-2 border-t-2 border-white/20" />
                <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 border-r-2 border-b-2 border-white/20" />

                {/* Image Container */}
                <div
                  className="relative aspect-[3/4] w-full overflow-hidden"
                 
              
                >
                  <Canvas className="z-10 !absolute inset-0">
                    <RevealImage
                      imageTexture="./images/ahmed.jpg"
                      revealProgress={revealProgress}
                    />
                  </Canvas>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Years badge - now in flow, not absolute */}
              <div className="flex justify-end mt-4 pr-4 md:pr-6">
                <div className="bg-black/80 backdrop-blur-sm border border-white/10 px-5 py-3 md:px-6 md:py-4">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-sf-pro-display font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent leading-none">
                    {yearsExperience}+
                  </div>
                  <div className="text-[10px] md:text-xs text-white/50 tracking-[0.2em] uppercase mt-1">
                    Years
                  </div>
                </div>
              </div>
          </div>

          {/* Right Column - Content with creative typography */}
          <div className="lg:col-span-7 lg:pl-8 xl:pl-16 pt-8 lg:pt-12">
            {/* Intro paragraph - larger, more prominent */}
            <AnimatedText className="mb-10 md:mb-14">
              <p className="font-sf-pro-display text-xl sm:text-2xl md:text-3xl lg:text-[2rem] xl:text-[2.25rem] text-white leading-[1.4] tracking-[-0.02em] font-light">
                I've been building things for the{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 font-medium text-white">
                    web & mobile
                  </span>
                  <span className="absolute bottom-1 left-0 w-full h-[6px] bg-gradient-to-r from-purple-500/40 to-purple-400/20 -skew-x-12" />
                </span>{" "}
                for {yearsExperience}+ years now.
              </p>
            </AnimatedText>

            {/* Content blocks with visual hierarchy */}
            <div className="space-y-8 md:space-y-10">
              <AnimatedText>
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center pt-2">
                    <span className="w-2 h-2 bg-white/40 rounded-full shrink-0" />
                    <div className="w-px flex-1 bg-white/10 mt-2" />
                  </div>
                  <p className="text-gray-400 text-base md:text-lg leading-[1.7]">
                    What keeps me going is solving actual problems—not just
                    making things look pretty, but making them{" "}
                    <span className="text-white/80">
                      work better for the people
                    </span>{" "}
                    who use them every day.
                  </p>
                </div>
              </AnimatedText>

              <AnimatedText>
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center pt-2">
                    <span className="w-2 h-2 bg-purple-400/60 rounded-full shrink-0" />
                    <div className="w-px flex-1 bg-white/10 mt-2" />
                  </div>
                  <p className="text-gray-400 text-base md:text-lg leading-[1.7]">
                    My path started with web development, then I got curious
                    about 3D. I spent time tinkering with{" "}
                    <span className="text-white/80">
                      Three.js, React Three Fiber, and GLSL shaders
                    </span>
                    . That curiosity led me to work on interactive 3D
                    experiences, AR experiments, and web apps where the creative
                    side actually matters.
                  </p>
                </div>
              </AnimatedText>

              <AnimatedText>
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center pt-2">
                    <span className="w-2 h-2 bg-white/20 rounded-full shrink-0" />
                  </div>
                  <p className="text-gray-500 text-base md:text-lg leading-[1.7]">
                    When I'm not coding, you'll find me reading philosophy or
                    just thinking about ideas. I like taking time to reflect,
                    and I'm always playing around with new concepts—both in code
                    and in life.
                  </p>
                </div>
              </AnimatedText>
            </div>

            {/* Skills/Focus areas - minimal tags */}
            <AnimatedText className="mt-12 md:mt-16">
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "Three.js",
                  "GLSL",
                  "React Native",
                  "Creative Dev",
                ].map((skill, i) => (
                  <span
                  key={skill}
                  className="px-4 py-2 text-xs md:text-sm tracking-wide text-white/60 border border-white/10 rounded-full hover:border-white/25 hover:text-white/80 transition-all duration-300"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    }}
                    >
                    {skill}
                  </span>
                ))}
              </div>
            </AnimatedText>
          </div>
        </div>

        {/* Bottom decorative line */}
        <AnimatedText className="mt-20 md:mt-28 lg:mt-36">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </AnimatedText>

        {/* Logo Section - At the end of the section */}
        <div className="mt-20 md:mt-28 lg:mt-36">
          <LogoSection />
        </div>
      </div>
    </div>
                </>
  );
});

Chapter3.displayName = "Chapter3";

export default Chapter3;
