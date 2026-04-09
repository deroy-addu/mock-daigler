import React from "react";

export default function GradesPage() {
  const grades = [
    { id: 1, course: "Advanced Web Dev", assessment: "Assignment 3", score: "85/100", weight: "15%", date: "2 days ago" },
    { id: 2, course: "Machine Learning", assessment: "Quiz 2", score: "18/20", weight: "5%", date: "1 week ago" },
  ];

  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Recent Grades</h2>
        <p className="text-stone-500 mt-1">Review your latest academic performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {grades.map((grade) => (
          <div key={grade.id} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm flex items-center justify-between group hover:border-amber-200 transition-colors">
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{grade.course}</p>
              <h3 className="text-lg font-bold text-stone-800">{grade.assessment}</h3>
              <p className="text-sm text-stone-500 mt-2 font-medium">Weight: {grade.weight} • Received {grade.date}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-[#F9A825] group-hover:scale-110 transition-transform block">
                {grade.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
