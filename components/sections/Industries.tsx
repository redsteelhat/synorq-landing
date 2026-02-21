"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const industryKeys = ["fintech", "ecommerce", "elearning", "enterprise"] as const;

const industryConfig = {
  fintech:    { emoji: "💎", color: "#00D4FF", bg: "rgba(0,212,255,0.08)",   glow: "rgba(0,212,255,0.12)"   },
  ecommerce:  { emoji: "🧵", color: "#A78BFA", bg: "rgba(167,139,250,0.08)", glow: "rgba(167,139,250,0.12)" },
  elearning:  { emoji: "📚", color: "#34D399", bg: "rgba(52,211,153,0.08)",  glow: "rgba(52,211,153,0.12)"  },
  enterprise: { emoji: "🏢", color: "#F59E0B", bg: "rgba(245,158,11,0.08)",  glow: "rgba(245,158,11,0.12)"  },
};

export function Industries() {
  const t = useTranslations("industries");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="industries"
      ref={ref}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-content mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-accent/70 mb-4">
            {t("label")}
          </span>
          <h2 className="font-display font-bold text-section text-text">
            {t("title")}
          </h2>
          <p className="text-text-muted mt-4 max-w-xl mx-auto text-base leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {industryKeys.map((key, i) => {
            const cfg = industryConfig[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                className="group relative rounded-2xl border border-white/[0.07] overflow-hidden transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.02)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = cfg.color + "45";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px ${cfg.glow}`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                {/* Hover background wash */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${cfg.bg} 0%, transparent 60%)` }}
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${cfg.color}80, transparent)`,
                  }}
                />

                <div className="relative z-10 p-7 flex gap-5 items-start">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: cfg.bg, border: `1px solid ${cfg.color}25` }}
                  >
                    {cfg.emoji}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-display font-semibold text-lg text-text leading-snug">
                        {t(`${key}.title`)}
                      </h3>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed mb-3">
                      {t(`${key}.description`)}
                    </p>
                    {/* Why Synorq tag */}
                    <span
                      className="inline-block text-xs font-medium px-2.5 py-1 rounded-lg"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {t(`${key}.why`)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}