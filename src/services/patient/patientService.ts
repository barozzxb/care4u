const API_BASE_URL = "http://localhost:9000/api/v1/patient";

export const getPatientInfo = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      return {
        success: false,
        message: `HTTP Error: ${response.status}`,
        data: null,
      };
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return {
        success: false,
        message: "Server trả về dữ liệu không đúng định dạng",
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
      const formDataWithFile = new FormData();
      formDataWithFile.append("avatar", avatarFile);
      formDataWithFile.append("firstname", formData.firstname);
      formDataWithFile.append("lastname", formData.lastname);
      formDataWithFile.append("phonenum", formData.phone);
      formDataWithFile.append("dob", formData.dob);
      formDataWithFile.append("idNumber", formData.idNumber);
      formDataWithFile.append("gender", formData.gender);
      formDataWithFile.append("email", formData.email);
      formDataWithFile.append("insurance", formData.insurance);
      formDataWithFile.append("province", formData.province);
      formDataWithFile.append("district", formData.district);
      formDataWithFile.append("ward", formData.ward);
      formDataWithFile.append("ethnic", formData.ethnic);
      formDataWithFile.append("referralCode", formData.referralCode);

      const response = await fetch(
        `${API_BASE_URL}/update?email=${formData.email}`,
        {
          method: "PUT",
          body: formDataWithFile,
        }
      );

      if (!response.ok) {
        return {
          success: false,
          message: `HTTP Error: ${response.status}`,
        };
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        return {
          success: false,
          message: "Server trả về dữ liệu không đúng định dạng",
        };
      }

      const result = await response.json();

      if (result.success) {
        const updatedUser = {
          firstname: formData.firstname,
          lastname: formData.lastname,
          avatar: result.avatarUrl || "",
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("userUpdated"));
      }

      return result;
    }

    const requestBody = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      phonenum: formData.phone,
      dob: formData.dob,
      idNumber: formData.idNumber,
      gender: formData.gender,
      email: formData.email,
      insurance: formData.insurance,
      province: formData.province,
      district: formData.district,
      ward: formData.ward,
      ethnic: formData.ethnic,
      referralCode: formData.referralCode,
    };

    const response = await fetch(
      `${API_BASE_URL}/update?email=${formData.email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        message: `HTTP Error: ${response.status} - ${errorText}`,
      };
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return {
        success: false,
        message: "Server trả về dữ liệu không đúng định dạng",
      };
    }

    const result = await response.json();

    if (result.success) {
      const updatedUser = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        avatar: "",
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("userUpdated"));
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Không thể kết nối tới server. Vui lòng kiểm tra lại server backend.",
    };
  }
};
