"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPrescriptionDetail } from "@/services/prescriptionService";

type Item = {
  id: number;
  name: string;
  dose: string;
  quantity: number;
  note?: string;
};

type Detail = {
  id: number;
  createdAt: string;
  patientId: number;
  patientName: string;
  items: Item[];
};

export default function PrescriptionDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getPrescriptionDetail(Number(id))
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Prescription not found.</div>;

  return (
    <div className="space-y-4">
      <button onClick={() => router.back()} className="text-sm underline">
        ← Back
      </button>

      <div className="rounded-xl border p-4 space-y-2">
        <h2 className="text-lg font-semibold">Prescription #{data.id}</h2>

        <div className="text-sm">
          <b>Patient:</b> {data.patientName}
        </div>

        <div className="text-sm">
          <b>Created:</b> {new Date(data.createdAt).toLocaleString("vi-VN")}
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 px-3 py-2 text-sm font-medium">
          <div className="col-span-4">Drug</div>
          <div className="col-span-4">Dose</div>
          <div className="col-span-2">Qty</div>
          <div className="col-span-2">Note</div>
        </div>

        {data.items.map((it) => (
          <div
            key={it.id}
            className="grid grid-cols-12 px-3 py-2 border-t text-sm"
          >
            <div className="col-span-4">{it.name}</div>
            <div className="col-span-4">{it.dose}</div>
            <div className="col-span-2">{it.quantity}</div>
            <div className="col-span-2">{it.note || "-"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
