import React, { memo } from "react";
import { Timeline } from "./timeline/timeline";
import { NoiseBackground } from "./Buttons/noise-background";

const Chapter4 = memo(() => {
  const data = [
      {
        title: "Frontend Engineer",
        content: (
            <div>
            <p className="mb-2 text-xs font-semibold md:text-sm text-neutral-300">
              Upwork, Fiverr | 01/07/2022 - 01/04/2023 | Faisalabad, Pakistan
            </p>
            <div className="mb-8 space-y-2">
              <p className="text-xs font-normal md:text-sm text-neutral-200">
                Designed and developed responsive websites with integrated 3D elements, AR, VR, and interactive experiences.
              </p>
              <p className="text-xs font-normal md:text-sm text-neutral-200">
                Delivered custom digital solutions according to client requirements across various industries.
              </p>
              <p className="text-xs font-normal md:text-sm text-neutral-200">
                Used JavaScript, React, Three.js, WebGL, and AR/VR toolkits to build immersive user interfaces.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="./images/showcase/1.webp"
                alt="Frontend project"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
              <img
                src="./images/showcase/4.webp"
                alt="Frontend project"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            </div>
          </div>
        ),
      },
      {
        title: "3D Developer",
        content: (
          <div>
            <p className="mb-2 text-xs font-semibold md:text-sm text-neutral-300">
              DroppLabs | 01/05/2023 - 01/01/2024 | Faisalabad, Pakistan
            </p>
            <div className="mb-8 space-y-2">
              <p className="text-xs font-normal md:text-sm text-neutral-200">
                Developed advanced 3D web applications, AR/VR components, and immersive visualizations.
              </p>
              <p className="text-xs font-normal md:text-sm text-neutral-200">
                Created multiplayer virtual galleries and collaborative 3D experiences.
              </p>
              <p className="text-xs font-normal md:text-sm text-neutral-200">
                Worked with cross-functional teams to integrate 3D graphics using WebXR APIs and real-time networking.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="./images/showcase/10.webp"
                alt="3D project"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
              <img
                src="./images/showcase/8.webp"
                alt="3D project"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            </div>
          </div>
        ),
      },
      {
        title: "WebXR Developer",
        content: (
          <div>
            <p className="mb-2 text-xs font-semibold md:text-sm text-neutral-300">
              Ivo Web Design | 25/01/2024 - 02/03/2024 | Faisalabad, Pakistan
            </p>
            <div className="mb-8 space-y-2">
              <p className="text-xs font-normal md:text-sm text-neutral-200">
                Built WebVR environments and multiplayer XR experiences for marketing and entertainment use.
              </p>
              <p className="text-xs font-normal md:text-sm text-neutral-200">
                Ensured smooth, stable, and responsive VR performance across devices and browsers.
              </p>
              <p className="text-xs font-normal md:text-sm text-neutral-200">
                Worked with A-Frame, WebXR Device API, and real-time communication protocols.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="./images/showcase/3.webp"
                alt="WebXR project"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
              <img
                src="./images/showcase/9.webp"
                alt="WebXR project"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            </div>
          </div>
        ),
      },
      {
        title: "Creative Developer",
        content: (
          <div>
            <p className="mb-2 text-xs font-semibold md:text-sm text-neutral-300">
              DialedWeb | 01/05/2024 - 15/09/2024 | United States
            </p>
            <div className="mb-8 space-y-2">
              <p className="text-xs font-normal md:text-sm text-neutral-200">
                Developed modern websites using React and UI component libraries.
              </p>
              <p className="text-xs font-normal md:text-sm text-neutral-200">
                Built and optimized a 3D product configurator with efficient rendering and smooth animations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="./images/showcase/2.webp"
                alt="Creative project"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
              <img
                src="./images/showcase/5.webp"
                alt="Creative project"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            </div>
          </div>
        ),
      },
    {
        title: "Frontend + WebXR Developer",
        content: (
        <div>
          <p className="mb-2 text-xs font-semibold md:text-sm text-neutral-300">
            LT Game Limited + Freelancing | 10/04/2024 - Current | Faisalabad, Pakistan
          </p>
          <div className="mb-8 space-y-2">
            <p className="text-xs font-normal md:text-sm text-neutral-200">
              Leading the frontend and XR development of interactive and immersive WebXR projects.
            </p>
            <p className="text-xs font-normal md:text-sm text-neutral-200">
              Integrated AR/VR features to improve user engagement and digital storytelling.
            </p>
            <p className="text-xs font-normal md:text-sm text-neutral-200">
              Applied best practices in responsive design, UX, and 3D performance optimization.
            </p>
            <p className="text-xs font-normal md:text-sm text-neutral-200">
              Continuously updated skills with new WebXR frameworks, standards, and tools.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="./images/showcase/6.webp"
              alt="WebXR project"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="./images/showcase/7.webp"
              alt="WebXR project"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
          </div>
          <div className="flex md:absolute md:left-[-40%] md:bottom-[-18%] justify-center mt-8">
            <NoiseBackground
              containerClassName="w-fit p-2 rounded-full mx-auto"
              gradientColors={[
                "rgb(255, 100, 150)",
                "rgb(100, 150, 255)",
                "rgb(255, 200, 100)",
              ]}>
              <button
                className="h-full w-full cursor-pointer rounded-full bg-linear-to-r   px-4 py-2 shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 from-black via-black to-neutral-900 text-white shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)">
                Download Resume &rarr;
              </button>
            </NoiseBackground>
          </div>

    
 


        </div>
      ),
    },
  ];
  return (
    <div 
      className="relative w-full overflow-clip  transform-gpu will-change-contents"
      style={{ contain: 'layout style paint' }}
    >
      <Timeline data={data} />
    </div>
  );
});

Chapter4.displayName = 'Chapter4';

export default Chapter4;
