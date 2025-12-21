const API_BASE_URL = "http://localhost:9000/api/v1/patient";

export const getPatientMeasure = async (email: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/measure?email=${email}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      }
    );

    if (!response.ok) {
      return { success: false, data: null };
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error instanceof Error
          ? error.message
          : "Không thể kết nối server",
    };
  }
};

export const updatePatientMeasure = async (
  email: string,
  data: {
    heartRate?: number;
    bloodPressure?: string;
    weight: number;
    height: number;
    temperature?: number;
  }
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/update-measure?email=${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      return { success: false };
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Không thể kết nối server",
    };
  }
};