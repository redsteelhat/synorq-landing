"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { contactSchema, type ContactFormData } from "@/lib/validations";

const sectorKeys = ["fintech", "ecommerce", "elearning", "enterprise", "other"] as const;

export function Contact() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-content mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-display font-bold text-section text-center mb-4"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
          className="text-text-muted text-center mb-12"
        >
          {t("subtext")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="glass-card p-8 border border-border"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                {t("name")}
              </label>
              <input
                id="name"
                {...register("name")}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text placeholder-text-muted/50 focus:border-accent focus:outline-none transition-colors"
                placeholder={t("name")}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                {t("email")}
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text placeholder-text-muted/50 focus:border-accent focus:outline-none transition-colors"
                placeholder={t("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                {t("message")}
              </label>
              <textarea
                id="message"
                {...register("message")}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text placeholder-text-muted/50 focus:border-accent focus:outline-none transition-colors resize-none"
                placeholder={t("message")}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
              )}
            </div>
            <details className="group">
              <summary className="text-sm text-text-muted cursor-pointer hover:text-accent transition-colors">
                + {t("company")} / {t("sector")} / {t("budget")}
              </summary>
              <div className="mt-4 space-y-4 pt-4 border-t border-border">
                <div>
                  <label htmlFor="company" className="block text-sm text-text-muted mb-1">
                    {t("company")}
                  </label>
                  <input
                    id="company"
                    {...register("company")}
                    className="w-full px-4 py-2 rounded-lg bg-surface border border-border text-text placeholder-text-muted/50 focus:border-accent focus:outline-none transition-colors text-sm"
                    placeholder={t("company")}
                  />
                </div>
                <div>
                  <label htmlFor="sector" className="block text-sm text-text-muted mb-1">
                    {t("sector")}
                  </label>
                  <select
                    id="sector"
                    {...register("sector")}
                    className="w-full px-4 py-2 rounded-lg bg-surface border border-border text-text focus:border-accent focus:outline-none transition-colors text-sm"
                  >
                    {sectorKeys.map((key) => (
                      <option key={key} value={key}>
                        {t(`sectors.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm text-text-muted mb-1">
                    {t("budget")}
                  </label>
                  <input
                    id="budget"
                    {...register("budget")}
                    className="w-full px-4 py-2 rounded-lg bg-surface border border-border text-text placeholder-text-muted/50 focus:border-accent focus:outline-none transition-colors text-sm"
                    placeholder={t("budget")}
                  />
                </div>
              </div>
            </details>
            {status === "success" && (
              <p className="text-accent text-sm">{t("success")}</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm">{t("error")}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 rounded-lg bg-accent text-primary font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? "..." : t("submit")}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
