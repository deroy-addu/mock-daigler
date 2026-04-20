import { NotificationsIcon } from "@/components/Icons";
import UserSVG from "@/assets/user.svg";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-stone-100 flex items-center justify-end px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-6">
        <button className="relative p-2 text-stone-500 hover:bg-stone-50 rounded-full transition-all group">
          <NotificationsIcon size={26} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
        </button>

        <Link
          href="/profile"
          className="flex items-center space-x-3 pl-6 border-l border-stone-100 group cursor-pointer"
        >
          <div className="text-right transition-colors group-hover:opacity-70">
            <p className="text-sm font-semibold text-stone-800">Lebron James</p>
            <p className="text-xs text-stone-400 font-medium">
              Student ID: 230612
            </p>
          </div>
          
          <div className="w-10 h-10 bg-stone-50 rounded-full border-2 border-stone-100 flex items-center justify-center overflow-hidden transition-all group-hover:scale-110 group-hover:border-amber-400">
            <Image
              src={UserSVG}
              alt="User Icon"
              width={22}
            />
          </div>
        </Link>
      </div>
    </header>
  );
}