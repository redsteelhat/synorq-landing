"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function BackgroundMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern — daha belirgin */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Grid fade — kenarları sil */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #0A0F1E 100%)",
        }}
      />

      {/* Cyan orb — sol üst, daha güçlü */}
      <motion.div
        className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.35) 0%, rgba(0,212,255,0.1) 50%, transparent 70%)",
        }}
        animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Purple orb — sağ alt, daha güçlü */}
      <motion.div
        className="absolute -bottom-32 -right-20 w-[560px] h-[560px] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(123,47,255,0.35) 0%, rgba(123,47,255,0.1) 50%, transparent 70%)",
        }}
        animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Center glow — başlık arkası */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[700px] h-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,212,255,0.12) 0%, rgba(123,47,255,0.08) 50%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/60"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
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
    <motion.div variants={item} className="mt-8 w-full max-w-lg mx-auto">
      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <p className="text-text-muted/60 text-xs uppercase tracking-[0.2em] whitespace-nowrap">
          {t("trusted_by")}
        </p>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Metrics */}
      <div className="flex justify-center gap-0">
        {metrics.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col items-center px-8 py-2 ${
              i < metrics.length - 1
                ? "border-r border-border/40"
                : ""
            }`}
          >
            <span className="font-display font-bold text-2xl md:text-3xl text-accent tabular-nums leading-none">
              {m.value}
            </span>
            <span className="text-text-muted/70 text-xs mt-1.5 whitespace-nowrap">
              {m.label}
            </span>
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

      <div className="relative z-10 w-full max-w-content mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-accent/8 border border-accent/25 text-accent text-sm font-medium backdrop-blur-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              {t("badge")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-display font-extrabold tracking-tight text-text leading-[1.05]"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
          >
            <span className="block">{t("headline")}</span>
            <span
              className="block mt-2"
              style={{
                background: "linear-gradient(135deg, #00D4FF 0%, #7B2FFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 40px rgba(0,212,255,0.4))",
              }}
            >
              {t("headline_accent")}
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={item}
            className="text-text-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            {t("subline")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
          >
            {/* Primary */}
            <Link
              href="#contact"
              className="group relative px-9 py-4 rounded-xl font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #00D4FF, #0099CC)",
                color: "#0A0F1E",
                boxShadow: "0 0 40px rgba(0,212,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 70px rgba(0,212,255,0.5), inset 0 1px 0 rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 40px rgba(0,212,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)";
              }}
            >
              <span className="flex items-center justify-center gap-2.5">
                {t("cta_primary")}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
            </Link>

            {/* Secondary */}
            <Link
              href="#products"
              className="group px-9 py-4 rounded-xl border border-white/10 text-text/90 font-medium text-base backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:text-accent hover:bg-accent/5 hover:scale-[1.02]"
            >
              <span className="flex items-center justify-center gap-2">
                {t("cta_secondary")}
                <span className="opacity-50 group-hover:opacity-100 transition-opacity">↗</span>
              </span>
            </Link>
          </motion.div>

          <TrustBar t={t} />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0A0F1E)",
        }}
      />
    </section>
  );
}