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

  const healthPredictions = predictHealth({
    weight: Number(formData.weight),
    height: Number(formData.height) / 100,
    heartRate: Number(formData.heartRate),
    bloodPressure: formData.bloodPressure,
    temperature: Number(formData.temperature),
  });

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

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
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

        {/* Phần dự đoán sức khỏe */}
        <div className="mt-10 bg-gray-100 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Dự đoán sức khỏe
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {healthPredictions.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
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

function predictHealth(data: {
  weight: number;
  height: number;
  heartRate?: number;
  bloodPressure?: string;
  temperature?: number;
}): string[] {
  const predictions: string[] = [];
  const { weight, height, heartRate, bloodPressure, temperature } = data;

  if (!weight || !height) return ["Vui lòng nhập chiều cao và cân nặng để dự đoán."];

  const bmi = weight / (height * height);
  let bmiMsg = `BMI của bạn là ${bmi.toFixed(1)}. `;
  if (bmi < 18.5) bmiMsg += "Bạn đang thiếu cân. Hãy đảm bảo chế độ ăn đầy đủ dinh dưỡng và tập thể dục đều đặn.";
  else if (bmi < 25) bmiMsg += "Cân nặng bình thường. Duy trì chế độ ăn và tập luyện để giữ sức khỏe.";
  else if (bmi < 30) bmiMsg += "Bạn đang thừa cân. Nên giảm lượng calo và tập thể dục thường xuyên.";
  else bmiMsg += "Bạn bị béo phì. Hãy tham khảo bác sĩ hoặc chuyên gia dinh dưỡng.";
  predictions.push(bmiMsg);

  if (heartRate) {
    let hrMsg = `Nhịp tim hiện tại là ${heartRate} bpm. `;
    if (heartRate < 60) hrMsg += "Nhịp tim thấp, hãy chú ý nghỉ ngơi và theo dõi sức khỏe.";
    else if (heartRate <= 100) hrMsg += "Nhịp tim bình thường.";
    else hrMsg += "Nhịp tim cao, nên kiểm tra với bác sĩ nếu tình trạng kéo dài.";
    predictions.push(hrMsg);
  }

  if (bloodPressure) {
    const parts = bloodPressure.split("/").map((p) => parseInt(p.trim()));
    if (parts.length === 2) {
      const [sys, dia] = parts;
      let bpMsg = `Huyết áp: ${sys}/${dia} mmHg. `;
      if (sys < 90 || dia < 60) bpMsg += "Huyết áp thấp, cần bổ sung nước và nghỉ ngơi.";
      else if (sys <= 120 && dia <= 80) bpMsg += "Huyết áp bình thường.";
      else if (sys > 140 || dia > 90) bpMsg += "Huyết áp cao, nên kiểm tra định kỳ.";
      else bpMsg += "Huyết áp hơi cao/ thấp, theo dõi thường xuyên.";
      predictions.push(bpMsg);
    }
  }

  if (temperature) {
    let tempMsg = `Nhiệt độ cơ thể: ${temperature.toFixed(1)}°C. `;
    if (temperature < 36) tempMsg += "Thân nhiệt thấp, giữ ấm cơ thể.";
    else if (temperature <= 37.5) tempMsg += "Thân nhiệt bình thường.";
    else tempMsg += "Thân nhiệt cao, có thể đang sốt. Theo dõi hoặc liên hệ bác sĩ nếu cần.";
    predictions.push(tempMsg);
  }

  return predictions;
}
