"use client";
import { useState } from "react";
import axiosClient from "@/utils/axiosClient";

type Item = {
  drugId: string;
  name: string;
  dose: string;
  quantity: number;
  note?: string;
};

export default function NewPrescription() {
  const [patientId, setPatientId] = useState("");
  const [items, setItems] = useState<Item[]>([
    { drugId: "", name: "", dose: "", quantity: 1 },
  ]);

  const addRow = () =>
    setItems((p) => [...p, { drugId: "", name: "", dose: "", quantity: 1 }]);
  const rmRow = (i: number) => setItems((p) => p.filter((_, idx) => idx !== i));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosClient.post("/doctor/prescriptions", { patientId, items });
    alert("Prescription created");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <h2 className="text-lg font-semibold">Prescribe Drugs</h2>
      <input
        className="border rounded-lg px-3 py-2"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />

      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="grid md:grid-cols-5 gap-2">
            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Drug ID"
              value={it.drugId}
              onChange={(e) =>
                setItems((m) =>
                  m.map((x, idx) =>
                    idx === i ? { ...x, drugId: e.target.value } : x
                  )
                )
              }
            />
            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Name"
              value={it.name}
              onChange={(e) =>
                setItems((m) =>
                  m.map((x, idx) =>
                    idx === i ? { ...x, name: e.target.value } : x
                  )
                )
              }
            />
            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Dose (e.g. 500mg x2/day)"
              value={it.dose}
              onChange={(e) =>
                setItems((m) =>
                  m.map((x, idx) =>
                    idx === i ? { ...x, dose: e.target.value } : x
                  )
                )
              }
            />
            <input
              type="number"
              className="border rounded-lg px-3 py-2"
              placeholder="Qty"
              value={it.quantity}
              onChange={(e) =>
                setItems((m) =>
                  m.map((x, idx) =>
                    idx === i ? { ...x, quantity: +e.target.value } : x
                  )
                )
              }
            />
            <div className="flex gap-2">
              <input
                className="border rounded-lg px-3 py-2 flex-1"
                placeholder="Note"
                value={it.note ?? ""}
                onChange={(e) =>
                  setItems((m) =>
                    m.map((x, idx) =>
                      idx === i ? { ...x, note: e.target.value } : x
                    )
                  )
                }
              />
              <button
                type="button"
                className="px-3 py-2 rounded-lg border"
                onClick={() => rmRow(i)}
              >
                −
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="px-3 py-2 rounded-lg border"
          onClick={addRow}
        >
          + Add drug
        </button>
      </div>

      <button className="px-4 py-2 rounded-lg border">
        Create prescription
      </button>
    </form>
  );
}
