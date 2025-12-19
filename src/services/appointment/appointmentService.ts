import apiClient from "@/services/apiClients";

const API_BASE = "/api/appointments";

export interface Appointment {
  id: number;
  doctorId: number;
  doctorName: string;
  patientId: number;
  date: string;
  time: string;
  place: string;
  notes: string;
  status: string;
}
 
interface CreateAppointmentData {
  doctorId: number;
  date: string;
  time: string;
  place: string;
  notes?: string;
}

interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  code?: number;
  message?: string;
}


export const getMyAppointments = async (): Promise<ServiceResponse<Appointment[]>> => {
  try {
    const response = await apiClient.get(`${API_BASE}/my-appointments`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    if (error.response?.status === 401) {
      return {
        success: false,
        code: 401,
        message: "Phiên đăng nhập đã hết hạn",
      };
    }

    if (error.response?.status === 403) {
      return {
        success: false,
        code: 403,
        message: "Bạn không có quyền truy cập",
      };
    }

    return {
      success: false,
      message:
        error.response?.data?.error ||
        "Không tải được danh sách lịch hẹn",
    };
  }
};

export const getAppointmentById = async (id: number): Promise<ServiceResponse<Appointment>> => {
  try {
    const response = await apiClient.get(`${API_BASE}/my-appointments`);
    const found = response.data.find((item: any) => item.id === id);

    if (!found) {
      return {
        success: false,
        message: "Không tìm thấy lịch hẹn",
      };
    }

    return {
      success: true,
      data: found,
    };
  } catch (error: any) {
    if (error.response?.status === 401) {
      return {
        success: false,
        code: 401,
        message: "Phiên đăng nhập đã hết hạn",
      };
    }

    return {
      success: false,
      message: "Không thể tải chi tiết lịch hẹn",
    };
  }
};


export const createAppointment = async (data: CreateAppointmentData): Promise<ServiceResponse> => {
  try {
    const normalizedTime =
      data.time.length === 5 ? `${data.time}:00` : data.time;

    const response = await apiClient.post(API_BASE, {
      ...data,
      time: normalizedTime,
    });

    return {
      success: true,
      data: response.data,
      message: "Đặt lịch hẹn thành công",
    };
  } catch (error: any) {
    if (error.response?.status === 401) {
      return {
        success: false,
        code: 401,
        message: "Phiên đăng nhập đã hết hạn",
      };
    }

    return {
      success: false,
      message:
        error.response?.data?.error || "Không thể đặt lịch hẹn",
    };
  }
};


export const cancelAppointmentById = async (id: number): Promise<ServiceResponse> => {
  try {
    await apiClient.delete(`${API_BASE}/${id}`);
    return {
      success: true,
      message: "Hủy lịch hẹn thành công",
    };
  } catch (error: any) {
    if (error.response?.status === 401) {
      return {
        success: false,
        code: 401,
        message: "Phiên đăng nhập đã hết hạn",
      };
    }

    return {
      success: false,
      message:
        error.response?.data?.error || "Không thể hủy lịch hẹn",
    };
  }
};