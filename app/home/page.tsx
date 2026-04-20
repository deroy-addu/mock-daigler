import Image from "next/image";
import { HomeIcon } from "@/components/Icons";

export default function HomePage() {
  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
          Site Home
        </h2>
        <p className="text-stone-500 mt-1">
          Explore upcoming events and university news.
        </p>
      </div>

      <div className="bg-white p-12 rounded-3xl border border-stone-100 shadow-sm text-center">
        {/* Removed text-amber-400 so it doesn't interfere with the HomeIcon colors */}
        <div className="w-20 h-20 bg-stone-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-stone-50">
          <HomeIcon size={56} />
        </div>
        <h3 className="text-xl font-bold text-stone-800">
          Welcome to the University Portal
        </h3>
        <p className="text-stone-500 mt-2 max-w-md mx-auto">
          Find all your academic resources, campus news, and community events
          right here.
        </p>
      </div>
    </div>
  );
}