import { Star } from "lucide-react";
import { Container, SectionHeading } from "../components/ui";

// Fictional reviews (see footer note).
const reviews = [
  { q: "First app that made me actually look at my spending. The weekly nudge is gentle, not preachy.", n: "Dewi, Bandung" },
  { q: "Split bill with QRIS links ended the 'nanti ya' era in our group chat.", n: "Raka, Jakarta" },
  { q: "Saved for Bali without noticing. Round-ups are dangerous in a good way.", n: "Sinta, Surabaya" },
  { q: "Froze my card at the airport in two seconds. Unfroze it when I found it in my bag.", n: "Bimo, Medan" },
  { q: "The monthly recap is the only finance email I open.", n: "Laras, Yogyakarta" },
  { q: "Clean, fast, and no ads trying to sell me loans.", n: "Arif, Makassar" },
];

function Row({ items, reverse = false }: { items: typeof reviews; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div className="animate-marquee flex w-max gap-4 pr-4" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {[...items, ...items].map((r, i) => (
          <figure key={i} aria-hidden={i >= items.length} className="w-[340px] shrink-0 rounded-2xl border border-edge bg-white/[0.03] p-6">
            <div className="flex text-lime">{Array.from({ length: 5 }, (_, k) => <Star key={k} size={13} fill="currentColor" />)}</div>
            <blockquote className="mt-3 text-[0.95rem] leading-relaxed">“{r.q}”</blockquote>
            <figcaption className="mt-4 font-mono text-xs tracking-wider text-fog uppercase">{r.n}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-28 sm:py-36">
      <Container><SectionHeading eyebrow="Reviews" title="Calmer money, in their words." /></Container>
      <div className="mt-14 space-y-4">
        <Row items={reviews.slice(0, 3).concat(reviews.slice(3))} />
        <Row items={reviews.slice(3).concat(reviews.slice(0, 3))} reverse />
      </div>
    </section>
  );
}
