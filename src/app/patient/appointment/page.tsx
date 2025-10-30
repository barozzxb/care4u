"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Clock } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Dữ liệu giả (mock)
 */
const mockDoctorsByHospital: Record<string, any[]> = {
  "Bệnh viện Đa khoa Tâm Anh": [
    {
      id: 1,
      name: "TS.BS Nguyễn Văn A",
      schedule: ["Thứ 2: 8h-12h", "Thứ 4: 14h-18h", "Thứ 6: 8h-12h"],
    },
  ],
  "Bệnh viện FV": [
    {
      id: 3,
      name: "PGS.TS Trần Thị B",
      schedule: ["Thứ 3: 8h-12h", "Thứ 6: 14h-18h"],
    },
  ],
};

// Lịch dự phòng nếu bác sĩ không tìm thấy
const fallbackSchedule = ["Thứ 2: 9h-10h", "Thứ 3: 10h-11h", "Thứ 5: 14h-15h"];

export default function AppointmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const doctorName = searchParams.get("doctor") || "Bác sĩ";
  const hospitalName = searchParams.get("hospital") || "Bệnh viện";

  const doctors = mockDoctorsByHospital[hospitalName] || [];
  const foundDoctor = doctors.find((d) => d.name === doctorName);
  const schedule = foundDoctor ? foundDoctor.schedule : fallbackSchedule;

  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleSubmit = () => {
    if (!patientName || !patientPhone || !selectedSlot) {
      alert("Vui lòng nhập tên, số điện thoại và chọn thời gian.");
      return;
    }

    console.log({
      doctor: doctorName,
      hospital: hospitalName,
      patientName,
      patientPhone,
      slot: selectedSlot,
    });

    alert(`Đặt lịch thành công với ${doctorName} — ${selectedSlot}`);
    router.push("/patient/doctors");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Nút quay lại */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium"
      >
        <ArrowLeft size={18} /> Quay lại
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-3xl mx-auto text-center mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">Đặt lịch khám</h1>
        <p className="mt-2 text-gray-700">
          Bác sĩ: <span className="font-semibold">{doctorName}</span>
        </p>
        <p className="text-gray-500">
          Cơ sở: <span className="font-medium">{hospitalName}</span>
        </p>
        {!foundDoctor && (
          <p className="mt-2 text-sm text-amber-600">
            Lưu ý: đang dùng dữ liệu giả (fallback schedule).
          </p>
        )}
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 space-y-6"
      >
        {/* Tên bệnh nhân */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên bệnh nhân</label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition shadow-sm">
            <User size={16} className="text-gray-400" />
            <input
              className="w-full outline-none text-gray-700"
              placeholder="Nhập tên"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
        </div>

        {/* Số điện thoại */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
          <input
            type="tel"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            placeholder="Nhập số điện thoại"
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
          />
        </div>

        {/* Chọn giờ khám */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Chọn thời gian khám</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {schedule.map((slot: string) => (
              <motion.button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  flex items-center justify-center gap-2 p-4 rounded-2xl border font-medium text-sm shadow-md transition
                  ${selectedSlot === slot
                    ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white border-blue-600 shadow-lg"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300"
                  }
                `}
              >
                <Clock size={16} />
                <span>{slot}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Nút xác nhận */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="w-full mt-4 px-5 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full font-semibold shadow-lg"
        >
          Xác nhận đặt lịch
        </motion.button>
      </motion.div>
    </div>
  );
}
