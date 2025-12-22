import { TodayAppointment } from "@/types/appointment";
import api from "./apiClients";

export const getTodayAppointments = () =>
  api.get<TodayAppointment[]>("/api/v1/doctor/dashboard/appointments/today");
