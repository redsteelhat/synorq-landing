"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = ["step1", "step2", "step3"] as const;

const stepConfig = [
  { color: "#00D4FF", bg: "rgba(0,212,255,0.08)",   glow: "rgba(0,212,255,0.15)",   icon: "🔍" },
  { color: "#A78BFA", bg: "rgba(167,139,250,0.08)", glow: "rgba(167,139,250,0.15)", icon: "⚡" },
  { color: "#34D399", bg: "rgba(52,211,153,0.08)",  glow: "rgba(52,211,153,0.15)",  icon: "🚀" },
];

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 md:py-20 px-6 md:px-12 lg:px-24"
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

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Connector line — desktop */}
          <div className="hidden md:block absolute top-[72px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-[2px] z-[5] pointer-events-none">
            <div className="h-full bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden="true" />
            {/* Animated travel dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
              style={{ background: "linear-gradient(135deg, #00D4FF, #7B2FFF)" }}
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
            />
          </div>

          {steps.map((step, i) => {
            const cfg = stepConfig[i];
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
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
                    background: `linear-gradient(90deg, transparent, ${cfg.color}90, transparent)`,
                  }}
                />

                {/* Corner glow */}
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: cfg.glow }}
                />

                <div className="relative z-10 p-7">
                  {/* Step number + icon row */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                      style={{ background: cfg.bg, border: `1px solid ${cfg.color}25` }}
                    >
                      {cfg.icon}
                    </div>
                    <span
                      className="font-display font-bold text-4xl tabular-nums"
                      style={{ color: cfg.color + "25" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Duration badge */}
                  <span
                    className="inline-block text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-lg mb-3"
                    style={{ background: cfg.bg, color: cfg.color }}
                  >
                    {t(`${step}.duration`)}
                  </span>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-xl text-text mb-2 leading-snug">
                    {t(`${step}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted text-sm leading-relaxed mb-5">
                    {t(`${step}.description`)}
                  </p>

                  {/* Artifact divider */}
                  <div
                    className="pt-4 border-t flex items-center gap-2"
                    style={{ borderColor: cfg.color + "20" }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: cfg.color }}
                    />
                    <p className="text-sm font-medium" style={{ color: cfg.color + "CC" }}>
                      {t(`${step}.artifact`)}
                    </p>
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