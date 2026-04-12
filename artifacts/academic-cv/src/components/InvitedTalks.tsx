import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
          <div className={`img-zoom relative ${isEven ? "md:order-1" : "md:order-2"}`}>
            <img src={image} alt={talk.title} className="w-full h-full object-cover min-h-[280px] md:min-h-full" />
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
                <span className="text-xs font-medium text-[#7a7a9a] uppercase tracking-[0.2em]">Invited Talk</span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif italic text-[#0d1b2a] leading-snug">
                {talk.title.replace(/"/g, "")}
              </h3>
              <p className="text-sm md:text-base text-[#7a7a9a] leading-relaxed font-serif">{talk.audience}</p>
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

function MobileStickyRail() {
  const talks = cvData.talks;
  const cardCount = talks.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [direction, setDirection] = useState(1);
  const isTransitioning = useRef(false);
  const touchStartY = useRef(0);
  const accumulatedDelta = useRef(0);

  const SCROLL_THRESHOLD = 60;
  const TRANSITION_COOLDOWN = 600;

  const goToCard = useCallback((next: number, dir: number) => {
    if (isTransitioning.current) return;
    if (next < 0 || next >= cardCount) return;
    isTransitioning.current = true;
    setDirection(dir);
    setActiveIndex(next);
    accumulatedDelta.current = 0;
    setTimeout(() => {
      isTransitioning.current = false;
    }, TRANSITION_COOLDOWN);
  }, [cardCount]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.innerWidth >= 768) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const bounds = entry.boundingClientRect;
        const isFullyVisible = ratio > 0.85;
        const isAtTop = bounds.top <= 10;

        if (isFullyVisible && isAtTop) {
          setIsLocked(true);
        }
      },
      { threshold: [0, 0.5, 0.85, 1] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isLocked || window.innerWidth >= 768) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY;
      
      if (activeIndex === 0 && delta < 0) {
        setIsLocked(false);
        return;
      }
      if (activeIndex === cardCount - 1 && delta > 0) {
        setIsLocked(false);
        return;
      }

      e.preventDefault();
      accumulatedDelta.current += delta;

      if (accumulatedDelta.current > SCROLL_THRESHOLD) {
        goToCard(activeIndex + 1, 1);
      } else if (accumulatedDelta.current < -SCROLL_THRESHOLD) {
        goToCard(activeIndex - 1, -1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      accumulatedDelta.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const delta = touchStartY.current - e.touches[0].clientY;

      if (activeIndex === 0 && delta < 0) {
        setIsLocked(false);
        return;
      }
      if (activeIndex === cardCount - 1 && delta > 0) {
        setIsLocked(false);
        return;
      }

      e.preventDefault();
      accumulatedDelta.current = delta;
    };

    const handleTouchEnd = () => {
      if (accumulatedDelta.current > SCROLL_THRESHOLD) {
        goToCard(activeIndex + 1, 1);
      } else if (accumulatedDelta.current < -SCROLL_THRESHOLD) {
        goToCard(activeIndex - 1, -1);
      }
      accumulatedDelta.current = 0;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isLocked, activeIndex, cardCount, goToCard]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "40%" : "-40%",
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-40%" : "40%",
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div ref={sectionRef} className="md:hidden">
      <div className="min-h-[85vh] flex flex-col justify-center px-4 py-6">
        <div className="flex items-center justify-center gap-2 mb-5">
          {talks.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-8 h-2 bg-[#b8963e]"
                  : i < activeIndex
                    ? "w-2 h-2 bg-[#b8963e]/50"
                    : "w-2 h-2 bg-[#b8963e]/20"
              }`}
            />
          ))}
        </div>

        <div className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.45,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="w-full"
            >
              <div className="bg-[#f5f0e8] border border-[rgba(184,150,62,0.25)] overflow-hidden rounded-sm border-l-[3px] border-l-[#b8963e]">
                <div className="relative">
                  <img
                    src={talkImages[activeIndex % talkImages.length]}
                    alt={talks[activeIndex].title}
                    className="w-full h-[220px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 bg-[#f5f0e8]/90 backdrop-blur-sm text-[0.65rem] font-medium text-[#0d1b2a] tracking-wider uppercase">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(cardCount).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-px bg-[#b8963e]" />
                    <span className="text-[0.6rem] font-medium text-[#7a7a9a] uppercase tracking-[0.2em]">
                      Invited Talk
                    </span>
                  </div>

                  <h3 className="text-lg font-serif italic text-[#0d1b2a] leading-snug mb-3">
                    {talks[activeIndex].title.replace(/"/g, "")}
                  </h3>

                  <p className="text-xs text-[#7a7a9a] leading-relaxed font-serif mb-4">
                    {talks[activeIndex].audience}
                  </p>

                  {talks[activeIndex].link && (
                    <a
                      href={talks[activeIndex].link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(184,150,62,0.4)] text-xs font-medium text-[#0d1b2a] transition-all duration-300 rounded-sm"
                    >
                      Watch
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-4">
          <motion.span
            className="text-[0.6rem] text-[#7a7a9a]/50 uppercase tracking-[0.15em]"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {activeIndex < cardCount - 1
              ? "↓ Scroll for next talk"
              : "↓ Scroll to continue"}
          </motion.span>
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
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#b8963e]">Speaking</span>
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
