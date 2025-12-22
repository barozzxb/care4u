"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createMedicalRecord } from "@/services/medicalRecordService";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function NewMedicalRecordPage() {
  const router = useRouter();

  const [patientId, setPatientId] = useState("");
  const [bloodPressureSystolic, setBloodPressureSystolic] = useState("");
  const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState("");
  const [temperature, setTemperature] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [oxygenSaturation, setOxygenSaturation] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");

  const [physicalExam, setPhysicalExam] = useState("");
  const [symptom, setSymptom] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [clinicalConclusion, setClinicalConclusion] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [advice, setAdvice] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);

  // auto tính BMI khi change height/weight
  const handleAutoBmi = (h: string, w: string) => {
    const hNum = parseFloat(h);
    const wNum = parseFloat(w);
    if (!isNaN(hNum) && !isNaN(wNum) && hNum > 0) {
      const hMeter = hNum / 100;
      const bmiValue = wNum / (hMeter * hMeter);
      setBmi(bmiValue.toFixed(1));
    } else {
      setBmi("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createMedicalRecord({
        patientId: Number(patientId),

        // Sinh hiệu
        systolicBP: bloodPressureSystolic
          ? Number(bloodPressureSystolic)
          : undefined,
        diastolicBP: bloodPressureDiastolic
          ? Number(bloodPressureDiastolic)
          : undefined,
        temperature: temperature ? Number(temperature) : undefined,
        heartRate: heartRate ? Number(heartRate) : undefined,
        respiratoryRate: respiratoryRate ? Number(respiratoryRate) : undefined,
        spo2: oxygenSaturation ? Number(oxygenSaturation) : undefined,

        // Thông số cơ thể
        height: height ? Number(height) : undefined,
        weight: weight ? Number(weight) : undefined,
        bmi: bmi ? Number(bmi) : undefined,

        // Khám & chẩn đoán
        symptoms: symptom,
        physicalExam,
        diagnosis,
        conclusion: clinicalConclusion,
        treatment: treatmentPlan,
        advice,
        notes: note,
      });

      toast.success("Tạo phiếu khám thành công");
      router.push("/doctor/records"); // trang list record
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as {
          code?: number;
          errorCode?: string;
          message?: string;
        };

        if (data?.code === 404 || data?.errorCode === "PATIENT_NOT_FOUND") {
          toast.error("Bệnh nhân không tồn tại");
        } else {
          toast.error(data?.message || "Có lỗi xảy ra, vui lòng thử lại");
        }
      } else {
        // Trường hợp lỗi không phải Axios
        toast.error("Lỗi không xác định, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Tạo phiếu khám</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Thông tin chung */}
        <div className="border rounded p-4 space-y-3">
          <h2 className="font-semibold">Thông tin bệnh nhân</h2>
          <div>
            <label className="block text-sm mb-1">Mã bệnh nhân *</label>
            <input
              type="number"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              required
            />
          </div>
        </div>

        {/* Vital Signs */}
        <div className="border rounded p-4 space-y-3">
          <h2 className="font-semibold">Sinh hiệu</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm mb-1">HA tâm thu (mmHg)</label>
              <input
                type="number"
                value={bloodPressureSystolic}
                onChange={(e) => setBloodPressureSystolic(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">HA tâm trương (mmHg)</label>
              <input
                type="number"
                value={bloodPressureDiastolic}
                onChange={(e) => setBloodPressureDiastolic(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Nhiệt độ (°C)</label>
              <input
                type="number"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Nhịp tim (lần/phút)</label>
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Nhịp thở (lần/phút)</label>
              <input
                type="number"
                value={respiratoryRate}
                onChange={(e) => setRespiratoryRate(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">SpO₂ (%)</label>
              <input
                type="number"
                value={oxygenSaturation}
                onChange={(e) => setOxygenSaturation(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Body Info */}
        <div className="border rounded p-4 space-y-3">
          <h2 className="font-semibold">Thông số cơ thể</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm mb-1">Chiều cao (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  handleAutoBmi(e.target.value, weight);
                }}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Cân nặng (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                  handleAutoBmi(height, e.target.value);
                }}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">BMI</label>
              <input
                type="number"
                step="0.1"
                value={bmi}
                onChange={(e) => setBmi(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Physical exam + Diagnosis */}
        <div className="border rounded p-4 space-y-3">
          <h2 className="font-semibold">Khám & chẩn đoán</h2>

          <div>
            <label className="block text-sm mb-1">Triệu chứng</label>
            <textarea
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Khám thực thể</label>
            <textarea
              value={physicalExam}
              onChange={(e) => setPhysicalExam(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Chẩn đoán</label>
            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Kết luận lâm sàng</label>
            <textarea
              value={clinicalConclusion}
              onChange={(e) => setClinicalConclusion(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phác đồ điều trị</label>
            <textarea
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Lời dặn</label>
            <textarea
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Ghi chú thêm</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              rows={2}
            />
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-green-700 px-4 py-2 text-sm font-semibold
                       text-white shadow-md hover:bg-green-600 active:scale-[0.98] transition"
          >
            {loading ? "Đang lưu..." : "Tạo phiếu khám"}
          </button>
        </div>
      </form>
    </div>
  );
}
