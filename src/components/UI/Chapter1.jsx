import { useEffect, useRef, useState, memo, useCallback } from "react";
import { IoLogoInstagram, IoLogoLinkedin } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Chapter1 = memo(({ scrollProgress = 0 }) => {
    const [maskValue, setMaskValue] = useState(100);
    const containerRef = useRef(null);
  
    // Use requestAnimationFrame for smooth updates
    const updateMask = useCallback((() => {
      let rafId = null;
      
      return (value) => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        
        rafId = requestAnimationFrame(() => {
          const newValue = 100 - (value * 170);
          setMaskValue(newValue);
          rafId = null;
        });
      };
    })(), []);

    // Use scrollProgress prop instead of creating duplicate ScrollTrigger
    useEffect(() => {
      updateMask(scrollProgress);
    }, [scrollProgress, updateMask]);



    return (
        <div className="fixed inset-0 w-full h-screen pointer-events-none z-50">
           

            {/* Center Headline */}
            <div className="absolute bottom-2/7 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
                maskImage: `linear-gradient(38deg, black ${maskValue}%, black ${maskValue + 10}%, transparent ${maskValue + 30}%)`,
                WebkitMaskImage: `linear-gradient(38deg, black ${maskValue}%, black ${maskValue + 10}%, transparent ${maskValue + 30}%)`
              }}
            >
                <h1 className="text-white  text-center w-4xl text-2xl md:text-[1.2vw] leading-[135%] tracking-[-.04em] font-normal">
                    Building for people, not just users.
                </h1>
            </div>

            {/* Bottom Section */}
            <div className="absolute hidden bottom-8 left-0 right-0 px-8 flex items-center justify-between pointer-events-auto">
                {/* Copyright - Bottom Left */}
                <div className="text-white/60 text-sm font-light">
                © 2025 Ahmed Farooq
                </div>

                {/* Get In Touch Button - Bottom Center */}
                <button className="absolute left-1/2 -translate-x-1/2 bg-[#F4E4A6] hover:bg-[#F4E4A6]/90 text-black px-8 py-3 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    Get In Touch
                    <span className="text-lg">✨</span>
                </button>

                {/* Social Icons - Bottom Right */}
                <div className="flex items-center gap-4">
                    {/* TikTok */}
                    <IoLogoLinkedin className="text-white hover:text-white/70 transition-colors w-16 h-16" />
                    
                    {/* Instagram */}
                    <IoLogoInstagram className="text-white hover:text-white/70 transition-colors w-16 h-16" />
                    
                    {/* X (Twitter) */}
                    <RiTwitterXLine className="text-white hover:text-white/70 transition-colors w-16 h-16" />
                    
                </div>
            </div>
        </div>
    )
});

Chapter1.displayName = 'Chapter1';

export default Chapter1;
