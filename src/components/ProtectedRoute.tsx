"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import Loading from "./Loading";

export function ProtectedRoute({ children, role }: { children: React.ReactNode, role?: string }) {
    const { loading } = useAuth(role);
    if (loading) {
        return <><Loading /></>;
    }
    return <>{children}</>;
}