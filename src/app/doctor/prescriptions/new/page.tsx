"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createPrescription } from "@/services/prescriptionService";
import { toast } from "react-toastify";
import axios from "axios";

type Item = {
  drugId?: string;
  name: string;
  dose: string;
  quantity: number;
  note?: string;
};

type PrescriptionPayload = {
  patientId: number;
  items: Array<{
    drugId?: number;
    name: string;
    dose: string;
    quantity: number;
    note?: string;
  }>;
};

type ApiError = { message?: string };

export default function NewPrescription() {
  const router = useRouter();

  const [patientId, setPatientId] = useState("");
  const [items, setItems] = useState<Item[]>([
    { drugId: "", name: "", dose: "", quantity: 1 },
  ]);

  const addRow = () =>
    setItems((prev) => [
      ...prev,
      { drugId: "", name: "", dose: "", quantity: 1 },
    ]);

  const removeRow = (idx: number) =>
    setItems((prev) => prev.filter((_, i) => i !== idx));

  const updateRow = (idx: number, patch: Partial<Item>) =>
    setItems((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, ...patch } : r))
    );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const pid = Number(patientId);
    if (!Number.isFinite(pid) || pid <= 0) {
      toast.error("Patient ID không hợp lệ");
      return;
    }

    const cleanedItems = items
      .map((it) => {
        const name = it.name.trim();
        const dose = it.dose.trim();
        const quantity = Number(it.quantity);
        const note = it.note?.trim();

        const drugIdNum =
          it.drugId && it.drugId.trim() !== "" ? Number(it.drugId) : undefined;

        return {
          drugId: Number.isFinite(drugIdNum as number) ? drugIdNum : undefined,
          name,
          dose,
          quantity,
          note: note ? note : undefined,
        };
      })
      .filter((it) => it.name && it.dose && it.quantity > 0);

    if (cleanedItems.length === 0) {
      toast.error("Bạn cần nhập ít nhất 1 thuốc hợp lệ");
      return;
    }

    const payload: PrescriptionPayload = {
      patientId: pid,
      items: cleanedItems,
    };

    try {
      await createPrescription(payload);
      toast.success("Tạo đơn thuốc thành công");
      router.push("/doctor/prescriptions");
    } catch (err: unknown) {
      if (axios.isAxiosError<ApiError>(err)) {
        toast.error(err.response?.data?.message ?? "Tạo đơn thuốc thất bại");
      } else {
        toast.error("Tạo đơn thuốc thất bại");
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Tạo đơn thuốc</h2>

      <div className="space-y-1">
        <label className="text-sm">Mã bệnh nhân</label>
        <input
          className="w-full rounded-lg border border-gray-400 px-3 py-2"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="VD 12"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Danh sách thuốc</h3>
          <button
            type="button"
            className="px-3 py-2 rounded-lg border"
            onClick={addRow}
          >
            + Thêm thuốc
          </button>
        </div>

        <div className="space-y-2">
          {items.map((it, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 items-center">
              <input
                className="col-span-3 rounded-lg border px-2 py-2"
                placeholder="Tên thuốc"
                value={it.name}
                onChange={(e) => updateRow(idx, { name: e.target.value })}
              />
              <input
                className="col-span-4 rounded-lg border px-2 py-2"
                placeholder="Liều dùng"
                value={it.dose}
                onChange={(e) => updateRow(idx, { dose: e.target.value })}
              />
              <input
                type="number"
                className="col-span-1 rounded-lg border px-2 py-2"
                placeholder="Số lượng"
                value={it.quantity}
                onChange={(e) =>
                  updateRow(idx, { quantity: Number(e.target.value) })
                }
                min={1}
              />
              <input
                className="col-span-3 rounded-lg border px-2 py-2"
                placeholder="Ghi chú"
                value={it.note ?? ""}
                onChange={(e) => updateRow(idx, { note: e.target.value })}
              />
              <button
                type="button"
                className="col-span-1 rounded-lg border px-2 py-2"
                onClick={() => removeRow(idx)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <button className="px-4 py-2 rounded-lg border">Tạo đơn thuốc</button>
    </form>
  );
}
