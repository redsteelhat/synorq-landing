"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = t.raw("items") as Array<{ name: string; role: string; quote: string }>;

  return (
    <section
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

        {/* Metric bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 text-center"
        >
          <span className="text-text font-medium">{t("metric_projects")}</span>
          <span className="text-border">|</span>
          <span className="text-text font-medium">{t("metric_sectors")}</span>
          <span className="text-border">|</span>
          <span className="text-text font-medium">{t("metric_countries")}</span>
        </motion.div>

        {/* Quote cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, borderColor: "rgba(0,212,255,0.4)" }}
              className="glass-card p-8 border border-border hover:border-accent/40 transition-colors duration-200"
            >
              <p className="text-text-muted italic mb-6">&ldquo;{item.quote}&rdquo;</p>
              <div>
                <p className="font-display font-semibold text-text">{item.name}</p>
                <p className="text-text-muted text-sm">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
