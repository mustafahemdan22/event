import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LocaleProvider } from "@/context/LocaleContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Event - Modern Fashion eCommerce",
  description: "Discover the latest trends in fashion for Men, Women & Kids. Shop premium apparel, shoes, and accessories.",
  keywords: "fashion, clothing, men, women, kids, shoes, accessories, online shopping",
};

import { ConvexClientProvider } from "@/components/ConvexClientProvider";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <ThemeProvider>
            <LocaleProvider>
              <CartProvider>
                <WishlistProvider>
                  <div className="app-wrapper" style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    minHeight: '100vh' 
                  }}>
                    <Header />
                    <main style={{ flex: 1 }}>
                      {children}
                    </main>
                    {modal}
                    <Footer />
                  </div>
                </WishlistProvider>
              </CartProvider>
            </LocaleProvider>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
