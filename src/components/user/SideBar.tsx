import Link from "next/link";
import { Home, User, FileText, Activity, Calendar } from "lucide-react";

const SideBar = () => {
  return (
    <div className="h-full p-0 bg-linear-to-b from-blue-50 via-white to-amber-50 border-r border-gray-200 shadow-2xl flex flex-col items-center">
      <nav className="w-full flex-1">
        <ul className="space-y-3 px-4 pt-24">

          <li>
            <Link
              href="/patient/viewdepartment"
              className="flex items-center gap-3 px-4 py-3 rounded-xl
                         bg-sky-100 text-sky-700 font-semibold
                         hover:bg-sky-200 transition-all"
            >
              <Home size={18} />
              Trang chủ
            </Link>
          </li>

          <li>
            <Link
              href="/patient/updateinfo"
              className="flex items-center gap-3 px-4 py-3 rounded-xl
                         bg-indigo-100 text-indigo-700 font-semibold
                         hover:bg-indigo-200 transition-all"
            >
              <User size={18} />
              Trang cá nhân
            </Link>
          </li>


          <li>
            <Link
              href="/patient/updatemeasure"
              className="flex items-center gap-3 px-4 py-3 rounded-xl
                         bg-violet-100 text-violet-700 font-semibold
                         hover:bg-violet-200 transition-all"
            >
              <Activity size={18} />
              Chỉ số đo
              </Link>
            <Link href="/patient/predictions" className="flex items-center gap-3 px-4 py-3 rounded-lg text-amber-700 font-semibold bg-amber-100 hover:bg-amber-200 transition-all shadow group">
              <svg className="w-5 h-5 text-amber-500 group-hover:text-amber-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Dự đoán bệnh
            </Link>
          </li>

          <li>
            <Link
              href="/patient/manageappointment"
              className="flex items-center gap-3 px-4 py-3 rounded-xl
                         bg-orange-100 text-orange-700 font-semibold
                         hover:bg-orange-200 transition-all"
            >
              <Calendar size={18} />
              Lịch hẹn
            </Link>
          </li>

        </ul>
      </nav>
      <div className="w-full px-4 py-6 mt-auto">
        <Link href="/logout" className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-linear-to-r from-blue-500 to-amber-400 text-white font-bold shadow-lg hover:scale-105 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
          Đăng xuất
        </Link>
      </div>
    </div>
  );
};

export default SideBar;