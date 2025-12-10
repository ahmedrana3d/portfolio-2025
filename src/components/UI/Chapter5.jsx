import React, { memo, useEffect, useRef, useState } from "react";
import { Eye, XCircle, Smartphone, Award, ShoppingCart } from "lucide-react";
import { GlowingEffect } from "./Components/glowing-effect";
import Testimonials from "./Components/Testimonials";
import { AnimatedText, Title } from "./AnimatedComponents";
import { motion, useInView } from "motion/react";

// Animated counter hook
const useAnimatedCounter = (end, duration = 2000, isInView = true) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return count;
};

const Chapter5 = memo(() => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const gridItems = [
    {
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
      icon: Eye,
      stat: 94,
      suffix: "%",
      title: "First Impressions",
      description: "People decide in seconds whether your brand looks trustworthy and professional.",
      delay: 0,
    },
    {
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
      icon: XCircle,
      stat: 88,
      suffix: "%",
      title: "Won't Return",
      description: "Users won't come back after a bad experience. Bad UX = lost customers forever.",
      delay: 0.1,
    },
    {
      area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
      icon: Smartphone,
      stat: 67,
      suffix: "%",
      prefix: "+",
      title: "More Sales on Mobile",
      description: "Mobile-friendly websites generate significantly more conversions. Responsive design pays off.",
      delay: 0.2,
      featured: true,
    },
    {
      area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
      icon: Award,
      stat: 75,
      suffix: "%",
      title: "Judge Credibility",
      description: "Users judge a business's credibility by its website. Modern design builds instant trust.",
      delay: 0.3,
    },
    {
      area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
      icon: ShoppingCart,
      stat: 89,
      suffix: "%",
      title: "Switch to Competitors",
      description: "Customers leave after poor UX. Better design means they stay with you.",
      delay: 0.4,
    },
  ];

  return (
    <>
      <div 
        ref={containerRef}
        className="w-full flex items-center justify-center flex-col py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 transform-gpu will-change-contents"
        style={{ contain: 'layout style paint' }}
      >
        <AnimatedText className="mb-12 md:mb-16 lg:mb-20">
          <Title>
            Why Your Website Can't Be Average
          </Title>
        </AnimatedText>

        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[34rem] xl:grid-rows-2 w-full max-w-7xl">
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              {...item}
              isInView={isInView}
            />
          ))}
        </ul>
      </div>

      <Testimonials/>
    </>
  );
});

Chapter5.displayName = 'Chapter5';

export default Chapter5;


const GridItem = memo(({ 
  area, 
  icon: Icon, 
  stat, 
  suffix = "", 
  prefix = "",
  title, 
  description, 
  delay,
  featured,
  isInView
}) => {
  const animatedStat = useAnimatedCounter(stat, 2000, isInView);
  
  return (
    <motion.li 
      className={`min-h-[14rem] list-none overflow-hidden rounded-3xl transform-gpu [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)] ${area}`}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <div className="relative h-full rounded-2xl border border-amber-50/10 p-2 md:rounded-3xl md:p-3 group">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        
        <div className={`border-0.75 relative flex h-full flex-col justify-between rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]`}>
          {/* Content */}
          <div className="relative flex flex-1 flex-col gap-4">
            {/* Top section - Icon */}
            <motion.div 
              className="w-fit rounded-lg border border-gray-600 p-2 group-hover:border-gray-400 group-hover:bg-white/5 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon className="h-4 w-4 text-neutral-400 group-hover:text-neutral-200 transition-colors duration-300" />
            </motion.div>
            
            {/* Middle section - Big stat */}
            <div className="flex items-baseline gap-1">
              <motion.span 
                className={`font-sf-pro-display font-bold ${featured ? 'text-6xl md:text-7xl' : 'text-4xl md:text-5xl'} bg-gradient-to-br from-white via-gray-100 to-gray-400 bg-clip-text text-transparent`}
                style={{
                  textShadow: '0 0 60px rgba(255,255,255,0.15)',
                }}
              >
                {prefix}{animatedStat}
              </motion.span>
              <span className={`${featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} font-bold bg-gradient-to-br from-gray-300 to-gray-500 bg-clip-text text-transparent`}>
                {suffix}
              </span>
            </div>
            
            {/* Bottom section - Title and description */}
            <div className="space-y-2 mt-auto">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance md:text-2xl/[1.875rem] text-white group-hover:text-white transition-colors duration-300">
                {title}
              </h3>
              <p className="font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
});

GridItem.displayName = 'GridItem';