"use client";

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale: "tr" | "en" = locale === "tr" ? "en" : "tr";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-content mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="font-display font-bold text-xl text-text">
          Synorq
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="text-text-muted hover:text-accent transition-colors text-sm"
            >
              {t(key)}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            locale={toggleLocale}
            className="text-text-muted hover:text-accent transition-colors text-sm font-medium"
          >
            {toggleLocale.toUpperCase()}
          </Link>
          <Link
            href="#contact"
            className="px-4 py-2 rounded-lg bg-accent text-primary font-medium text-sm hover:opacity-90 transition-opacity"
          >
            {t("cta")}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary z-40 md:hidden pt-20 px-6"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
              {navLinks.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="text-xl text-text hover:text-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
              <Link
                href="/"
                locale={toggleLocale}
                className="text-xl text-text-muted hover:text-accent transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {toggleLocale === "tr" ? "Türkçe" : "English"}
              </Link>
              <Link
                href="#contact"
                className="px-6 py-3 rounded-lg bg-accent text-primary font-medium text-center"
                onClick={() => setMobileOpen(false)}
              >
                {t("cta")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
