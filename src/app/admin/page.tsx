"use client";
import React, { useEffect, useState } from "react";

import { getDashboardStats } from "@/services/admin/dashboardService";
import { toast } from "react-toastify";
import type { DashboardStats } from "@/types/dashboardType";

import { Circle } from "lucide-react";

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { message, body } = await getDashboardStats();
      toast.info(message);
      setStats(body);
      console.log(body);
    };

    fetchStats();
  }, []);

  const totalAccounts = stats?.numberedData.totalAccounts || 0;
  const activeAccounts = stats?.numberedData.activeAccounts || 0;
  const recentAccounts = stats?.recentAccounts || [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <div className="mb-6 text-center w-full bg-white shadow p-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-4">
          Overview of your application s performance and user activity.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">Chart Placeholder</div>
        <div className="rounded-lg">
          <div className="bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 text-center">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Số tài khoản</h2>
              <p className="text-4xl font-bold">{totalAccounts}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Số tài khoản hoạt động
              </h2>
              <p className="text-4xl font-bold">{activeAccounts}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Thống kê tài khoản</h2>
              <p className="text-4xl font-bold">{totalAccounts}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Số tài khoản hoạt động
              </h2>
              <p className="text-4xl font-bold">{activeAccounts}</p>
            </div>
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Accounts</h2>
            <table className="min-w-full table-auto text-center">
              <caption className="text-lg font-medium mb-4">
                Recent User Accounts
              </caption>
              <thead>
                <tr className="bg-gray-950 text-white ">
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAccounts.map((account, index) => (
                  <tr className="odd:bg-white even:bg-gray-200 " key={index}>
                    <td className="text-start px-4 py-2">{account.email}</td>
                    <td className="px-4 py-2">{account.role}</td>
                    <td className="px-4 py-2 flex justify-center items-center">
                      {account.status ? (
                        <Circle color="#00ff00" fill="#00ff00" />
                      ) : (
                        <Circle color="#ff0000" fill="#ff0000" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
