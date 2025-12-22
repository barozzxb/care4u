import apiClient from "../apiClients";

export const fetchAdminInfo = async () => {
    const email = localStorage.getItem("email");
    const res = await apiClient.get(`/admin/info/${email}`);
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const updateInfo = async (form: FormData) => {
    const res = await apiClient.putForm("/admin/info/update", form);
    const { status, message, body } = res.data;
    return { status, message, body };
}