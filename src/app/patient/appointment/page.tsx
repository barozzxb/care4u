"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { createAppointment } from "@/services/appointment/appointmentService";

/** Danh sách địa điểm khám mặc định */
const DEFAULT_PLACES = [
  "Bệnh viện Care4U - Cơ sở Quận 1",
  "Bệnh viện Care4U - Cơ sở Quận 7",
  "Phòng khám Care4U - Thủ Đức",
  "Phòng khám Care4U - Bình Thạnh",
];

export default function NewAppointmentPage() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [customPlace, setCustomPlace] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!doctorId) {
      toast.error("Không tìm thấy bác sĩ");
    }
  }, [doctorId]);

  const submitAppointment = async () => {
    const finalPlace = place === "OTHER" ? customPlace : place;

    if (!doctorId || !date || !time || !finalPlace) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);

    const result = await createAppointment({
      doctorId: Number(doctorId),
      date,
      time,
      place: finalPlace,
      notes,
    });

    setLoading(false);

    if (result.success) {
      toast.success(result.message || "Đặt lịch hẹn thành công");
      setTimeout(() => {
        window.location.href = "/patient/manageappointment";
      }, 1500);
    } else {
      toast.error(result.message || "Không thể đặt lịch hẹn");
      if (result.code === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Đặt lịch hẹn khám bệnh
        </h1>

        <div className="space-y-4">
          {/* Ngày khám */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ngày khám
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Giờ khám */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Giờ khám
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Địa điểm khám */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Địa điểm khám
            </label>
            <select
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">-- Chọn địa điểm khám --</option>
              {DEFAULT_PLACES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
              <option value="OTHER">Khác (nhập địa điểm khác)</option>
            </select>

            {/* Nhập địa điểm khác */}
            {place === "OTHER" && (
              <input
                type="text"
                value={customPlace}
                onChange={(e) => setCustomPlace(e.target.value)}
                placeholder="Nhập địa điểm khác"
                className="mt-2 w-full border border-gray-300 rounded px-3 py-2"
              />
            )}
          </div>

          {/* Ghi chú */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ghi chú
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Nhập ghi chú (tùy chọn)"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Submit */}
          <button
            onClick={submitAppointment}
            disabled={loading}
            className="w-full bg-blue-700 text-white py-3 rounded font-medium hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Đang đặt lịch..." : "Xác nhận đặt lịch"}
          </button>
        </div>
      </div>
    </div>
  );
}
