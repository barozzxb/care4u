"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Phone, MapPin, Clock, ArrowLeft, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { getMyAppointments, cancelAppointmentById } from "@/services/appointment/appointmentService";

interface Appointment {
  id: number;
  doctorName: string;
  place: string;
  patientName: string;
  patientPhone: string;
  time: string;
  date: string;
  status: string;
}

export default function ViewAppointmentPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);

      const result = await getMyAppointments();

      if (result.success && result.data) {
        const sorted = result.data.sort(
          (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setAppointments(sorted);
      } else {
        if (result.code === 401) {
          alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          router.push("/login");
          return;
        }
        setError(result.message || "Không thể tải danh sách lịch hẹn");
      }
      setLoading(false);
    };

    fetchAppointments();
  }, [router]);

  const handleCancel = async (id: number) => {
    if (!confirm("Bạn có chắc muốn hủy lịch hẹn này?")) return;

    const result = await cancelAppointmentById(id);

    if (result.success) {
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      alert("Đã hủy lịch hẹn thành công!");
    } else {
      if (result.code === 401) {
        alert("Phiên đăng nhập hết hạn. Đang chuyển về trang đăng nhập...");
        router.push("/login");
      } else {
        alert(result.message || "Không thể hủy lịch hẹn");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-10 animate-pulse"></div>
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lỗi tải dữ liệu</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-12 inline-block"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar size={48} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Chưa có lịch hẹn</h2>
            <p className="text-gray-600 mb-8">Bạn chưa đặt lịch khám nào.</p>
            <button
              onClick={() => router.push("/patient/viewdepartment")}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Đặt lịch ngay
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" />
          Quay lại
        </motion.button>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Lịch hẹn của tôi
          </h1>
          <p className="mt-2 text-gray-600">Quản lý và theo dõi các buổi khám đã đặt</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {appointments.map((appt, index) => (
            <motion.div
              key={appt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-4 text-white">
                <h3 className="text-lg font-bold">{appt.doctorName}</h3>
                <p className="text-xs opacity-90 flex items-center gap-1 mt-1">
                  <MapPin size={12} />
                  {appt.place}
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bệnh nhân</p>
                    <p className="font-medium">{appt.patientName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <Phone size={16} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p className="font-medium">{appt.patientPhone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Thời gian khám</p>
                    <p className="font-medium text-purple-700">{appt.time}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar size={14} />
                    Đặt ngày: <span className="font-medium">{appt.date}</span>
                  </p>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    {appt.status}
                  </span>
                </div>
              </div>

              <div className="px-6 pb-5">
                <button
                  onClick={() => handleCancel(appt.id)}
                  className="w-full py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 group"
                >
                  <AlertCircle size={16} className="group-hover:rotate-12 transition" />
                  Hủy lịch hẹn
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/patient/viewdepartment")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Đặt lịch khám mới
          </motion.button>
        </div>
      </div>
    </div>
  );
}