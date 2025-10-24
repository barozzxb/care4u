import apiClient from "@/services/apiClients";

export const getAllDepartments = async () => {
    const res = await apiClient.get("/departments/");
    const { status, message, body } = res.data;
    return { status, message, body };
}