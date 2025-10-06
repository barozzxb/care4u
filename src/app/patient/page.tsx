import { ProtectedRoute } from "@/components/ProtectedRoute";


const PatientPage = () => {
    return (
        <div>
            <h1>Patient Page</h1>
        </div>
    );
};

export default function ProtectedPatientPage (){
    return (
        <ProtectedRoute role="PATIENT">
            <PatientPage />
        </ProtectedRoute>
    );
};
