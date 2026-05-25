import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "CashFlinch — Are your finances secretly destroying you?",
  description:
    "Behavioral finance diagnosis. Find out your Burn Score and exactly how cooked your money situation really is.",

  openGraph: {
    title: "CashFlinch — Are your finances secretly destroying you?",
    description:
      "Behavioral finance diagnosis. Find out your Burn Score and exactly how cooked your money situation really is.",
    url: "https://cashflinch.com",
    siteName: "CashFlinch",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CashFlinch — Behavioral Finance Report",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CashFlinch — Are your finances secretly destroying you?",
    description:
      "Behavioral finance diagnosis. Find out your Burn Score and exactly how cooked your money situation really is.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
