// "use client";

// import React, { useEffect, useState } from 'react';
// import Loading from '@/components/Loading'

// import { useDepartmentLoad } from '@/hooks/useDepartmentLoad';

// const DepartmentsPage = () => {

//     const { loading, departments } = useDepartmentLoad();

//     console.log(departments);

//     return (
//         <div className="flex flex-col  justify-center align-middle p-4 bg-white rounded-lg shadow-md">
//             <h1 className="text-2xl font-bold text-center">Các chuyên khoa</h1>
//             <p className="text-center mt-2 text-gray-600">Quản lý tất cả các chuyên khoa ở đây.</p>

//             {loading ? (
//                 <div className="flex items-center justify-center py-8">
//                     <Loading />
//                 </div>
//             ) : departments.length === 0 ? (
//                 <p className="text-center mt-4 text-gray-500">No departments found.</p>
//             ) : (
//                 <div className="overflow-x-auto mt-6">
//                     <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
//                         <thead className="bg-gray-50 sticky top-0">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
//                                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
//                                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Description</th>
//                                 <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">View</th>
//                                 <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-100">
//                             {departments.map((department, idx) => (
//                                 <tr key={department.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{department.id}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{department.name}</td>
//                                     <td className="px-6 py-4 text-sm text-gray-600">{department.description}</td>
//                                     <td className="px-6 py-4 text-center space-x-2">
//                                         <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 transition">
//                                             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6h16M4 18h16" /></svg>
//                                             Doctors
//                                         </button>
//                                         <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-400 text-white rounded-lg text-sm hover:bg-emerald-500 transition">
//                                             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
//                                             Staffs
//                                         </button>
//                                     </td>
//                                     <td className="px-6 py-4 text-center">
//                                         <div className="inline-flex items-center gap-2">
//                                             <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition">
//                                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5h6M11 9h6M11 13h6M11 17h6M5 5h.01M5 9h.01M5 13h.01M5 17h.01" /></svg>
//                                                 Edit
//                                             </button>
//                                             <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition">
//                                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DepartmentsPage;