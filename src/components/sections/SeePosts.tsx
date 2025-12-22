const SeePostsPage = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Chăm sóc sức khỏe cùng Care4U</h2>
                <p className="text-xl text-gray-700 text-center mb-4">Khám phá các bài viết chăm sóc sức khỏe mới nhất đến từ <span className="emphasis">Care4U</span> để có  thể cập nhật các kiến thức chăm sóc sức khỏe mới.</p>
                <a href="/posts" className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-all duration-300">Tìm hiểu thêm</a>
            
            </div>
        </div>
    )
}

export default SeePostsPage;