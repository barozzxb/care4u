'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
  {
    href: '/admin',
    label: 'Trang chủ',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10h6V14h4v6h6V10" />
      </svg>
    ),
  },
  {
    href: '/admin/departments',
    label: 'Chuyên khoa',
    icon: (
      <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-4.418 0-8 1.79-8 4v2c0 2.21 3.582 4 8 4s8-1.79 8-4v-2c0-2.21-3.582-4-8-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v4" />
      </svg>
    ),
  },
  {
    href: '/admin/accounts',
    label: 'Tài khoản',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20a6 6 0 0112 0" />
      </svg>
    ),
  },
  {
    href: '/admin/posts',
    label: 'Bài viết',
    icon: (
      <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6zM3.75 9h16.5m-16.5 4.5h16.5" />
      </svg>
    ),
  },
  {
    href: '/admin/more',
    label: 'Khác',
    icon: (
      <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h.01M12 12h.01M18 12h.01" />
      </svg>
    ),
  },

];

const SideBar: React.FC = () => {
  const pathname = usePathname() || '';

  return (
    <aside className="h-full w-56 min-w-[14rem] bg-white/80 backdrop-blur-sm border-r border-gray-200 shadow-md flex flex-col p-4">
      <div className="px-1 py-3 mb-4 border-b border-gray-100">
        <h3 className="text-base font-semibold text-slate-800">Bảng điều khiển</h3>
        <p className="text-sm text-slate-400 mt-0.5">Quản lý hệ thống</p>
      </div>

      <nav aria-label="Sidebar navigation" className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const normalizedPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
            const normalizedHref = item.href.endsWith('/') && item.href !== '/' ? item.href.slice(0, -1) : item.href;

            let isActive = false;
            if (normalizedHref === '/admin') {
              isActive = normalizedPath === '/admin';
            } else {
              isActive = normalizedPath === normalizedHref || normalizedPath.startsWith(normalizedHref + '/');
            }

            return (
              <li key={item.href} className="relative">
                <div
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r transition-all ${isActive ? 'bg-gradient-to-b from-blue-500 to-blue-700' : 'opacity-0'}`}
                  aria-hidden
                />

                <Link
                  href={item.href}
                  className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-base font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300
                    ${isActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
                  aria-current={isActive ? 'page' : undefined}
                  title={item.label}
                >
                  <span className={`flex-none transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                    {item.icon}
                  </span>

                  <span className="truncate">{item.label}</span>

                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;