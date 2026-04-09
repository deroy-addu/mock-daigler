import React from "react";

const Header = () => {
  return (
    <header className="h-20 bg-white border-b border-stone-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <span className="absolute inset-y-0 left-3 flex items-center text-stone-400 group-focus-within:text-[#F9A825] transition-colors">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search for courses, assignments..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-[#F9A825] transition-all text-sm"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <button className="relative p-2 text-stone-500 hover:bg-stone-50 rounded-full transition-all group">
          <BellIcon />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-6 border-l border-stone-100">
          <div className="text-right">
            <p className="text-sm font-semibold text-stone-800">Lebron James</p>
            <p className="text-xs text-stone-400 font-medium">Student ID: 230612</p>
          </div>
          <div className="w-10 h-10 bg-amber-100 rounded-full border-2 border-amber-200 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform cursor-pointer">
             {/* Placeholder for Profile Image */}
             <UserIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

// --- SVG Icons ---

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default Header;
