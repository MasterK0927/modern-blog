import React, { Suspense, lazy } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";

const Navbar = lazy(() => import("@/components/navbar/Navbar"));
const Footer = lazy(() => import("@/components/footer/Footer"));

const NavbarFallback = () => <div style={{ height: '60px', width: '100%', background: 'rgba(0,0,0,0.05)' }}></div>;
const FooterFallback = () => <div style={{ height: '100px', width: '100%', background: 'rgba(0,0,0,0.05)' }}></div>;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Keshav Writes",
  description: "Writings are always greater than the sayings.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Suspense fallback={<NavbarFallback />}>
                    <Navbar />
                  </Suspense>
                  {children}
                  <Suspense fallback={<FooterFallback />}>
                    <Footer />
                  </Suspense>
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
