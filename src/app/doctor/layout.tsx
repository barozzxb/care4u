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
        <html lang="en">
            <body className={`h-screen w-full antialiased`}>
                <div className="flex min-h-screen w-full">
                    <aside className="w-64 min-w-56 bg-white shadow-lg border-r border-gray-200">
                        <SideBar />
                    </aside>
                    <section className="flex-1 bg-gray-50 p-6 overflow-auto">{children}</section>
                </div>
                <Footer />

            </body>
        </html>
    );
}
