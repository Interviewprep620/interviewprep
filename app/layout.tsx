import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InterviewPrep",
  description: "Practice interviews and improve your skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}