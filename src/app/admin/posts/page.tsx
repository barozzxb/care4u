"use client";

import React, { useEffect, useState } from 'react';
import Loading from '@/components/Loading'
import ModalProvider from '@/components/ModalProvider';
import { toast } from 'react-toastify';

import { Post } from '@/types/types';
import { addPost, updatePost, checkPostAuth, fetchPosts } from '@/services/admin/postsManageService';

import RichTextEditor from '@/components/common/RichTextEditor';

import { IMG_HOST } from '@/utils/variables';
import { Pagination } from '@/components/Pagination';
import { formatTime } from '@/utils/functions';

type PostForm = {
    title: string;
    content: string;
    image: File | null;
};


const DepartmentsPage = () => {

    const [loading, setLoading] = useState(false);

    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);


    const [selectedPost, setSelectedPost] = useState<Post>();

    const [addOrEditModal, setAddOrEditModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    const emptyForm: PostForm = {
        title: '',
        content: '',
        image: null,
    };

    const [form, setForm] = useState<PostForm>(emptyForm);


    const fetch = async () => {
        try {
            setLoading(true);
            const res = await fetchPosts(page, limit);
            if (!res) return;
            setPosts(res.body.content);
            setTotalPages(res.body.totalPages);
            setTotalElements(res.body.totalElements);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, [page, limit]);



    const handleAction = async () => {
        try {
            setModalLoading(true);

            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('content', form.content);
            formData.append('type', 'FAQ');

            if (form.image) {
                formData.append('image', form.image);
            }

            const res = isEditing
                ? await updatePost(selectedPost!.id as number, formData)
                : await addPost(formData);

            if (res.status === 201 || res.status === 200) {
                toast.success(res.message);
                setAddOrEditModal(false);
                setIsEditing(false);
                setForm(emptyForm);

            }
            toast.error(res.message);
            return;

        } catch (error) {
            console.error(error);
            toast.error('Unexpected error');
        } finally {
            fetch();
            setModalLoading(false);
        }
    };



    return (
        <div className="flex flex-col  justify-center align-middle p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center">Quản lý Post</h1>
            <p className="text-center mt-2 text-gray-600">Quản lý tất cả các posts ở đây.</p>

            <div className='flex flex-4 justify-center items-center my-4'>
                <button
                    onClick={() => setAddOrEditModal(true)}
                    className="py-2 px-4 text-sm sm:text-base font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-amber-400 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:from-pink-500 hover:to-blue-400 active:scale-95">
                    Tạo mới
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <Loading />
                </div>
            ) : posts.length === 0 ? (
                <p className="text-center mt-4 text-gray-500">No post found.</p>
            ) : (
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date created</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">View detail</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {posts.map((post, idx) => (
                                <tr key={post.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{post.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{formatTime(post.created)}</td>
                                    <td className="px-6 py-4 text-center space-x-2">
                                        <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 transition"
                                            onClick={() => {
                                                setSelectedPost(post);
                                                setDetailModal(true);
                                            }}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6h16M4 18h16" /></svg>
                                            View Details
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="inline-flex items-center gap-2">
                                            <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                                                onClick={() => {
                                                    setAddOrEditModal(true);
                                                    setIsEditing(true);
                                                    setSelectedPost(post);
                                                }}
                                                disabled={!checkPostAuth(post.account_email, post)}>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5h6M11 9h6M11 13h6M11 17h6M5 5h.01M5 9h.01M5 13h.01M5 17h.01" /></svg>
                                                Edit
                                            </button>
                                            <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        totalItems={totalElements}
                        limit={limit}
                        onPageChange={setPage}
                        onLimitChange={setLimit}
                    />

                </div>
            )}


            <ModalProvider isOpen={addOrEditModal} title={isEditing ? 'Cập nhật bài viết' : 'Thêm bài viết mới'} isLoading={modalLoading} mainAction={handleAction} mainActionLabel={isEditing ? 'Cập nhật' : 'Thêm'} onClose={() => { setAddOrEditModal(false); setIsEditing(false) }} >
                <div className="w-3xl space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Tiêu đề
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                            Chi tiết
                        </label>
                        <RichTextEditor
                            value={form.content}
                            onChange={(value) =>
                                setForm({ ...form, content: value })
                            }
                            />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Hình ảnh
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setForm({ ...form, image: e.target.files?.[0] || null })
                            }
                            className="block w-full text-sm text-gray-700"
                        />

                        {isEditing && selectedPost?.image && (
                            <p className="text-xs text-gray-500 mt-1">
                                Ảnh hiện tại sẽ được giữ nếu không chọn ảnh mới
                            </p>
                        )}
                    </div>

                </div>
            </ModalProvider>

            <ModalProvider
                isOpen={detailModal}
                title="Chi tiết bài viết"
                onClose={() => setDetailModal(false)}
            >
                {selectedPost && (
                    <div className="space-y-6">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">ID</p>
                                <p className="font-medium text-gray-900">
                                    {selectedPost.id}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">Loại bài viết</p>
                                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                                    {selectedPost.type}
                                </span>
                            </div>

                            <div>
                                <p className="text-gray-500">Tác giả</p>
                                <p className="font-medium text-gray-900">
                                    {selectedPost.account_email}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">Ngày tạo</p>
                                <p className="font-medium text-gray-900">
                                    {formatTime(selectedPost.created)}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm mb-1">Tiêu đề</p>
                            <h2 className="text-lg font-semibold text-gray-900">
                                {selectedPost.title}
                            </h2>
                        </div>

                        {selectedPost.image && (
                            <div>
                                <p className="text-gray-500 text-sm mb-2">Hình ảnh</p>
                                <img
                                    src={`${IMG_HOST}${selectedPost.image}`}
                                    alt="Post image"
                                    className="w-full max-h-64 object-cover rounded-lg border"
                                />
                            </div>
                        )}

                        <div>
                            <p className="text-gray-500 text-sm mb-2">Nội dung</p>
                            <div className="max-h-64 overflow-y-auto border rounded-lg p-4 text-gray-800 leading-relaxed bg-gray-50">
                                {selectedPost.content}
                            </div>
                        </div>
                    </div>
                )}
            </ModalProvider>


        </div>
    );
};

export default DepartmentsPage;