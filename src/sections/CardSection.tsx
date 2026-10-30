import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Globe2, Lock, Percent, Snowflake } from "lucide-react";
import Card3D from "../components/Card3D";
import { Container, Reveal, SectionHeading } from "../components/ui";

const perks = [
  { icon: Percent, title: "1% back on groceries", text: "Paid into your savings goal, not as points." },
  { icon: Globe2, title: "No FX markup abroad", text: "Real exchange rate in 30+ currencies." },
  { icon: Snowflake, title: "Freeze in one tap", text: "Lost it? Lock it, then unlock when it turns up." },
  { icon: Lock, title: "Virtual cards", text: "A fresh number for every online shop." },
];

export default function CardSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [-18, 0, 12]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.85, 1, 0.95]);

  return (
    <section id="card" ref={ref} className="relative overflow-hidden py-28 sm:py-36">
      <Container>
        <SectionHeading eyebrow="Arta card" title={<>A card as calm <br className="hidden sm:block" />as the app.</>} text="Metal-feel debit card, free for life, connected to the same balance and the same goals." />
        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div style={{ rotate, scale }} className="mx-auto w-full max-w-[460px]">
            <Card3D />
            <p className="mt-6 text-center font-mono text-xs tracking-wider text-fog uppercase">Move your cursor over the card</p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i}>
                <div className="h-full rounded-2xl border border-edge bg-white/[0.03] p-5">
                  <span className="grid size-10 place-items-center rounded-xl bg-lime/10 text-lime"><p.icon size={18} /></span>
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-fog">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
