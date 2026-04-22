"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ChevronDownSVG from "@/assets/chevron-down.svg";
import { AnnouncementsIcon, DashboardIcon, HomeIcon, NotebookIcon } from "./Icons";
// Import your other icons here once they are in Icons.tsx:
// import { HomeIcon, DashboardIcon, AnnouncementsIcon } from "./Icons";

const navItems = [
  {
    name: "Site Home",
    href: "/home",
    icon: <HomeIcon size={20}/>
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIcon size={20}/> 
  },
  {
    name: "Assignments",
    href: "/assignments",
    icon: <NotebookIcon size={20} />
  },
  {
    name: "Announcements",
    href: "/announcements",
    icon: <AnnouncementsIcon size={20}/>
  },
];

const myActivities = [
  { name: "Recent Grades", href: "/grades" },
  { name: "Upcoming Exams", href: "/exams" },
  { name: "Discussion Forums", href: "/forums" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(true);

  return (
    <aside className="w-64 min-h-screen bg-[#FDFBF7] border-r border-stone-200 flex flex-col sticky top-0 shadow-sm">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-amber-500">Brainwave</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const renderedIcon = item.icon 
            ? React.cloneElement(item.icon as React.ReactElement<{ active: boolean }>, { active: isActive })
            : null;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-md transition-all group ${
                isActive
                  ? "bg-amber-400 text-white shadow-md"
                  : "hover:bg-stone-100 text-stone-700"
              }`}
            >
              {renderedIcon && (
                <span className={`mr-3 ${isActive ? "text-white" : "text-stone-400"}`}>
                  {renderedIcon}
                </span>
              )}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}

        {/* Collapsible My Activities */}
        <div className="pt-4">
          <button
            onClick={() => setIsActivitiesOpen((v) => !v)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-stone-500 uppercase tracking-wider hover:text-stone-800"
          >
            <span>My Activities</span>
            <span className={`transition-transform duration-200 ${isActivitiesOpen ? "rotate-180" : ""}`}>
              <Image
                src={ChevronDownSVG}
                alt="Chevron Down"
                width={18}
                height={18}
              />
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

      <div className="p-4 border-t border-stone-100">
        <p className="text-xs text-stone-400 text-center">
          © 2026 Brainwave
        </p>
      </div>
    </aside>
  );
}