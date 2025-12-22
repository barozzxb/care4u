import { NextResponse } from "next/server";
import apiClient from "../apiClients";
import { Prediction } from "@/types/types";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export const fetchHistory = async (page: number, size: number) => {
  const res = await apiClient.get(`/patient/predictions/get-all?page=${page}&size=${size}`);
  const { status, message, body } = res.data;
  return { status, message, body };
}

export const savePrediction = async (item: Prediction) => {
  const res = await apiClient.post('/patient/predictions/create', item);
  const { status, message, body } = res.data;
  return { status, message, body };
}

export const deletePrediction = async (id: number) => {
  const res = await apiClient.delete(`/patient/predictions/delete/${id}`);
  const { status, message, body } = res.data;
  return { status, message, body };
}