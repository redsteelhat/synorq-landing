import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Script from "next/script";
import GaPageView from "@/components/analytics/GaPageView";

export const metadata: Metadata = {
  metadataBase: new URL("https://synorq.com"),
  title: {
    default: "Synorq | AI-Powered Software Solutions",
    template: "%s | Synorq",
  },
  description:
    "Yazılım geliştirme ajansı ve SaaS ürün şirketi. Fintech, e-ticaret, e-öğrenme ve kurumsal sektörlere özel yazılım çözümleri.",
  keywords: [
    "yazılım ajansı",
    "saas",
    "fintech",
    "e-ticaret",
    "ai yazılım",
    "software company turkey",
  ],
  openGraph: {
    type: "website",
    url: "https://synorq.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://synorq.com",
    languages: {
      tr: "https://synorq.com",
      en: "https://synorq.com/en",
    },
  },
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {/* GA4: Load gtag.js */}
      {GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;

              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                anonymize_ip: true,
                send_page_view: true
              });
            `}
          </Script>
        </>
      ) : null}

      {/* next-intl provider */}
      <NextIntlClientProvider messages={messages}>
        {/* SPA route changes → page_view */}
        {GA_ID ? <GaPageView gaId={GA_ID} /> : null}
        {children}
      </NextIntlClientProvider>
    </>
  );
}