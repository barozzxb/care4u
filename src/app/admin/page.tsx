import { ProtectedRoute } from "@/components/ProtectedRoute";
import Link from "next/link";


const AdminPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <p className="text-3xl font-bold">Welcome to Admin Page</p>
            <p className="mt-4">Only users with the ADMIN role can access this page.</p>
            <p className="mt-4">Here you can manage users, view reports, and configure settings.</p>
            <Link href="/dashboard" className="mt-6 inline-block text-blue-500 hover:underline">
                Get started
            </Link>
        </div>
    );
};

export default function ProtectedAdminPage (){
    return (
        <ProtectedRoute role="ADMIN">
            <AdminPage />
        </ProtectedRoute>
    );
};
