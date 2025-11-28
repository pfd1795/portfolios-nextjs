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

export const metadata: Metadata = {
  title: 'Pablo Diaz - Desarrollador',
  description: 'Desarrollador de aplicaciones web y móviles',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>{children}</div>

        <div id="sidebar-portal-root"></div> {/* z-10 */}
        <div id="modal-portal-root"></div> {/* z-20 */}
        <div id="popup-modal-portal-root"></div> {/* z-30 */}
        <div id="popup-portal-root"></div> {/* z-40 */}
      </body>
    </html>
  );
}
