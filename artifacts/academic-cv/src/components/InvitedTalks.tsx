import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cvData } from "@/data";

import img1 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.47_(1)_1775143779260.jpeg";
import img2 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.47_(2)_1775143779261.jpeg";
import img3 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.46_(1)_1775143779258.jpeg";
import img4 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.45_1775143779258.jpeg";
import img5 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.44_1775143779256.jpeg";
import img6 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.47_1775143779261.jpeg";

const talkImages = [img1, img2, img3, img4, img5, img6];

interface TalkCardProps {
  talk: (typeof cvData.talks)[number];
  image: string;
  index: number;
  total: number;
}

function DesktopTalkCard({ talk, image, index, total }: TalkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 0.2"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [80, 0]);
  const isEven = index % 2 === 0;

  return (
    <div ref={cardRef} className="py-6">
      <motion.div
        className="hover-lift bg-[#f5f0e8] border border-[rgba(184,150,62,0.25)] overflow-hidden rounded-sm border-l-[3px] border-l-[#b8963e]"
        style={{ opacity, y }}
      >
        <div className="grid md:grid-cols-2 min-h-[380px]">
          <div
            className={`img-zoom relative ${isEven ? "md:order-1" : "md:order-2"}`}
          >
            <img
              src={image}
              alt={talk.title}
              className="w-full h-full object-cover min-h-[280px] md:min-h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
            <div className="absolute top-5 left-5">
              <span className="inline-block px-3 py-1.5 bg-[#f5f0e8]/90 backdrop-blur-sm text-xs font-medium text-[#0d1b2a] tracking-wider uppercase">
                Talk {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className={`flex flex-col justify-center p-8 md:p-12 ${isEven ? "md:order-2" : "md:order-1"}`}>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#b8963e]" />
                <span className="text-xs font-medium text-[#7a7a9a] uppercase tracking-[0.2em]">
                  Invited Talk
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-serif italic text-[#0d1b2a] leading-snug">
                {talk.title.replace(/"/g, "")}
              </h3>

              <p className="text-sm md:text-base text-[#7a7a9a] leading-relaxed font-serif">
                {talk.audience}
              </p>

              {talk.link && (
                <a
                  href={talk.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 border border-[rgba(184,150,62,0.4)] text-sm font-medium text-[#0d1b2a] hover:bg-[#0d1b2a] hover:text-white transition-all duration-300 group rounded-sm"
                  data-testid={`talk-link-${index}`}
                >
                  Watch on YouTube
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MobileCardContent({ talk, image, index, total }: TalkCardProps) {
  return (
    <div className="bg-[#f5f0e8] border border-[rgba(184,150,62,0.25)] overflow-hidden rounded-sm border-l-[3px] border-l-[#b8963e] h-full flex flex-col mx-4">
      <div className="relative">
        <img
          src={image}
          alt={talk.title}
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-block px-2.5 py-1 bg-[#f5f0e8]/90 backdrop-blur-sm text-[0.65rem] font-medium text-[#0d1b2a] tracking-wider uppercase">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-px bg-[#b8963e]" />
          <span className="text-[0.6rem] font-medium text-[#7a7a9a] uppercase tracking-[0.2em]">
            Invited Talk
          </span>
        </div>

        <h3 className="text-base font-serif italic text-[#0d1b2a] leading-snug mb-3 line-clamp-3">
          {talk.title.replace(/"/g, "")}
        </h3>

        <p className="text-xs text-[#7a7a9a] leading-relaxed font-serif mb-4 line-clamp-2 flex-1">
          {talk.audience}
        </p>

        {talk.link && (
          <a
            href={talk.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(184,150,62,0.4)] text-xs font-medium text-[#0d1b2a] transition-all duration-300 rounded-sm self-start"
          >
            Watch
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

function MobileStickyRail() {
  const talks = cvData.talks;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardCount = talks.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!isMobile) return;
    const idx = Math.min(Math.floor(v * cardCount), cardCount - 1);
    setActiveIndex(Math.max(0, idx));
  });

  if (!isMobile) return null;

  const scrollHeight = `${cardCount * 100}vh`;

  return (
    <div ref={containerRef} className="md:hidden relative" style={{ height: scrollHeight }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="flex items-center justify-center gap-2 mb-4 px-6">
          {talks.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === activeIndex
                  ? "w-7 bg-[#b8963e]"
                  : i < activeIndex
                    ? "w-2 bg-[#b8963e]/50"
                    : "w-2 bg-[#b8963e]/20"
              }`}
            />
          ))}
          <span className="ml-3 text-[0.6rem] text-[#7a7a9a] uppercase tracking-widest">
            {activeIndex + 1} / {cardCount}
          </span>
        </div>

        <div className="relative flex-1 flex items-center max-h-[75vh]">
          {talks.map((talk, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 flex items-center"
              initial={false}
              animate={{
                opacity: i === activeIndex ? 1 : 0,
                x: i === activeIndex ? 0 : i > activeIndex ? 60 : -60,
                scale: i === activeIndex ? 1 : 0.92,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ pointerEvents: i === activeIndex ? "auto" : "none" }}
            >
              <div className="w-full max-h-full">
                <MobileCardContent
                  talk={talk}
                  image={talkImages[i % talkImages.length]}
                  index={i}
                  total={cardCount}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-3 pb-2">
          <span className="text-[0.55rem] text-[#7a7a9a]/60 uppercase tracking-[0.2em]">
            ↕ Scroll to browse talks
          </span>
        </div>
      </div>
    </div>
  );
}

export function InvitedTalks() {
  const talks = cvData.talks;

  return (
    <section id="invited-talks" className="scroll-mt-20">
      <motion.div
        className="pt-16 md:pt-24 mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-[1100px] mx-auto px-6 md:px-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#b8963e]">
              Speaking
            </span>
            <div className="h-px w-10 bg-[#b8963e]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-serif font-light text-[#0d1b2a] leading-[1.15]">
            Invited <em className="italic text-[#b8963e]">Talks</em>
          </h2>
          <p className="mt-6 text-base text-[#7a7a9a] font-serif max-w-2xl">
            Sharing knowledge and inspiring the next generation of researchers through invited lectures at leading institutions across India.
          </p>
        </div>
      </motion.div>

      <MobileStickyRail />

      <div className="hidden md:block max-w-[1100px] mx-auto px-8">
        {talks.map((talk, i) => (
          <DesktopTalkCard
            key={i}
            talk={talk}
            image={talkImages[i % talkImages.length]}
            index={i}
            total={talks.length}
          />
        ))}
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-8 pt-4 pb-16">
        <motion.div
          className="hover-glow flex items-center gap-4 p-5 md:p-6 border border-[rgba(184,150,62,0.25)] bg-white/50 cursor-default rounded-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={img6}
            alt="With students"
            className="w-12 h-12 md:w-14 md:h-14 object-cover shrink-0"
            style={{ borderRadius: "50%" }}
          />
          <p className="text-sm font-serif italic text-[#3d3d5c] leading-relaxed">
            "Knowledge grows when shared. Every talk is an opportunity to plant seeds of curiosity in young minds."
          </p>
          <span className="text-xs text-[#7a7a9a] shrink-0 hidden sm:block">— N.L. Swathi</span>
        </motion.div>
      </div>
    </section>
  );
}
