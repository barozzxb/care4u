import axiosClient from "@/utils/axiosClient";

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
  return axiosClient.post("/api/v1/doctor/medical-records", payload);
};
