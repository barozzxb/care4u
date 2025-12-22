export type TodayAppointment = {
  id: number;
  time: string;
  patientName: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
};
