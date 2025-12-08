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
       <div className="w-full h-[150vh] transform-gpu">
         <Chapter1 scrollProgress={scrollProgress} />
       </div>
       
       <div className="sticky transform-gpu will-change-transform">
         <Chapter2 />
       </div>
       
       <Chapter3 />
       
       <Chapter4/>
       
       <Chapter5/>
       
       <Chapter6/> 
     </>
    )
});

Frontend.displayName = 'Frontend';

export default Frontend;