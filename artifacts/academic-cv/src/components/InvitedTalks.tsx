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
    offset: ["start end", "start 0.2"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [80, 0]);
  const isEven = index % 2 === 0;

  return (
    <div ref={cardRef} className="py-6">
      <motion.div
        className="bg-background border border-primary/10 overflow-hidden shadow-[0_2px_30px_-10px_rgba(0,0,0,0.06)]"
        style={{ opacity, y }}
      >
        <div className="grid md:grid-cols-2 min-h-[380px]">
          <div
            className={`relative overflow-hidden ${isEven ? "md:order-1" : "md:order-2"}`}
          >
            <img
              src={image}
              alt={talk.title}
              className="w-full h-full object-cover min-h-[280px] md:min-h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
            <div className="absolute top-5 left-5">
              <span className="inline-block px-3 py-1.5 bg-background/90 backdrop-blur-sm text-xs font-medium text-primary tracking-wider uppercase">
                Talk {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className={`flex flex-col justify-center p-8 md:p-12 ${isEven ? "md:order-2" : "md:order-1"}`}>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-primary/30" />
                <span className="text-xs font-medium text-primary/40 uppercase tracking-[0.2em]">
                  Invited Talk
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-serif italic text-primary leading-snug">
                {talk.title.replace(/"/g, "")}
              </h3>

              <p className="text-sm md:text-base text-primary/60 leading-relaxed font-serif">
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
        className="pt-16 md:pt-24 mb-4"
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

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-4 pb-16">
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
            className="w-14 h-14 object-cover shrink-0"
            style={{ borderRadius: "50%" }}
          />
          <p className="text-sm font-serif italic text-primary/60 leading-relaxed">
            "Knowledge grows when shared. Every talk is an opportunity to plant seeds of curiosity in young minds."
          </p>
          <span className="text-xs text-primary/35 shrink-0 hidden sm:block">— N.L. Swathi</span>
        </motion.div>
      </div>
    </section>
  );
}
