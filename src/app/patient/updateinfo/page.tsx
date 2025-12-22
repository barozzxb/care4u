"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Phone,
  Calendar,
  Mail,
  Shield,
  MapPin,
  Users,
  Edit2,
  Save,
  Loader2,
  Camera,
  X,
  CreditCard,
} from "lucide-react";
import { updatePatientInfo, getPatientInfo } from "@/services/patient/patientService";

export default function UpdateInfoPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    dob: "",
    idNumber: "",
    gender: "Nam",
    email: "",
    insurance: "",
    province: "",
    district: "",
    ward: "",
    ethnic: "Kinh",
    referralCode: "",
    avatar: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadPatientData = async () => {
      const email = localStorage.getItem("email");

      if (!email) {
        alert("Vui lòng đăng nhập để xem thông tin!");
        setLoadingData(false);
        return;
      }

      try {
        setLoadingData(true);
        const result = await getPatientInfo(email);

        if (result.success && result.data) {
          const patient = result.data;

          let formattedDob = "";
          if (patient.dob) {
            const date = new Date(patient.dob);
            formattedDob = date.toISOString().split("T")[0];
          }

          const loadedData = {
            firstname: patient.firstname || "",
            lastname: patient.lastname || "",
            phone: patient.phonenum || "",
            dob: formattedDob,
            idNumber: patient.idNumber || "",
            gender: patient.gender || "Nam",
            email: patient.email || email,
            insurance: patient.insurance || "",
            province: patient.province || "",
            district: patient.district || "",
            ward: patient.ward || "",
            ethnic: patient.ethnic || "Kinh",
            referralCode: patient.referralCode || "",
            avatar: patient.avatar || "",
          };

          setFormData(loadedData);
          setOriginalData(loadedData);

          if (patient.avatar) {
            setAvatarPreview(`http://localhost:9000${patient.avatar}?t=${Date.now()}`);
          }
        } else {
          setFormData((prev) => ({ ...prev, email }));
          setIsEditing(true);
        }
      } catch (error) {
        console.error("Lỗi khi load thông tin:", error);
        const email = localStorage.getItem("email");
        if (email) {
          setFormData((prev) => ({ ...prev, email }));
          setIsEditing(true);
        }
      } finally {
        setLoadingData(false);
      }
    };

    loadPatientData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file ảnh!");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước ảnh không được vượt quá 5MB!");
        return;
      }

      setAvatarFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(
      originalData.avatar
        ? `http://localhost:9000${(originalData as any).avatar}?t=${Date.now()}`
        : null
    );
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setFormData(originalData);
    setAvatarFile(null);
    setAvatarPreview(
      originalData.avatar
        ? `http://localhost:9000${(originalData as any).avatar}?t=${Date.now()}`
        : null
    );
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      alert("Vui lòng đăng nhập để cập nhật thông tin!");
      return;
    }

    setLoading(true);

    try {
      const result = await updatePatientInfo(formData, avatarFile);

      if (result.success) {
        alert("Cập nhật thông tin thành công!");

        if (result.avatarUrl) {
          const cleanAvatarUrl = result.avatarUrl;
          const fullUrl = `http://localhost:9000${cleanAvatarUrl}?t=${Date.now()}`;
          const updatedData = { ...formData, avatar: cleanAvatarUrl };
          setFormData(updatedData);
          setOriginalData(updatedData);
          setAvatarPreview(fullUrl);
        } else {
          setOriginalData(formData);
        }

        setAvatarFile(null);
        setIsEditing(false);
      } else {
        alert("Lỗi: " + (result.message || "Có lỗi xảy ra"));
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Có lỗi xảy ra: " + error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Chưa cập nhật";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl p-10">
          <div className="flex justify-between items-center mb-8">
            <div className="h-9 bg-gray-200 rounded-lg w-64 animate-pulse mb-2"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-11 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-11 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Hồ sơ của tôi
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                {isEditing ? "Chỉnh sửa thông tin cá nhân" : "Xem và cập nhật hồ sơ của bạn"}
              </p>
            </div>

            {!isEditing && (
              <button
                onClick={handleEdit}
                className="group flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Edit2 size={18} className="group-hover:rotate-12 transition-transform" />
                Chỉnh sửa
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="flex justify-center">
              <div className="relative group">
                <div
                  className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl ${isEditing ? "cursor-pointer" : ""}`}
                  onClick={handleAvatarClick}
                >
                  {avatarPreview ? (
                    <img
                      key={avatarPreview}
                      src={avatarPreview}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                      <User size={48} className="text-white" />
                    </div>
                  )}
                </div>

                {isEditing && (
                  <>
                    <button
                      type="button"
                      onClick={handleAvatarClick}
                      className="absolute bottom-0 right-0 bg-blue-600 text-white p-2.5 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-110"
                    >
                      <Camera size={18} />
                    </button>

                    {avatarFile && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-110"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                  Thông tin hồ sơ
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    icon={<User size={16} />}
                    name="firstname"
                    placeholder="Họ *"
                    value={formData.firstname}
                    onChange={handleChange}
                    isEditing={isEditing}
                    required
                  />
                  <InputField
                    icon={<User size={16} />}
                    name="lastname"
                    placeholder="Tên *"
                    value={formData.lastname}
                    onChange={handleChange}
                    isEditing={isEditing}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    icon={<Phone size={16} />}
                    name="phone"
                    type="tel"
                    placeholder="Số điện thoại *"
                    value={formData.phone}
                    onChange={handleChange}
                    isEditing={isEditing}
                    required
                  />
                  <InputField
                    icon={<Calendar size={16} />}
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    isEditing={isEditing}
                    displayValue={formatDate(formData.dob)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    icon={<CreditCard size={16} />}
                    name="idNumber"
                    placeholder="CMND/CCCD *"
                    value={formData.idNumber}
                    onChange={handleChange}
                    isEditing={isEditing}
                    required
                  />
                  <SelectField
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    isEditing={isEditing}
                    options={["Nam", "Nữ", "Khác"]}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <div className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl font-medium border border-gray-200 overflow-hidden">
                      <span className="block truncate" title={formData.email}>
                        {formData.email}
                      </span>
                    </div>
                  </div>
                  <SelectField
                    icon={<Users size={16} />}
                    name="ethnic"
                    value={formData.ethnic}
                    onChange={handleChange}
                    isEditing={isEditing}
                    options={["Kinh", "Tày", "Nùng", "Thái"]}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
                  <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                  Thông tin bổ sung
                </h3>

                <InputField
                  icon={<Shield size={16} />}
                  name="insurance"
                  placeholder="Mã thẻ BHYT"
                  value={formData.insurance}
                  onChange={handleChange}
                  isEditing={isEditing}
                />

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    icon={<MapPin size={16} />}
                    name="province"
                    placeholder="Tỉnh / TP"
                    value={formData.province}
                    onChange={handleChange}
                    isEditing={isEditing}
                  />
                  <InputField
                    icon={<MapPin size={16} />}
                    name="district"
                    placeholder="Quận / Huyện"
                    value={formData.district}
                    onChange={handleChange}
                    isEditing={isEditing}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    icon={<MapPin size={16} />}
                    name="ward"
                    placeholder="Phường / Xã"
                    value={formData.ward}
                    onChange={handleChange}
                    isEditing={isEditing}
                  />
                  <InputField
                    icon={<CreditCard size={16} />}
                    name="referralCode"
                    placeholder="Mã giới thiệu"
                    value={formData.referralCode}
                    onChange={handleChange}
                    isEditing={isEditing}
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-gray-200 mt-10">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Lưu thay đổi
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const InputField = ({
  icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  isEditing,
  required,
  displayValue,
}: any) => {
  if (!isEditing) {
    return (
      <div className="relative group">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        <div className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 rounded-xl font-medium border border-gray-200 group-hover:border-gray-300 transition-colors">
          <span className="block truncate" title={displayValue || value || "Chưa cập nhật"}>
            {displayValue || value || "Chưa cập nhật"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</div>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-gray-400 font-medium"
      />
    </div>
  );
};

const SelectField = ({ icon, name, value, onChange, isEditing, options }: any) => {
  if (!isEditing) {
    return (
      <div className="relative group">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        <div className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 rounded-xl font-medium border border-gray-200">
          <span className="block truncate" title={value}>
            {value}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</div>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white cursor-pointer font-medium"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 1rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.2em",
        }}
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};