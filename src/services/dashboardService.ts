import apiClient from "./apiClients";
import { DoctorDashboardStats } from "@/types/dashboard";

export const getDoctorDashboardStats = () =>
  apiClient.get<DoctorDashboardStats>("/doctor/dashboard/stats");
