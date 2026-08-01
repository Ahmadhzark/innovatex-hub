import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AmbientBackground } from "@/components/visuals/AmbientBackground";
import { SITE } from "@/data/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "robotics",
    "embedded systems",
    "ESP32",
    "Arduino",
    "IoT",
    "workshop",
    "InnovateX",
    "Team Science",
  ],
};

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen antialiased">
        <LanguageProvider>
          <AmbientBackground />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
