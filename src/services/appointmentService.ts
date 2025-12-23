import { TodayAppointment } from "@/types/appointment";
import apiClient from "./apiClients";

export const getTodayAppointments = () =>
  apiClient.get<TodayAppointment[]>("doctor/dashboard/appointments/today");
