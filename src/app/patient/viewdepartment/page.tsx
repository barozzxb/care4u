"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import apiClient from "@/services/apiClients";
import {
  Heart,
  Brain,
  Eye,
  Ear,
  Bone,
  Stethoscope,
  Hospital,
} from "lucide-react";

const departmentIconMap: Record<string, any> = {
  heart: Heart,
  brain: Brain,
  eye: Eye,
  ear: Ear,
  bone: Bone,
  stethoscope: Stethoscope,
};

interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export default function DepartmentsGrid() {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("patientName") || "";
    setPatientName(savedName);

    apiClient
      .get("/departments")
      .then((res) => {
        setDepartments(res.data || []);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-[120px] pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 overflow-visible"
      >
        <h1 className="mt-2 text-4xl sm:text-5xl font-bold leading-[1.35] bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-600">
          CHUYÊN KHOA NỔI BẬT
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          {patientName && `Xin chào, ${patientName}! `}
          Đội ngũ bác sĩ giàu kinh nghiệm, công nghệ hiện đại
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {departments.length === 0 ? (
          <div className="text-center py-12 text-gray-500 italic">
            Đang tải dữ liệu chuyên khoa...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {departments.map((dept, index) => {
              const Icon =
                departmentIconMap[String(dept.icon).toLowerCase()] ||
                Hospital;

              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    router.push(
                      `/patient/viewdepartment/doctors?department=${dept.id}`
                    )
                  }
                  className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="flex flex-col items-center justify-center h-40 space-y-3">
                    <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 shadow-md">
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-gray-800 font-semibold text-center px-2">
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
