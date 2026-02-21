"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function BackgroundMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.15), transparent)",
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(123,47,255,0.15), transparent)",
        }}
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function TrustBar({ t }: { t: (key: string) => string }) {
  const metrics = [
    { value: t("trust_projects"), label: t("trust_projects_label") },
    { value: t("trust_sectors"), label: t("trust_sectors_label") },
    { value: t("trust_countries"), label: t("trust_countries_label") },
  ];
  return (
    <motion.div variants={item} className="mt-12 w-full max-w-2xl mx-auto">
      <p className="text-text-muted/80 text-sm mb-4">{t("trusted_by")}</p>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="flex flex-col items-center px-4 py-2 rounded-lg bg-surface/40 border border-border/50"
          >
            <span className="font-display font-bold text-accent text-lg">{m.value}</span>
            <span className="text-text-muted text-xs">{m.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundMesh />
      <div className="relative z-10 max-w-content mx-auto px-6 md:px-12 lg:px-24 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.span
            variants={item}
            className="inline-block px-4 py-2 rounded-full bg-surface/80 border border-border text-accent text-sm font-medium mb-6"
          >
            {t("badge")}
          </motion.span>
          <motion.h1
            variants={item}
            className="font-display font-extrabold text-hero tracking-tight text-text leading-tight mb-6"
          >
            {t("headline")}
            <br />
            <span className="gradient-text">{t("headline_accent")}</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            {t("subline")}
          </motion.p>
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#contact"
              className="px-8 py-3 rounded-lg bg-accent text-primary font-semibold hover:opacity-90 transition-opacity glow-cyan"
            >
              {t("cta_primary")}
            </Link>
            <Link
              href="#products"
              className="px-8 py-3 rounded-lg border border-border text-text hover:border-accent hover:text-accent transition-colors font-medium"
            >
              {t("cta_secondary")}
            </Link>
          </motion.div>
          <TrustBar t={t} />
        </motion.div>
      </div>
    </section>
  );
}
