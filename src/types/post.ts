export interface DoctorPost {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
}

export interface CreateDoctorPostPayload {
  title: string;
  content: string;
  thumbnail?: string;
}
