"use client";

import { useEffect, useState } from "react";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "@/services/doctorService";
import { DoctorProfile } from "@/types/types";

export default function DoctorProfilePage() {
  const [form, setForm] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getDoctorProfile().then((res) => {
      setForm(res.data);
      setLoading(false);
    });
  }, []);

  const onChange = <K extends keyof DoctorProfile>(
    key: K,
    value: DoctorProfile[K]
  ) => {
    if (!form) return;
    setForm({ ...form, [key]: value });
  };

  const submit = async () => {
    if (!form) return;
    setSaving(true);
    await updateDoctorProfile(form);
    setSaving(false);
    alert("Cập nhật hồ sơ thành công");
  };

  if (loading || !form) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl space-y-8">
      <h2 className="text-2xl font-semibold">My Profile</h2>

      {/* ================= PERSONAL INFO ================= */}
      <section className="rounded-xl border p-6 space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            className="border rounded-lg p-2"
            placeholder="First name"
            value={form.firstname || ""}
            onChange={(e) => onChange("firstname", e.target.value)}
          />

          <input
            className="border rounded-lg p-2"
            placeholder="Last name"
            value={form.lastname || ""}
            onChange={(e) => onChange("lastname", e.target.value)}
          />

          <select
            className="border rounded-lg p-2"
            value={form.gender || ""}
            onChange={(e) => onChange("gender", e.target.value)}
          >
            <option value="">Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>

          <input
            type="date"
            className="border rounded-lg p-2"
            value={form.dob || ""}
            onChange={(e) => onChange("dob", e.target.value)}
          />

          <input
            className="border rounded-lg p-2 col-span-2"
            placeholder="Phone number"
            value={form.phonenum || ""}
            onChange={(e) => onChange("phonenum", e.target.value)}
          />

          <input
            className="border rounded-lg p-2 col-span-2"
            placeholder="Address"
            value={form.address || ""}
            onChange={(e) => onChange("address", e.target.value)}
          />
        </div>
      </section>

      {/* ================= PROFESSIONAL INFO ================= */}
      <section className="rounded-xl border p-6 space-y-4">
        <h3 className="text-lg font-medium">Professional Information</h3>

        <textarea
          className="border rounded-lg p-2 w-full"
          rows={3}
          placeholder="Bio"
          value={form.bio || ""}
          onChange={(e) => onChange("bio", e.target.value)}
        />

        <textarea
          className="border rounded-lg p-2 w-full"
          rows={2}
          placeholder="Education"
          value={form.education || ""}
          onChange={(e) => onChange("education", e.target.value)}
        />

        <textarea
          className="border rounded-lg p-2 w-full"
          rows={2}
          placeholder="Experience"
          value={form.experience || ""}
          onChange={(e) => onChange("experience", e.target.value)}
        />

        <textarea
          className="border rounded-lg p-2 w-full"
          rows={2}
          placeholder="Certification"
          value={form.certification || ""}
          onChange={(e) => onChange("certification", e.target.value)}
        />

        <input
          className="border rounded-lg p-2 w-full"
          placeholder="Working hours (e.g. Mon–Fri 8:00–17:00)"
          value={form.workinghour || ""}
          onChange={(e) => onChange("workinghour", e.target.value)}
        />
      </section>

      {/* ================= ACTION ================= */}
      <div className="flex justify-end">
        <button
          onClick={submit}
          disabled={saving}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
