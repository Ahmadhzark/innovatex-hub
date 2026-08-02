"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Languages, CircuitBoard, Search } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/data/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SearchModal } from "@/components/search/SearchModal";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Cmd/Ctrl+K opens search from anywhere on the site.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMenuOpen(false);
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Condense the bar once the page has moved at all. The initial read is
  // deferred a frame so it doesn't setState synchronously during the effect.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Prevent background scroll while the sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)]",
        scrolled
          ? "border-b border-hairline bg-void/72 backdrop-blur-xl py-2.5"
          : "py-4",
      )}
    >
      {/* relative z-50 keeps the bar — brand, lang toggle, close button —
          painting above the full-screen mobile overlay (z-40) below, since
          without an explicit stacking context here the overlay would cover
          it despite coming later in the header's own z-50 layer. */}
      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand — the whole block is the tap target, sized past the 44px
            minimum even though the visible text is compact. Organiser name
            hides below `sm` so the mark doesn't crowd a phone-width bar. */}
        <Link
          href="/"
          className="group -my-2.5 flex min-h-11 items-center gap-2.5 py-2.5"
        >
          <span className="relative grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-emerald-600 text-void shadow-[0_0_20px_-4px_var(--color-primary)]">
            <CircuitBoard className="size-4.5" strokeWidth={2.4} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-bold text-ink">
              InnovateX <span className="text-primary">3.0</span>
            </span>
            <span className="mono-label mt-1 hidden sm:block">
              {SITE.organizer}
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                isActive(item.href)
                  ? "text-ink"
                  : "text-muted hover:text-ink",
              )}
            >
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full glass"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {t(item.label)}
            </Link>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden min-h-11 items-center gap-2 rounded-full glass px-3.5 text-xs font-semibold text-faint transition-colors hover:border-primary/40 hover:text-ink sm:inline-flex"
            aria-label={t({ en: "Search", ta: "தேடல்" })}
          >
            <Search className="size-3.5" />
            <span className="hidden lg:inline">
              {t({ en: "Search", ta: "தேடல்" })}
            </span>
            <kbd className="hidden rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] text-faint lg:inline">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="grid size-11 place-items-center rounded-full glass text-ink sm:hidden"
            aria-label={t({ en: "Search", ta: "தேடல்" })}
          >
            <Search className="size-4" />
          </button>

          <Link
            href="/register"
            className="hidden min-h-11 items-center rounded-full bg-primary px-4 text-sm font-semibold text-void transition-shadow hover:shadow-[0_0_20px_-4px_var(--color-primary)] sm:inline-flex"
          >
            {t({ en: "Register", ta: "பதிவு" })}
          </Link>

          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ta" : "en")}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full glass px-3.5 text-xs font-semibold text-ink transition-colors hover:border-primary/40"
            aria-label="Toggle language"
          >
            <Languages className="size-3.5 text-primary" />
            {lang === "en" ? "EN" : "தமிழ்"}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full glass text-ink lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — a solid, full-viewport overlay rather than a
          translucent dropdown. A partially-see-through sheet let hero
          buttons "ghost" through behind the nav links, which looked tappable
          but wasn't the menu; a full solid screen removes that ambiguity
          entirely, which matters more here than a see-through-blur effect. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-void lg:hidden"
          >
            {/* Keep the aurora/grid background visible through the menu so
                it doesn't feel like a different, disconnected screen. */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(74,222,128,0.08),transparent_60%)]" />

            <nav
              className="relative flex h-full flex-col overflow-y-auto px-5 pt-24 pb-10"
              aria-label="Mobile"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center justify-center rounded-full bg-primary text-base font-bold text-void shadow-[0_0_24px_-6px_var(--color-primary)]"
                >
                  {t({ en: "Register for InnovateX 3.0", ta: "InnovateX 3.0-க்கு பதிவு செய்யுங்கள்" })}
                </Link>
              </motion.div>

              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    // Dismiss the menu on tap rather than reacting to the
                    // route change in an effect.
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block border-b border-hairline py-4 text-lg font-semibold transition-colors",
                      isActive(item.href) ? "text-primary" : "text-ink",
                    )}
                  >
                    {t(item.label)}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 + 0.05 }}
                className="mt-auto pt-8 text-center"
              >
                <p className="mono-label">{SITE.organizer} · {SITE.name}</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
