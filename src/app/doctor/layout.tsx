import type { Metadata } from "next";
import "../globals.css";
import "./doctor.css";
import DoctorLayoutClient from "./DoctorLayoutClient";

export const metadata: Metadata = {
    title: "Care4U - Trang chủ bác sĩ",
    description: "Nền tảng chăm sóc sức khỏe và đặt lịch hẹn",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`h-screen w-full antialiased`}>
            <DoctorLayoutClient>{children}</DoctorLayoutClient>

        </div>
    );
}
