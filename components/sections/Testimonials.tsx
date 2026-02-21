"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const accentColors = [
  { color: "#00D4FF", bg: "rgba(0,212,255,0.07)",   glow: "rgba(0,212,255,0.12)"   },
  { color: "#A78BFA", bg: "rgba(167,139,250,0.07)", glow: "rgba(167,139,250,0.12)" },
  { color: "#34D399", bg: "rgba(52,211,153,0.07)",  glow: "rgba(52,211,153,0.12)"  },
  { color: "#F59E0B", bg: "rgba(245,158,11,0.07)",  glow: "rgba(245,158,11,0.12)"  },
];

const metrics = [
  { valueKey: "metric_value_projects", labelKey: "metric_label_projects" },
  { valueKey: "metric_value_sectors",  labelKey: "metric_label_sectors"  },
  { valueKey: "metric_value_countries",labelKey: "metric_label_countries" },
];

export function Testimonials() {
  const t = useTranslations("testimonials");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const items = t.raw("items") as Array<{
    name: string;
    role: string;
    quote: string;
    outcome?: string;
  }>;

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-content mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-accent/70 mb-4">
            {t("label")}
          </span>
          <h2 className="font-display font-bold text-section text-text">
            {t("title")}
          </h2>
        </motion.div>

        {/* Metric bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex justify-center mb-16"
        >
          <div
            className="inline-flex rounded-2xl border border-white/[0.07] overflow-hidden divide-x divide-white/[0.07]"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col items-center px-10 py-5">
                <span
                  className="font-display font-bold text-2xl md:text-3xl tabular-nums leading-none mb-1"
                  style={{ color: accentColors[i].color }}
                >
                  {t(m.valueKey)}
                </span>
                <span className="text-text-muted/70 text-xs whitespace-nowrap">
                  {t(m.labelKey)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quote cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, i) => {
            const cfg = accentColors[i % accentColors.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: "easeOut" }}
                className="group relative rounded-2xl border border-white/[0.07] overflow-hidden transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.02)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = cfg.color + "40";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px ${cfg.glow}`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${cfg.color}80, transparent)`,
                  }}
                />

                {/* Corner glow */}
                <div
                  className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: cfg.glow }}
                />

                <div className="relative z-10 p-7 flex flex-col h-full">
                  {/* Quote mark */}
                  <div
                    className="text-5xl font-serif leading-none mb-4 select-none"
                    style={{ color: cfg.color + "40" }}
                  >
                    &ldquo;
                  </div>

                  {/* Quote */}
                  <p className="text-text/90 text-base leading-relaxed mb-4 flex-1 italic">
                    {item.quote}
                  </p>

                  {/* Outcome pill */}
                  {item.outcome && (
                    <div
                      className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg mb-5 self-start"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      <span>↑</span>
                      {item.outcome}
                    </div>
                  )}

                  {/* Author */}
                  <div
                    className="flex items-center gap-3 pt-4 border-t"
                    style={{ borderColor: cfg.color + "18" }}
                  >
                    {/* Avatar placeholder */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}30` }}
                    >
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-text text-sm leading-tight">
                        {item.name}
                      </p>
                      <p className="text-text-muted text-xs mt-0.5">{item.role}</p>
                    </div>
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