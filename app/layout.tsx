import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // ... Tu metadata SEO actual ...
  title: "CodeBerry | Client-Side Image Compressor & JSON Tool",
  description: "Secure, fast, and private image and JSON processing running 100% in your browser. Works offline (PWA).",
  keywords: ["image compression", "json formatter", "pwa", "offline", "client-side", "batch processing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* 🚀 ENLACE AL MANIFIESTO PWA (NUEVA LÍNEA CRÍTICA) */}
        <link rel="manifest" href="/manifest.json" />
        {/* Otros enlaces (como favicon) van aquí */}
      </head>
      <body className={inter.className}>
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}