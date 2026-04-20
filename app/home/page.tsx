import HomeSVG from "@/assets/home.svg";
import Image from "next/image";

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
        <div className="w-20 h-20 bg-amber-50 text-amber-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Image
            src={HomeSVG}
            alt="Home Icon"
            width={50}
          />
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
