const KeyFeatures = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Tại sao chọn Care4U</h2>
                <p className="text-xl text-gray-700 text-center mb-4"><span className="emphasis">Care4U</span> là sự lựa chọn hàng đầu cho sức khỏe của bạn. Với nhiều chức năng như tính toán chỉ số cơ thể
                    , dự đoán bệnh khi có những triệu chứng... và đặt biệt là có thể đặt lịch hẹn với bác sĩ, chúng tôi tin chắc rằng bạn sẽ hài lòng với dịch vụ của chúng tôi.</p>
                <a href="#" className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-all duration-300">Tìm hiểu thêm</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                <div className="relative group bg-white border-2 border-blue-300 rounded-2xl shadow-xl p-8 flex flex-col items-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-500">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-amber-300 mb-4 shadow-lg group-hover:from-blue-500 group-hover:to-amber-400">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    </div>
                    <p className="text-2xl font-bold mb-2 text-blue-700">Giao diện trực quan</p>
                    <p className="text-gray-600 text-center">Giao diện người dùng thân thiện, dễ dàng điều hướng, phù hợp với mọi đối tượng.</p>
                </div>
                <div className="relative group bg-white border-2 border-pink-300 rounded-2xl shadow-xl p-8 flex flex-col items-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-pink-500">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-300 mb-4 shadow-lg group-hover:from-pink-500 group-hover:to-fuchsia-400">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <p className="text-2xl font-bold mb-2 text-pink-700">Các tính năng thông minh</p>
                    <p className="text-gray-600 text-center">Tích hợp ML dự đoán bệnh, tính toán chỉ số cơ thể, và hỗ trợ tư vấn sức khỏe cá nhân hóa.</p>
                </div>
                <div className="relative group bg-white border-2 border-amber-300 rounded-2xl shadow-xl p-8 flex flex-col items-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-amber-500">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-blue-300 mb-4 shadow-lg group-hover:from-amber-500 group-hover:to-blue-400">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0-5V3m-8 9v6a2 2 0 002 2h4a2 2 0 002-2v-6" /></svg>
                    </div>
                    <p className="text-2xl font-bold mb-2 text-amber-700">Đặt lịch hẹn dễ dàng</p>
                    <p className="text-gray-600 text-center">Đặt lịch hẹn với bác sĩ nhanh chóng, quản lý lịch sử khám và nhận thông báo tự động.</p>
                </div>
            </div>
        </div>
    );
};

export default KeyFeatures;
