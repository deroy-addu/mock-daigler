"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAssignmentStore } from "@/lib/store";

function PostContent() {
  const { announcements, loading } = useAssignmentStore();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "exam-schedule";
  
  if (loading) return <div className="p-20 text-center text-stone-500">Loading message...</div>;

  const post = announcements.find((a: any) => String(a.id) === id) || announcements[0];

  if (!post) return <div className="p-20 text-center text-stone-500">Announcement not found.</div>;

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
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{post.author}</p>
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