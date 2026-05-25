import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://cashflinch.com"),

  title: "CashFlinch — Are your finances secretly destroying you?",
  description:
    "Behavioral finance diagnosis. Find out your Burn Score and exactly how cooked your money situation really is.",

  openGraph: {
    title: "CashFlinch — Are your finances secretly destroying you?",
    description:
      "Behavioral finance diagnosis. Find out your Burn Score and exactly how cooked your money situation really is.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "CashFlinch — Behavioral Finance Report",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CashFlinch — Are your finances secretly destroying you?",
    description:
      "Behavioral finance diagnosis. Find out your Burn Score and exactly how cooked your money situation really is.",
    images: ["/og-image.svg"],
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