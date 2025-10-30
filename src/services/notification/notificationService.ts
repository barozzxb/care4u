import apiClient from "../apiClients"

export const getAllNotifications = async () => {
    try {
        const response = await apiClient.get('/notifications');
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};
