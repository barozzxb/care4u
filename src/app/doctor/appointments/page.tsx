"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/utils/axiosClient";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";

type Appointment = {
  id: number;
  patientId: number;
  patientName: string;
  time: string;
  place: string;
  status: "PENDING" | "APPROVED" | "CANCELED" | "COMPLETED";
  reason?: string;
};

function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-[520px] max-w-[92vw] rounded-xl bg-white p-5 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title ?? "Modal"}</h3>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function CreateAppointmentForm({ onCreated }: { onCreated: () => void }) {
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!patientId || !date || !time || !place) {
      setError("Vui lòng nhập đủ Patient ID, Date, Time, Place.");
      return;
    }

    setSubmitting(true);
    try {
      await axiosClient.post("/api/v1/doctor/appointments", {
        patientId: Number(patientId),
        date,
        time,
        place,
        notes,
      });
      onCreated();
    } catch (err: unknown) {
      let msg = "Tạo lịch thất bại";
      if (axios.isAxiosError(err)) {
        msg = (err.response?.data as { message?: string })?.message ?? msg;
      }
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm text-gray-600">ID Bệnh Nhân</label>
          <input
            className="w-full rounded-lg border px-3 py-2"
            placeholder="e.g. 101"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Địa điểm</label>
          <input
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Clinic Room 2"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Ngày</label>
          <input
            type="date"
            className="w-full rounded-lg border px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Thời gian</label>
          <input
            type="time"
            className="w-full rounded-lg border px-3 py-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-600">Ghi chú</label>
        <input
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Short note (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create appointment"}
        </button>
      </div>
    </form>
  );
}

export default function AppointmentsPage() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<Appointment | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/api/v1/doctor/appointments", {
        params: { q },
      });
      const payload = res.data;
      const list: Appointment[] = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
        ? payload.data
        : [];
      setData(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      load();
    }, 400);

    return () => clearTimeout(handler);
  }, [q]);

  const act = async (id: number, action: "APPROVE" | "REJECT" | "DONE") => {
    await axiosClient.post(`/api/v1/doctor/appointments/${id}/action`, {
      action,
    });
    setData((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status:
                action === "APPROVE"
                  ? "APPROVED"
                  : action === "REJECT"
                  ? "CANCELED"
                  : "COMPLETED",
            }
          : a
      )
    );
  };

  const baseActionBtn =
    "flex-1 rounded-full border px-3 py-1 text-xs md:text-sm transition";
  const activeActionBtn = "bg-green-700 text-white border-green-700 shadow-sm";
  const inactiveActionBtn =
    "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 disabled:opacity-60 disabled:hover:bg-white";

  const statusClass = (status: Appointment["status"]) => {
    switch (status) {
      case "APPROVED":
        return "border-blue-400 text-blue-500 bg-blue-50";
      case "CANCELED":
        return "border-red-400 text-red-500 bg-red-50";
      case "COMPLETED":
        return "border-green-400 text-green-600 bg-green-50";
      default:
        return "border-gray-300 text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Danh sách lịch hẹn</h2>
        <div className="flex items-center gap-2">
          <input
            className="w-[260px] rounded-lg border border-gray-400 px-3 py-2"
            placeholder="Tìm bệnh nhân / ghi chú..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold
                       text-white shadow-md hover:bg-sky-600 active:scale-[0.98] transition"
          >
            + Tạo lịch hẹn
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Bệnh nhân</th>
              <th>Thời gian</th>
              <th>Địa điểm</th>
              <th>Trạng thái</th>
              <th className="w-80">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(data) ? data : []).map((a) => {
              const isApproved = a.status === "APPROVED";
              const isCanceled = a.status === "CANCELED";
              const isCompleted = a.status === "COMPLETED";

              return (
                <tr key={a.id} className="border-b">
                  <td className="py-2">{a.patientName}</td>
                  <td>{new Date(a.time).toLocaleString()}</td>
                  <td>{a.place}</td>
                  <td>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${statusClass(
                        a.status
                      )}`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-1 gap-2">
                        <button
                          className={`${baseActionBtn} ${
                            isApproved ? activeActionBtn : inactiveActionBtn
                          }`}
                          disabled={a.status !== "PENDING"}
                          onClick={() => act(a.id, "APPROVE")}
                        >
                          Xác nhận
                        </button>
                        <button
                          className={`${baseActionBtn} ${
                            isCanceled ? activeActionBtn : inactiveActionBtn
                          }`}
                          disabled={a.status !== "PENDING"}
                          onClick={() => act(a.id, "REJECT")}
                        >
                          Từ chối
                        </button>
                        <button
                          className={`${baseActionBtn} ${
                            isCompleted ? activeActionBtn : inactiveActionBtn
                          }`}
                          disabled={a.status !== "APPROVED"}
                          onClick={() => act(a.id, "DONE")}
                        >
                          Hoàn thành
                        </button>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setMenuOpenId((prev) =>
                              prev === a.id ? null : a.id
                            )
                          }
                          className="rounded-full border border-gray-300 bg-white p-1.5 hover:bg-gray-50 transition"
                        >
                          <BsThreeDotsVertical className="text-gray-600" />
                        </button>

                        {menuOpenId === a.id && (
                          <div className="absolute right-0 mt-2 w-32 rounded-lg border bg-white shadow-lg text-sm z-10">
                            <button
                              className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                              onClick={() => {
                                setEditItem(a);
                                setEditOpen(true);
                                setMenuOpenId(null);
                              }}
                            >
                              Chỉnh sửa
                            </button>
                            <button
                              className="block w-full px-3 py-2 text-left text-red-600 hover:bg-red-50"
                              onClick={async () => {
                                const ok = confirm(
                                  "Bạn có chắc muốn xoá cuộc hẹn này không?"
                                );
                                if (ok) {
                                  await axiosClient.delete(
                                    `/api/v1/doctor/appointments/${a.id}`
                                  );
                                  setData((prev) =>
                                    prev.filter((x) => x.id !== a.id)
                                  );
                                }
                                setMenuOpenId(null);
                              }}
                            >
                              Xoá
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  Không có lịch hẹn
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Tạo lịch hẹn">
        <CreateAppointmentForm
          onCreated={() => {
            setOpen(false);
            load();
          }}
        />
      </Modal>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Chỉnh sửa lịch hẹn"
      >
        {editItem && (
          <EditAppointmentForm
            appointment={editItem}
            onSaved={() => {
              setEditOpen(false);
              load();
            }}
          />
        )}
      </Modal>
    </div>
  );
}

/* ---------- Form chỉnh sửa ---------- */
function EditAppointmentForm({
  appointment,
  onSaved,
}: {
  appointment: Appointment;
  onSaved: () => void;
}) {
  const [date, setDate] = useState(() => {
    // Check an toàn
    if (!appointment.time) return "";
    return new Date(appointment.time).toISOString().split("T")[0];
  });

  const [time, setTime] = useState(() => {
    // FIX 4: Sửa lỗi Timezone (Tránh convert sang UTC)
    if (!appointment.time) return "";
    const d = new Date(appointment.time);
    // Lấy giờ theo local time (HH:mm)
    return d.toTimeString().slice(0, 5);
  });

  const [place, setPlace] = useState(appointment.place || "");
  const [notes, setNotes] = useState(appointment.reason || ""); // Lấy từ reason
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!date || !time || !place) {
      setError("Vui lòng nhập đủ Date, Time và Place.");
      return;
    }

    setSaving(true);
    try {
      await axiosClient.patch(`/api/v1/doctor/appointments/${appointment.id}`, {
        date,
        time,
        place,
        notes,
      });
      onSaved();
    } catch (err: unknown) {
      let msg = "Cập nhật thất bại";
      if (axios.isAxiosError(err)) {
        msg = (err.response?.data as { message?: string })?.message ?? msg;
      }
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="grid gap-3">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Patient ID</label>
          <input
            className="w-full rounded-lg border px-3 py-2 bg-gray-100 text-gray-500"
            value={appointment.patientId}
            readOnly
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Place</label>
          <input
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Clinic Room 2"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Date</label>
          <input
            type="date"
            className="w-full rounded-lg border px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Time</label>
          <input
            type="time"
            className="w-full rounded-lg border px-3 py-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-600">Notes</label>
        <input
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Short note (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
