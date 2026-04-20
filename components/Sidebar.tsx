"use client";

import ChevronDownSVG from "@/assets/chevron-down.svg";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Site Home",
    href: "/home",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Assignments",
    href: "/assignments",
  },
  {
    name: "Announcements",
    href: "/announcements",
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
        <h1 className="text-2xl font-bold text-amber-500">mock-daigler</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-md transition-all ${
                isActive
                  ? "bg-amber-400 text-white"
                  : "hover:bg-stone-200 text-stone-700"
              }`}
            >
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}

        <div className="pt-4">
          <button
            onClick={() => setIsActivitiesOpen((v) => !v)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold uppercase"
          >
            <span>My Activities</span>
            <span className={isActivitiesOpen ? "rotate-180" : ""}>
              <Image
                src={ChevronDownSVG}
                alt="Chevron Down Icon"
                width={25}
              />
            </span>
          </button>

          {isActivitiesOpen && (
            <div className="mt-2 space-y-1 px-2">
              {myActivities.map((activity) => {
                const isActive = pathname === activity.href;

                return (
                  <Link
                    key={activity.name}
                    href={activity.href}
                    className={`block px-4 py-2 text-sm rounded-md ${
                      isActive
                        ? "bg-amber-400 text-white"
                        : "hover:bg-stone-200"
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
          © 2026 mock-daigler
        </p>
      </div>
    </aside>
  );
}
