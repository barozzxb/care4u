import { ProtectedRoute } from "@/components/ProtectedRoute";

const DoctorPage = () => {
    return (
        <div>
            <h1>Doctor Page</h1>
        </div>
    );
};

export default function ProtectedDoctorPage(){
    return (
        <ProtectedRoute role="DOCTOR">
            <DoctorPage />
        </ProtectedRoute>
    );
};
