import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export function isBlank(str :String) : boolean {
    return !str || str.trim().length === 0
}

export function formatTime(isoString?: string): string {
    if (!isoString) return "";

    const date = new Date(isoString);

    if (isNaN(date.getTime())) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}