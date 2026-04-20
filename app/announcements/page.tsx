const announcements: Announcement[] = [
  {
    id: 1,
    title: "Exam Schedule Released",
    date: "April 5, 2026",
    author: "Academic Office",
    content:
      "Please check the 'Upcoming Exams' tab for your personal schedule...",
  },
  {
    id: 2,
    title: "Library Opening Hours",
    date: "April 2, 2026",
    author: "Library Services",
    content:
      "From next week, the main library will be open 24/7 for final exam preparation...",
  },
];

function AnnouncementItem({ item }: { item: Announcement }) {
  return (
    <div
      key={item.id}
      className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-stone-800">{item.title}</h3>
        <p className="text-sm text-stone-400 mt-1 font-medium">
          {item.date} • {item.author}
        </p>
      </div>
      <p className="text-stone-600 leading-relaxed">{item.content}</p>
      <button className="mt-6 text-sm font-bold text-amber-400 hover:text-amber-600 transition-colors">
        Read More
      </button>
    </div>
  );
}

export default function AnnouncementsPage() {
  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
          Announcements
        </h2>
        <p className="text-stone-500 mt-1">
          Stay updated with the latest campus news.
        </p>
      </div>
      <div className="space-y-6">
        {announcements.map((item, i) => (
          <AnnouncementItem
            key={i}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}
