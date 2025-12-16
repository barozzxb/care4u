import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../globals.css";
import "./doctor.css";
import DoctorLayoutClient from "./DoctorLayoutClient";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Care4U - Trang chủ bác sĩ",
  description: "Nền tảng chăm sóc sức khỏe và đặt lịch hẹn",
};

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DoctorLayoutClient>{children}</DoctorLayoutClient>;
}
