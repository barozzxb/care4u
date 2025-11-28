"use client";

import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { fetchAdminInfo, updateInfo } from "@/services/admin/adminService";
import { toast } from "react-toastify";

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

    const fetchProfile = async () => {
        try {
            const { status, message, body } = await fetchAdminInfo();
            if (status === 200 && body) {
                setFormData(prev => ({
                    ...prev,
                    ...body
                }));
                if (body.avatar) setAvatarPreview(body.avatar);
                toast.success(message);
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [])
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
            fd.append("id", formData.id);
            fd.append("email", formData.email);
            fd.append("firstname", formData.firstname);
            fd.append("lastname", formData.lastname);
            fd.append("gender", formData.gender);
            fd.append("address", formData.address);
            fd.append("phonenum", formData.phonenum);
            const file = fileRef.current?.files?.[0];
            if (file) fd.append("avatarFile", file);

            const { status, message } = await updateInfo(fd);
            if (status === 200) {
                toast.success(message);
            } else {
                toast.error(message);
            }
        } catch (err: any) {
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
                <p className="text-center text-gray-600 mb-6">Cập nhật thông tin cá nhân của bạn tại đây.</p>

                <form className="flex flex-col gap-6 items-center w-full max-w-md mx-auto" onSubmit={handleSubmit}>
                    {["id", "email", "firstname", "lastname", "gender", "address", "phonenum"].map((field) => (
                        <div key={field} className="relative w-full">
                            {field === "gender" ? (
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="peer appearance-none border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all bg-white"
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                <input
                                    type={field === "id" ? "text" : "text"}
                                    name={field}
                                    value={(formData as any)[field]}
                                    onChange={handleChange}
                                    placeholder=" "
                                    disabled={field === "id" || field === "email"}
                                    className={`peer border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all ${(field === "id" || field === "email") ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                />
                            )}
                            <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 bg-white px-1 pointer-events-none">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                        </div>
                    ))}

                    <div className="relative w-full">
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            name="avatarFile"
                            onChange={handleFileChange}
                            className="peer border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                        />
                        <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 bg-white px-1 pointer-events-none">
                            Avatar
                        </label>
                    </div>

                    {avatarPreview && (
                        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200">
                            <img src={avatarPreview} alt="avatar" className="object-cover w-full h-full" />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-amber-400 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-all duration-300 text-lg"
                        disabled={loading}
                    >
                        Cập nhật {loading ? <span className="inline-block ml-2 animate-spin">...</span> : null}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InfoUpdatePage;
