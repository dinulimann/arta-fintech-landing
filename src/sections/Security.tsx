import { motion, useReducedMotion } from "motion/react";
import { Fingerprint, KeyRound, ShieldCheck, Smartphone } from "lucide-react";
import { Container, Reveal, SectionHeading } from "../components/ui";

const points = [
  { icon: Fingerprint, title: "Biometric sign-in", text: "Face or fingerprint for every login and transfer." },
  { icon: KeyRound, title: "Encrypted end to end", text: "AES-256 at rest, TLS 1.3 in transit." },
  { icon: Smartphone, title: "One trusted device", text: "New phone? Your old one has to approve it." },
];

export default function Security() {
  const reduce = useReducedMotion();
  return (
    <section id="security" className="relative overflow-hidden border-y border-edge bg-night-2 py-28 sm:py-36">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div className="relative mx-auto grid size-[320px] place-items-center sm:size-[380px]">
          {[1, 0.78, 0.56].map((s, i) => (
            <motion.span key={s} className="absolute rounded-full border border-cyan/25" style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
              animate={reduce ? {} : { scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }} />
          ))}
          <motion.span className="absolute size-full rounded-full border-t-2 border-lime/70" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
          <span className="grid size-28 place-items-center rounded-[2rem] bg-gradient-to-br from-lime to-cyan text-night shadow-[0_0_80px_-10px] shadow-cyan"><ShieldCheck size={52} strokeWidth={1.6} /></span>
        </div>
        <div>
          <SectionHeading left eyebrow="Security" title="Your money, locked tight." text="Built like a bank app, because it holds your money." />
          <div className="mt-10 space-y-4">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={0.1 * i}>
                <div className="flex gap-4 rounded-2xl border border-edge bg-white/[0.03] p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan"><p.icon size={20} /></span>
                  <div><h3 className="font-semibold">{p.title}</h3><p className="mt-1 text-fog">{p.text}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
