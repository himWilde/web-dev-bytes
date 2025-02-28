import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

import Nav from "./components/nav";
import { title, wrapper } from "./styles";

const kanitSans = Kanit({
  variable: "--font-kanit-sans",
  subsets: ["latin"],
  weight: ["100", "300", "700"],
});

export const metadata: Metadata = {
  title: "Web Dev Bytes",
  description: "Consume web development knowledge on byte at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanitSans.variable} font-sans text-lg antialiased`}
      >
        <div className={wrapper}>
          <h1 className={title}>Web Dev Bytes</h1>
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
