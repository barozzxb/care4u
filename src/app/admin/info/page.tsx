"use client";

import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { fetchAdminInfo, updateInfo } from "@/services/admin/adminService";
import { toast } from "react-toastify";
import { IMG_HOST } from "@/utils/variables";

type FormDataType = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  address: string;
  phonenum: string;
  avatar?: string;
};

const InfoUpdatePage: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    gender: "",
    address: "",
    phonenum: "",
    avatar: ""
  });
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const fetchProfile = async () => {
    try {
      const { status, message, body } = await fetchAdminInfo();
      if (status === 200 && body) {
        setFormData({
          id: body.id ?? "",
          email: body.email ?? "",
          firstname: body.firstname ?? "",
          lastname: body.lastname ?? "",
          gender: body.gender ?? "",
          address: body.address ?? "",
          phonenum: body.phonenum ?? "",
          avatar: body.avatar ?? ""
        });
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Fetch profile failed");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("File must be an image");
      e.target.value = "";
      return;
    }
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && key !== "avatar") fd.append(key, value);
      });
      const file = fileRef.current?.files?.[0];
      if (file) fd.append("avatarFile", file);

      const { status, message } = await updateInfo(fd);
      if (status === 200) toast.success(message);
      else toast.error(message);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full md:w-2xl border-2 border-blue-800 rounded-lg shadow-lg p-6 bg-white">
        <h2 className="text-center text-3xl font-bold mb-4 mt-2">Cập nhật thông tin</h2>
        <p className="text-center text-gray-600 mb-6">
          Cập nhật thông tin cá nhân của bạn tại đây.
        </p>

        <form
          className="flex flex-col gap-6 items-center w-full max-w-md mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 shadow">
              <img
                src={avatarPreview || (formData.avatar ? `${IMG_HOST}${formData.avatar}` : "/uploads/avatar/user_default.png")}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50 transition"
            >
              Chỉnh sửa avatar
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              name="avatarFile"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {["id", "email", "firstname", "lastname", "gender", "address", "phonenum"].map(field => (
            <div key={field} className="relative w-full">
              {field === "gender" ? (
                <select
                  name="gender"
                  value={formData.gender ?? ""}
                  onChange={handleChange}
                  className="peer appearance-none border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all bg-white"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </select>
              ) : (
                <input
                  type="text"
                  name={field}
                  value={(formData as any)[field] ?? ""}
                  onChange={handleChange}
                  placeholder=" "
                  disabled={field === "id" || field === "email"}
                  className={`peer border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all ${
                    field === "id" || field === "email" ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              )}
              <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 bg-white px-1 pointer-events-none">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-amber-400 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-all duration-300 text-lg"
            disabled={loading}
          >
            Cập nhật {loading && <span className="inline-block ml-2 animate-spin">...</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfoUpdatePage;
