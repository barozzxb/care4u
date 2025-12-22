const API_BASE_URL = "http://localhost:9000/api/v1/patient";

export const getPatientInfo = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}?email=${email}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        success: false,
        message: `HTTP Error: ${response.status}`,
        data: null,
      };
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Không thể kết nối tới server",
      data: null,
    };
  }
};

export const updatePatientInfo = async (
  formData: any,
  avatarFile: File | null = null
) => {
  try {
    if (avatarFile) {
      const fd = new FormData();

      fd.append("avatar", avatarFile);
      fd.append("firstname", formData.firstname ?? "");
      fd.append("lastname", formData.lastname ?? "");
      fd.append("phonenum", formData.phone ?? "");
      fd.append("dob", formData.dob ?? "");
      fd.append("idNumber", formData.idNumber ?? "");
      fd.append("gender", formData.gender ?? "");
      fd.append("insurance", formData.insurance ?? "");
      fd.append("province", formData.province ?? "");
      fd.append("district", formData.district ?? "");
      fd.append("ward", formData.ward ?? "");
      fd.append("ethnic", formData.ethnic ?? "");
      fd.append("referralCode", formData.referralCode ?? "");

      const response = await fetch(
        `${API_BASE_URL}/update?email=${formData.email}`,
        {
          method: "PUT",
          body: fd,
        }
      );

      if (!response.ok) {
        return {
          success: false,
          message: `HTTP Error: ${response.status}`,
        };
      }

      const result = await response.json();

      if (result.success) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            firstname: formData.firstname,
            lastname: formData.lastname,
            avatar: result.avatarUrl || "",
          })
        );
        window.dispatchEvent(new Event("userUpdated"));
      }

      return result;
    }

    const response = await fetch(
      `${API_BASE_URL}/update?email=${formData.email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          phonenum: formData.phone,
          dob: formData.dob,
          idNumber: formData.idNumber,
          gender: formData.gender,
          insurance: formData.insurance,
          province: formData.province,
          district: formData.district,
          ward: formData.ward,
          ethnic: formData.ethnic,
          referralCode: formData.referralCode,
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return {
        success: false,
        message: `HTTP Error: ${response.status} - ${text}`,
      };
    }

    const result = await response.json();

    if (result.success) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          avatar: "",
        })
      );
      window.dispatchEvent(new Event("userUpdated"));
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Không thể kết nối tới server",
    };
  }
};