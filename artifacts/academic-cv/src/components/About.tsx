import { Section } from "./Section";
import { cvData } from "@/data";
import { motion, type Variants } from "framer-motion";
import libraryImg from "@/assets/library-about.png";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function About() {
  return (
    <Section id="about" title="About">
      <motion.div
        className="space-y-12"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.p variants={fadeUp} className="text-lg md:text-xl text-primary/80 leading-relaxed font-serif max-w-3xl">
          {cvData.personal.name} is a dedicated PhD Scholar and Pharm D graduate with a wealth of experience in both research and academic mentoring. Her expertise encompasses Diabetes Research, Computational Biology, Drug Discovery, and Clinical Pharmacy. Throughout her career, she has mentored numerous researchers, guiding them towards successful academic paths.
        </motion.p>

        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={libraryImg}
              alt="Academic library setting"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center">
            <p className="text-base md:text-lg text-primary/70 leading-relaxed font-serif">
              A highly respected scholar, she has made seminal contributions to the field, particularly in areas such as Diabetes Management, Molecular Docking, Epigenetics, and Drug Development. Her work has not only advanced theoretical foundations but has also led to practical applications in clinical and pharmaceutical sectors.
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-8 pt-4">
          <div>
            <h3 className="text-xl font-serif font-semibold text-primary mb-4">Key Competencies</h3>
            <ul className="space-y-2 text-primary/70">
              {cvData.competencies.map((comp, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-primary mb-4">Thesis Research</h3>
            <ul className="space-y-3 text-primary/70">
              {cvData.thesis.map((thesis, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary/40 font-serif font-bold mt-0.5 shrink-0">{i + 1}.</span>
                  <span className="leading-relaxed">{thesis}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
