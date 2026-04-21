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
    <div ref={cardRef} className="py-10">
      <motion.div
        className="group relative overflow-hidden bg-[#f5f0e8] border border-[rgba(184,150,62,0.2)] transition-all duration-700"
        style={{ opacity, y }}
        data-cursor="link"
      >
        {/* Picture-mat frame that fades in on hover */}
        <span
          aria-hidden
          className="absolute -inset-[6px] border border-[#b8963e] opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
        />

        <div className="grid md:grid-cols-2 min-h-[400px]">
          <div className={`img-zoom relative overflow-hidden ${isEven ? "md:order-1" : "md:order-2"}`}>
            <img src={image} alt={talk.title} className="w-full h-full object-cover min-h-[300px] md:min-h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="smallcaps text-[0.58rem] text-white/80 tabular">
                Talk {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>
          <div className={`flex flex-col justify-center p-10 md:p-14 ${isEven ? "md:order-2" : "md:order-1"}`}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="rule-gold-short" />
                <span className="smallcaps text-[0.65rem] text-[#b8963e]">Invited Talk</span>
              </div>
              <h3 className="font-serif font-light italic text-[1.5rem] md:text-[1.9rem] text-[#0d1b2a] leading-[1.2] tracking-[-0.005em]">
                {talk.title.replace(/"/g, "")}
              </h3>
              <p className="body-luxe font-serif font-light text-[1rem] text-[#3d3d5c] max-w-lg">
                {talk.audience}
              </p>
              {talk.link && (
                <a
                  href={talk.link}
                  target="_blank"
                  rel="noreferrer"
                  className="link-draw smallcaps text-[0.7rem] text-[#b8963e] inline-flex items-center gap-2"
                  data-cursor="link"
                  data-testid={`talk-link-${index}`}
                >
                  Watch on YouTube
                  <ExternalLink className="w-3 h-3" />
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
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-[#0d1b2a]/75"
          style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="relative bg-[#f5f0e8] overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[rgba(184,150,62,0.3)]"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-[#0d1b2a]/80 hover:bg-[#0d1b2a] text-white rounded-full transition-colors"
            aria-label="Close"
            data-cursor="link"
          >
            <X className="w-4 h-4" />
          </button>
          <img src={image} alt={talk.title} className="w-full h-[240px] object-cover" />
          <div className="p-7 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="rule-gold-short" />
              <span className="smallcaps text-[0.64rem] text-[#b8963e]">
                Talk {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
              </span>
            </div>
            <h3 className="font-serif font-light italic text-[1.45rem] text-[#0d1b2a] leading-[1.25] mb-4">
              {talk.title.replace(/"/g, "")}
            </h3>
            <p className="body-luxe font-serif font-light text-[0.95rem] text-[#3d3d5c] mb-6">
              {talk.audience}
            </p>
            {talk.link && (
              <a
                href={talk.link}
                target="_blank"
                rel="noreferrer"
                className="link-draw smallcaps text-[0.7rem] text-[#b8963e] inline-flex items-center gap-2"
                data-cursor="link"
              >
                Watch on YouTube
                <ExternalLink className="w-3 h-3" />
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
                className="flex-shrink-0 w-[82vw] max-w-[360px] cursor-pointer group"
                data-cursor="link"
              >
                <div className="relative bg-[#f5f0e8] border border-[rgba(184,150,62,0.22)] overflow-hidden h-full flex flex-col transition-shadow duration-500 group-active:shadow-[0_12px_40px_rgba(184,150,62,0.2)]">
                  <div className="relative overflow-hidden">
                    <img
                      src={talkImages[i % talkImages.length]}
                      alt={talk.title}
                      className="w-full h-[220px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="smallcaps text-[0.58rem] text-white/90 tabular">
                        {String(i + 1).padStart(2, "0")} / {String(talks.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="rule-gold-short" style={{ width: "24px" }} />
                      <span className="smallcaps text-[0.56rem] text-[#b8963e]">Invited Talk</span>
                    </div>
                    <h3 className="font-serif font-light italic text-[1.1rem] text-[#0d1b2a] leading-[1.25] mb-3 tracking-[-0.005em]">
                      {talk.title.replace(/"/g, "")}
                    </h3>
                    <p className="body-luxe font-serif font-light text-[0.82rem] text-[#7a7a9a] flex-1 line-clamp-3">
                      {talk.audience}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 smallcaps text-[0.58rem] text-[#b8963e]">
                      <span>Tap for details</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <motion.span
              className="smallcaps text-[0.52rem] text-[#7a7a9a]/50 tabular"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              — scroll to browse —
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
        className="section-pad pb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1280px] mx-auto px-8 md:px-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="rule-gold-short" />
            <span className="smallcaps text-[0.68rem] text-[#b8963e]">Speaking</span>
          </div>
          <h2 className="display-section text-[#0d1b2a]">
            Invited <em className="italic text-[#b8963e]">Talks</em>
          </h2>
          <p className="mt-8 body-luxe font-serif font-light text-[1.1rem] text-[#3d3d5c] max-w-2xl">
            Sharing knowledge and inspiring the next generation of researchers through invited lectures
            at leading institutions across India.
          </p>
        </div>
      </motion.div>

      <MobileHorizontalScroll />

      <div className="hidden md:block max-w-[1280px] mx-auto px-8 md:px-12">
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

      <div className="max-w-[1280px] mx-auto px-8 md:px-12 pt-4 pb-24">
        <motion.div
          className="flex items-center gap-6 py-10 px-10 border-t border-b border-[rgba(184,150,62,0.2)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={img6}
            alt="With students"
            className="w-14 h-14 md:w-16 md:h-16 object-cover shrink-0 rounded-full"
          />
          <p className="font-serif italic font-light text-[1.05rem] md:text-[1.2rem] text-[#3d3d5c] leading-[1.5]">
            &ldquo;Knowledge grows when shared. Every talk is an opportunity to plant seeds of curiosity
            in young minds.&rdquo;
          </p>
          <span className="smallcaps text-[0.62rem] text-[#7a7a9a] shrink-0 hidden sm:block">— N.L. Swathi</span>
        </motion.div>
      </div>
    </section>
  );
}
