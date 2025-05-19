import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/utils/lenis";
import Footer from "@/components/Footer";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();

  const footerData =
    await client.getSingle<Content.SettingsDocument>("settings");

  return (
    <html lang="en">
      <ReactLenis root>
        <body
          className={`${instrumentSerif.variable} ${inter.variable} antialiased`}
        >
          {children}
          <Footer footerData={footerData.data} />
        </body>
      </ReactLenis>
    </html>
  );
}
