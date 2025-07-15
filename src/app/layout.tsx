import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/layout/navbar";
import { ToastProvider } from "../components/animations/toast";
import { LikedItemsProvider } from "@/context/LikedItemsContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Funiro | Landing Page",
  description: "A place to find your next favorite furniture",
  icons: {
    icon: "/images/furniro_logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <LikedItemsProvider>
          <Navbar />
          <ToastProvider />
          <div className="lg:pt-[76px] pt-[65px]">{children}</div>
        </LikedItemsProvider>
      </body>
    </html>
  );
}
