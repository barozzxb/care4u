"use client";

import React, { useState } from "react";
import {
  HeartPulse,
  Activity,
  Scale,
  Ruler,
  ThermometerSun,
  Save,
} from "lucide-react";

export default function UpdateMeasurementPage() {
  const [formData, setFormData] = useState({
    heartRate: "",
    bloodPressure: "",
    weight: "",
    height: "",
    temperature: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cập nhật chỉ số sức khỏe thành công!");
    console.log("Submitted measurement:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-16">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-700 flex justify-center items-center gap-3">
            <HeartPulse className="text-red-500 w-8 h-8" />
            Cập nhật chỉ số sức khỏe
          </h1>
          <p className="mt-2 text-gray-600">
            Nhập các thông số mới nhất của bạn để bác sĩ có thể theo dõi tình trạng sức khỏe chính xác hơn.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          {/* Nhịp tim */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nhịp tim (bpm)
            </label>
            <div className="relative">
              <HeartPulse className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
              <input
                type="number"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleChange}
                placeholder="Ví dụ: 75"
                className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Huyết áp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Huyết áp (mmHg)
            </label>
            <div className="relative">
              <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="text"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleChange}
                placeholder="Ví dụ: 120/80"
                className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Cân nặng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cân nặng (kg)
            </label>
            <div className="relative">
              <Scale className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5" />
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Ví dụ: 60"
                className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Chiều cao */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chiều cao (cm)
            </label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Ví dụ: 170"
                className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Nhiệt độ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nhiệt độ cơ thể (°C)
            </label>
            <div className="relative">
              <ThermometerSun className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
              <input
                type="number"
                step="0.1"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="Ví dụ: 36.8"
                className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </form>

        {/* Buttons */}
        <div className="mt-10 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            <Save className="w-5 h-5" />
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
