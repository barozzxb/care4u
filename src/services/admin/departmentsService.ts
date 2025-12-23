import apiClient from "@/services/apiClients";

export const getAllDepartments = async () => {
    const res = await apiClient.get("/admin/departments/");
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const createDepartment = async (id: string, name: string, description: string) => {

    const res = await apiClient.post("/admin/departments/create", {
        id, name, description
    });
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const updateDepartment = async (id: string, name: string, description: string) => {
    const res = await apiClient.put("/admin/departments/update", {
        id, name, description
    });
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const deleteDepartment = async (id: string) => {
    const res = await apiClient.put(`/admin/departments/delete/${id}`);
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const addDoctorToDepartment = async (id: string, did: number) => {
    const res = await apiClient.put(`/admin/departments/${id}/add-doctor?dId=${did}`);
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const removeDoctorFromDepartment = async (id: string, did: number) => {
    const res = await apiClient.put(`/admin/departments/${id}/remove-doctor?dId=${did}`);
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const getAllDoctors = async (page: number, size: number) => {
    const res = await apiClient.get(`/doctors/get-all?page=${page}&size=${size}`);
    const { status, message, body } = res.data;
    return { status, message, body };
}