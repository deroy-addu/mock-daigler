import React from "react";

export default function AnnouncementsPage() {
  const announcements = [
    { id: 1, title: "Exam Schedule Released", date: "April 5, 2026", author: "Academic Office", content: "Please check the 'Upcoming Exams' tab for your personal schedule..." },
    { id: 2, title: "Library Opening Hours", date: "April 2, 2026", author: "Library Services", content: "From next week, the main library will be open 24/7 for final exam preparation..." },
  ];

  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Announcements</h2>
        <p className="text-stone-500 mt-1">Stay updated with the latest campus news.</p>
      </div>

      <div className="space-y-6">
        {announcements.map((item) => (
          <div key={item.id} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-stone-800">{item.title}</h3>
                <p className="text-sm text-stone-400 mt-1 font-medium">{item.date} • {item.author}</p>
              </div>
              <span className="bg-amber-50 text-[#F9A825] p-2 rounded-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8Z"/><path d="M22 12h-4"/><path d="M18 10h4"/><path d="M18 14h4"/></svg>
              </span>
            </div>
            <p className="text-stone-600 leading-relaxed">{item.content}</p>
            <button className="mt-6 text-sm font-bold text-[#F9A825] hover:text-[#D97706] transition-colors">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}
