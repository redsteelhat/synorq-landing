"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Products() {
  const t = useTranslations("products");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const features = t.raw("goldrisk.features") as string[];

  return (
    <section
      id="products"
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">

          {/* GoldRisk AI — geniş kart (3/5) */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-3 group relative rounded-2xl border border-white/10 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(10,15,30,0.8) 60%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.35)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 50px rgba(0,212,255,0.12), inset 0 1px 0 rgba(255,255,255,0.07)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "inset 0 1px 0 rgba(255,255,255,0.07)";
            }}
          >
            {/* Top glow */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)",
              }}
            />

            {/* Background orb */}
            <div
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #00D4FF, transparent 70%)" }}
            />

            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
              {/* Tags row */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-text-muted/70 font-medium">
                  {t("goldrisk.tag")}
                </span>
                <span
                  className="text-xs px-3 py-1 rounded-full font-semibold border"
                  style={{
                    background: "rgba(0,212,255,0.12)",
                    color: "#00D4FF",
                    borderColor: "rgba(0,212,255,0.3)",
                  }}
                >
                  {t("goldrisk.badge")}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-display font-bold text-3xl text-text mb-1 leading-tight">
                {t("goldrisk.name")}
              </h3>

              {/* Result line */}
              <p
                className="text-sm font-semibold mb-4"
                style={{ color: "#00D4FF" }}
              >
                {t("goldrisk.result")}
              </p>

              {/* Description */}
              <p className="text-text-muted text-sm leading-relaxed mb-7 max-w-md">
                {t("goldrisk.description")}
              </p>

              {/* Features grid */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-text-muted">
                    <span
                      className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold"
                      style={{
                        background: "rgba(0,212,255,0.15)",
                        color: "#00D4FF",
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto">
                <a
                  href="mailto:hello@synorq.com?subject=GoldRisk AI Demo"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                  style={{
                    background: "linear-gradient(135deg, #00D4FF, #0099CC)",
                    color: "#0A0F1E",
                    boxShadow: "0 0 24px rgba(0,212,255,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 40px rgba(0,212,255,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 24px rgba(0,212,255,0.25)";
                  }}
                >
                  {t("goldrisk.cta")}
                  <span>→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Coming Soon — dar kart (2/5) */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
            className="lg:col-span-2 relative rounded-2xl border border-white/[0.06] border-dashed overflow-hidden flex flex-col"
            style={{
              background: "rgba(255,255,255,0.015)",
            }}
          >
            {/* Purple tint orb */}
            <div
              className="absolute bottom-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, #7B2FFF, transparent 70%)" }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center flex-1 p-8 text-center gap-4">
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: "rgba(123,47,255,0.12)" }}
              >
                🧵
              </div>

              {/* Sector badge */}
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border"
                style={{
                  background: "rgba(123,47,255,0.1)",
                  color: "#A78BFA",
                  borderColor: "rgba(123,47,255,0.25)",
                }}
              >
                {t("coming_soon_sector")}
              </span>

              <div>
                <p className="text-text font-display font-semibold text-lg mb-2">
                  {t("coming_soon")}
                </p>
                <p className="text-text-muted/70 text-sm leading-relaxed max-w-[220px]">
                  {t("coming_soon_description")}
                </p>
              </div>

              {/* Notify CTA */}
              <a
                href="mailto:hello@synorq.com?subject=Ürün Güncelleme"
                className="mt-2 text-xs font-medium border border-white/10 px-4 py-2.5 rounded-xl text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-200"
              >
                {t("coming_soon_notify")}
              </a>
            </div>

            {/* Bottom pulse bar */}
            <div className="relative h-1 w-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 w-1/2 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(123,47,255,0.6), transparent)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}