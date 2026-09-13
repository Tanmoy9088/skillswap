import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Providers from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://skillswap-mu-pied.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "SkillSwap+ | Learn, Teach & Exchange Skills",
    template: "%s | SkillSwap+",
  },

  description:
    "SkillSwap+ is a skill-sharing platform where you can learn new skills, teach what you know, discover mentors, and exchange knowledge with others.",

  keywords: [
    "SkillSwap+",
    "skill sharing",
    "learn skills",
    "teach skills",
    "skill exchange",
    "find mentors",
    "online mentors",
    "learn from mentors",
    "knowledge sharing",
  ],

  authors: [
    {
      name: "SkillSwap+",
    },
  ],

  creator: "SkillSwap+",
  publisher: "SkillSwap+",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "SkillSwap+",
    title: "SkillSwap+ | Learn, Teach & Exchange Skills",
    description:
      "Discover mentors, learn new skills, teach what you know, and exchange knowledge with SkillSwap+.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "SkillSwap+ - Learn, Teach & Exchange Skills",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SkillSwap+ | Learn, Teach & Exchange Skills",
    description:
      "Discover mentors, learn new skills, teach what you know, and exchange knowledge with SkillSwap+.",
    images: ["/images/og-image.png"],
  },

  icons: {
    icon: "/iconv3.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
