const items = ["QRIS", "BI-FAST", "Virtual accounts", "E-wallet top-up", "Bill payments", "Scheduled transfers", "Multi-currency", "Instant refunds"];

export default function Rails() {
  return (
    <section aria-label="Supported payments" className="border-y border-edge bg-night-2/60 py-6">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-12 pr-12">
          {[...items, ...items].map((t, i) => (
            <span key={i} aria-hidden={i >= items.length} className="flex items-center gap-12 font-mono text-sm tracking-wider whitespace-nowrap text-white/45 uppercase">
              {t}<span className="size-1 rounded-full bg-lime/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
