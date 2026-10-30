import { Apple, Play } from "lucide-react";

// Generic download buttons (not the official store badges).
export default function StoreButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      {[
        { top: "Download on the", name: "App Store", Icon: Apple },
        { top: "Get it on", name: "Google Play", Icon: Play },
      ].map((s) => (
        <a key={s.name} href="#download" className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2.5 transition-colors hover:border-white/30 hover:bg-white/10">
          <s.Icon size={24} className="shrink-0" fill="currentColor" strokeWidth={1.5} />
          <span className="text-left leading-tight"><span className="block text-[0.65rem] text-fog">{s.top}</span><span className="text-base font-semibold">{s.name}</span></span>
        </a>
      ))}
    </div>
  );
}
