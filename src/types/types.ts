import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface Department {
    id: string;
    name: string;
    description?: string;
    createdAt: Timestamp;
}