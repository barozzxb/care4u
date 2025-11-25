"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/utils/axiosClient";
import axios from "axios";

type Appointment = {
  id: number;
  patientId: number;
  patientName: string;
  time: string;
  place: string;
  status: "PENDING" | "APPROVED" | "CANCELED" | "COMPLETED";
  reason?: string;
};

/* ---------- Modal primitive (không cần lib) ---------- */
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

/* ---------- Form tạo lịch trong modal ---------- */
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

    // validate sơ bộ
    if (!patientId || !date || !time || !place) {
      setError("Vui lòng nhập đủ Patient ID, Date, Time, Place.");
      return;
    }

    setSubmitting(true);
    try {
      await axiosClient.post("/doctor/appointments", {
        patientId: Number(patientId),
        date, // yyyy-MM-dd
        time, // HH:mm (Next tự trả theo input)
        place,
        notes,
      });
      onCreated(); // đóng modal + reload list ở cha
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
          <label className="text-sm text-gray-600">Patient ID</label>
          <input
            className="w-full rounded-lg border px-3 py-2"
            placeholder="e.g. 101"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
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
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create appointment"}
        </button>
      </div>
    </form>
  );
}

/* ---------- Trang chính ---------- */
export default function AppointmentsPage() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<Appointment | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/doctor/appointments", {
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
    load();
  }, [q]);

  const act = async (id: number, action: "APPROVE" | "REJECT" | "DONE") => {
    await axiosClient.post(`/doctor/appointments/${id}/action`, { action });
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

  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Appointments</h2>
        <div className="flex items-center gap-2">
          <input
            className="w-[260px] rounded-lg border px-3 py-2"
            placeholder="Search patient / notes..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
          >
            + New Appointment
          </button>
        </div>
      </div>

      {/* list */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Patient</th>
              <th>Time</th>
              <th>Place</th>
              <th>Status</th>
              <th className="w-72">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(data) ? data : []).map((a) => (
              <tr key={a.id} className="border-b">
                <td className="py-2">{a.patientName}</td>
                <td>{new Date(a.time).toLocaleString()}</td>
                <td>{a.place}</td>
                <td>{a.status}</td>
                <td className="py-2">
                  <div className="flex gap-2">
                    <button
                      className="rounded-lg border px-3 py-1"
                      disabled={a.status !== "PENDING"}
                      onClick={() => act(a.id, "APPROVE")}
                    >
                      Approve
                    </button>
                    <button
                      className="rounded-lg border px-3 py-1"
                      disabled={a.status !== "PENDING"}
                      onClick={() => act(a.id, "REJECT")}
                    >
                      Reject
                    </button>
                    <button
                      className="rounded-lg border px-3 py-1"
                      disabled={a.status !== "APPROVED"}
                      onClick={() => act(a.id, "DONE")}
                    >
                      Done
                    </button>
                    <button
                      className="rounded-lg border px-3 py-1"
                      onClick={() => {
                        setEditItem(a);
                        setEditOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded-lg border px-3 py-1 text-red-600 hover:bg-red-100"
                      onClick={async () => {
                        if (
                          confirm("Bạn có chắc muốn xoá cuộc hẹn này không?")
                        ) {
                          await axiosClient.delete(
                            `/doctor/appointments/${a.id}`
                          );
                          setData((prev) => prev.filter((x) => x.id !== a.id)); // cập nhật UI nhanh
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No appointments
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal tạo lịch */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create Appointment"
      >
        <CreateAppointmentForm
          onCreated={() => {
            setOpen(false);
            load();
          }}
        />
      </Modal>

      {/* Modal chỉnh sửa */}
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Appointment"
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
/* ---------- Form chỉnh sửa ---------- */
function EditAppointmentForm({
  appointment,
  onSaved,
}: {
  appointment: Appointment;
  onSaved: () => void;
}) {
  const [date, setDate] = useState(appointment.time.split("T")[0]);
  const [time, setTime] = useState(
    new Date(appointment.time).toISOString().substring(11, 16)
  );
  const [place, setPlace] = useState(appointment.place || "");
  const [notes, setNotes] = useState(appointment.reason || "");
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
      await axiosClient.patch(`/doctor/appointments/${appointment.id}`, {
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
