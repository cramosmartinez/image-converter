import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeBerry | Client-Side Image Compressor",
  description: "Secure, fast, and private image compression running 100% in your browser using WebAssembly. No servers involved.",
  keywords: ["image compression", "webassembly", "nextjs", "privacy", "client-side"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <div className="pt-16"> {/* Espacio para el navbar fijo */}
          {children}
        </div>
      </body>
    </html>
  );
}