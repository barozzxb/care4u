"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import apiClient from "@/services/apiClients"; 
import { User, Heart, Brain, Stethoscope, Bone, Eye, Ear, Shield, Activity } from "lucide-react";

export default function DepartmentsGrid() {
  const router = useRouter();
  const [departments, setDepartments] = useState<any[]>([]);
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("patientName") || "";
    setPatientName(savedName);

    // ✅ Dùng apiClient thay vì axios
    apiClient.get("/api/departments")
      .then(res => {
        console.log("Departments data:", res.data); // Debug log
        setDepartments(res.data || []);
      })
      .catch(err => {
        console.error("Error fetching departments:", err);
        console.error("Error response:", err.response?.data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Tiêu đề */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold font-playfair bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-600 tracking-normal leading-snug">
          CHUYÊN KHOA NỔI BẬT
        </h1>
        <p className="mt-3 text-base text-gray-600 max-w-2xl mx-auto font-medium">
          {patientName ? `Xin chào, ${patientName}! ` : ""}
          Đội ngũ bác sĩ giàu kinh nghiệm, công nghệ hiện đại, chăm sóc toàn diện cho sức khỏe bạn
        </p>
      </motion.div>

      {/* Grid chuyên khoa */}
      <div className="max-w-7xl mx-auto">
        {departments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 italic">Đang tải dữ liệu chuyên khoa...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 sm:gap-6">
            {departments.map((dept, index) => {
              // Icon mặc định nếu không có
              const Icon = User;
              
              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/patient/viewdepartment/doctors?department=${encodeURIComponent(dept.id)}`)}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white flex flex-col items-center justify-center h-40"
                  style={{ minHeight: "160px" }}
                >
                  <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6">
                    <motion.div 
                      whileHover={{ rotate: 360 }} 
                      transition={{ duration: 0.6 }} 
                      className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                    >
                      <Icon size={32} className="text-white drop-shadow-sm" />
                    </motion.div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 text-base sm:text-lg text-center leading-tight">
                      {dept.name}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}