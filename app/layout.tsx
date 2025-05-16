import { Instrument_Serif } from "next/font/google";
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
        <body className={`${instrumentSerif.variable} antialiased`}>
          {children}
          <Footer footerData={footerData.data} />
        </body>
      </ReactLenis>
    </html>
  );
}
