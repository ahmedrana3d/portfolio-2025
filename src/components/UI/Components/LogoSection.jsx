import LogoLoop from '../../LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiThreedotjs } from 'react-icons/si';
import { FaDocker } from "react-icons/fa";

const techLogos = [
  { node: <SiReact className="text-white/90" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="text-white/90" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="text-white/90" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="text-white/90" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiThreedotjs  className="text-white/90" />, title: "Three.js", href: "https://threejs.org/" },
  { node: <FaDocker   className="text-white/90" />, title: "Docker", href: "https://www.docker.com/" },
  { node: <SiTailwindcss className="text-white/90" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

export default function LogoSection() {
  return (
    <div className="relative w-full py-8 md:py-12 overflow-hidden">
      {/* Marquee animation - continuous loop left to right */}
      <LogoLoop
        logos={techLogos}
        speed={-120}
        direction="left"
        logoHeight={48}
        gap={40}
        hoverSpeed={-40}
        scaleOnHover
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Technology partners"
        width="100%"
      />
    </div>
  );
}