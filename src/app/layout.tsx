import { Providers } from "@/components/layout/Providers";
import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aniden - Anime Streaming",
  description: "Anime discovery and streaming platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>

      <body className="flex flex-col bg-(--background) text-(--text-primary)">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
