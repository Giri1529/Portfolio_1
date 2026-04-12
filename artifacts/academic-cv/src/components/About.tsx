import { Section } from "./Section";
import { cvData } from "@/data";
import { motion, type Variants } from "framer-motion";
import aboutImg from "@assets/image_1776013311142.png";

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
        <motion.p variants={fadeUp} className="text-lg md:text-xl text-[#3d3d5c] leading-relaxed font-serif max-w-3xl">
          I am a dedicated PhD Scholar and Pharm D graduate with a wealth of experience in both research and academic mentoring. My expertise spans Diabetes Research, Computational Biology, Drug Discovery, and Clinical Pharmacy. Throughout my career, I have mentored numerous researchers, guiding them towards successful academic paths.
        </motion.p>

        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="img-zoom aspect-[4/3] rounded-sm overflow-hidden">
            <img
              src={aboutImg}
              alt="N.L. Swathi"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex items-center">
            <p className="text-base md:text-lg text-[#3d3d5c] leading-relaxed font-serif">
              My research has led to meaningful contributions in Diabetes Management, Molecular Docking, Epigenetics, and Drug Development. I strive to bridge theoretical foundations with practical applications in clinical and pharmaceutical sectors — turning ideas into impact.
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-8 pt-4">
          <div>
            <h3 className="text-xl font-serif font-medium text-[#0d1b2a] mb-4">Key Competencies</h3>
            <ul className="space-y-2 text-[#3d3d5c]">
              {cvData.competencies.map((comp, i) => (
                <li key={i} className="flex items-start gap-3 group cursor-default py-1 transition-all duration-300 hover:translate-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7a7a9a] mt-2 shrink-0 transition-colors duration-300 group-hover:bg-[#b8963e]" />
                  <span className="transition-colors duration-300 group-hover:text-[#0d1b2a]">{comp}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-serif font-medium text-[#0d1b2a] mb-4">Thesis Research</h3>
            <ul className="space-y-3 text-[#3d3d5c]">
              {cvData.thesis.map((thesis, i) => (
                <li key={i} className="flex items-start gap-3 group cursor-default py-1 transition-all duration-300 hover:translate-x-1">
                  <span className="text-[#7a7a9a] font-serif font-bold mt-0.5 shrink-0 transition-colors duration-300 group-hover:text-[#b8963e]">{i + 1}.</span>
                  <span className="leading-relaxed transition-colors duration-300 group-hover:text-[#0d1b2a]">{thesis}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
