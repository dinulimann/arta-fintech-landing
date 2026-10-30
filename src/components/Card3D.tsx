import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/** A debit card that tilts toward the cursor, with a moving sheen. */
export default function Card3D({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [14, -14]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [0, 1], [-18, 18]), { stiffness: 150, damping: 15 });
  const onMove = (e: MouseEvent) => {
    if (reduce) return;
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { mx.set(0.5); my.set(0.5); };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={`[perspective:1100px] ${className}`}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative aspect-[1.586] w-full overflow-hidden rounded-[1.4rem] bg-[linear-gradient(135deg,#1a1d27_0%,#2b3040_40%,#14161e_100%)] p-6 shadow-[0_40px_80px_-30px_rgb(34_211_238/0.45),inset_0_0_0_1px_rgb(255_255_255/0.12)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_100%_0%,rgb(181_242_61/0.28),transparent_55%),radial-gradient(70%_90%_at_0%_100%,rgb(139_123_255/0.35),transparent_60%)]" />
        <div className="animate-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-lg font-bold tracking-tight">Arta</span>
            <span className="font-mono text-[0.7rem] tracking-widest text-white/60">DEBIT</span>
          </div>
          <div className="h-9 w-12 rounded-md bg-gradient-to-br from-[#e9d8a6] to-[#b08d3e] shadow-inner" />
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-base tracking-[0.2em] text-white/90">•••• 2408</p>
              <p className="mt-1 text-[0.7rem] tracking-widest text-white/50 uppercase">Nadia Putri</p>
            </div>
            <div className="flex -space-x-3"><span className="size-8 rounded-full bg-lime/90" /><span className="size-8 rounded-full bg-cyan/80 mix-blend-screen" /></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
