"use client";

import { NotificationsIcon } from "@/components/Icons";
import UserSVG from "@/assets/user.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NOTIFICATIONS = [
  { id: 1, title: "New sign in to your Daigler 2025 Moodle server account", time: "6 secs ago" },
  { id: 2, title: "Upcoming Exam: Web Development Guidelines", time: "2 hours ago" },
  { id: 3, title: "New Announcement: Campus Holiday Schedule", time: "1 day ago" },
  { id: 4, title: "Grade released for Quiz #3 in Database Systems", time: "2 days ago" },
];

export default function Header() {
  const [user, setUser] = useState({ fullName: "Guest", studentId: "230612" });
  const [isOpen, setIsOpen] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const syncUserFromStorage = () => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (storedUser) {
        setUser({
          fullName: storedUser.fullName || "Guest",
          studentId: storedUser.studentId || "230612"
        });
      }
    };

    syncUserFromStorage();
    window.addEventListener("userUpdated", syncUserFromStorage);

    return () => {
      window.removeEventListener("userUpdated", syncUserFromStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  return (
    <header className="h-20 bg-white border-b border-stone-100 flex items-center justify-end px-8 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center space-x-6">
        
        {/* Notification Wrapper */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`relative p-2 rounded-full transition-all group ${isOpen ? 'bg-amber-50 text-amber-600' : 'text-stone-500 hover:bg-stone-50'}`}
          >
            <NotificationsIcon size={26} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
          </button>

          {/* Notification Dropdown Box (Light Mode) */}
          {isOpen && (
            <>
              {/* Invisible backdrop to close when clicking outside */}
              <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)} />
              
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                  <h3 className="text-stone-800 font-bold text-sm">Notifications</h3>
                  <button className="text-stone-400 hover:text-stone-600">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Mark all as read</span>
                  </button>
                </div>

                {/* Scrollable Area */}
                <div className="max-h-[400px] overflow-y-auto">
                  {NOTIFICATIONS.map((notif) => (
                    <div key={notif.id} className="p-4 border-b border-stone-50 hover:bg-stone-50 transition-colors cursor-default group/item">
                      <div className="flex space-x-3">
                        <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-100 transition-colors">
                          <NotificationsIcon size={18} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] text-stone-700 font-medium leading-snug">{notif.title}</p>
                          <p className="text-[11px] text-stone-400 mt-1">{notif.time}</p>
                          <button className="text-[11px] text-blue-600 font-bold mt-2 hover:text-blue-700">View full notification</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 text-xs font-bold text-stone-500 hover:text-amber-600 hover:bg-amber-50 transition-all border-t border-stone-100 bg-stone-50/30">
                  See all notifications
                </button>
              </div>
            </>
          )}
        </div>

        {/* Profile Link */}
        <div className="flex items-center space-x-3 pl-6 border-l border-stone-100 group">
          <Link href="/profile" className="flex items-center space-x-3 group cursor-pointer">
            <div className="text-right transition-colors group-hover:opacity-70">
              <p className="text-sm font-semibold text-stone-800">{user.fullName}</p>
              <p className="text-xs text-stone-400 font-medium">Student ID: {user.studentId}</p>
            </div>
            <div className="w-10 h-10 bg-stone-50 rounded-full border-2 border-stone-100 flex items-center justify-center overflow-hidden transition-all group-hover:scale-110 group-hover:border-amber-400">
              <Image src={UserSVG} alt="User" width={22} />
            </div>
          </Link>
          
          <button onClick={handleLogout} className="ml-4 px-3 py-1.5 text-xs font-bold text-stone-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}