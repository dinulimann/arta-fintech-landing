import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { PieChart, PiggyBank, Users } from "lucide-react";
import { Container, Eyebrow } from "../components/ui";
import { GoalsScreen, InsightsScreen, PhoneFrame, SplitScreen } from "../components/Phone";

const chapters = [
  { icon: PieChart, kicker: "See", title: "Know where every rupiah goes.", text: "Spending sorts itself into food, transport and bills the moment you pay, with a nudge when a category runs hot.", Screen: InsightsScreen },
  { icon: PiggyBank, kicker: "Save", title: "Savings that happen on their own.", text: "Round up every purchase and auto-save on payday. Goals fill quietly while you get on with the month.", Screen: GoalsScreen },
  { icon: Users, kicker: "Share", title: "Split the bill in one tap.", text: "Scan the receipt, pick who was there, and Arta sends each friend a QRIS link. Reminders go out for you.", Screen: SplitScreen },
];

/** Sticky phone whose screen follows the chapter you are reading (scroll-linked). */
export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(chapters.length - 1, Math.floor(v * chapters.length))));
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const Screen = chapters[active].Screen;

  return (
    <section id="story" ref={ref} className="relative" style={{ height: `${chapters.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_123_255/0.18),transparent)]" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>How Arta works</Eyebrow>
            <div className="relative mt-8 min-h-[260px]">
              <AnimatePresence mode="wait">
                {chapters.map((c, i) => i === active && (
                  <motion.div key={c.kicker} initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -30, filter: "blur(8px)" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                    <p className="flex items-center gap-2 font-mono text-sm tracking-wider text-lime uppercase"><c.icon size={16} /> {String(i + 1).padStart(2, "0")} · {c.kicker}</p>
                    <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-balance sm:text-5xl">{c.title}</h2>
                    <p className="mt-5 max-w-md text-lg text-fog">{c.text}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-gradient-to-r from-lime to-cyan" style={{ width: progress }} /></div>
              <span className="font-mono text-sm text-fog">{active + 1}/{chapters.length}</span>
            </div>
          </div>
          <div className="relative mx-auto hidden sm:block">
            <PhoneFrame>
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.02, y: -20 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
          </div>
        </Container>
      </div>
    </section>
  );
}
