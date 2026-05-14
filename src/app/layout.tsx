import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LUXE HARDWARE — Premium Sanitary & Hardware Showroom",
  description:
    "Experience the future of luxury sanitary and hardware design. Explore our curated collection of premium faucets, fixtures, and architectural hardware in an immersive 3D showroom.",
  keywords: "luxury hardware, premium faucets, sanitary ware, bathroom fixtures, kitchen hardware, showroom",
  openGraph: {
    title: "LUXE HARDWARE — Premium Sanitary & Hardware Showroom",
    description: "Immersive 3D luxury hardware showroom experience",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@100;200;300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
