"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  CalendarDays,
  Clock,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Hourglass,
} from "lucide-react";
import {
  getMyAppointments,
  cancelAppointmentById,
  Appointment,
} from "@/services/appointment/appointmentService";

export default function ManageAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    const result = await getMyAppointments();

    if (result.success) {
      setAppointments(result.data || []);
    } else {
      toast.error(result.message || "Không tải được danh sách lịch hẹn");
      if (result.code === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    setLoading(false);
  };

  const cancelAppointment = async (id: number) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn hủy lịch hẹn này không?"
    );
    if (!confirmed) return;

    const result = await cancelAppointmentById(id);

    if (result.success) {
      toast.success(result.message || "Hủy lịch hẹn thành công");
      fetchAppointments();
    } else {
      toast.error(result.message || "Không thể hủy lịch hẹn");
      if (result.code === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          bg: "bg-amber-50",
          border: "border-amber-300",
          text: "text-amber-900",
          icon: Hourglass,
          label: "Chờ xác nhận",
        };
      case "CONFIRMED":
        return {
          bg: "bg-green-50",
          border: "border-green-300",
          text: "text-green-900",
          icon: CheckCircle,
          label: "Đã xác nhận",
        };
      case "CANCELLED":
        return {
          bg: "bg-red-50",
          border: "border-red-300",
          text: "text-red-900",
          icon: XCircle,
          label: "Đã hủy",
        };
      case "COMPLETED":
        return {
          bg: "bg-blue-50",
          border: "border-blue-300",
          text: "text-blue-900",
          icon: CheckCircle,
          label: "Đã khám xong",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-300",
          text: "text-gray-900",
          icon: Hourglass,
          label: status,
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-700"></div>
          <p className="mt-4 text-gray-700 font-medium">
            Đang tải danh sách lịch hẹn...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="pt-24 pb-12 max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Quản lý lịch hẹn khám bệnh
          </h1>
          <p className="mt-1 text-gray-600">
            Xem và theo dõi các lịch hẹn của bạn
          </p>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-16 text-center">
            <CalendarDays className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Bạn chưa có lịch hẹn nào
            </h3>
            <p className="text-gray-600 mb-8">
              Vui lòng đặt lịch khám để theo dõi tình trạng sức khỏe
            </p>
            <button
              onClick={() => (window.location.href = "/patient/doctors")}
              className="px-6 py-3 bg-blue-700 text-white font-medium rounded hover:bg-blue-800 transition-colors"
            >
              Đặt lịch khám
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((apt) => {
              const status = getStatusStyle(apt.status);
              const Icon = status.icon;

              return (
                <div
                  key={apt.id}
                  className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:border-gray-400 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Lịch hẹn số {apt.id}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border ${status.border} ${status.bg} ${status.text}`}
                          >
                            <Icon className="w-4 h-4" />
                            {status.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Bác sĩ:{" "}
                          <span className="font-medium text-gray-800">
                            {apt.doctorName}
                          </span>
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            router.push(`/patient/appointment/${apt.id}`)
                          }
                          className="px-5 py-2.5 bg-blue-700 text-white text-sm font-medium rounded hover:bg-blue-800 transition-colors"
                        >
                          Xem chi tiết
                        </button>
                        {apt.status === "PENDING" && (
                          <button
                            onClick={() => cancelAppointment(apt.id)}
                            className="px-5 py-2.5 bg-red-700 text-white text-sm font-medium rounded hover:bg-red-800 transition-colors"
                          >
                            Hủy lịch
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm border-t border-gray-200 pt-5">
                      <div className="flex items-center gap-3">
                        <CalendarDays className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Ngày khám</p>
                          <p className="font-medium text-gray-900">
                            {new Date(apt.date).toLocaleDateString("vi-VN", {
                              weekday: "long",
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Giờ khám</p>
                          <p className="font-medium text-gray-900">
                            {apt.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Địa điểm</p>
                          <p className="font-medium text-gray-900">
                            {apt.place}
                          </p>
                        </div>
                      </div>
                    </div>

                    {apt.notes && (
                      <div className="mt-5 pt-5 border-t border-gray-200">
                        <div className="flex items-start gap-3 text-sm">
                          <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-700">
                              Ghi chú
                            </p>
                            <p className="text-gray-800 mt-1 leading-relaxed">
                              {apt.notes}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}