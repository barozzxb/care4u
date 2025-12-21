"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/services/apiClients";
import { motion } from "framer-motion";
import { Stethoscope, Calendar, Clock, Award } from "lucide-react";

export default function DoctorsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const departmentId = searchParams.get("department") || "";

  const [doctors, setDoctors] = useState<any[]>([]);
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!departmentId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    apiClient
      .get(`/api/departments/${departmentId}/doctors`)
      .then((res) => setDoctors(res.data || []))
      .catch((err) => console.error("Error fetching doctors:", err));

    apiClient
      .get(`/api/departments`)
      .then((res) => {
        const dept = res.data.find((d: any) => d.id === departmentId);
        if (dept) setDepartmentName(dept.name);
      })
      .catch((err) => console.error("Error fetching department info:", err))
      .finally(() => setLoading(false));
  }, [departmentId]);

  if (!departmentId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 flex items-center justify-center">
        <p className="text-gray-500 text-base">Vui lòng chọn chuyên khoa</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">

      <motion.button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 text-base"
      >
        &larr; Quay lại chuyên khoa
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 flex items-center justify-center gap-2">
          <Stethoscope className="text-blue-600" size={30} />
          Đội ngũ bác sĩ
        </h1>
        <p className="mt-2 text-base text-gray-600">
          {departmentName ? `Chuyên khoa ${departmentName}` : ""}
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-5">
        {loading ? (
          <p className="text-center text-gray-500 py-10 italic text-base">
            Đang tải dữ liệu...
          </p>
        ) : doctors.length === 0 ? (
          <p className="text-center text-gray-500 py-10 italic text-base">
            Hiện chưa có bác sĩ.
          </p>
        ) : (
          doctors.map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-5 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row gap-5 items-start">

                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-2xl font-semibold">
                  {doctor.firstname ? doctor.firstname[0] : "D"}
                </div>

                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {doctor.firstname} {doctor.lastname}
                  </h3>

                  <p className="text-blue-600 font-semibold text-base">
                    {doctor.education}
                  </p>

                  <p className="text-sm text-amber-700 flex items-center gap-1">
                    <Award size={16} /> {doctor.certification}
                  </p>

                  {doctor.bio && (
                    <p className="text-gray-700 text-sm italic leading-relaxed">
                      "{doctor.bio}"
                    </p>
                  )}

                  {doctor.experience && (
                    <span className="flex items-center gap-1 text-gray-600 text-sm">
                      <Calendar size={16} /> {doctor.experience}
                    </span>
                  )}

                  {doctor.workinghour && (
                    <p className="font-medium text-gray-800 text-sm flex items-center gap-1">
                      <Clock size={16} /> Giờ làm việc: {doctor.workinghour}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                <motion.button
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    const role = localStorage.getItem("role");

                    if (!token) {
                      router.push("/login");
                      return;
                    }

                    if (role !== "PATIENT") {
                      alert("Chỉ bệnh nhân mới được phép đặt lịch hẹn");
                      return;
                    }

                    router.push(`/patient/appointment?doctorId=${doctor.id}`);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full"
                >
                  Đặt lịch ngay
                </motion.button>



                  <button
                    onClick={() => {
                      sessionStorage.setItem(
                      "selectedDoctor",
                      JSON.stringify({
                        ...doctor,
                        departmentName, 
                      })
                    );
                      router.push(`/patient/viewdoctor?id=${doctor.id}`);
                    }}
                    className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition"
                  >
                    Xem hồ sơ
                  </button>
                </div>

              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
