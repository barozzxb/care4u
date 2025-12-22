"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  getAppointmentById,
  cancelAppointmentById,
  Appointment,
} from "@/services/appointment/appointmentService";

export default function AppointmentDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      const result = await getAppointmentById(Number(id));

      if (result.success && result.data) {
        setAppointment(result.data);
      } else {
        toast.error(result.message || "Không thể tải chi tiết lịch hẹn");
        
        if (result.code === 401) {
          localStorage.clear();
          router.push("/login");
        } else {
          router.push("/patient/manageappointment");
        }
      }

      setLoading(false);
    };

    fetchDetail();
  }, [id, router]);

  const handleCancelAppointment = async () => {
    if (!appointment) return;

    if (confirm("Bạn có chắc chắn muốn hủy lịch hẹn này không?")) {
      const result = await cancelAppointmentById(appointment.id);

      if (result.success) {
        toast.success("Hủy lịch hẹn thành công");
        router.push("/patient/manageappointment");
      } else {
        toast.error(result.message || "Không thể hủy lịch hẹn");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-300";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Chờ xác nhận";
      case "CONFIRMED":
        return "Đã xác nhận";
      case "COMPLETED":
        return "Hoàn thành";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Đang tải chi tiết lịch hẹn...</div>
      </div>
    );
  }

  if (!appointment) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Chi tiết lịch hẹn</h1>
        <p className="text-gray-600 mb-8">Thông tin chi tiết về buổi khám của bạn</p>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/25 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{appointment.doctorName}</h2>
                <p className="text-blue-100 text-sm mt-1">Bác sĩ khám bệnh</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Ngày khám</p>
                  <p className="text-xl font-semibold text-gray-900 mt-1">{appointment.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Giờ khám</p>
                  <p className="text-xl font-semibold text-gray-900 mt-1">{appointment.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Địa điểm</p>
                  <p className="text-xl font-semibold text-gray-900 mt-1">{appointment.place}</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Trạng thái</p>
                  <span className={`inline-block mt-1 px-5 py-2 rounded-full text-sm font-semibold border ${getStatusBadge(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-3">Ghi chú</p>
                  <p className="text-gray-800 leading-relaxed text-base">
                    {appointment.notes || "Không có ghi chú"}
                  </p>
                </div>
              </div>
            </div>

            {appointment.status === "PENDING" && (
              <div className="border-t pt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.back()}
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  Quay lại
                </button>
                <button
                  onClick={handleCancelAppointment}
                  className="flex-1 px-6 py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
                >
                  Hủy lịch hẹn
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}