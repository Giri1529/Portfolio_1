import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

function TalkCard({ talk, image, index, total }: TalkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.92]);
  const imageY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className="h-[85vh] sticky flex items-center"
      style={{ top: `${72 + index * 20}px`, zIndex: index + 1 }}
    >
      <motion.div
        className="w-full bg-background border border-primary/10 overflow-hidden shadow-[0_4px_40px_-12px_rgba(0,0,0,0.08)]"
        style={{ scale }}
      >
        <div className="grid md:grid-cols-2">
          <motion.div
            className={`relative aspect-[4/3] md:aspect-auto overflow-hidden ${isEven ? "md:order-1" : "md:order-2"}`}
            style={{ y: imageY }}
          >
            <img
              src={image}
              alt={talk.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="inline-block px-3 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium text-primary tracking-wider uppercase">
                Talk {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>

          <div className={`flex flex-col justify-center p-8 md:p-12 lg:p-16 ${isEven ? "md:order-2" : "md:order-1"}`}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-primary/30" />
                <span className="text-xs font-medium text-primary/40 uppercase tracking-[0.2em]">
                  Invited Talk
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif italic text-primary leading-snug">
                {talk.title.replace(/"/g, "")}
              </h3>

              <p className="text-base text-primary/60 leading-relaxed font-serif">
                {talk.audience}
              </p>

              {talk.link && (
                <a
                  href={talk.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary/20 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-all group"
                  data-testid={`talk-link-${index}`}
                >
                  Watch on YouTube
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>

            <div className="mt-auto pt-10">
              <div className="flex items-center gap-2 text-xs text-primary/30">
                {Array.from({ length: total }, (_, j) => (
                  <div
                    key={j}
                    className={`h-1 rounded-full transition-all ${
                      j === index ? "w-6 bg-primary/50" : "w-1 bg-primary/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function InvitedTalks() {
  const talks = cvData.talks;

  return (
    <section id="invited-talks" className="scroll-mt-20">
      <motion.div
        className="pt-16 md:pt-24 mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-serif italic text-primary mb-4">
            Invited Talks
          </h2>
          <div className="w-full h-px bg-primary/20" />
          <p className="mt-6 text-base text-primary/50 font-serif max-w-2xl">
            Sharing knowledge and inspiring the next generation of researchers through invited lectures at leading institutions across India.
          </p>
        </div>
      </motion.div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="relative" style={{ marginBottom: `${talks.length * 20}px`, position: "relative" }}>
          {talks.map((talk, i) => (
            <TalkCard
              key={i}
              talk={talk}
              image={talkImages[i % talkImages.length]}
              index={i}
              total={talks.length}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-8 pb-16">
        <motion.div
          className="flex items-center gap-4 p-6 border border-primary/10 bg-primary/[0.02]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={img6}
            alt="With students"
            className="w-16 h-16 rounded-full object-cover shrink-0"
          />
          <p className="text-sm font-serif italic text-primary/60 leading-relaxed">
            "Knowledge grows when shared. Every talk is an opportunity to plant seeds of curiosity in young minds."
          </p>
          <span className="text-xs text-primary/35 shrink-0">— N.L. Swathi</span>
        </motion.div>
      </div>
    </section>
  );
}
