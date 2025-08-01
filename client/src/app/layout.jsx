import { Geist, Geist_Mono, DM_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ['400'],
});

export const metadata = {
  title: "Paggio",
  description: "Biblioteca Pessoal Online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmMono.variable} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
