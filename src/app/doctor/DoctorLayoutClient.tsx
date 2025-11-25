"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const nav = [
  { href: "/doctor", label: "Dashboard" },
  { href: "/doctor/appointments", label: "Appointments" },
  { href: "/doctor/records/new", label: "Medical Record" },
  { href: "/doctor/prescriptions/new", label: "Prescribe Drugs" },
  { href: "/doctor/profile", label: "My Profile" },
];

export default function DoctorLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth("DOCTOR");

  if (loading) return <div className="p-6">Loading...</div>;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r bg-white">
        <div className="p-4 font-semibold">Care4U Doctor</div>
        <nav className="flex flex-col gap-1 p-2">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              {i.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="p-6 bg-gray-50">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Doctor Workspace</h1>
          <div className="text-sm text-gray-500">
            {user?.firstname} {user?.lastname}
          </div>
        </header>
        <section className="bg-white rounded-xl shadow-sm p-4">
          {children}
        </section>
      </main>
    </div>
  );
}
