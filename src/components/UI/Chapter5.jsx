import React, { memo } from "react";
import { Eye, XCircle, Smartphone, Award, ShoppingCart } from "lucide-react";
import { GlowingEffect } from "./Components/glowing-effect";
import Testimonials from "./Components/Testimonials";
import { AnimatedText, Title } from "./AnimatedComponents";

const Chapter5 = memo(() => {
  return (
    <>

<div 
  className="bg-black w-full flex items-center justify-center flex-col py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 transform-gpu will-change-contents"
  style={{ contain: 'layout style paint' }}
>
  <AnimatedText className="mb-12 md:mb-16 lg:mb-20">
    <Title>
      Why Your Website Can't Be Average
    </Title>
  </AnimatedText>

  <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[34rem] xl:grid-rows-2 w-full max-w-7xl">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5] "
        icon={<Eye className="h-4 w-4 text-neutral-400" />}
        title=" 94% First Impressions"
        description="94% of first impressions come from website design. People decide in seconds whether your brand looks trustworthy and professional."
      />
      
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<XCircle className="h-4 w-4 text-neutral-400" />}
        title=" 88% Don't Return"
        description="88% of users won't come back after a bad experience. Bad UX, slow loading, or confusing layout = lost customers."
      />
      
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Smartphone className="h-4 w-4 text-neutral-400" />}
        title=" 67% More Sales on Mobile"
        description="Mobile-friendly websites generate up to 67% more sales. Most users browse on phones — a responsive site directly boosts conversions."
      />
      
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Award className="h-4 w-4 text-neutral-400" />}
        title=" 75% Judge Credibility"
        description="75% of users judge a business's credibility by its website. A modern site instantly strengthens trust and brand reputation."
      />
      
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<ShoppingCart className="h-4 w-4 text-neutral-400" />}
        title=" 89% of customers switch to a competitor after poor UX."
        description="Better design and usability directly impact whether people stay or leave."
      />
    </ul>
</div>

<Testimonials/>

    
    </>
  );
});

Chapter5.displayName = 'Chapter5';

export default Chapter5;



const GridItem = React.memo(({ area, icon, title, description }) => {
    return (
      <li className={`min-h-[14rem] list-none overflow-hidden rounded-3xl transform-gpu [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)] ${area}`}>
        <div className="relative h-full rounded-2xl border border-amber-50 p-2 md:rounded-3xl md:p-3">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
            <div className="relative flex flex-1 flex-col justify-between gap-3">
              <div className="w-fit rounded-lg border border-gray-600 p-2">
                {icon}
              </div>
              <div className="space-y-3">
                <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance  md:text-2xl/[1.875rem] text-white">
                  {title}
                </h3>
                <h2 className="font-sans text-sm/[1.125rem]  md:text-base/[1.375rem] text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                  {description}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  });