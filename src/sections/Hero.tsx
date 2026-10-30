import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ShieldCheck, Star } from "lucide-react";
import { Container, Eyebrow } from "../components/ui";
import { HomeScreen, PhoneFrame } from "../components/Phone";
import Card3D from "../components/Card3D";
import StoreButtons from "../components/StoreButtons";

const ease = [0.22, 1, 0.36, 1] as const;
const enter = (d: number) => ({ initial: { opacity: 0, y: 24, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.9, delay: d, ease } });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Scroll-linked: phone leans back and rises, the card drifts the other way
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 18]);
  const phoneY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -120]);
  const cardY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 160]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], reduce ? [-12, -12] : [-12, 8]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section id="top" ref={ref} className="noise relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-36">
      <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none absolute inset-0">
        <div className="animate-aurora absolute -top-1/3 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_120deg,rgb(181_242_61/0.22),rgb(34_211_238/0.22),rgb(139_123_255/0.25),rgb(181_242_61/0.22))] blur-[110px]" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,var(--color-night))]" />
      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div {...enter(0)}><Eyebrow>Now with QRIS & BI-FAST</Eyebrow></motion.div>
          <motion.h1 {...enter(0.1)} className="mt-7 text-[3.1rem] leading-[0.98] font-bold tracking-[-0.045em] text-balance sm:text-7xl lg:text-[5.4rem]">
            Money, <span className="text-shine">made calm.</span>
          </motion.h1>
          <motion.p {...enter(0.2)} className="mt-7 max-w-lg text-lg text-pretty text-fog sm:text-xl">
            Arta sorts every rupiah you spend, saves for what matters automatically, and splits the bill before the waiter comes back.
          </motion.p>
          <motion.div {...enter(0.3)} className="mt-9"><StoreButtons /></motion.div>
          <motion.div {...enter(0.4)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-fog">
            <span className="flex items-center gap-1.5"><span className="flex text-lime">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</span> 4.9 from 32k reviews</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-cyan" /> Bank-grade encryption</span>
          </motion.div>
        </div>

        <div className="relative mx-auto h-[600px] w-full max-w-[420px] [perspective:1400px]">
          <motion.div initial={{ opacity: 0, y: 80, rotateY: -25 }} animate={{ opacity: 1, y: 0, rotateY: -8 }} transition={{ duration: 1.3, delay: 0.25, ease }}
            style={{ rotateX, y: phoneY }} className="absolute top-0 right-6 origin-bottom">
            <PhoneFrame><HomeScreen /></PhoneFrame>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.6, ease }}
            style={{ y: cardY, rotate: cardRotate }} className="absolute bottom-6 -left-4 w-[260px] sm:-left-10 sm:w-[300px]">
            <Card3D />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
