import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
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

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
