import { DoctorProfile } from "@/types/types";
import api from "./apiClients";

export const getDoctorProfile = () =>
  api.get<DoctorProfile>("/api/v1/doctor/profile");

export const updateDoctorProfile = (data: Partial<DoctorProfile>) =>
  api.put<DoctorProfile>("/api/v1/doctor/profile", data);
