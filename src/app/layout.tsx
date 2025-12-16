import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Care4U - Sức khỏe và đặt lịch",
  description: "Nền tảng chăm sóc sức khỏe và đặt lịch hẹn",
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
