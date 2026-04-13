import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cvData } from "@/data";

import img1 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.47_(1)_1775143779260.jpeg";
import img2 from "@assets/image_1776047137864.png";
import img3 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.46_(1)_1775143779258.jpeg";
import img4 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.45_1775143779258.jpeg";
import img5 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.44_1775143779256.jpeg";
import img6 from "@assets/WhatsApp_Image_2026-04-01_at_20.02.47_1775143779261.jpeg";

gsap.registerPlugin(ScrollTrigger);

const talkImages = [img1, img2, img3, img4, img5, img6];

type Talk = (typeof cvData.talks)[number];

interface TalkCardProps {
  talk: Talk;
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
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
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
          className="relative bg-[#f5f0e8] rounded-sm overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[rgba(184,150,62,0.3)]"
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-[#0d1b2a]/70 hover:bg-[#0d1b2a] text-white rounded-full backdrop-blur-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <img src={image} alt={talk.title} className="w-full h-[220px] object-cover" />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-[#b8963e]" />
              <span className="text-xs font-medium text-[#b8963e] uppercase tracking-[0.2em]">
                Talk {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-xl font-serif italic text-[#0d1b2a] leading-snug mb-3">
              {talk.title.replace(/"/g, "")}
            </h3>
            <p className="text-sm text-[#3d3d5c] leading-relaxed font-serif mb-5">{talk.audience}</p>
            {talk.link && (
              <a
                href={talk.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d1b2a] text-white text-sm font-medium hover:bg-[#1a2f45] transition-colors rounded-sm group"
              >
                Watch on YouTube
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

function MobileHorizontalScroll() {
  const talks = cvData.talks;
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedTalk, setSelectedTalk] = useState<number | null>(null);
  const handleClose = useCallback(() => setSelectedTalk(null), []);

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    const ctx = gsap.context(() => {
      const totalWidth = wrapper.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth + 32;

      gsap.to(wrapper, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
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
      <div ref={sectionRef} className="md:hidden overflow-hidden">
        <div className="h-screen flex flex-col justify-center">
          <div
            ref={wrapperRef}
            className="flex gap-5 px-5 will-change-transform"
          >
            {talks.map((talk, i) => (
              <div
                key={i}
                onClick={() => setSelectedTalk(i)}
                className="flex-shrink-0 w-[80vw] max-w-[340px] cursor-pointer group"
              >
                <div className="bg-[#f5f0e8] border border-[rgba(184,150,62,0.25)] overflow-hidden rounded-sm border-l-[3px] border-l-[#b8963e] h-full flex flex-col transition-shadow duration-300 group-active:shadow-[0_10px_40px_rgba(184,150,62,0.15)]">
                  <div className="relative overflow-hidden">
                    <img
                      src={talkImages[i % talkImages.length]}
                      alt={talk.title}
                      className="w-full h-[200px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-2.5 py-1 bg-[#f5f0e8]/90 backdrop-blur-sm text-[0.6rem] font-medium text-[#0d1b2a] tracking-wider uppercase">
                        {String(i + 1).padStart(2, "0")} / {String(talks.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-px bg-[#b8963e]" />
                      <span className="text-[0.55rem] font-medium text-[#7a7a9a] uppercase tracking-[0.2em]">
                        Invited Talk
                      </span>
                    </div>
                    <h3 className="text-base font-serif italic text-[#0d1b2a] leading-snug mb-2">
                      {talk.title.replace(/"/g, "")}
                    </h3>
                    <p className="text-[0.7rem] text-[#7a7a9a] leading-relaxed font-serif flex-1 line-clamp-2">
                      {talk.audience}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-[0.65rem] font-medium text-[#b8963e]">
                      <span>Tap for details</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-5">
            <motion.span
              className="text-[0.55rem] text-[#7a7a9a]/40 uppercase tracking-[0.15em]"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ↓ Scroll to browse talks ↓
            </motion.span>
          </div>
        </div>
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

      <MobileHorizontalScroll />

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
