import React from "react";

export default function HomePage() {
  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Site Home</h2>
        <p className="text-stone-500 mt-1">Explore upcoming events and university news.</p>
      </div>
      
      <div className="bg-white p-12 rounded-3xl border border-stone-100 shadow-sm text-center">
        <div className="w-20 h-20 bg-amber-50 text-[#F9A825] rounded-3xl flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <h3 className="text-xl font-bold text-stone-800">Welcome to the University Portal</h3>
        <p className="text-stone-500 mt-2 max-w-md mx-auto">
          Find all your academic resources, campus news, and community events right here.
        </p>
      </div>
    </div>
  );
}
