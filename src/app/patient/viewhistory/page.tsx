"use client";

import React, { useMemo, useState } from "react";
import {
  FileText,
  CalendarDays,
  User,
  Stethoscope,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";

export default function ViewMedicalHistoryPage() {
  // Giả lập dữ liệu (sau có thể lấy từ API)
  const [medicalRecords] = useState([
    {
      id: 1,
      date: "2025-05-12",
      hospital: "Bệnh viện Đa khoa Đà Nẵng",
      doctor: "BS. Nguyễn Văn Minh",
      diagnosis: "Viêm họng cấp",
      notes: "Kê đơn thuốc kháng sinh trong 7 ngày, nghỉ ngơi nhiều.",
    },
    {
      id: 2,
      date: "2024-11-03",
      hospital: "Phòng khám An Khang",
      doctor: "BS. Lê Thị Hương",
      diagnosis: "Đau dạ dày nhẹ",
      notes: "Khuyên điều chỉnh chế độ ăn uống, uống thuốc trong 10 ngày.",
    },
    {
      id: 3,
      date: "2023-08-21",
      hospital: "Bệnh viện Trung ương Huế",
      doctor: "BS. Trần Quang Dũng",
      diagnosis: "Khám sức khỏe tổng quát",
      notes: "Tình trạng sức khỏe tốt, không phát hiện bất thường.",
    },
  ]);

  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | "all">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const years = useMemo(() => {
    const set = new Set<string>();
    medicalRecords.forEach((r) => set.add(new Date(r.date).getFullYear().toString()));
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [medicalRecords]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = medicalRecords.filter((r) => {
      const y = new Date(r.date).getFullYear().toString();
      const inYear = selectedYear === "all" || y === selectedYear;
      if (!q) return inYear;
      const hay = `${r.hospital} ${r.doctor} ${r.diagnosis} ${r.notes}`.toLowerCase();
      return inYear && hay.includes(q);
    });
    list.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sortOrder === "desc" ? db - da : da - db;
    });
    return list;
  }, [medicalRecords, query, selectedYear, sortOrder]);

  return (
    <div className="px-6 md:px-10 pt-20 pb-16 max-w-6xl mx-auto">
      <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
                Lịch sử khám chữa bệnh
              </h1>
              <p className="mt-2 text-gray-600">
                Theo dõi các lần khám để nắm rõ tình trạng sức khỏe của bạn.
              </p>
            </div>

            <div className="w-full md:w-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm kiếm bệnh viện, bác sĩ, chẩn đoán..."
                  className="w-full pl-9 pr-3 h-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value as any)}
                  className="appearance-none w-full pl-9 pr-9 h-10 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tất cả năm</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                  className="appearance-none w-full pl-3 pr-9 h-10 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="desc">Mới nhất trước</option>
                  <option value="asc">Cũ nhất trước</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-50 border border-gray-200">
                <CalendarDays className="w-6 h-6 text-gray-400" />
              </div>
              <p className="mt-4 text-gray-900 font-medium">Không tìm thấy kết quả phù hợp</p>
              <p className="mt-1 text-gray-500 text-sm">Hãy thử từ khóa khác hoặc thay đổi bộ lọc.</p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
              <div className="space-y-6">
                {filtered.map((record, index) => {
                  const date = new Date(record.date);
                  const displayDate = date.toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });
                  return (
                    <div key={record.id} className="relative pl-10">
                      <div className="absolute left-0 top-6 -translate-x-1/2">
                        <div className="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                      </div>

                      <div className="group border border-gray-200 rounded-2xl p-5 md:p-6 bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-gray-900">
                              <CalendarDays className="text-blue-600 w-5 h-5" />
                              <span className="font-semibold text-lg">{displayDate}</span>
                            </div>
                            <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 text-xs font-medium">
                              Hồ sơ #{record.id}
                            </span>
                          </div>
                          <button
                            className="text-blue-600 font-medium hover:underline inline-flex items-center gap-2"
                            onClick={() => alert(`Xem chi tiết hồ sơ #${record.id}`)}
                          >
                            <FileText size={18} /> Xem chi tiết
                          </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5"><Stethoscope className="w-4 h-4 text-emerald-600" /></div>
                            <div>
                              <div className="text-xs text-gray-500">Cơ sở y tế</div>
                              <div className="font-medium text-gray-900">{record.hospital}</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="mt-0.5"><User className="w-4 h-4 text-indigo-600" /></div>
                            <div>
                              <div className="text-xs text-gray-500">Bác sĩ</div>
                              <div className="font-medium text-gray-900">{record.doctor}</div>
                            </div>
                          </div>

                          <div className="md:col-span-2 flex flex-wrap items-center gap-2">
                            <span className="text-xs text-gray-500">Chẩn đoán</span>
                            <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 text-xs font-medium">
                              {record.diagnosis}
                            </span>
                          </div>

                          <div className="md:col-span-2 text-gray-600">
                            <div className="text-xs text-gray-500 mb-1">Ghi chú</div>
                            <p className="leading-relaxed">{record.notes}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
