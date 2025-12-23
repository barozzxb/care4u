import { PendingMedicalRecord } from "@/types/medicalRecord";
import axiosClient from "@/utils/axiosClient";
import apiClient from "./apiClients";
export interface CreateMedicalRecordPayload {
  patientId: number;

  systolicBP?: number;
  diastolicBP?: number;
  temperature?: number;
  heartRate?: number;
  respiratoryRate?: number;
  spo2?: number;

  height?: number;
  weight?: number;
  bmi?: number;

  symptoms?: string;
  physicalExam?: string;
  diagnosis?: string;
  conclusion?: string;
  treatment?: string;
  advice?: string;
  notes?: string;
}

export const createMedicalRecord = (payload: CreateMedicalRecordPayload) => {
  return apiClient.post("/doctor/medical-records", payload);
};
export const getPendingMedicalRecords = () =>
  apiClient.get<PendingMedicalRecord[]>(
    "/doctor/dashboard/medical-records/pending"
  );
