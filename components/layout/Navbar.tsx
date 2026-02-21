"use client";

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { SynorqLogo } from "@/components/SynorqLogo";

const navLinks = [
  { key: "services", href: "#services" },
  { key: "products", href: "#products" },
  { key: "industries", href: "#industries" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section tracking
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleLocale = locale === "tr" ? "en" : "tr";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-primary/85 backdrop-blur-2xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      {/* Top accent line — scroll'da görünür */}
      <motion.div
        className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={scrolled ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: "left" }}
      />

      <nav className="max-w-content mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-16 md:h-20">

        {/* Logo */}
        <Link href="/" className="group flex items-center shrink-0">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <SynorqLogo
              width={120}
              height={32}
              className="transition-opacity duration-200 group-hover:opacity-80"
            />
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ key, href }) => {
            const isActive = activeSection === href.replace("#", "");
            return (
              <Link
                key={key}
                href={href}
                className={`relative px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "text-accent"
                    : "text-text-muted hover:text-text hover:bg-white/[0.04]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{t(key)}</span>
              </Link>
            );
          })}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dil toggle */}
          <Link
            href="/"
            locale={toggleLocale as "tr" | "en"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-200 text-xs font-medium uppercase tracking-wider"
          >
            <span className="text-[10px] opacity-60">🌐</span>
            {toggleLocale}
          </Link>

          {/* CTA */}
          <Link
            href="#contact"
            className="group relative px-5 py-2.5 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #00D4FF, #0099CC)",
              color: "#0A0F1E",
              boxShadow: "0 0 24px rgba(0,212,255,0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 40px rgba(0,212,255,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 24px rgba(0,212,255,0.25)";
            }}
          >
            <span className="flex items-center gap-2">
              {t("cta")}
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.92 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 md:hidden flex flex-col"
              style={{
                background: "rgba(10, 15, 30, 0.97)",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.06]">
                <SynorqLogo width={100} height={26} />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-text-muted"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col px-4 py-6 gap-1 flex-1">
                {navLinks.map(({ key, href }, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-text hover:text-accent hover:bg-accent/5 transition-all duration-200 text-base"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
                      {t(key)}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Drawer footer */}
              <div className="px-4 py-6 border-t border-white/[0.06] flex flex-col gap-3">
                <Link
                  href="/"
                  locale={toggleLocale as "tr" | "en"}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-text-muted text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  🌐 {toggleLocale === "tr" ? "Türkçe" : "English"}
                </Link>
                <Link
                  href="#contact"
                  className="px-6 py-3 rounded-xl font-semibold text-sm text-center"
                  style={{
                    background: "linear-gradient(135deg, #00D4FF, #0099CC)",
                    color: "#0A0F1E",
                    boxShadow: "0 0 24px rgba(0,212,255,0.2)",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("cta")} →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}