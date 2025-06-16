import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
    title: "Arcoiris Viajes - Tus sueños hechos realidad",
    description: "Explora destinos increíbles, ofertas exclusivas y planifica el viaje de tus sueños con nosotros.",
    icons: {
        icon: "/favicon.ico", // o PNG si preferís
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png", // 180x180
    },
    manifest: '/site.webmanifest',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {/* Main content area */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
