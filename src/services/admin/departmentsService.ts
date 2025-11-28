import apiClient from "@/services/apiClients";

export const getAllDepartments = async () => {
    const res = await apiClient.get("/departments/");
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const createDepartment = async (id: string, name: string, description: string) => {

    const res = await apiClient.post("/departments/create", {
        id, name, description
    });
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const updateDepartment = async (id: string, name: string, description: string) => {
    const res = await apiClient.put("/departments/update", {
        id, name, description
    });
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const deleteDepartment = async (id: string) => {
    const res = await apiClient.put(`/departments/delete/${id}`);
    const { status, message, body } = res.data;
    return { status, message, body };
}