"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosClient from "@/utils/axiosClient";
import Link from "next/link";

interface MedicalRecordDetail {
  id: number;
  createdAt: string;

  symptoms: string | null;
  physicalExam: string | null;
  diagnosis: string | null;
  conclusion: string | null;
  treatment: string | null;
  advice: string | null;
  notes: string | null;

  // Patient info
  patientId: number;
  patientFirstname: string;
  patientLastname: string;
  patientAvatar: string | null;

  // Measurement
  systolicBP?: number | null;
  diastolicBP?: number | null;
  temperature?: number | null;
  heartRate?: number | null;
  respiratoryRate?: number | null;
  spo2?: number | null;
  height?: number | null;
  weight?: number | null;
  bmi?: number | null;
}

export default function MedicalRecordDetailPage() {
  const { id } = useParams();
  const [record, setRecord] = useState<MedicalRecordDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const res = await axiosClient.get(`/api/v1/doctor/medical-records/${id}`);
      setRecord(res.data);
    } catch (e) {
      console.error("Error loading record detail", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20 text-gray-600">
        Đang tải thông tin phiếu khám...
      </div>
    );

  if (!record)
    return (
      <div className="text-center py-20 text-red-500">
        Không tìm thấy phiếu khám.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-8 mb-12 bg-white p-6 rounded-lg shadow">
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Phiếu khám #{record.id}</h1>

        <Link
          href="/doctor/records"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Quay lại danh sách
        </Link>
      </div>

      {/* Date */}
      <p className="text-gray-500 mb-4">
        Ngày tạo: {new Date(record.createdAt).toLocaleString("vi-VN")}
      </p>

      {/* Patient info */}
      <div className="flex items-center gap-4 mb-6 p-4 border rounded-lg bg-gray-50">
        <img
          src={record.patientAvatar || "/uploads/avatar/user_default.jpg"}
          className="w-14 h-14 rounded-full border object-cover"
          alt="patient avatar"
        />

        <div>
          <p className="font-semibold text-lg">
            {record.patientFirstname} {record.patientLastname}
          </p>
          <p className="text-gray-600 text-sm">Mã BN: {record.patientId}</p>
        </div>
      </div>

      {/* Measurement Section */}
      <h2 className="font-semibold text-lg mt-6 mb-3">Sinh hiệu</h2>
      <div className="grid grid-cols-2 gap-4 text-sm p-4 bg-gray-50 border rounded-lg">
        <p>
          HA tâm thu: <strong>{record.systolicBP ?? "—"} mmHg</strong>
        </p>
        <p>
          HA tâm trương: <strong>{record.diastolicBP ?? "—"} mmHg</strong>
        </p>
        <p>
          Nhiệt độ: <strong>{record.temperature ?? "—"} °C</strong>
        </p>
        <p>
          Nhịp tim: <strong>{record.heartRate ?? "—"} lần/phút</strong>
        </p>
        <p>
          Nhịp thở: <strong>{record.respiratoryRate ?? "—"} lần/phút</strong>
        </p>
        <p>
          SpO₂: <strong>{record.spo2 ?? "—"} %</strong>
        </p>
      </div>

      {/* Body info */}
      <h2 className="font-semibold text-lg mt-6 mb-3">Thông số cơ thể</h2>
      <div className="grid grid-cols-2 gap-4 text-sm p-4 bg-gray-50 border rounded-lg">
        <p>
          Chiều cao: <strong>{record.height ?? "—"} cm</strong>
        </p>
        <p>
          Cân nặng: <strong>{record.weight ?? "—"} kg</strong>
        </p>
        <p className="col-span-2">
          BMI: <strong>{record.bmi ?? "—"}</strong>
        </p>
      </div>

      {/* Medical details */}
      <h2 className="font-semibold text-lg mt-6 mb-3">Khám & chẩn đoán</h2>

      <div className="space-y-3 text-sm p-4 border rounded-lg bg-gray-50">
        <p>
          <span className="font-semibold">Triệu chứng:</span>{" "}
          {record.symptoms || "Không có"}
        </p>
        <p>
          <span className="font-semibold">Khám thực thể:</span>{" "}
          {record.physicalExam || "Không có"}
        </p>
        <p>
          <span className="font-semibold">Chẩn đoán:</span>{" "}
          {record.diagnosis || "Không có"}
        </p>
        <p>
          <span className="font-semibold">Kết luận:</span>{" "}
          {record.conclusion || "Không có"}
        </p>
      </div>

      {/* Treatment & notes */}
      <h2 className="font-semibold text-lg mt-6 mb-3">Điều trị & lời dặn</h2>

      <div className="space-y-3 text-sm p-4 border rounded-lg bg-gray-50">
        <p>
          <span className="font-semibold">Phác đồ điều trị:</span>{" "}
          {record.treatment || "Không có"}
        </p>
        <p>
          <span className="font-semibold">Lời dặn:</span>{" "}
          {record.advice || "Không có"}
        </p>
        <p>
          <span className="font-semibold">Ghi chú thêm:</span>{" "}
          {record.notes || "Không có"}
        </p>
      </div>
    </div>
  );
}
