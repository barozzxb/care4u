"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { listPrescriptions } from "@/services/prescriptionService";
import { useRouter } from "next/navigation";

type UserLike = { id: number; firstname?: string; lastname?: string };

type Prescription = {
  id: number;
  createdAt: string;
  patientId: number;
  patientName: string;
  itemsCount: number;
  itemsPreview?: {
    id: number;
    name: string;
    dose: string;
    quantity: number;
    note?: string;
  }[];
};

export default function PrescriptionListPage() {
  const [loading, setLoading] = useState(true);
  const [patientId, setPatientId] = useState("");
  const [data, setData] = useState<Prescription[]>([]);
  const router = useRouter();

  const pid = useMemo(() => {
    const n = Number(patientId);
    return n ? n : undefined;
  }, [patientId]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listPrescriptions(pid);
      const payload = res.data;
      const list: Prescription[] = Array.isArray(payload)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid]);

  const patientName = (p: UserLike) =>
    `${p?.lastname ?? ""} ${p?.firstname ?? ""}`.trim() || `#${p?.id ?? ""}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Prescriptions</h2>
        <Link
          className="rounded-lg border px-3 py-2"
          href="/doctor/prescriptions/new"
        >
          + New prescription
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <input
          className="w-[260px] rounded-lg border border-gray-400 px-3 py-2"
          placeholder="Filter by patientId (optional)"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button className="rounded-lg border px-3 py-2" onClick={load}>
          Refresh
        </button>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 px-3 py-2 text-sm font-medium">
          <div className="col-span-2">ID</div>
          <div className="col-span-4">Patient</div>
          <div className="col-span-4">Created</div>
          <div className="col-span-2">Items</div>
        </div>

        {loading ? (
          <div className="px-3 py-4">Loading...</div>
        ) : data.length === 0 ? (
          <div className="px-3 py-4">No prescriptions.</div>
        ) : (
          data.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-12 px-3 py-2 border-t text-sm cursor-pointer hover:bg-gray-50"
              onClick={() => router.push(`/doctor/prescriptions/${p.id}`)}
            >
              <div className="col-span-2">#{p.id}</div>
              <div className="col-span-4">{p.patientName}</div>
              <div className="col-span-4">
                {new Date(p.createdAt).toLocaleString("vi-VN")}
              </div>
              <div className="col-span-2">{p.itemsCount}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
