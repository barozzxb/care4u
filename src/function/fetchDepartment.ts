"use client";

import React, { useState } from 'react';

import { getAllDepartments } from '@/services/admin/departmentsService';
import { Department } from '@/types/types';

export const fetchDepartment = async () => {
    try {
        const { status, message, body } = await getAllDepartments();
        if (status === 200) {
            return body;
        } else {
            console.error("Failed to load departments", message);
        }
    } catch (error) {
        console.error("Failed to load departments", error);
    }
};
