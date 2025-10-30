"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Hospital, MapPin, Phone, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";

// Danh sách bệnh viện
const hospitals = [
  { 
    id: 1, 
    name: "Bệnh viện Đa khoa Tâm Anh", 
    address: "Quận 7, TP.HCM", 
    phone: "1900 5555", 
    rating: 4.9, 
    hours: "24/7" 
  },
  { 
    id: 2, 
    name: "Bệnh viện FV", 
    address: "Quận 7, TP.HCM", 
    phone: "028 3510 2222", 
    rating: 4.8, 
    hours: "7:00 - 21:00" 
  },
  { 
    id: 3, 
    name: "Phòng khám Quốc tế Victoria", 
    address: "Quận 1, TP.HCM", 
    phone: "028 3910 5678", 
    rating: 4.7, 
    hours: "8:00 - 17:00" 
  },
];

export default function HospitalsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* NÚT QUAY LẠI */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium transition-colors"
      >
        <ArrowLeft size={20} />
        Quay lại
      </motion.button>

      {/* TIÊU ĐỀ */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl font-bold font-playfair text-blue-800 flex items-center justify-center gap-3">
          <Hospital className="text-blue-600" />
          DANH SÁCH BỆNH VIỆN
        </h1>
        <p className="text-gray-600 mt-2">{hospitals.length} cơ sở y tế uy tín</p>
      </motion.div>

      {/* DANH SÁCH BỆNH VIỆN */}
      <div className="max-w-4xl mx-auto space-y-5">
        {hospitals.map((hospital, i) => (
          <motion.div
            key={hospital.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            // CHUYỂN TRANG: /viewdepartment/hospitals/doctors?hospital=...
            onClick={() => router.push(`/viewdepartment/hospitals/doctors?hospital=${encodeURIComponent(hospital.name)}`)}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-gray-100 cursor-pointer group"
          >
            {/* THÔNG TIN BỆNH VIỆN */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                <Hospital size={20} className="text-blue-600" />
                {hospital.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {hospital.address}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={16} /> {hospital.phone}
                </span>
                <span className="flex items-center gap-1 text-green-600">
                  <Clock size={16} /> {hospital.hours}
                </span>
                <span className="flex items-center gap-1 text-yellow-600">
                  <Star size={16} className="fill-current" /> {hospital.rating}
                </span>
              </div>
            </div>

            {/* NÚT XEM BÁC SĨ */}
            <div className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Xem chi tiết
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}