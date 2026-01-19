import React from "react";
import type { Metadata } from "next";
import { Karla } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { CalendlyProvider } from '@/components/providers/calendly-provider';
import { CalendlyModal } from '@/components/organisms/calendly-modal';
import { hasLocale } from "next-intl";
import "./globals.css";

const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-karla",
});

export const metadata: Metadata = {
  title: "Portfolio | Développeur Web",
  description: "Portfolio moderne présentant mes projets et compétences en développement web",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${karla.className} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CalendlyProvider>
            {children}
            <CalendlyModal />
          </CalendlyProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
