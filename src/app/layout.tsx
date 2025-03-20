import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import { ClerkProvider } from '@clerk/nextjs';
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// Fonts setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Metadata
export const metadata: Metadata = {
  title: "KwikBuy 🛒",
  description: "Mzansi's premier e-commerce platform. Fast, affordable, and secure shopping experience.",
  keywords: ["KwikBuy", "South Africa", "E-commerce", "Online Shopping", "Secure Payments", "Fast Delivery"],
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <body className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">

            {/* Site Header */}
            <Header />

            {/* Page Content */}
            <main className="min-h-screen">{children}</main>

            {/* Footer */}
            <Footer />

          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
