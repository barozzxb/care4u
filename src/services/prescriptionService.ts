import axiosClient from "@/utils/axiosClient";

export type PrescriptionItemPayload = {
  drugId?: number | null;
  name: string;
  dose: string;
  quantity: number;
  note?: string;
};

export type CreatePrescriptionPayload = {
  patientId: number;
  items: PrescriptionItemPayload[];
};

export const createPrescription = (payload: CreatePrescriptionPayload) =>
  axiosClient.post("/api/v1/doctor/prescriptions", payload);

export const listPrescriptions = (patientId?: number) =>
  axiosClient.get("/api/v1/doctor/prescriptions", {
    params: patientId ? { patientId } : {},
  });

export const getPrescriptionDetail = (id: number) =>
  axiosClient.get(`/api/v1/doctor/prescriptions/${id}`);
