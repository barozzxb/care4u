import type { Metadata } from "next";
import "./admin.css"
import AdminClientLayout from "./clientLayout";

export const metadata: Metadata = {
  title: "Care4U - Trang chủ Admin",
  description: "Nền tảng chăm sóc sức khỏe và đặt lịch hẹn",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <AdminClientLayout children={children}/>
    );
}
