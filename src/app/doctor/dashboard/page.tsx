"use client";

import { useEffect, useState } from "react";
import {
  PlusCircle,
  FilePlus,
  Search,
  User,
  CalendarCheck,
  FileText,
  Bell,
} from "lucide-react";
import Link from "next/link";

import { getDoctorDashboardStats } from "@/services/dashboardService";
import { DoctorDashboardStats } from "@/types/dashboard";
import { getTodayAppointments } from "@/services/appointmentService";
import { TodayAppointment } from "@/types/appointment";
import { getPendingMedicalRecords } from "@/services/medicalRecordService";
import { PendingMedicalRecord } from "@/types/medicalRecord";

export default function DoctorDashboardPage() {
  const [stats, setStats] = useState<DoctorDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<TodayAppointment[]>([]);
  const [pendingRecords, setPendingRecords] = useState<PendingMedicalRecord[]>(
    []
  );

  useEffect(() => {
    getDoctorDashboardStats().then((res) => {
      setStats(res.data);
      setLoading(false);
    });

    getTodayAppointments().then((res) => {
      setAppointments(res.data);
    });

    getPendingMedicalRecords().then((res) => {
      setPendingRecords(res.data);
    });
  }, []);

  if (loading) {
    return <div className="p-6">Đang tải...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
        <div className="lg:col-span-3 rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col gap-3">
            <QuickActionButton
              title="Tạo đơn thuốc"
              href="/doctor/prescriptions/new"
              icon={<PlusCircle />}
              color="blue"
            />

            <QuickActionButton
              title="Tạo hồ sơ bệnh án"
              href="/doctor/medical-records/new"
              icon={<FilePlus />}
              color="pink"
            />

            <QuickActionButton
              title="Tìm bệnh nhân"
              href="/doctor/patients"
              icon={<Search />}
              color="yellow"
            />

            <QuickActionButton
              title="Hồ sơ cá nhân"
              href="/doctor/profile"
              icon={<User />}
              color="indigo"
            />
          </div>
        </div>

        <div className="lg:col-span-7 rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            Tổng quan hôm nay
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <OverviewCard
              title="Lịch hẹn sắp tới"
              value={stats?.upcomingAppointments ?? 0}
              icon={<CalendarCheck />}
              gradient="from-blue-500/10 via-blue-400/5 to-transparent"
              color="blue"
              href="/doctor/appointments?today=true"
            />

            <OverviewCard
              title="Hồ sơ bệnh án"
              value={stats?.pendingRecords ?? 0}
              icon={<FileText />}
              gradient="from-pink-500/10 via-pink-400/5 to-transparent"
              color="pink"
              href="/doctor/medical-records?status=PENDING"
            />

            <OverviewCard
              title="Thông báo mới"
              value={stats?.newNotifications ?? 0}
              icon={<Bell />}
              gradient="from-yellow-400/20 via-yellow-300/10 to-transparent"
              color="yellow"
              href="/doctor/notifications"
            />
          </div>
        </div>
      </div>

      {/* ===== TODAY'S APPOINTMENTS ===== */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            Lịch hẹn hôm nay
          </h3>

          <Link
            href="/doctor/appointments"
            className="text-sm text-blue-600 hover:underline"
          >
            Xem tất cả
          </Link>
        </div>

        {appointments.length === 0 ? (
          <div className="text-sm text-gray-500">Không có lịch hẹn</div>
        ) : (
          <div className="space-y-3">
            {appointments.slice(0, 5).map((appt) => (
              <AppointmentRow key={appt.id} appt={appt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OverviewCard({
  title,
  value,
  icon,
  gradient,
  color,
  href,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  color: "blue" | "pink" | "yellow";
  href?: string;
}) {
  const content = (
    <div
      className={`relative flex flex-col justify-between rounded-2xl bg-gradient-to-br ${gradient} p-6 transition hover:scale-[1.01]`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${color}-500/10 text-${color}-600`}
      >
        {icon}
      </div>

      <div>
        <div className="mt-6 text-sm text-gray-500">{title}</div>
        <div className="mt-2 text-4xl font-semibold tracking-tight text-gray-900">
          {value}
        </div>
      </div>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

function AppointmentRow({ appt }: { appt: TodayAppointment }) {
  return (
    <div className="flex items-center justify-between rounded-xl border px-4 py-3 hover:bg-gray-50">
      <div className="flex items-center gap-4">
        <div className="text-sm font-semibold text-gray-700">{appt.time}</div>
        <div className="text-sm text-gray-800">{appt.patientName}</div>
      </div>

      <StatusBadge status={appt.status} />
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
}) {
  const map = {
    CONFIRMED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${map[status]}`}
    >
      {status}
    </span>
  );
}

function QuickActionButton({
  title,
  href,
  icon,
  color,
}: {
  title: string;
  href: string;
  icon: React.ReactNode;
  color: "blue" | "pink" | "yellow" | "indigo";
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-xl py-3 transition hover:bg-gray-50"
    >
      <div
        className={`flex h-10 items-center justify-center rounded-xl bg-${color}-500/10 text-${color}-600`}
      >
        {icon}
      </div>

      <span className="font-medium text-gray-800 group-hover:underline">
        {title}
      </span>
    </Link>
  );
}
