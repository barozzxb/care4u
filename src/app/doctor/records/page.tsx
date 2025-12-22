"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/utils/axiosClient";
import Link from "next/link";

interface MedicalRecord {
  id: number;
  createdAt: string;

  symptoms: string | null;
  physicalExam: string | null;
  diagnosis: string | null;
  conclusion: string | null;
  treatment: string | null;
  advice: string | null;
  notes: string | null;

  // --- FLATTENED PATIENT FIELDS ---
  patientId: number;
  patientFirstname: string;
  patientLastname: string;
  patientAvatar: string | null;

  // Doctor info (nếu backend có trả)
  doctorId?: number;
  doctorFirstname?: string | null;
  doctorLastname?: string | null;
}

export default function MedicalRecordListPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      const res = await axiosClient.get("/api/v1/doctor/medical-records");
      setRecords(res.data);
    } catch (e) {
      console.error("Error loading medical records", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20 text-gray-600">
        Đang tải danh sách phiếu khám...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Danh sách phiếu khám</h1>

        <Link
          href="/doctor/records/new"
          className="rounded-full bg-green-700 px-4 py-2 text-sm font-semibold
                       text-white shadow-md hover:bg-green-600 active:scale-[0.98] transition"
        >
          + Tạo phiếu khám
        </Link>
      </div>

      {records.length === 0 ? (
        <p className="text-gray-500">Chưa có phiếu khám nào.</p>
      ) : (
        <div className="grid gap-4">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg">Phiếu khám {rec.id}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(rec.createdAt).toLocaleString("vi-VN")}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <img
                  src={rec.patientAvatar || "/uploads/avatar/user_default.jpg"}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover border"
                />

                <div>
                  <p className="font-medium">
                    {rec.patientFirstname} {rec.patientLastname}
                  </p>
                  <p className="text-sm text-gray-500">
                    Mã BN: {rec.patientId}
                  </p>
                </div>
              </div>

              <div className="text-sm space-y-1">
                <p>
                  <span className="font-semibold">Triệu chứng:</span>{" "}
                  {rec.symptoms || "Không có"}
                </p>
                <p>
                  <span className="font-semibold">Chẩn đoán:</span>{" "}
                  {rec.diagnosis || "—"}
                </p>
                <p>
                  <span className="font-semibold">Kết luận:</span>{" "}
                  {rec.conclusion || "—"}
                </p>
                <p>
                  <span className="font-semibold">Ghi chú:</span>{" "}
                  {rec.notes || "—"}
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <Link
                  href={`/doctor/records/${rec.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Xem chi tiết →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
