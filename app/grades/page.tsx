const grades: Grade[] = [
  {
    id: 1,
    course: "Advanced Web Dev",
    assessment: "Assignment 3",
    score: "85/100",
    weight: "15%",
    date: "2 days ago",
  },
  {
    id: 2,
    course: "Machine Learning",
    assessment: "Quiz 2",
    score: "18/20",
    weight: "5%",
    date: "1 week ago",
  },
];

export default function GradesPage() {
  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
          Recent Grades
        </h2>
        <p className="text-stone-500 mt-1">
          Review your latest academic performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {grades.map((grade) => (
          <div
            key={grade.id}
            className="bg-white p-8 rounded-3xl shadow-md flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase mb-1">
                {grade.course}
              </p>
              <h3 className="text-lg font-bold text-stone-800">
                {grade.assessment}
              </h3>
              <p className="text-sm text-stone-500 mt-2 font-medium">
                Weight: {grade.weight} • Received {grade.date}
              </p>
            </div>
            <div className="text-right bg-amber-50 px-4 py-2 rounded-2xl">
              <span className="text-3xl font-black text-amber-400 transition-transform block">
                {grade.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
