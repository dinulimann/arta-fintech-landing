import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Container, Logo } from "../components/ui";

const links = [
  { href: "#story", label: "App" },
  { href: "#card", label: "Card" },
  { href: "#security", label: "Security" },
  { href: "#reviews", label: "Reviews" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div className={`w-full max-w-6xl rounded-2xl transition-all duration-500 ${scrolled ? "glass shadow-[0_10px_40px_-15px_rgb(0_0_0/0.6)]" : "border border-transparent"}`}>
        <Container className="flex h-14 items-center justify-between !px-4 sm:!px-5">
          <a href="#top" aria-label="Arta home"><Logo /></a>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map((l) => <a key={l.href} href={l.href} className="rounded-lg px-3.5 py-2 text-sm text-fog transition-colors hover:text-white">{l.label}</a>)}
          </nav>
          <a href="#download" className="hidden rounded-xl bg-white px-4 py-2 text-sm font-semibold text-night transition-transform hover:-translate-y-0.5 md:block">Get the app</a>
          <button className="rounded-lg p-2 md:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </Container>
        <AnimatePresence>
          {open && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden md:hidden" aria-label="Mobile">
              <div className="flex flex-col gap-1 px-4 pb-4">
                {links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-white hover:bg-white/5">{l.label}</a>)}
                <a href="#download" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-white px-4 py-3 text-center font-semibold text-night">Get the app</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
