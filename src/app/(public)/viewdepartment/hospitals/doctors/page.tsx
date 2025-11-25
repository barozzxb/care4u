"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  Stethoscope, 
  Calendar, 
  Star, 
  Award, 
  Users, 
  MapPin, 
  Clock 
} from "lucide-react";
import { motion } from "framer-motion";

// DỮ LIỆU BÁC SĨ THEO BỆNH VIỆN
const doctorsByHospital: Record<string, any[]> = {
  "Bệnh viện Đa khoa Tâm Anh": [
    {
      id: 1,
      name: "TS.BS Nguyễn Văn A",
      specialty: "Tim mạch can thiệp",
      degree: "Tiến sĩ Y khoa - ĐH Y Hà Nội",
      experience: "15 năm",
      patients: "5.000+",
      rating: 4.9,
      bio: "Chuyên gia đặt stent mạch vành, tu nghiệp tại Mỹ. Tác giả 20+ bài báo quốc tế.",
      schedule: ["Thứ 2: 8h-12h", "Thứ 4: 14h-18h", "Thứ 6: 8h-12h"]
    },
    {
      id: 2,
      name: "BS CKII Phạm Thị D",
      specialty: "Sản phụ khoa",
      degree: "Chuyên khoa II",
      experience: "18 năm",
      patients: "6.200+",
      rating: 4.8,
      bio: "Chuyên phẫu thuật nội soi, hỗ trợ sinh sản. Tỷ lệ thành công IVF >70%.",
      schedule: ["Thứ 3: 7h-11h", "Thứ 5: 13h-17h"]
    },
  ],
  "Bệnh viện FV": [
    {
      id: 3,
      name: "PGS.TS Trần Thị B",
      specialty: "Thần kinh",
      degree: "Phó Giáo sư - Tiến sĩ",
      experience: "20 năm",
      patients: "8.000+",
      rating: 5.0,
      bio: "Chuyên sâu đột quỵ và Parkinson. Từng điều trị thành công >500 ca đột quỵ cấp.",
      schedule: ["Thứ 3: 8h-12h", "Thứ 6: 14h-18h"]
    },
  ],
  "Phòng khám Quốc tế Victoria": [
    {
      id: 4,
      name: "BS CKII Lê Văn C",
      specialty: "Nhi khoa",
      degree: "Chuyên khoa II - ĐH Y Dược TP.HCM",
      experience: "12 năm",
      patients: "4.200+",
      rating: 4.8,
      bio: "Chuyên khám nhi, tiêm chủng, phát triển trẻ. 100% không đau khi tiêm.",
      schedule: ["Thứ 2: 8h-12h", "Thứ 7: 14h-17h"]
    },
  ],
};

export default function DoctorsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hospitalName = searchParams.get("hospital") || "Bệnh viện";

  const doctors = doctorsByHospital[hospitalName] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* NÚT QUAY LẠI */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium transition-colors"
      >
        <ArrowLeft size={20} />
        Quay lại danh sách bệnh viện
      </motion.button>

      {/* TIÊU ĐỀ CHUYÊN NGHIỆP – NHỎ GỌN, RÕ RÀNG */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        {/* TIÊU ĐỀ CHÍNH */}
        <h1 className="
          text-3xl 
          sm:text-4xl 
          font-bold 
          font-playfair 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-blue-700 to-teal-600 
          leading-tight
          flex items-center justify-center gap-2
        ">
          <Stethoscope className="text-blue-600" size={32} />
          Đội ngũ bác sĩ
        </h1>

        {/* TÊN BỆNH VIỆN – NỔI BẬT NHƯNG KHÔNG LỚN */}
        <h2 className="
          mt-2 
          text-xl 
          sm:text-2xl 
          font-semibold 
          text-blue-900 
          tracking-tight
        ">
          {hospitalName}
        </h2>

        {/* MÔ TẢ PHỤ */}
        <p className="mt-3 text-base text-gray-600 max-w-2xl mx-auto">
          {doctors.length > 0 
            ? `${doctors.length} chuyên gia giàu kinh nghiệm, sẵn sàng phục vụ`
            : "Hiện chưa có thông tin bác sĩ cho cơ sở này"}
        </p>
      </motion.div>

      {/* DANH SÁCH BÁC SĨ */}
      <div className="max-w-5xl mx-auto space-y-6">
        {doctors.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-12 text-lg italic"
          >
            Hiện chưa có thông tin bác sĩ cho bệnh viện này.
          </motion.p>
        ) : (
          doctors.map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* AVATAR */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg flex-shrink-0">
                  {doctor.name.split(" ").pop()?.[0]}
                </div>

                {/* THÔNG TIN */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                    <p className="text-blue-600 font-semibold text-lg">{doctor.specialty}</p>
                    <p className="text-sm text-amber-700 flex items-center gap-1 mt-1">
                      <Award size={16} className="fill-current" /> {doctor.degree}
                    </p>
                  </div>

                  <p className="text-gray-700 text-sm italic leading-relaxed">
                    "{doctor.bio}"
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Calendar size={16} /> {doctor.experience}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Users size={16} className="text-blue-600" /> {doctor.patients}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-600">
                      <Star size={16} className="fill-current" /> {doctor.rating}
                    </span>
                  </div>

                  <div>
                    <p className="font-medium text-gray-800 text-sm mb-1 flex items-center gap-1">
                      <Clock size={16} /> Lịch khám:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.schedule.map((slot: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* NÚT HÀNH ĐỘNG */}
                <div className="flex flex-col gap-2">
                  <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(`/patient/appointment?doctor=${encodeURIComponent(doctor.name)}&hospital=${encodeURIComponent(hospitalName)}`)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition"
                >
                  Đặt lịch ngay
                </motion.button>
                  <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition">
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