import { AxiosResponse } from "axios";
import { DoctorPost, CreateDoctorPostPayload } from "@/types/post";
import apiClient from "../apiClients";

export const getDoctorPosts = (): Promise<AxiosResponse<DoctorPost[]>> =>
  apiClient.get("/doctor/posts");

export const getDoctorPostById = (
  id: number
): Promise<AxiosResponse<DoctorPost>> =>
  apiClient.get(`/doctor/posts/${id}`);

export const createDoctorPost = (
  data: CreateDoctorPostPayload
): Promise<AxiosResponse<DoctorPost>> =>
  apiClient.post("/doctor/posts", data);

export const updateDoctorPost = (
  id: number,
  data: CreateDoctorPostPayload
): Promise<AxiosResponse<DoctorPost>> =>
  apiClient.put(`/doctor/posts/${id}`, data);

export const deleteDoctorPost = (id: number) =>
  apiClient.delete(`/doctor/posts/${id}`);
