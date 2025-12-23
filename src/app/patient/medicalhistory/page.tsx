"use client";

import { useEffect, useState } from "react";
import { FileText, CalendarDays, Stethoscope, User, ClipboardList, NotepadText, Clock } from "lucide-react";
import { getMedicalHistory, MedicalRecord } from "@/services/patient/medicalHistoryService";

export default function MedicalHistoryPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMedicalHistory()
      .then(setRecords)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p>Đang tải lịch sử bệnh án...</p>
        </div>
      </div>
    );

  if (!records.length)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p>Chưa có hồ sơ bệnh án</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold flex items-center gap-4">
          <FileText size={36} /> Lịch sử bệnh án
        </h1>

        {records.map((r, idx) => (
          <div key={r.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md">
            <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <CalendarDays size={18} /> 
                {r.appointmentDate
                  ? `${r.appointmentDate.toLocaleString()}`
                  : new Date(r.createdAt).toLocaleDateString("vi-VN")}
                {r.appointmentTime && <Clock size={18} className="ml-2" />}
              </div>
              <div className="flex items-center gap-2">
                <User size={18} /> BS. {r.doctorName}
              </div>
            </div>

            <div className="p-6 space-y-4 text-gray-700">
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <ClipboardList size={18} /> Chẩn đoán
                </div>
                <p className="pl-7">{r.diagnosis || <i>Không ghi nhận</i>}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <Stethoscope size={18} /> Điều trị
                </div>
                <p className="pl-7">{r.treatment || <i>Không ghi nhận</i>}</p>
              </div>

              {r.notes && (
                <div>
                  <div className="flex items-center gap-2 font-semibold">
                    <NotepadText size={18} /> Ghi chú
                  </div>
                  <p className="pl-7 bg-gray-50 px-4 py-3 rounded border-l-4 border-gray-300">{r.notes}</p>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-3 text-right text-sm text-gray-500 border-t border-gray-200">
              Buổi khám thứ {records.length - idx}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
