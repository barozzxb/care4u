import { DoctorProfile } from "@/types/types";
import apiClient from "./apiClients";

export const getDoctorProfile = () =>
  apiClient.get<DoctorProfile>("/doctor/profile");

export const updateDoctorProfile = (data: Partial<DoctorProfile>) =>
  apiClient.put<DoctorProfile>("/doctor/profile", data);
