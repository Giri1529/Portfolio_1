import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VanillaTilt from "vanilla-tilt";
import { cvData } from "@/data";

import img1 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.47_(1)_1775143779260.jpeg";
import img2 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.47_(2)_1775143779261.jpeg";
import img3 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.46_(1)_1775143779258.jpeg";
import img4 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.45_1775143779258.jpeg";
import img5 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.44_1775143779256.jpeg";
import img6 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.47_1775143779261.jpeg";

gsap.registerPlugin(ScrollTrigger);

const talkImages = [img1, img2, img3, img4, img5, img6];

type Talk = (typeof cvData.talks)[number];

interface TalkModalProps {
  talk: Talk;
  image: string;
  index: number;
  total: number;
  onClose: () => void;
}

function TalkModal({ talk, image, index, total, onClose }: TalkModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-[#0d1b2a]/80 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="relative bg-[#f5f0e8] rounded-sm overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[rgba(184,150,62,0.3)]"
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-[#0d1b2a]/70 hover:bg-[#0d1b2a] text-white rounded-full backdrop-blur-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={image}
            alt={talk.title}
            className="w-full h-[280px] md:h-[360px] object-cover"
          />

          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-[#b8963e]" />
              <span className="text-xs font-medium text-[#b8963e] uppercase tracking-[0.2em]">
                Talk {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif italic text-[#0d1b2a] leading-snug mb-4">
              {talk.title.replace(/"/g, "")}
            </h3>

            <p className="text-base text-[#3d3d5c] leading-relaxed font-serif mb-6">
              {talk.audience}
            </p>

            {talk.link && (
              <a
                href={talk.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0d1b2a] text-white text-sm font-medium hover:bg-[#1a2f45] transition-colors rounded-sm group"
              >
                Watch on YouTube
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

interface TalkCardProps {
  talk: Talk;
  image: string;
  index: number;
  total: number;
  onOpen: () => void;
}

function TalkCard({ talk, image, index, total, onOpen }: TalkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || window.innerWidth < 768) return;
    VanillaTilt.init(cardRef.current, {
      max: 8,
      speed: 400,
      scale: 1.02,
      glare: true,
      "max-glare": 0.15,
    });
    return () => {
      if (cardRef.current && (cardRef.current as any).vanillaTilt) {
        (cardRef.current as any).vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onOpen}
      className="talk-card flex-shrink-0 w-[85vw] md:w-[420px] lg:w-[460px] cursor-pointer group"
    >
      <div className="bg-[#f5f0e8] border border-[rgba(184,150,62,0.25)] overflow-hidden rounded-sm border-l-[3px] border-l-[#b8963e] h-full flex flex-col transition-shadow duration-300 group-hover:shadow-[0_20px_60px_rgba(184,150,62,0.15)]">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={talk.title}
            className="w-full h-[240px] md:h-[280px] object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1.5 bg-[#f5f0e8]/90 backdrop-blur-sm text-[0.65rem] font-medium text-[#0d1b2a] tracking-wider uppercase">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <div className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center bg-[#b8963e]/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-px bg-[#b8963e]" />
            <span className="text-[0.6rem] font-medium text-[#7a7a9a] uppercase tracking-[0.2em]">
              Invited Talk
            </span>
          </div>

          <h3 className="text-lg font-serif italic text-[#0d1b2a] leading-snug mb-3 group-hover:text-[#b8963e] transition-colors duration-300">
            {talk.title.replace(/"/g, "")}
          </h3>

          <p className="text-xs text-[#7a7a9a] leading-relaxed font-serif flex-1">
            {talk.audience}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#b8963e] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span>View Details</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function InvitedTalks() {
  const talks = cvData.talks;
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [selectedTalk, setSelectedTalk] = useState<number | null>(null);

  const handleClose = useCallback(() => setSelectedTalk(null), []);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const title = titleRef.current;
    const heading = headingRef.current;
    if (!section || !wrapper || !title) return;

    const ctx = gsap.context(() => {
      if (heading) {
        const headingEls = heading.querySelectorAll(".staggered-reveal");
        gsap.fromTo(
          headingEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.5,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const totalWidth = wrapper.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth + 80;

      gsap.to(wrapper, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(title, {
        x: scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="invited-talks"
        className="scroll-mt-20 relative overflow-hidden"
      >
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-0">
          <div ref={headingRef} className="px-6 md:px-12 lg:px-20 mb-8 md:mb-12">
            <div ref={titleRef} className="will-change-transform">
              <div className="flex items-center gap-3 mb-3 staggered-reveal">
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#b8963e]">
                  Speaking
                </span>
                <div className="h-px w-10 bg-[#b8963e]" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-serif font-light text-[#0d1b2a] leading-[1.15] staggered-reveal">
                Invited <em className="italic text-[#b8963e]">Talks</em>
              </h2>
              <p className="mt-4 md:mt-6 text-sm md:text-base text-[#7a7a9a] font-serif max-w-2xl staggered-reveal">
                Sharing knowledge and inspiring the next generation of researchers through invited lectures at leading institutions across India.
              </p>
            </div>
          </div>

          <div
            ref={wrapperRef}
            className="flex gap-6 md:gap-8 px-6 md:px-12 lg:px-20 will-change-transform md:flex-nowrap flex-nowrap overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-hide pb-4 md:pb-0"
          >
            {talks.map((talk, i) => (
              <TalkCard
                key={i}
                talk={talk}
                image={talkImages[i % talkImages.length]}
                index={i}
                total={talks.length}
                onOpen={() => setSelectedTalk(i)}
              />
            ))}
          </div>

          <div className="hidden md:flex justify-center mt-8">
            <motion.span
              className="text-[0.6rem] text-[#7a7a9a]/40 uppercase tracking-[0.2em]"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ← Scroll to explore talks →
            </motion.span>
          </div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-6 md:px-8 pt-8 pb-16">
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

      <AnimatePresence>
        {selectedTalk !== null && (
          <TalkModal
            talk={talks[selectedTalk]}
            image={talkImages[selectedTalk % talkImages.length]}
            index={selectedTalk}
            total={talks.length}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
