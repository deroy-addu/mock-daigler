"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const POST_DATA: Record<string, any> = {
  "exam-schedule": {
    title: "Exam Schedule Released",
    date: "April 5, 2026",
    office: "Academic Office",
    content: "The official examination schedule for the Spring 2026 semester has been finalized. Students are advised to log into their portals and check the 'Upcoming Exams' tab. Please ensure you arrive at the designated halls at least 30 minutes before the start time. Any conflicts in the schedule must be reported to the Academic Office by the end of this week."
  },
  "library-hours": {
    title: "Library Opening Hours",
    date: "April 2, 2026",
    office: "Library Services",
    content: "To support students during the final exam period, the Main Library will transition to 24/7 operations starting next Monday. Study pods and silent zones will be available on a first-come, first-served basis. Please remember to bring your student ID for entry after 10:00 PM. High-speed Wi-Fi and printing services will remain active throughout the night."
  }
};

function PostContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "exam-schedule";
  const post = POST_DATA[id] || POST_DATA["exam-schedule"];

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm font-medium text-stone-400">
        <Link href="/announcements" className="hover:text-stone-600">Announcements</Link>
        <span>/</span>
        <span className="text-stone-800 font-bold">News Detail</span>
      </nav>

      <article className="bg-white p-12 rounded-[2rem] border border-stone-100 shadow-sm">
        <header className="mb-8 border-b border-stone-50 pb-8">
          <h1 className="text-4xl font-bold text-stone-900 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 mt-4">
            <div className="bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{post.office}</p>
            </div>
            <p className="text-xs text-stone-400 font-bold uppercase">{post.date}</p>
          </div>
        </header>

        <div className="prose prose-stone">
          <p className="text-stone-600 leading-[1.8] text-lg italic">
            {post.content}
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-50">
          <Link 
            href="/announcements"
            className="text-stone-400 font-bold text-xs uppercase tracking-widest hover:text-stone-900 transition-colors"
          >
            ← Back to all announcements
          </Link>
        </div>
      </article>
    </div>
  );
}

export default function AnnouncementPostPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading message...</div>}>
      <PostContent />
    </Suspense>
  );
}