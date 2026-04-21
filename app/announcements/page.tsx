import Link from "next/link";

const announcements = [
  {
    id: "exam-schedule",
    title: "Exam Schedule Released",
    date: "April 5, 2026",
    office: "Academic Office",
    preview: "Please check the 'Upcoming Exams' tab for your personal schedule..."
  },
  {
    id: "library-hours",
    title: "Library Opening Hours",
    date: "April 2, 2026",
    office: "Library Services",
    preview: "From next week, the main library will be open 24/7 for final exam preparation..."
  }
];

export default function AnnouncementsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900">Announcements</h2>
        <p className="text-stone-500">Stay updated with the latest campus news.</p>
      </div>

      <div className="space-y-6">
        {announcements.map((news) => (
          <div key={news.id} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
            <h3 className="text-xl font-bold text-stone-900">{news.title}</h3>
            <p className="text-xs text-stone-400 font-medium mt-1">{news.date} • {news.office}</p>
            <p className="text-stone-600 mt-4 leading-relaxed">{news.preview}</p>
            
            <Link 
              href={`/announcements/post?id=${news.id}`}
              className="inline-block mt-6 text-amber-500 font-bold text-sm hover:text-amber-600 transition-colors"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}