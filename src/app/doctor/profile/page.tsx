"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/utils/axiosClient";

type Profile = {
  firstname: string;
  lastname: string;
  dob?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  phonenum?: string;
  address?: string;
  avatar?: string;
  speciality?: string;
};

export default function DoctorProfile() {
  const [form, setForm] = useState<Profile>({ firstname: "", lastname: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await axiosClient.get("/api/v1/doctor/profile");
      setForm(res.data);
    })();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await axiosClient.put("/api/v1/doctor/profile", form);
    setSaving(false);
    alert("Updated!");
  };

  return (
    <form onSubmit={submit} className="grid gap-3 max-w-xl">
      <h2 className="text-lg font-semibold">My Profile</h2>
      <div className="grid grid-cols-2 gap-2">
        <input
          className="border rounded-lg px-3 py-2"
          placeholder="First name"
          value={form.firstname}
          onChange={(e) => setForm({ ...form, firstname: e.target.value })}
        />
        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Last name"
          value={form.lastname}
          onChange={(e) => setForm({ ...form, lastname: e.target.value })}
        />
      </div>
      <input
        className="border rounded-lg px-3 py-2"
        placeholder="Phone"
        value={form.phonenum ?? ""}
        onChange={(e) => setForm({ ...form, phonenum: e.target.value })}
      />
      <input
        className="border rounded-lg px-3 py-2"
        placeholder="Address"
        value={form.address ?? ""}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <input
        className="border rounded-lg px-3 py-2"
        placeholder="Speciality"
        value={form.speciality ?? ""}
        onChange={(e) => setForm({ ...form, speciality: e.target.value })}
      />
      <button disabled={saving} className="px-4 py-2 rounded-lg border w-fit">
        {saving ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
