"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  Building,
  Briefcase,
  FileText,
  GraduationCap,
} from "lucide-react";

export default function DoctorProfilePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedDoctor = sessionStorage.getItem("selectedDoctor");
    if (savedDoctor) {
      const parsedDoctor = JSON.parse(savedDoctor);
      setDoctor(parsedDoctor);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải thông tin bác sĩ...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white">
        <div className="text-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy bác sĩ</h3>
          <p className="text-gray-600 mb-6">Mã bác sĩ không tồn tại hoặc đã bị xóa</p>
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  const handleBookAppointment = () => {
    router.push(`/patient/appointment?doctorId=${doctor.id}`);
  };

  const departmentDisplay = doctor.departmentName || doctor.department || "Chưa cập nhật";

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium mb-6 group transition"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
          Quay lại danh sách bác sĩ
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="shrink-0">
                {doctor.avatar ? (
                  <img
                    src={doctor.avatar}
                    alt={doctor.firstname + " " + doctor.lastname}
                    className="w-28 h-28 rounded-xl object-cover border-4 border-white shadow-xl"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                    {doctor.firstname?.[0] || "B"}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-blue-700 mb-2">
                  BS {doctor.firstname} {doctor.lastname}
                </h1>
                <p className="text-base text-gray-700 mb-4">
                  Chuyên khoa <span className="font-semibold">{departmentDisplay}</span>
                </p>

                {doctor.specialty && (
                  <>
                    <p className="font-medium text-gray-800 mb-1">Chuyên trị</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {doctor.specialty}
                    </p>
                  </>
                )}

                <div className="mt-6 flex items-center gap-1 text-sm">
                  <span className="font-bold text-gray-900">Lịch khám :</span>
                  <span className="font-bold text-gray-900">Hẹn khám</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <Stethoscope size={18} />
              <span className="font-medium text-sm">Bác sĩ Chuyên Khoa</span>
              <span className="text-xs opacity-90">Tư vấn Online qua App</span>
            </div>
            <button
              onClick={handleBookAppointment}
              className="bg-white text-cyan-600 font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition shadow"
            >
              Đặt ngay
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {doctor.bio && (
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-700 mb-3">Giới thiệu</h3>
                <p className="text-gray-700 text-base leading-relaxed">{doctor.bio}</p>
              </div>
            )}

            {doctor.experience && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-3">
                  <Briefcase size={18} className="text-blue-600" />
                  Lĩnh vực lâm sàng chuyên sâu
                </h3>
                <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                  {doctor.experience}
                </div>
              </div>
            )}

            {(doctor.education || doctor.certification) && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-3">
                  <GraduationCap size={18} className="text-blue-600" />
                  Quá trình đào tạo & Chứng chỉ
                </h3>
                <div className="space-y-2 text-gray-700 text-base">
                  {doctor.education && <div>{doctor.education}</div>}
                  {doctor.certification && <div>{doctor.certification}</div>}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-b from-blue-600 to-cyan-600 text-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-3">
                <Phone size={20} />
                Liên hệ & Đặt lịch
              </h3>
              <div className="space-y-4 mb-6">
                {doctor.account_email && (
                  <div className="flex items-center gap-4">
                    <Mail size={18} />
                    <div>
                      <p className="text-blue-100 text-sm">Email</p>
                      <p className="font-medium">{doctor.account_email}</p>
                    </div>
                  </div>
                )}
                {doctor.phonenum && (
                  <div className="flex items-center gap-4">
                    <Phone size={18} />
                    <div>
                      <p className="text-blue-100 text-sm">Điện thoại</p>
                      <p className="font-medium">{doctor.phonenum}</p>
                    </div>
                  </div>
                )}
                {doctor.address && (
                  <div className="flex items-center gap-4">
                    <MapPin size={18} />
                    <div>
                      <p className="text-blue-100 text-sm">Địa chỉ làm việc</p>
                      <p className="font-medium">{doctor.address}</p>
                    </div>
                  </div>
                )}
                {doctor.department_id && (
                  <div className="flex items-center gap-4">
                    <Building size={18} />
                    <div>
                      <p className="text-blue-100 text-sm">Khoa</p>
                      <p className="font-medium">#K{doctor.department_id}</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleBookAppointment}
                className="w-full bg-white text-cyan-600 font-semibold py-3 rounded-full hover:bg-gray-100 transition shadow text-base"
              >
                Đặt lịch khám ngay
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}