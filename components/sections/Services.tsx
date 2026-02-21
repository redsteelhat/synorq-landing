"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Bot, Package, Plug, ShoppingCart, GraduationCap } from "lucide-react";

const serviceKeys = ["custom", "ai", "saas", "api", "ecommerce", "elearning"] as const;

const serviceConfig = {
  custom:    { icon: Monitor,      color: "#00D4FF", bg: "rgba(0,212,255,0.1)",    glow: "rgba(0,212,255,0.15)",   featured: true  },
  ai:        { icon: Bot,          color: "#A78BFA", bg: "rgba(167,139,250,0.1)",  glow: "rgba(167,139,250,0.15)", featured: true  },
  saas:      { icon: Package,      color: "#34D399", bg: "rgba(52,211,153,0.1)",   glow: "rgba(52,211,153,0.12)",  featured: false },
  api:       { icon: Plug,         color: "#F59E0B", bg: "rgba(245,158,11,0.1)",   glow: "rgba(245,158,11,0.12)",  featured: false },
  ecommerce: { icon: ShoppingCart, color: "#F472B6", bg: "rgba(244,114,182,0.1)",  glow: "rgba(244,114,182,0.12)", featured: false },
  elearning: { icon: GraduationCap,color: "#60A5FA", bg: "rgba(96,165,250,0.1)",   glow: "rgba(96,165,250,0.12)",  featured: false },
};

export function Services() {
  const t = useTranslations("services");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceKeys.map((key, i) => {
            const cfg = serviceConfig[key];
            const Icon = cfg.icon;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className={`group relative rounded-2xl p-7 border transition-all duration-300 overflow-hidden cursor-default ${
                  cfg.featured
                    ? "border-white/10 bg-white/[0.04]"
                    : "border-white/[0.06] bg-white/[0.02]"
                }`}
                style={cfg.featured ? {
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                } : {}}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = cfg.color + "50";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${cfg.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = cfg.featured
                    ? "inset 0 1px 0 rgba(255,255,255,0.06)"
                    : "";
                }}
              >
                {/* Featured badge */}
                {cfg.featured && (
                  <span
                    className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: cfg.bg, color: cfg.color }}
                  >
                    Core
                  </span>
                )}

                {/* Subtle corner glow */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: cfg.glow }}
                />

                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
                  style={{ background: cfg.bg }}
                >
                  <Icon size={22} strokeWidth={2} style={{ color: cfg.color }} />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-text mb-2 leading-snug">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {t(`items.${key}.description`)}
                </p>

                {/* Deliverable pill */}
                <div className="flex items-center gap-2 mt-auto">
                  <div
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: cfg.color }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: cfg.color + "CC" }}
                  >
                    {t(`items.${key}.deliverable`)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}