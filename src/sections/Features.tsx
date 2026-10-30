import { motion } from "motion/react";
import { BellRing, CalendarClock, QrCode, Repeat, Sparkles, Wallet } from "lucide-react";
import { Container, Reveal, SectionHeading, SpotlightCard, idr } from "../components/ui";

function Bills() {
  const rows = [["Internet", 385000, "Nov 3"], ["BPJS", 150000, "Nov 10"], ["Kost", 2400000, "Nov 25"]] as const;
  return (
    <div className="mt-6 space-y-2">
      {rows.map(([n, a, d], i) => (
        <motion.div key={n} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i }}
          className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm">
          <span>{n}</span><span className="text-fog">{d}</span><span className="font-semibold tabular-nums">Rp {idr(a)}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-28 sm:py-36">
      <Container>
        <SectionHeading eyebrow="Everything else" title="Small things, done properly." text="The features you reach for every day, built to stay out of the way." />
        <div className="mt-16 grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <SpotlightCard className="h-full p-8">
              <CalendarClock className="text-cyan" />
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">Bills that pay themselves</h3>
              <p className="mt-2 max-w-md text-fog">Internet, BPJS, rent and electricity tokens on a schedule, with a heads-up two days before.</p>
              <Bills />
            </SpotlightCard>
          </Reveal>
          <Reveal className="md:col-span-2" delay={0.1}>
            <SpotlightCard className="flex h-full flex-col p-8">
              <QrCode className="text-lime" />
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">Pay any QRIS</h3>
              <p className="mt-2 text-fog">From warung to mall, scan and done.</p>
              <div className="mt-auto grid place-items-center pt-8">
                <div className="relative grid size-28 grid-cols-5 gap-1 rounded-2xl bg-white p-3">
                  {Array.from({ length: 25 }, (_, i) => <span key={i} className={`rounded-[2px] ${[0, 1, 3, 5, 6, 8, 12, 14, 16, 18, 19, 21, 23, 24].includes(i) ? "bg-night" : "bg-transparent"}`} />)}
                  <motion.span className="absolute inset-x-2 h-0.5 bg-lime shadow-[0_0_12px] shadow-lime" animate={{ top: ["12%", "88%", "12%"] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }} />
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
          {[
            { icon: Repeat, title: "Round-ups", text: "Spare change from every purchase goes to a goal." },
            { icon: BellRing, title: "Real-time alerts", text: "Every debit, the second it happens." },
            { icon: Wallet, title: "All accounts, one view", text: "Link your other banks and e-wallets read-only." },
          ].map((f, i) => (
            <Reveal key={f.title} className="md:col-span-2" delay={0.08 * i}>
              <SpotlightCard className="h-full p-7">
                <f.icon className="text-iris" />
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-fog">{f.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
          <Reveal className="md:col-span-6">
            <SpotlightCard className="flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-lime to-cyan text-night"><Sparkles /></span>
                <div><h3 className="text-xl font-semibold">Monthly money recap</h3><p className="text-fog">One calm summary on the 1st: what came in, what went out, what changed.</p></div>
              </div>
              <span className="rounded-full border border-edge px-4 py-2 font-mono text-xs tracking-wider text-fog uppercase">Every 1st of the month</span>
            </SpotlightCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
