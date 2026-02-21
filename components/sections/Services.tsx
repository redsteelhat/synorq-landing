"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const serviceKeys = ["custom", "ai", "saas", "api", "ecommerce", "elearning"] as const;
const icons: Record<string, string> = {
  custom: "💻",
  ai: "🤖",
  saas: "📦",
  api: "🔌",
  ecommerce: "🛒",
  elearning: "🎓",
};

export function Services() {
  const t = useTranslations("services");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, borderColor: "rgba(0,212,255,0.4)" }}
              className="glass-card p-8 border border-border hover:border-accent/40 transition-colors duration-200"
            >
              <span className="text-3xl mb-4 block">{icons[key]}</span>
              <h3 className="font-display font-semibold text-xl text-text mb-3">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
