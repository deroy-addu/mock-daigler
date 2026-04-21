"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(true);

  const navItems = [
    { name: "Site Home", href: "/home", icon: <HomeIcon /> },
    { name: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
    { name: "Assignments", href: "/assignments", icon: <AssignmentsIcon /> },
    { name: "Announcements", href: "/announcements", icon: <AnnouncementsIcon /> },
  ];

  const myActivities = [
    { name: "Recent Grades", href: "/grades" },
    { name: "Upcoming Exams", href: "/exams" },
    { name: "Discussion Forums", href: "/forums" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#FDFBF7] border-r border-stone-200 flex flex-col sticky top-0 shadow-sm">
      {/* Logo/Brand Area */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#D97706]">mock-daigler</h1>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/assignments" && (pathname.startsWith("/assignments/") || pathname.startsWith("/lessons/")));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-[#F9A825] text-white shadow-md shadow-amber-200"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <span className={`mr-3 ${isActive ? "text-white" : "text-stone-400 group-hover:text-stone-600"}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}

        {/* Collapsible My Activities */}
        <div className="pt-4">
          <button
            onClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-stone-500 uppercase tracking-wider hover:text-stone-800 transition-colors"
          >
            <span>My Activities</span>
            <span className={`transform transition-transform duration-200 ${isActivitiesOpen ? "rotate-180" : ""}`}>
              <ChevronDownIcon />
            </span>
          </button>
          
          {isActivitiesOpen && (
            <div className="mt-2 space-y-1 px-2">
              {myActivities.map((activity) => {
                const isActive = pathname.startsWith(activity.href);
                return (
                  <Link
                    key={activity.name}
                    href={activity.href}
                    className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                      isActive
                        ? "bg-amber-100 text-amber-700 font-bold"
                        : "text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    {activity.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Footer / Settings if needed */}
      <div className="p-4 border-t border-stone-100">
        <p className="text-xs text-stone-400 text-center">© 2026 mock-daigler</p>
      </div>
    </aside>
  );
};

// --- SVG Icons ---

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);

const AssignmentsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
);

const AnnouncementsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

export default Sidebar;
