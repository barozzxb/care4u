import axiosClient from "@/utils/axiosClient";

export interface CreateMedicalRecordPayload {
  patientId: number;

  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  temperature?: number;
  heartRate?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;

  height?: number;
  weight?: number;
  bmi?: number;
  physicalExam?: string;

  symptom?: string;
  diagnosis?: string;
  clinicalConclusion?: string;
  treatmentPlan?: string;
  advice?: string;

  note?: string;
}

export const createMedicalRecord = (payload: CreateMedicalRecordPayload) => {
  return axiosClient.post("/api/v1/doctor/medical-records", payload);
};
