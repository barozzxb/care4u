import apiClient from "../apiClients";
import { Post } from "@/types/types";
import { getEmail } from "@/utils/checkToken";


export const fetchPosts = async (page: Number, size: Number, sort: string) => {
    const res = await apiClient.get(`/posts?page=${page}&size=${size}&sort=${sort}`);
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const getDetail = async (id: Number) => {
    const res = await apiClient.get(`/posts/${id}`);
    const { status, message, body } = res.data;
    return { status, message, body };
}

export const checkPostAuth = async (email: String, post: Post) => {
    return post.account_email === getEmail()
}