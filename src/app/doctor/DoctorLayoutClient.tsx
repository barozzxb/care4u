"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";

const nav = [
  { href: "/doctor", label: "Dashboard" },
  { href: "/doctor/appointments", label: "Appointments" },
  { href: "/doctor/records", label: "Medical Record" },
  { href: "/doctor/prescriptions", label: "Prescriptions" },
  { href: "/doctor/prescriptions/new", label: "New Prescription" },
  { href: "/doctor/profile", label: "My Profile" },
];

export default function DoctorLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth("DOCTOR");
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // cuộn xuống (và đã qua 80px) -> ẩn navbar
      if (currentY > lastScrollY + 10 && currentY > 80) {
        setIsNavHidden(true);
      }

      // cuộn lên -> hiện navbar
      if (currentY < lastScrollY - 10) {
        setIsNavHidden(false);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-br 
      from-pink-200 from-10% 
      via-white via-30% 
      to-blue-200 to-100%"
    >
      <header
        className={`sticky top-0 z-40 bg-transparent backdrop-blur 
              transition-transform duration-300
              ${isNavHidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="mx-auto max-w-7xl">
          <NavBar />
        </div>
      </header>

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        {/* SIDEBAR – luôn render, animate bằng class */}
        <aside
          className={`hidden md:flex flex-col bg-transparent backdrop-blur-sm
          overflow-hidden transition-all duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "w-64 opacity-100 translate-x-0"
              : "w-0 opacity-0 -translate-x-6 pointer-events-none"
          }`}
        >
          <div className="px-6 py-6 flex items-center justify-between">
            <div>
              <h2
                className="text-2xl font-extrabold 
               bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400
               bg-clip-text text-transparent tracking-wide
               whitespace-nowrap"
              >
                {"Care4U\u00a0-\u00a0Doctor"}
              </h2>

              <p className="text-[14px] text-gray-600 mt-2 italic">
                Quản lý lịch khám và hồ sơ bệnh nhân
              </p>
            </div>

            {/* nút đóng sidebar */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Ẩn sidebar"
              className="ml-2 text-3xl text-slate-600 hover:text-slate-900 
                         transition-transform duration-300 hover:scale-110"
            >
              <IoMenu />
            </button>
          </div>

          <nav className="flex-1 flex flex-col gap-1 p-3 text-[16px]">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 transition-all ${
                    active
                      ? "bg-blue-50 text-blue-600 font-semibold border border-blue-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* NỘI DUNG BÊN PHẢI */}
        <main className="flex-1 px-4 py-6 md:px-8 md:py-4">
          <div className="space-y-4">
            <header className="relative flex items-center justify-center py-2">
              {/* nút mở sidebar bên trái – chỉ hiện khi sidebar đang đóng */}
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Mở sidebar"
                  className="absolute left-0 ml-2 text-3xl text-slate-600 hover:text-slate-900 
                 transition-transform duration-300 hover:scale-110"
                >
                  <IoMenu />
                </button>
              )}

              {/* TITLE Ở GIỮA */}
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight">
                  Doctor Workspace
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Tổng quan lịch khám, hồ sơ và thông tin bệnh nhân của.
                </p>
              </div>

              {/* USER INFO BÊN PHẢI */}
              <div className="absolute right-0 mr-2 flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {user?.firstname} {user?.lastname}
                  </p>
                  <p className="text-xs text-gray-500">Doctor</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                  {user?.firstname?.[0] || "D"}
                </div>
              </div>
            </header>

            {/* Card lớn chứa nội dung page con */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6">
              {children}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
