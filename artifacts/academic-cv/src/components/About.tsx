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
          I am a dedicated PhD Scholar and Pharm D graduate with a wealth of experience in both research and academic mentoring. My expertise spans Diabetes Research, Computational Biology, Drug Discovery, and Clinical Pharmacy. Throughout my career, I have mentored numerous researchers, guiding them towards successful academic paths.
        </motion.p>

        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="img-zoom aspect-[4/3] rounded-sm">
            <img
              src={libraryImg}
              alt="Academic library setting"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center">
            <p className="text-base md:text-lg text-primary/70 leading-relaxed font-serif">
              My research has led to meaningful contributions in Diabetes Management, Molecular Docking, Epigenetics, and Drug Development. I strive to bridge theoretical foundations with practical applications in clinical and pharmaceutical sectors — turning ideas into impact.
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-8 pt-4">
          <div>
            <h3 className="text-xl font-serif font-semibold text-primary mb-4">Key Competencies</h3>
            <ul className="space-y-2 text-primary/70">
              {cvData.competencies.map((comp, i) => (
                <li key={i} className="flex items-start gap-3 group cursor-default py-1 transition-all duration-300 hover:translate-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0 transition-colors duration-300 group-hover:bg-[hsl(40,45%,55%)]" />
                  <span className="transition-colors duration-300 group-hover:text-primary">{comp}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-primary mb-4">Thesis Research</h3>
            <ul className="space-y-3 text-primary/70">
              {cvData.thesis.map((thesis, i) => (
                <li key={i} className="flex items-start gap-3 group cursor-default py-1 transition-all duration-300 hover:translate-x-1">
                  <span className="text-primary/40 font-serif font-bold mt-0.5 shrink-0 transition-colors duration-300 group-hover:text-[hsl(40,45%,55%)]">{i + 1}.</span>
                  <span className="leading-relaxed transition-colors duration-300 group-hover:text-primary">{thesis}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
