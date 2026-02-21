"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Products() {
  const t = useTranslations("products");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = t.raw("goldrisk.features") as string[];

  return (
    <section
      id="products"
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-content mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-display font-bold text-section text-center mb-16"
        >
          {t("title")}
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* GoldRisk AI card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{ y: -6, borderColor: "rgba(0,212,255,0.4)" }}
            className="glass-card p-8 border border-border hover:border-accent/40 transition-colors duration-200"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs text-accent font-medium">
                {t("goldrisk.tag")}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-accent/25 text-accent font-semibold border border-accent/40">
                {t("goldrisk.badge")}
              </span>
            </div>
            <h3 className="font-display font-bold text-2xl text-text mb-2">
              {t("goldrisk.name")}
            </h3>
            <p className="text-accent text-sm font-medium mb-3">
              {t("goldrisk.result")}
            </p>
            <p className="text-text-muted text-sm mb-6">
              {t("goldrisk.description")}
            </p>
            <ul className="space-y-2 mb-6">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                  <span className="text-accent">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="mailto:hello@synorq.com?subject=GoldRisk AI Demo"
              className="inline-flex items-center gap-2 text-accent font-medium hover:opacity-90 transition-opacity"
            >
              {t("goldrisk.cta")}
              <span>→</span>
            </a>
          </motion.div>

          {/* Coming Soon placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="glass-card p-8 border border-border border-dashed flex flex-col items-center justify-center min-h-[280px]"
          >
            <span className="text-4xl mb-4 opacity-50">🧵</span>
            <p className="text-text-muted font-medium mb-2">{t("coming_soon")}</p>
            <p className="text-text-muted/70 text-sm">{t("coming_soon_sector")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
