"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  User, Heart, Brain, Stethoscope, Bone, Eye, Ear, Shield, Activity
} from "lucide-react";
import { motion } from "framer-motion";

const departments = [
  { id: "family", name: "Gia Đình", icon: User, color: "from-emerald-400 to-teal-500" },
  { id: "digestion", name: "Tiêu Hóa", icon: Stethoscope, color: "from-amber-400 to-orange-500" },
  { id: "general", name: "Tổng Quát", icon: Shield, color: "from-blue-500 to-indigo-600" },
  { id: "cardiology", name: "Tim Mạch", icon: Heart, color: "from-red-500 to-rose-600" },
  { id: "neurology", name: "Thần Kinh", icon: Brain, color: "from-purple-500 to-violet-600" },
  { id: "dermatology", name: "Da Liễu", icon: Bone, color: "from-pink-400 to-rose-500" },
  { id: "ophthalmology", name: "Mắt", icon: Eye, color: "from-cyan-400 to-blue-500" },
  { id: "ent", name: "Tai Mũi Họng", icon: Ear, color: "from-lime-400 to-green-500" },
];

export default function DepartmentsGrid() {
  const router = useRouter();
  const [patientName, setPatientName] = useState("");

  // Lấy tên bệnh nhân từ localStorage khi component mount
  useEffect(() => {
    const savedName = localStorage.getItem("patientName") || "";
    setPatientName(savedName);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* TIÊU ĐỀ */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="
          text-4xl sm:text-5xl font-bold font-playfair 
          bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-600 
          tracking-normal leading-snug
        ">
          CHUYÊN KHOA NỔI BẬT
        </h1>
        <p className="mt-3 text-base text-gray-600 max-w-2xl mx-auto font-medium">
          {patientName ? `Xin chào, ${patientName}! ` : ""}Đội ngũ bác sĩ giàu kinh nghiệm, công nghệ hiện đại, chăm sóc toàn diện cho sức khỏe bạn
        </p>
      </motion.div>

      {/* Grid chuyên khoa */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 sm:gap-6">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/viewdepartment/hospitals")}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white flex flex-col items-center justify-center h-40"
                style={{ minHeight: "160px" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`p-4 rounded-full bg-gradient-to-br ${dept.color} shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center`}
                  >
                    <Icon size={32} className="text-white drop-shadow-sm" />
                  </motion.div>

                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 text-base sm:text-lg text-center leading-tight">
                    {dept.name}
                  </h3>
                </div>

                <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-blue-400/30 transition-all duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Nút CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-16"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/booking")}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Activity size={20} />
          Đặt Lịch Khám Ngay
        </motion.button>
      </motion.div>
    </div>
  );
}
