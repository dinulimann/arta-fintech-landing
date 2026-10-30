import { Container, CountUp, Reveal } from "../components/ui";

const stats = [
  { to: 2.4, f: (n: number) => `${n.toFixed(1).replace(".", ",")} jt`, label: "people using Arta" },
  { to: 9.8, f: (n: number) => `Rp ${n.toFixed(1).replace(".", ",")} T`, label: "moved every month" },
  { to: 31, f: (n: number) => `${Math.round(n)}%`, label: "more saved in 6 months" },
  { to: 0.3, f: (n: number) => `${n.toFixed(1).replace(".", ",")} s`, label: "average transfer time" },
];

export default function Stats() {
  return (
    <section className="py-24">
      <Container className="grid gap-px overflow-hidden rounded-3xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={0.08 * i} className="bg-night p-8">
            <p className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl"><CountUp to={s.to} format={s.f} /></p>
            <p className="mt-2 text-fog">{s.label}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
