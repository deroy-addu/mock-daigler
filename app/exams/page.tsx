import React from "react";

export default function ExamsPage() {
  const exams = [
    { id: 1, title: "Web Technologies Final", date: "May 12, 2026", time: "09:00 AM", location: "Hall A", duration: "3h" },
    { id: 2, title: "Data Science Midterm", date: "May 15, 2026", time: "02:00 PM", location: "Computer Lab 4", duration: "2h" },
  ];

  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Upcoming Exams</h2>
        <p className="text-stone-500 mt-1">Your official examination schedule for the semester.</p>
      </div>

      <div className="space-y-4">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex flex-col items-center justify-center text-[#F9A825]">
                <span className="text-xs font-bold uppercase tracking-tighter">MAY</span>
                <span className="text-xl font-black leading-none">{exam.date.split(' ')[1].replace(',', '')}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-800">{exam.title}</h3>
                <p className="text-sm text-stone-500 font-medium">{exam.location} • {exam.duration} Duration</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 md:pl-8 md:border-l border-stone-100">
              <div className="text-right">
                <p className="text-sm font-bold text-stone-800">{exam.time}</p>
                <p className="text-xs text-stone-400 font-medium">Starts in 32 days</p>
              </div>
              <button className="px-6 py-2 border-2 border-amber-100 text-[#F9A825] font-bold rounded-xl hover:bg-amber-50 transition-all text-sm">
                Guidelines
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
