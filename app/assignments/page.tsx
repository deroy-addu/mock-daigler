import React from "react";

export default function AssignmentsPage() {
  const assignments = [
    { id: 1, title: "React Components Deep Dive", course: "Advanced Web Dev", due: "Tomorrow", status: "Pending" },
    { id: 2, title: "Neural Network Architecture", course: "Machine Learning", due: "In 3 days", status: "In Progress" },
    { id: 3, title: "Design System Documentation", course: "UI/UX Design", due: "Next Week", status: "Not Started" },
  ];

  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Assignments</h2>
        <p className="text-stone-500 mt-1">Manage and track your upcoming tasks.</p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-100">
              <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Assignment</th>
              <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Course</th>
              <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Due Date</th>
              <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {assignments.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50 transition-colors group">
                <td className="px-8 py-6 font-bold text-stone-800 group-hover:text-[#F9A825]">{item.title}</td>
                <td className="px-8 py-6 text-stone-600 text-sm">{item.course}</td>
                <td className="px-8 py-6 text-stone-500 text-sm font-medium">{item.due}</td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                    item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
