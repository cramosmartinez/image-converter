import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";  // <--- ¡ESTA LÍNEA ES VITAL!

const inter = Inter({ subsets: ["latin"] }); // Configuramos la fuente

export const metadata: Metadata = {
  title: "ImageShrink | Compresor Seguro",
  description: "Comprime imágenes localmente sin subir nada a la nube.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}