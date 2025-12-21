"use client";

import React, { useEffect, useState } from "react";
import {
  HeartPulse,
  Activity,
  Scale,
  Ruler,
  ThermometerSun,
  Edit2,
  Save,
  Loader2,
} from "lucide-react";
import {
  getPatientMeasure,
  updatePatientMeasure,
} from "@/services/patient/measureService";

export default function UpdateMeasurementPage() {
  const [formData, setFormData] = useState({
    heartRate: "",
    bloodPressure: "",
    weight: "",
    height: "",
    temperature: "",
  });

  const [originalData, setOriginalData] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const loadMeasure = async () => {
      const email = localStorage.getItem("email");
      if (!email) {
        setLoadingData(false);
        return;
      }

      setLoadingData(true);
      const res = await getPatientMeasure(email);

      if (res.success && res.data) {
        const loaded = {
          heartRate: res.data.heartRate || "",
          bloodPressure: res.data.bloodPressure || "",
          weight: res.data.weight || "",
          height: res.data.height ? res.data.height * 100 : "",
          temperature: res.data.temperature || "",
        };

        setFormData(loaded);
        setOriginalData(loaded);
      }
      setLoadingData(false);
    };

    loadMeasure();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = localStorage.getItem("email");
    if (!email) {
      alert("Vui lòng đăng nhập");
      return;
    }

    if (!formData.height || !formData.weight) {
      alert("Vui lòng nhập chiều cao và cân nặng");
      return;
    }

    setLoading(true);

    const payload = {
      heartRate: Number(formData.heartRate),
      bloodPressure: formData.bloodPressure,
      weight: Number(formData.weight),
      height: Number(formData.height) / 100,
      temperature: Number(formData.temperature),
    };

    const res = await updatePatientMeasure(email, payload);

    if (res.success) {
      alert("Cập nhật chỉ số sức khỏe thành công!");
      setOriginalData(formData);
      setIsEditing(false);
    } else {
      alert("Cập nhật thất bại");
    }

    setLoading(false);
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Chỉ số sức khỏe
          </h1>

          {!isEditing && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition"
            >
              <Edit2 size={18} />
              Chỉnh sửa
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-8"
        >
          <Input
            label="Nhịp tim (bpm)"
            icon={<HeartPulse className="text-red-500 w-5 h-5" />}
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            isEditing={isEditing}
          />

          <Input
            label="Huyết áp (mmHg)"
            icon={<Activity className="text-blue-500 w-5 h-5" />}
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
            isEditing={isEditing}
          />

          <Input
            label="Cân nặng (kg)"
            icon={<Scale className="text-amber-500 w-5 h-5" />}
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            isEditing={isEditing}
          />

          <Input
            label="Chiều cao (cm)"
            icon={<Ruler className="text-green-500 w-5 h-5" />}
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            isEditing={isEditing}
          />

          <Input
            label="Nhiệt độ (°C)"
            icon={<ThermometerSun className="text-orange-500 w-5 h-5" />}
            name="temperature"
            type="number"
            step="0.1"
            value={formData.temperature}
            onChange={handleChange}
            isEditing={isEditing}
          />

          {isEditing && (
            <div className="md:col-span-2 flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border rounded-lg"
              >
                Hủy
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Đang lưu
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Lưu
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  icon,
  isEditing,
  ...props
}: {
  label: string;
  icon: React.ReactNode;
  isEditing: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  if (!isEditing) {
    return (
      <div>
        <label className="text-sm text-gray-600">{label}</label>
        <div className="flex items-center gap-2 mt-1 px-4 py-3 bg-gray-100 rounded-lg">
          {icon}
          <span className="font-medium">
            {props.value || "Chưa cập nhật"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <div className="relative mt-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </span>
        <input
          {...props}
          className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
