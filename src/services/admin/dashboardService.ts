import apiClient from "@/services/apiClients";

export const getDashboardStats = async () => {
    const {status, message, body} = (await apiClient.get("/admin/dashboard/")).data;
    if (status !== 200) {
        return message;
    }
    return {message, body};
};

