import React from "react";

export default function ForumsPage() {
  const forums = [
    { id: 1, title: "Project Collaboration", posts: 24, unread: 3, lastActive: "15m ago" },
    { id: 2, title: "General Discussion", posts: 156, unread: 0, lastActive: "2h ago" },
    { id: 3, title: "Bug Reports & Help", posts: 89, unread: 12, lastActive: "Just now" },
  ];

  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Discussion Forums</h2>
        <p className="text-stone-500 mt-1">Connect and collaborate with your peers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {forums.map((forum) => (
          <div key={forum.id} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-amber-50 text-[#F9A825] rounded-2xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              {forum.unread > 0 && (
                <span className="px-2 py-1 bg-red-100 text-red-600 text-[10px] font-black rounded-lg uppercase">
                  {forum.unread} New
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-stone-800 group-hover:text-[#F9A825] transition-colors">{forum.title}</h3>
            <div className="mt-8 pt-6 border-t border-stone-50 flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-widest">
              <span>{forum.posts} Posts</span>
              <span>Active {forum.lastActive}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
