"use client";

import React, { useEffect, useState } from 'react';
import Loading from '@/components/Loading'

import { fetchDepartment } from '@/function/fetchDepartment';
import ModalProvider from '@/components/ModalProvider';
import { toast } from 'react-toastify';
import { addDoctorToDepartment, createDepartment, getAllDoctors, removeDoctorFromDepartment, updateDepartment } from '@/services/admin/departmentsService';

import { Department, Doctor } from '@/types/types';
import Link from 'next/link';

const DepartmentsPage = () => {

    const [departments, setDepartments] = useState<Department[]>([]);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [doctorModalOpen, setDoctorModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const [doctors, setDoctors] = useState<Doctor[]>([]);

    const [addDoctor, setAddDoctor] = useState(false);

    const fetch = async () => {
        try {
            setLoading(true);
            const res = await fetchDepartment();
            if (!res) return;
            setDepartments(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, [])

    const clearForm = () => {
        setId(""); setName(""); setDescription("");
    }

    const handleAction = async () => {
        try {
            setModalLoading(true);

            const action = isEditing ? updateDepartment(id, name, description) : createDepartment(id, name, description);
            const { status, message } = await action;

            if (status !== 200) {
                toast.error(message);
                return;
            }
            toast.success(message);
            setAddModalOpen(false);
            clearForm();

        } catch (error) {
            console.log(error);
            toast.error("Unexpected error");
        } finally {
            fetch();
            setModalLoading(false);
        }
    }

    const handleAddDoctor = async (dId: number) => {
        try {
            const { status, message } = await addDoctorToDepartment(id, dId);
            if (status !== 200) {
                toast.error(message);
                return;
            }
            fetch();
            toast.success(message);
        } catch (error) {
            console.log(error);
        }
    }

    const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
    const [doctorPage, setDoctorPage] = useState(0);

    const fetchDoctor = async () => {
        try {
            const { status, message, body } = await getAllDoctors(doctorPage, 10);
            if (status !== 200) {
                toast.error(message);
                return;
            }
            setAllDoctors(body.content);
            console.log(body.content);
            toast.success(message);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (addDoctor) {
            console.log("Fetching doctors...");
            fetchDoctor();
        }
    }, [addDoctor]);

    const handleRemoveDoctor = async (dId: number) => {
        try {
            const { status, message } = await removeDoctorFromDepartment(id, dId);
            if (status !== 200) {
                toast.error(message);
                return;
            }
            toast.success(message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col  justify-center align-middle p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center">Các chuyên khoa</h1>
            <p className="text-center mt-2 text-gray-600">Quản lý tất cả các chuyên khoa ở đây.</p>

            <div className='flex flex-4 justify-center items-center my-4'>
                <button
                    onClick={() => setAddModalOpen(true)}
                    className="py-2 px-4 text-sm sm:text-base font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-amber-400 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:from-pink-500 hover:to-blue-400 active:scale-95">
                    Tạo mới
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <Loading />
                </div>
            ) : departments.length === 0 ? (
                <p className="text-center mt-4 text-gray-500">No departments found.</p>
            ) : (
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Description</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">View</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {departments.map((department, idx) => (
                                <tr key={department.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{department.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{department.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{department.description}</td>
                                    <td className="px-6 py-4 text-center space-x-2">
                                        <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 transition"
                                            onClick={() => {
                                                setId(department.id);
                                                setDoctors(department.doctors);
                                                setDoctorModalOpen(true);
                                            }}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6h16M4 18h16" /></svg>
                                            Doctors
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="inline-flex items-center gap-2">
                                            <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                                                onClick={() => {
                                                    setAddModalOpen(true);
                                                    setIsEditing(true);
                                                    setId(department.id);
                                                    setName(department.name);
                                                    setDescription(department.description ? department.description : "");
                                                }}>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5h6M11 9h6M11 13h6M11 17h6M5 5h.01M5 9h.01M5 13h.01M5 17h.01" /></svg>
                                                Edit
                                            </button>
                                            {/* <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                                Delete
                                            </button> */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


            <ModalProvider isOpen={addModalOpen} title={isEditing ? 'Cập nhật thông tin chuyên khoa' : 'Thêm chuyên khoa'} isLoading={modalLoading} mainAction={handleAction} mainActionLabel={isEditing ? 'Cập nhật' : 'Thêm'} onClose={() => { setAddModalOpen(false); setIsEditing(false); clearForm() }} >
                <div className="space-y-4">
                    <div>
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                            Mã chuyên khoa
                        </label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={id}
                            onChange={e => { setId(e.target.value) }}
                            disabled={isEditing}
                            className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all disabled:bg-gray-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Tên chuyên khoa
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={e => { setName(e.target.value) }}
                            className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Mô tả
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={description}
                            onChange={e => { setDescription(e.target.value) }}
                            className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>

                </div>
            </ModalProvider>

            <ModalProvider isOpen={doctorModalOpen} title='Danh sách bác sỹ trong chuyên khoa' onClose={() => { setDoctorModalOpen(false) }} >
                <button onClick={() => { setAddDoctor(true) }}>Thêm bác sỹ</button>
                <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Gender</th>
                            <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {doctors.map((doctor, idx) => (
                            <tr key={doctor.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{doctor.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{doctor.firstname} {doctor.lastname}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{doctor.gender}</td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <Link href={`/doctors/${doctor.id}`} className=''>View detail</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ModalProvider>

            <ModalProvider isOpen={addDoctor} title='Danh sách bác sỹ trong chuyên khoa' onClose={() => { setAddDoctor(false) }} >
                <button>Chọn bác sỹ để thêm</button>
                <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Gender</th>
                            <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {allDoctors.map((d, idx) => (
                            <tr key={d.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{d.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{d.firstname} {d.lastname}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{d.gender}</td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button onClick={() => {
                                        handleAddDoctor(d.id);
                                    }}>Thêm</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ModalProvider>
        </div>
    );
};

export default DepartmentsPage;