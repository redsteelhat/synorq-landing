"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { SynorqLogo } from "@/components/SynorqLogo";

const navColumns = [
  {
    titleKey: "col_services",
    links: [
      { labelKey: "services", href: "#services" },
      { labelKey: "industries", href: "#industries" },
      { labelKey: "about", href: "#about" },
    ],
  },
  {
    titleKey: "col_products",
    links: [
      { labelKey: "goldrisk", href: "#products" },
      { labelKey: "coming_soon", href: "#products" },
    ],
  },
  {
    titleKey: "col_company",
    links: [
      { labelKey: "contact", href: "#contact" },
      { labelKey: "privacy", href: "/privacy" },
      { labelKey: "terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative border-t border-white/[0.06] overflow-hidden">
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), rgba(123,47,255,0.3), transparent)",
        }}
      />
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,212,255,0.02) 0%, transparent 40%)" }}
      />

      <div className="relative z-10 max-w-content mx-auto px-6 md:px-12 lg:px-24">

        {/* Main grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand col — 2/5 */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/">
              <SynorqLogo width={120} height={32} />
            </Link>
            <p className="text-text-muted/70 text-sm leading-relaxed max-w-[260px]">
              {t("tagline")}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://linkedin.com/company/synorq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/synorq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="mailto:hello@synorq.com"
                aria-label="Email"
                className="group w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns — 3/5 */}
          {navColumns.map((col) => (
            <div key={col.titleKey}>
              <h4 className="text-[11px] font-semibold text-text-muted/50 uppercase tracking-[0.15em] mb-5">
                {t(col.titleKey)}
              </h4>
              <ul className="space-y-3">
                {col.links.map(({ labelKey, href }) => (
                  <li key={labelKey}>
                    <Link
                      href={href}
                      className="text-text-muted/80 hover:text-accent text-sm transition-colors duration-200"
                    >
                      {t(labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-text-muted/40 text-xs">
            {t("copyright")}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
            <span className="text-text-muted/40 text-xs">{t("status")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}