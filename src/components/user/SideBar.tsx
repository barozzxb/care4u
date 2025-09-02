import Link from "next/link";

const SideBar = () => {
  return (
    <div className="h-full p-0 bg-gradient-to-b from-blue-50 via-white to-amber-50 border-r border-gray-200 shadow-2xl flex flex-col items-center">
      <div className="flex flex-col items-center py-8 w-full bg-gradient-to-r from-blue-200 to-amber-100 rounded-b-3xl shadow-lg mb-6">
        <img src="/CARE4U.png" alt="Care4U Logo" className="w-32 h-32 rounded-full border-4 border-white shadow-md mb-2" />
        <span className="text-xl font-extrabold text-blue-950 tracking-wide drop-shadow">User Name</span>
        <span className="text-xl text-blue-950 tracking-wide drop-shadow">Age: 30</span>
      </div>
      <nav className="w-full flex-1">
        <ul className="space-y-2 px-4">
          <li>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 transition-all shadow group">
              <svg className="w-5 h-5 text-blue-500 group-hover:text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" /></svg>
              Trang chủ
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-pink-700 font-semibold bg-pink-100 hover:bg-pink-200 transition-all shadow group">
              <svg className="w-5 h-5 text-pink-500 group-hover:text-pink-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Sức khỏe
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-amber-700 font-semibold bg-amber-100 hover:bg-amber-200 transition-all shadow group">
              <svg className="w-5 h-5 text-amber-500 group-hover:text-amber-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Dự đoán bệnh
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-amber-700 font-semibold bg-amber-100 hover:bg-amber-200 transition-all shadow group">
              <svg className="w-5 h-5 text-amber-500 group-hover:text-amber-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Đặt lịch khám
            </Link>
          </li>
        </ul>
      </nav>
      <div className="w-full px-4 py-6 mt-auto">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-amber-400 text-white font-bold shadow-lg hover:scale-105 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default SideBar;