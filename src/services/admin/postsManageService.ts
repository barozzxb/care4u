import apiClient from "../apiClients";
import { Post } from "@/types/types";
import { getEmail } from "@/utils/checkToken";

export const fetchPosts = async (page: Number, size: Number) => {
    const res = await apiClient.get(`/posts?page=${page}&size=${size}`);
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const addPost = async (formData: FormData) => {
  const res = await apiClient.post(`/admin/posts/add`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const { status, message, body } = res.data;
  return { status, message, body };
};

export const updatePost = async (id: number, formData: FormData) => {
  const res = await apiClient.put(`/admin/posts/edit`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const { status, message, body } = res.data;
  return { status, message, body };
};

export const checkPostAuth = async (email: String, post: Post) => {
    return post.account_email === getEmail()
}