"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { contactSchema, type ContactFormData } from "@/lib/validations";

const sectorKeys = ["fintech", "ecommerce", "elearning", "enterprise", "other"] as const;

const inputBase = [
  "w-full px-4 py-3 rounded-xl text-text text-sm placeholder-text-muted/35",
  "border border-white/[0.09] bg-[#0c1423]",
  "transition-all duration-200 outline-none",
  "focus:border-accent/50 focus:bg-[#0e1830]",
  "focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]",
].join(" ");

function Label({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 mb-2">
      <span className="text-[11px] font-semibold text-text-muted/60 uppercase tracking-[0.12em]">
        {children}
      </span>
      {optional && (
        <span className="text-[10px] text-text-muted/30 italic normal-case tracking-normal font-normal">
          opsiyonel
        </span>
      )}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-xs text-red-400/80 flex items-center gap-1.5"
    >
      <span>↳</span> {message}
    </motion.p>
  );
}

export function Contact() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { setStatus("success"); reset(); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[130px] opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #00D4FF 0%, #7B2FFF 50%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-accent/70 mb-4">
            {t("label")}
          </span>
          <h2 className="font-display font-bold text-section text-text mb-4">
            {t("title")}
          </h2>
          <p className="text-text-muted text-base leading-relaxed max-w-md mx-auto">
            {t("subtext")}
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          className="relative rounded-2xl border border-white/[0.08] overflow-hidden"
          style={{
            background: "linear-gradient(160deg, rgba(0,212,255,0.03) 0%, rgba(10,15,30,0.95) 50%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 40px 80px rgba(0,0,0,0.3)",
          }}
        >
          {/* Top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.7) 40%, rgba(123,47,255,0.7) 70%, transparent 100%)",
            }}
          />

          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">

              {/* SUCCESS */}
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-14 text-center gap-5"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                    style={{
                      background: "rgba(0,212,255,0.1)",
                      border: "1px solid rgba(0,212,255,0.3)",
                      boxShadow: "0 0 40px rgba(0,212,255,0.15)",
                    }}
                  >
                    ✓
                  </motion.div>
                  <div>
                    <p className="font-display font-bold text-2xl text-text mb-2">{t("success_title")}</p>
                    <p className="text-text-muted text-sm max-w-xs">{t("success")}</p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-xs text-accent/60 hover:text-accent transition-colors underline underline-offset-4"
                  >
                    {t("send_another")}
                  </button>
                </motion.div>

              ) : (
                /* FORM */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>{t("name")}</Label>
                      <input {...register("name")} className={inputBase} placeholder={t("name_placeholder")} />
                      <FieldError message={errors.name?.message} />
                    </div>
                    <div>
                      <Label>{t("email")}</Label>
                      <input type="email" {...register("email")} className={inputBase} placeholder={t("email_placeholder")} />
                      <FieldError message={errors.email?.message} />
                    </div>
                  </div>

                  {/* Company + Sector + Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                    <div>
                      <Label optional>Şirket</Label>
                      <input {...register("company")} className={inputBase} placeholder={t("company_placeholder")} />
                    </div>
                    <div>
                      <Label>Sektör</Label>
                      <div className="relative">
                        <select
                          {...register("sector")}
                          className={[inputBase, "appearance-none cursor-pointer pr-9"].join(" ")}
                          style={{ colorScheme: "dark" }}
                        >
                          <option value="" style={{ background: "#0c1423" }}>—</option>
                          {sectorKeys.map((key) => (
                            <option key={key} value={key} style={{ background: "#0c1423" }}>
                              {t(`sectors.${key}`)}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted/50">
                          <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
                            <path d="M1 1L5.5 5.5L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label optional>Bütçe</Label>
                      <input {...register("budget")} className={inputBase} placeholder={t("budget_placeholder")} />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label>{t("message")}</Label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className={inputBase + " resize-none"}
                      placeholder={t("message_placeholder")}
                    />
                    <FieldError message={errors.message?.message} />
                  </div>

                  {/* Error banner */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs text-red-400"
                        style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)" }}
                      >
                        <span>⚠</span> {t("error")}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                      background: isSubmitting
                        ? "rgba(0,212,255,0.25)"
                        : "linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)",
                      color: "#0A0F1E",
                      boxShadow: isSubmitting ? "none" : "0 0 30px rgba(0,212,255,0.2)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting)
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(0,212,255,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,212,255,0.2)";
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2.5">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-block w-4 h-4 border-2 border-primary/30 border-t-primary/80 rounded-full"
                        />
                        {t("submitting")}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        {t("submit")}
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          →
                        </motion.span>
                      </span>
                    )}
                  </button>

                  {/* Privacy */}
                  <p className="text-center text-text-muted/30 text-xs">
                    {t("privacy_note")}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}