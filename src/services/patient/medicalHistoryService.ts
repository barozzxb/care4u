import apiClient from "@/services/apiClients";

export interface MedicalRecord {
  id: number;
  createdAt: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  doctorName: string; 
}

export const getMedicalHistory = async (): Promise<MedicalRecord[]> => {
  const res = await apiClient.get("/medicalhistory");
  return res.data;
};

export const getMedicalRecordById = async (id: number): Promise<MedicalRecord> => {
  const res = await apiClient.get(`/medicalhistory/${id}`);
  return res.data;
};
