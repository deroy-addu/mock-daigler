"use client";

import Link from "next/link";
import { useAssignmentStore } from "@/lib/store";

export default function AnnouncementsPage() {
  const { announcements, loading } = useAssignmentStore();

  if (loading) {
    return (
      <div className="p-20 text-center text-stone-500">Loading announcements...</div>
    );
  }

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
            <p className="text-xs text-stone-400 font-medium mt-1">{news.date} • {news.author}</p>
            <p className="text-stone-600 mt-4 leading-relaxed">{news.content}</p>
            
            <div className="mt-6">
              <Link 
                href={`/announcements/post?id=${news.id}`}
                className="text-amber-500 font-bold text-sm hover:text-amber-600 transition-colors"
                aria-label={`Read more about ${news.title}`}
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}