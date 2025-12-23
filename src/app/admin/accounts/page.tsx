"use client";

import React, { useEffect, useState } from 'react';
import Loading from '@/components/Loading'
import { Dot } from 'lucide-react';
import ModalProvider from '@/components/ModalProvider';
import { toast } from 'react-toastify';
import { deActive, getAllAccountsPage, setActive } from '@/services/admin/accountsService';

import { Account} from '@/types/types';
import Link from 'next/link';

const AccountsPage = () => {

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [accounts, setAccount] = useState<Account[]>([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [loading, setLoading] = useState(false);


    const fetch = async () => {
        try {
            setLoading(true);
            const res = await getAllAccountsPage(page, size);
            if (!res) return;
            setAccount(res.body.content);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, [])


    const handleAction = async (id: string, accStatus: boolean) => {
        try {
            setModalLoading(true);
            const action = accStatus ? deActive(id) : setActive(id);
            const { status, message } = await action;

            if (status !== 200) {
                toast.error(message);
                return;
            }
            toast.success(message);

        } catch (error) {
            console.log(error);
            toast.error("Unexpected error");
        } finally {
            fetch();
            setModalLoading(false);
        }
    }

    return (
        <div className="flex flex-col  justify-center align-middle p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center">Danh sách tài khoản trên hệ thống</h1>
            <p className="text-center mt-2 text-gray-600">Quản lý tất cả các tài khoản ở đây.</p>

            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <Loading />
                </div>
            ) : accounts.length === 0 ? (
                <p className="text-center mt-4 text-gray-500">No departments found.</p>
            ) : (
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                                {/* <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">View</th> */}
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {accounts.map((acc, idx) => (
                                <tr key={acc.email} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{acc.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{acc.role}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{acc.status ? <Dot color='#00FF00' size={50}></Dot> : <Dot color='#FF0000'></Dot>}</td>
                                    {/* <td className="px-6 py-4 text-center space-x-2">
                                        <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 transition"
                                            onClick={() => {
                                               
                                            }}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6h16M4 18h16" /></svg>
                                            View info
                                        </button>
                                    </td> */}
                                    <td className="px-6 py-4 text-center">
                                        <div className="inline-flex items-center gap-2">
                                            <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-white rounded-md text-sm hover:bg-blue-700 transition disabled:cursor-not-allowed"
                                                onClick={() => {
                                                    handleAction(acc.email, acc.status);
                                                }}
                                                disabled={acc.role==="Quản trị viên"}>
                                                {acc.status ? "Suspend" : "Active"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <ModalProvider isOpen={false} title='Danh sách bác sỹ trong chuyên khoa' onClose={() => {  }} >
                
            </ModalProvider>
        </div>
    );
};

export default AccountsPage;