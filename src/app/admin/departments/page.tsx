"use client";

import React, { useEffect, useState } from 'react';

import { useDepartmentLoad } from '@/hooks/useDepartmentLoad';

const DepartmentsPage = () => {

    const { loading, departments } = useDepartmentLoad();

    console.log(departments);

    return (
        <div className="flex flex-col  justify-center align-middle p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center">Departments</h1>
            <p className="text-center mt-2 text-gray-600">Manage all departments here.</p>

            {loading ? (
                <p className="text-center mt-4 text-gray-500">Loading...</p>
            ) : (
                departments.length === 0 ? (
                    <p className="text-center mt-4 text-gray-500">No departments found.</p>
                ) : (
                    <table className="min-w-full mt-4 border-collapse border border-gray-200 text-center">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100">ID</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Name</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Description</th>
                                <th className='border border-gray-300 px-4 py-2 bg-gray-100'>View</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department) => (
                                <tr key={department.id}>
                                    <td className="border border-gray-300 px-4 py-2">{department.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{department.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{department.description}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">View Doctors</button>
                                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">View Staffs</button>

                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">Edit</button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );
};

export default DepartmentsPage;