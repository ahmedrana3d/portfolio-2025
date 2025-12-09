import { memo } from "react";
import Chapter1 from "./Chapter1";
import Chapter2 from "./Chapter2";
import Chapter3 from "./Chapter3";
import Chapter4 from "./Chapter4";
import Chapter5 from "./Chapter5";
import Chapter6 from "./Chapter6";

const Frontend = memo(({ scrollProgress = 0 }) => {
    return (
     <>
       <Chapter1 scrollProgress={scrollProgress} />
       
       <div className="w-full h-[150vh] transform-gpu"></div>
       
<div className="bg-black">

<div className="  bg-blend-saturation"
    style={{
      background: `
        linear-gradient(
          90deg, 
          transparent 0%,
          transparent 30%,
          rgba(138, 43, 226, 0.4) 50%,
          transparent 70%,
          transparent 100%
          ),
          linear-gradient(
            to bottom,
            #1a1a2e 0%,
            #2d1b69 50%,
            #0f0f23 100%
            )
            `,
            backgroundImage: `
            repeating-linear-gradient(
          90deg,
          transparent 0px,
          transparent 79px,
          rgba(255, 255, 255, 0.05) 80px,
          rgba(255, 255, 255, 0.05) 81px
        )
      `,
    }}
>


       <div className="sticky transform-gpu will-change-transform">
         <Chapter2 />
       </div>
       
       <Chapter3 />
       
       <Chapter4/>
       
       <Chapter5/>
       
       <Chapter6/> 
</div>
    </div>
     </>
    )
});

Frontend.displayName = 'Frontend';

export default Frontend;