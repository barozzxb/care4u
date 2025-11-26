"use client";

import React, { useState } from 'react';

import { getAllDepartments } from '@/services/admin/departmentsService';
import { Department } from '@/types/types';

export const useDepartmentLoad = () => {
    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState<Department[]>([]);

    React.useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const { status, message, body } = await getAllDepartments();
                if (status === 200) {
                    setDepartments(body);
                } else {
                    console.error("Failed to load departments", message);
                }
            } catch (error) {
                console.error("Failed to load departments", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    return { loading, departments };
};
