import apiClient from "./apiClients";
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
  apiClient.post("/doctor/prescriptions", payload);

export const listPrescriptions = (patientId?: number) =>
  apiClient.get("/doctor/prescriptions", {
    params: patientId ? { patientId } : {},
  });

export const getPrescriptionDetail = (id: number) =>
  apiClient.get(`/doctor/prescriptions/${id}`);
