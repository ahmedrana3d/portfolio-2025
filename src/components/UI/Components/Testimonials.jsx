import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Marquee } from '../Components/marquee';
import { AnimatedText, Title } from '../AnimatedComponents';

export function Highlight({
  children,
  className,
}) {
  return (
    <span
      className={cn(
        'bg-blue-500/10 p-1 py-0.5 font-bold text-blue-500',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TestimonialCard({
  description,
  name,
  role,
  className,
  ...props
}) {
  return (
    <motion.div
      className={cn(
        'mb-4 flex w-full cursor-pointer flex-col items-start justify-between gap-6 rounded-xl p-6',
        // dark theme styles
        '[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)]',
        // hover effect
        'transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/20',
        className,
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      <div className="text-white/90 text-sm font-normal select-none leading-relaxed">
        {description}
        <div className="flex flex-row gap-1 py-2 mt-2">
          <Star className="size-4 fill-blue-400 text-blue-400" />
          <Star className="size-4 fill-blue-400 text-blue-400" />
          <Star className="size-4 fill-blue-400 text-blue-400" />
          <Star className="size-4 fill-blue-400 text-blue-400" />
          <Star className="size-4 fill-blue-400 text-blue-400" />
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-5 select-none pt-2 border-t border-white/10">
        <div>
          <p className="text-white font-semibold text-base">{name}</p>
          <p className="text-white/60 text-xs font-normal mt-1">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

const testimonials = [
  {
    name: 'Eddie AU',
    role: 'General Manager at LT Game Ltd | Macau',
    description: (
      <p>
        Ahmed showcased his full professionalism and perfectionism, and keep improving on the project, and the end result shows how much heart and effort he poured into it. Definitely recommend his service and would come back for more!
      </p>
    ),
  },
  {
    name: 'Giulio',
    role: 'Italy',
    description: (
      <p>
        Great experience. He carried out the required work with speed and competence. Absolutely recommended!
      </p>
    ),
  },
  {
    name: 'Richard Angel',
    role: 'Canada',
    description: (
      <p>
        Ahmad is very good at communicating and bringing any ideas you have in your head into virtual existence. With is unique skill set he is able to achieve various advanced features along with superb delivery times. I plan on working more with Ahmad in the future and you should too.
      </p>
    ),
  },
  {
    name: 'Sentini',
    role: 'CEO at Afro VR | Netherlands',
    description: (
      <p>
        It was an amazing experience he was very patient and thorough. Great work will definitely come back again!
      </p>
    ),
  },
  {
    name: 'Lozza',
    role: 'Thailand',
    description: (
      <p>
        His willingness to engage in discussions about improving the user experience and quality was greatly appreciated, showcasing a client-focused approach. Communication was prompt, and he was patient with my many questions along the way. Highly recommended!
      </p>
    ),
  },
  {
    name: 'Marco',
    role: 'Founder of XR3D Services | Germany',
    description: (
      <p>
        Fantastic, as always, Ahmed communicates really well and is not afraid to push the boundaries with research
      </p>
    ),
  },
];

export default function Testimonials() {
  return (
    <section className="relative w-full  py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 -left-20 z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
      <div className="absolute -right-20 bottom-20 z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16 lg:mb-20"
        >
    <AnimatedText className="mb-12 md:mb-16 lg:mb-20 font-sf-pro-display">
        <Title>
          What Clients Are Saying
        </Title>
      </AnimatedText>
          <motion.h3 
            className="text-white/70 mx-auto mb-12 md:mb-16 max-w-2xl text-center text-lg font-medium tracking-tight text-balance md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Don&apos;t just take my word for it. Here&apos;s what{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-blue-500 bg-clip-text text-transparent font-semibold">
              real clients
            </span>{' '}
            are saying about working together
          </motion.h3>
        </motion.div>

        <div className="relative mt-8 md:mt-12 max-h-[800px] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Marquee
                  vertical
                  key={i}
                  className={cn({
                    '[--duration:60s]': i === 0,
                    '[--duration:40s]': i === 1,
                    '[--duration:50s]': i === 2,
                  })}
                >
                  {testimonials
                    .filter((_, idx) => idx % 3 === i)
                    .map((card, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: Math.random() * 0.8,
                          duration: 1.2,
                        }}
                      >
                        <TestimonialCard {...card} />
                      </motion.div>
                    ))}
                </Marquee>
              ))}
          </div>
          {/* Gradient overlays for fade effect */}
          <div className="from-black pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-10% to-transparent"></div>
          <div className="from-black pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-10% to-transparent"></div>
        </div>
      </div>
    </section>
  );
}