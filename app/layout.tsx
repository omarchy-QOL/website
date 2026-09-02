import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateMetadata(): Metadata {
  const baseUrl = new URL("https://omarchyqol.com");
  const description =
    "Plugins that make Omarchy easier to use without blowing up your system.";

  return {
    metadataBase: baseUrl,
    title: {
      default: "Omarchy QOL",
      template: "%s | Omarchy QOL",
    },
    description,
    icons: {
      icon: "/omarchy-wordmark.svg",
    },
    openGraph: {
      title: "Omarchy QOL",
      description,
      type: "website",
      url: baseUrl,
      images: [
        {
          url: new URL("/og-green.png", baseUrl),
          width: 1731,
          height: 909,
          alt: "Omarchy QOL — Quality-of-life plugin development",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Omarchy QOL",
      description,
      images: [new URL("/og-green.png", baseUrl)],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
