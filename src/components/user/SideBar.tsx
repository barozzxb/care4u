import Link from "next/link";
import { Home, User, FileText, Activity, Calendar } from "lucide-react";

const SideBar = () => {
  return (
    <div className="h-full bg-gradient-to-b from-slate-50 via-white to-slate-100 border-r border-slate-200 shadow-xl flex flex-col">
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

          <li>
            <Link
              href="/patient/medicalhistory"
              className="flex items-center gap-3 px-4 py-3 rounded-xl
                         bg-teal-100 text-teal-700 font-semibold
                         hover:bg-teal-200 transition-all"
            >
              <FileText size={18} />
              Lịch sử khám bệnh
            </Link>
          </li>

          <li>
            <Link
              href="/patient/prediction"
              className="flex items-center gap-3 px-4 py-3 rounded-xl
                         bg-red-200 text-orange-700 font-semibold
                         hover:bg-red-300 transition-all"
            >
              <Calendar size={18} />
              Lịch hẹn
            </Link>
          </li>

        </ul>
      </nav>

      <div className="px-4 py-6">
        <Link
          href="/logout"
          className="flex justify-center items-center px-4 py-3 rounded-xl
                     bg-red-100 text-red-600 font-semibold
                     hover:bg-red-200 transition-all"
        >
          Đăng xuất
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
