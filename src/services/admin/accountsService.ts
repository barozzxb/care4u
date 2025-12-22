import apiClient from "../apiClients";

export const getAllAccountsPage = async (page: Number, size: Number) => {
    const res = await apiClient.get(`/accounts?page=${page}&size=${size}`);
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const setActive = async (id: String) => {
    const res = await apiClient.put(`/accounts/active/${id}`);
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const deActive = async (id: String) => {
    const res = await apiClient.put(`/accounts/deactive/${id}`);
    const { status, message, body } = res.data;
    return { status, message, body };
}