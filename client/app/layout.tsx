import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext"
import { CartDrawer } from "@/components/CartDrawer"

export const metadata: Metadata = {
  title: "Briskk Apparels",
  description: "Briskk Apparels",
  icons:{
    icon: "/brisk-logo.jpeg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <CartProvider>
      <html lang="en">
        <body>
          {children}
          <CartDrawer />
        </body>
      </html>
    </CartProvider>

  );
}
