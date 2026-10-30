import type { ReactNode } from "react";
import { ArrowDownLeft, ArrowUpRight, Bell, Coffee, Plane, QrCode, ShoppingBag, Users, Utensils, Zap } from "lucide-react";
import { idr } from "./ui";

/** iPhone-like frame drawn in CSS. */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-[9/19.2] w-[290px] rounded-[3rem] bg-gradient-to-b from-[#3a3f4b] via-[#1b1e26] to-[#2c303a] p-[10px] shadow-[0_40px_120px_-30px_rgb(181_242_61/0.35),0_0_0_1px_rgb(255_255_255/0.08)] ${className}`}>
      <div className="relative h-full overflow-hidden rounded-[2.4rem] bg-night-2">
        <div className="absolute top-2.5 left-1/2 z-20 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
        <div className="flex items-center justify-between px-7 pt-3.5 font-mono text-[10px] text-white/80"><span>9:41</span><span>5G ▮▮▮</span></div>
        {children}
      </div>
    </div>
  );
}

const tx = [
  { icon: Coffee, name: "Kopi Pagi", cat: "Coffee", amt: -38000 },
  { icon: ArrowDownLeft, name: "Salary", cat: "Income", amt: 12500000 },
  { icon: ShoppingBag, name: "Pasar Minggu", cat: "Groceries", amt: -214500 },
  { icon: Zap, name: "Token listrik", cat: "Bills", amt: -150000 },
];

export function HomeScreen() {
  return (
    <div className="px-5 pt-5">
      <div className="flex items-center justify-between">
        <div><p className="text-[11px] text-fog">Good morning,</p><p className="text-sm font-semibold">Nadia</p></div>
        <span className="grid size-8 place-items-center rounded-full bg-white/5"><Bell size={14} /></span>
      </div>
      <div className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-lime via-[#7ee0a8] to-cyan p-4 text-night">
        <p className="text-[11px] font-semibold opacity-70">Total balance</p>
        <p className="mt-1 text-[1.6rem] font-bold tracking-tight">Rp {idr(24860500)}</p>
        <p className="mt-1 text-[11px] font-semibold">▲ Rp 1.240.000 this month</p>
        <div className="absolute -right-6 -bottom-8 size-28 rounded-full bg-white/25 blur-xl" />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[10px] text-fog">
        {[{ i: ArrowUpRight, t: "Send" }, { i: ArrowDownLeft, t: "Request" }, { i: QrCode, t: "QRIS" }, { i: Users, t: "Split" }].map(({ i: I, t }) => (
          <div key={t}><span className="mx-auto grid size-10 place-items-center rounded-xl bg-white/[0.06] text-white"><I size={16} /></span><p className="mt-1">{t}</p></div>
        ))}
      </div>
      <p className="mt-5 text-xs font-semibold">Today</p>
      <div className="mt-2 space-y-2.5">
        {tx.map((t) => (
          <div key={t.name} className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-lg bg-white/[0.06]"><t.icon size={14} /></span>
            <div className="flex-1"><p className="text-[12px] font-medium">{t.name}</p><p className="text-[10px] text-fog">{t.cat}</p></div>
            <p className={`text-[12px] font-semibold tabular-nums ${t.amt > 0 ? "text-lime" : ""}`}>{t.amt > 0 ? "+" : "−"}{idr(Math.abs(t.amt))}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InsightsScreen() {
  const cats = [{ n: "Food", v: 38, c: "bg-lime" }, { n: "Transport", v: 22, c: "bg-cyan" }, { n: "Bills", v: 18, c: "bg-iris" }, { n: "Fun", v: 12, c: "bg-pink-400" }];
  const week = [42, 65, 38, 80, 54, 92, 30];
  return (
    <div className="px-5 pt-5">
      <p className="text-sm font-semibold">Insights</p>
      <p className="text-[11px] text-fog">October spending</p>
      <p className="mt-3 text-2xl font-bold tracking-tight">Rp {idr(6420000)}</p>
      <p className="text-[11px] text-lime">12% less than September</p>
      <div className="mt-4 flex h-28 items-end gap-2">
        {week.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className={`w-full rounded-md ${i === 5 ? "bg-lime" : "bg-white/10"}`} style={{ height: h }} />
            <span className="text-[9px] text-fog">{"MTWTFSS"[i]}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-2 overflow-hidden rounded-full">
        {cats.map((c) => <div key={c.n} className={c.c} style={{ width: `${c.v}%` }} />)}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {cats.map((c) => (
          <div key={c.n} className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-2.5 py-2 text-[11px]">
            <span className={`size-2 rounded-full ${c.c}`} />{c.n}<span className="ml-auto text-fog">{c.v}%</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-lime/30 bg-lime/10 p-3 text-[11px] text-lime">Tip: dining out is up 18%. Set a weekly cap?</div>
    </div>
  );
}

function Ring({ pct, color }: { pct: number; color: string }) {
  const r = 26, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="size-16 -rotate-90">
      <circle cx="32" cy="32" r={r} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="6" />
      <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
    </svg>
  );
}

export function GoalsScreen() {
  const goals = [
    { icon: Plane, n: "Bali trip", saved: 6800000, target: 10000000, color: "#b5f23d" },
    { icon: ShoppingBag, n: "New laptop", saved: 9600000, target: 18000000, color: "#22d3ee" },
    { icon: Utensils, n: "Emergency fund", saved: 21000000, target: 30000000, color: "#8b7bff" },
  ];
  return (
    <div className="px-5 pt-5">
      <p className="text-sm font-semibold">Savings goals</p>
      <p className="text-[11px] text-fog">Auto-save Rp 50.000 every payday</p>
      <div className="mt-4 space-y-3">
        {goals.map((g) => {
          const pct = Math.round((g.saved / g.target) * 100);
          return (
            <div key={g.n} className="flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3">
              <div className="relative"><Ring pct={pct} color={g.color} /><span className="absolute inset-0 grid place-items-center text-[11px] font-bold">{pct}%</span></div>
              <div className="flex-1">
                <p className="flex items-center gap-1.5 text-[12px] font-semibold"><g.icon size={12} /> {g.n}</p>
                <p className="mt-0.5 text-[10px] text-fog">Rp {idr(g.saved)} of {idr(g.target)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-2xl bg-gradient-to-r from-iris/30 to-cyan/20 p-3.5 text-[11px]">
        <p className="font-semibold">Interest earned this year</p>
        <p className="mt-1 text-lg font-bold">Rp {idr(1184300)}</p>
      </div>
    </div>
  );
}

export function SplitScreen() {
  const people = [{ n: "Nadia (you)", a: 187500, paid: true }, { n: "Raka", a: 187500, paid: true }, { n: "Sinta", a: 187500, paid: false }, { n: "Bimo", a: 187500, paid: false }];
  return (
    <div className="px-5 pt-5">
      <p className="text-sm font-semibold">Split bill</p>
      <p className="text-[11px] text-fog">Dinner at Sate Senayan</p>
      <p className="mt-3 text-2xl font-bold tracking-tight">Rp {idr(750000)}</p>
      <p className="text-[11px] text-fog">Split evenly · 4 people</p>
      <div className="mt-4 space-y-2">
        {people.map((p) => (
          <div key={p.n} className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-iris to-cyan text-[11px] font-bold">{p.n[0]}</span>
            <p className="flex-1 text-[12px] font-medium">{p.n}</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${p.paid ? "bg-lime/15 text-lime" : "bg-white/10 text-fog"}`}>{p.paid ? "Paid" : "Pending"}</span>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full rounded-xl bg-lime py-2.5 text-[12px] font-bold text-night">Remind Sinta & Bimo</button>
    </div>
  );
}
