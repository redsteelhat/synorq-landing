"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = ["step1", "step2", "step3"] as const;

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              className="relative"
            >
              <div className="glass-card p-8 border border-border h-full">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 text-accent font-display font-bold text-lg mb-6">
                  {i + 1}
                </span>
                <h3 className="font-display font-semibold text-xl text-text mb-3">
                  {t(`${step}.title`)}
                </h3>
                <p className="text-text-muted text-sm">
                  {t(`${step}.description`)}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
