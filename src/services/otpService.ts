import apiClient from "@/services/apiClients";

export const sendOTP = async () => {
  try {
    const email = localStorage.getItem("registeredEmail");
    if (!email) throw new Error("Email not found");
    const response = await apiClient.post('/common/otp/send', { email });
    const { message } = response.data;
    return { message };
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

export const verifyOTP = async (otp: string) => {
    try {
        const email = localStorage.getItem("registeredEmail");
        if (!email) throw new Error("Email not found");
        const response = await apiClient.post('/common/otp/verify', { email, otp });
        const { status, message } = response.data;
        if (status === 200) {
            localStorage.removeItem("registeredEmail");
        }
        return { status, message };
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
};