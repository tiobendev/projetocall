import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AGENDAR CALL",
  description: "App para agendar reuniões no Google Meet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-google-analytics-opt-out="" cz-shortcut-listen="true">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased vsc-initialized`}
      >
        {children}
      </body>
    </html>
  );
}
