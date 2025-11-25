// import { ProtectedRoute } from "@/components/ProtectedRoute";

// const DoctorPage = () => {
//     return (
//         <div>
//             <h1>Doctor Page</h1>
//         </div>
//     );
// };

// export default function ProtectedDoctorPage(){
//     return (
//         <ProtectedRoute role="DOCTOR">
//             <DoctorPage />
//         </ProtectedRoute>
//     );
// };

export default function DoctorDashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Today Overview</h2>
      <ul className="grid md:grid-cols-3 gap-4">
        <li className="border rounded-xl p-4">Upcoming appointments</li>
        <li className="border rounded-xl p-4">Pending records</li>
        <li className="border rounded-xl p-4">New messages</li>
      </ul>
    </div>
  );
}
