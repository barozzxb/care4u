import api from "./apiClients";
import { DoctorDashboardStats } from "@/types/dashboard";

export const getDoctorDashboardStats = () =>
  api.get<DoctorDashboardStats>("/api/v1/doctor/dashboard/stats");
