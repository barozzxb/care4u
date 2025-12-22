"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Award,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  ArrowLeft,
  User,
  CreditCard,
  Cake,
  FileText,
  Building,
  Stethoscope,
  Star,
  ShieldCheck
} from "lucide-react";

export default function DoctorProfilePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedDoctor = sessionStorage.getItem('selectedDoctor');
    if (savedDoctor) {
      setDoctor(JSON.parse(savedDoctor));
    }
    setLoading(false);
  }, [id]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Chưa cập nhật";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải thông tin bác sĩ...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-50 to-indigo-100">
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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium mb-8 group transition"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
            Quay lại danh sách bác sĩ
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                <div className="shrink-0">
                  <div className="relative">
                    {doctor.avatar ? (
                      <img
                        src={doctor.avatar}
                        alt={doctor.firstname + " " + doctor.lastname}
                        className="w-32 h-32 rounded-2xl object-cover border-4 border-white/30 shadow-2xl"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-5xl font-bold text-white shadow-2xl">
                        {doctor.firstname?.[0] || 'B'}
                      </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                      <ShieldCheck size={20} />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
                    <Stethoscope size={36} />
                    {doctor.firstname} {doctor.lastname}
                  </h1>

                  <div className="space-y-3 text-blue-100">
                    {doctor.education && (
                      <p className="text-xl flex items-center gap-3">
                        <GraduationCap size={24} />
                        <span className="font-medium">{doctor.education}</span>
                      </p>
                    )}
                    {doctor.certification && (
                      <p className="flex items-center gap-3 text-lg">
                        <Award size={22} />
                        {doctor.certification}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                        <Star className="text-yellow-300 fill-current" size={18} />
                        <span className="font-semibold">4.9</span>
                        <span className="text-sm opacity-90">(128 đánh giá)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                  {doctor.bio && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100"
                    >
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                        <FileText className="text-blue-600" />
                        Giới thiệu về bác sĩ
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed italic">
                        "{doctor.bio}"
                      </p>
                    </motion.div>
                  )}

                  {doctor.experience && (
                    <div className="bg-gray-50 p-8 rounded-2xl border">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                        <Briefcase className="text-blue-600" />
                        Kinh nghiệm làm việc
                      </h3>
                      <div className="text-gray-700 space-y-3 leading-relaxed whitespace-pre-line">
                        {doctor.experience}
                      </div>
                    </div>
                  )}

                  {doctor.workinghour && (
                    <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">
                      <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-3">
                        <Clock className="text-green-600" />
                        Giờ khám bệnh
                      </h3>
                      <p className="text-green-900 font-semibold text-lg">{doctor.workinghour}</p>
                    </div>
                  )}
                
                </div>

                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                      <User className="text-blue-600" />
                      Thông tin cá nhân
                    </h3>
                    <div className="space-y-4">
                      {doctor.id && (
                        <InfoRow icon={<div className="text-xs font-mono">#BS</div>} label="Mã bác sĩ" value={doctor.id} />
                      )}
                      {doctor.gender && <InfoRow icon="Giới tính" label="Giới tính" value={doctor.gender} />}
                      {doctor.dob && <InfoRow icon={<Cake size={18} className="text-pink-600" />} label="Ngày sinh" value={formatDate(doctor.dob)} />}
                      {doctor.id_number && <InfoRow icon={<CreditCard size={18} className="text-indigo-600" />} label="CCCD" value={doctor.id_number} />}
                    </div>
                  </div>

                  <div className="bg-gradient-to-b from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-5 flex items-center gap-3">
                      <Phone className="text-white" />
                      Liên hệ & Đặt lịch
                    </h3>
                    <div className="space-y-4 mb-8">
                      {doctor.account_email && (
                        <ContactRow icon={<Mail size={18} />} label="Email" value={doctor.account_email} />
                      )}
                      {doctor.phonenum && (
                        <ContactRow icon={<Phone size={18} />} label="Điện thoại" value={doctor.phonenum} />
                      )}
                      {doctor.address && (
                        <ContactRow icon={<MapPin size={18} />} label="Địa chỉ làm việc" value={doctor.address} />
                      )}
                      {doctor.department_id && (
                        <ContactRow icon={<Building size={18} />} label="Khoa" value={`#K${doctor.department_id}`} />
                      )}
                    </div>

]                    <button className className="w-full bg-white text-blue-700 font-bold py-4 rounded-xl hover:bg-gray-100 transition shadow-lg text-lg hover:scale-105 transform">
                      Đặt lịch khám ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

const InfoRow = ({ icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-center gap-4 py-3 border-b border-gray-gray-100 last:border-0">
    <div className="text-gray-500 w-24 text-sm font-medium">{label}:</div>
    <div className="flex items-center gap-3 flex-1">
      {typeof icon === 'string' ? <span className="text-gray-400">{icon}</span> : icon}
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  </div>
);

const ContactRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1">{icon}</div>
    <div>
      <p className="text-blue-100 text-sm">{label}</p>
      <p className="font-semibold text-lg">{value}</p>
    </div>
  </div>
);