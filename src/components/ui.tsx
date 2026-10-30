import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";

export function Reveal({ children, delay = 0, y = 28, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ to, format, duration = 1.8 }: { to: number; format: (n: number) => string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setValue });
    return () => c.stop();
  }, [inView, reduce, to, duration]);
  return <span ref={ref}>{format(reduce ? to : value)}</span>;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white">
      <img src="/favicon.svg" alt="" className="size-8" />
      Arta
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-white/[0.03] px-3 py-1 font-mono text-[0.72rem] tracking-wider text-lime uppercase">
      <span className="size-1.5 rounded-full bg-lime shadow-[0_0_10px] shadow-lime" />
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, text, left = false }: { eyebrow: string; title: ReactNode; text?: string; left?: boolean }) {
  return (
    <Reveal className={left ? "max-w-2xl" : "mx-auto max-w-2xl text-center"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-balance text-white sm:text-[3.25rem] sm:leading-[1.05]">{title}</h2>
      {text && <p className="mt-5 text-lg text-pretty text-fog">{text}</p>}
    </Reveal>
  );
}

/** Card with a soft light that follows the cursor. */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-3xl border border-edge bg-panel/80 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--x)_var(--y),rgb(181_242_61/0.10),transparent_45%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

export const idr = (n: number) => new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(n);
