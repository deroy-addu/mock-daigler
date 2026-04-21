import Link from "next/link";

const exams = [
  {
    id: "web-tech",
    title: "Web Technologies Final",
    date: "12",
    location: "Hall A • 3h Duration",
    time: "09:00 AM",
    startsIn: "Starts in 32 days",
  },
  {
    id: "data-science",
    title: "Data Science Midterm",
    date: "15",
    location: "Computer Lab 4 • 2h Duration",
    time: "02:00 PM",
    startsIn: "Starts in 35 days",
  },
];

export default function ExamsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-stone-900">Upcoming Exams</h2>
        <p className="text-stone-500">Your official examination schedule for the semester.</p>
      </div>

      <div className="space-y-4">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex flex-col items-center justify-center border border-amber-100">
                <span className="text-[10px] font-black text-amber-500 uppercase leading-none">May</span>
                <span className="text-2xl font-bold text-amber-600">{exam.date}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-800">{exam.title}</h3>
                <p className="text-sm text-stone-400 font-medium">{exam.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-8 text-right">
              <div>
                <p className="text-lg font-bold text-stone-800">{exam.time}</p>
                <p className="text-xs text-stone-400 font-medium">{exam.startsIn}</p>
              </div>
              {/* Note the ?type= here */}
              <Link 
                href={`/exams/guidelines?type=${exam.id}`}
                className="px-6 py-2 border border-amber-200 text-amber-500 rounded-xl font-bold text-sm hover:bg-amber-50 transition-colors"
              >
                Guidelines
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}