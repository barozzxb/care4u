"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useRedirect() {
    const router = useRouter();

    const redirectByRole = useCallback((role: string) => {
        switch (role) {
            case "PATIENT":
                router.push("/patient");
                break;
            case "DOCTOR":
                router.push("/doctor");
                break;
            case "ADMIN":
                router.push("/admin");
                break;
            case "STAFF":
                router.push("/staff");
                break;
            default:
                router.push("/");
                break;
        }
    }, [router]);

    return { redirectByRole };
};
