"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DiscussionIcon } from "@/components/Icons";

// 1. Expanded Data for all Forum Categories
const FORUM_DATA: Record<string, any> = {
  "project-collaboration": {
    title: "Project Collaboration",
    description: "Find teammates and coordinate on group assignments.",
    threads: [
      { title: "Looking for a React developer", id: "react-dev" },
      { title: "Project Alpha - Deadline sync", id: "project-alpha" },
      { title: "Finalizing the documentation", id: "doc-sync" }
    ]
  },
  "general-discussion": {
    title: "General Discussion",
    description: "General campus talk, news, and socializing.",
    threads: [
      { title: "Best coffee shops on campus", id: "best-coffee-shops" },
      { title: "Exam season survival tips", id: "exam-tips" },
      { title: "Summer break plans", id: "summer-plans" }
    ]
  },
  "bug-reports": {
    title: "Bug Reports & Help",
    description: "Technical issues and peer-to-peer debugging help.",
    threads: [
      { title: "Tailwind config not loading", id: "tailwind-bug" },
      { title: "Next.js 14 hydration error", id: "hydration-error" },
      { title: "API Route returning 404", id: "api-404" }
    ]
  }
};

function ForumViewContent() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic") || "general-discussion";
  const data = FORUM_DATA[topic] || FORUM_DATA["general-discussion"];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <nav className="flex items-center space-x-2 text-sm font-medium text-stone-400">
        <Link href="/forums" className="hover:text-stone-600 transition-colors">Discussion Forums</Link>
        <span>/</span>
        <span className="text-stone-800 font-bold">{data.title}</span>
      </nav>

      <div className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm">
        <div className="flex items-center space-x-4 mb-10">
          <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center border border-stone-50">
            <DiscussionIcon size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-900 leading-tight">{data.title}</h2>
            <p className="text-stone-500 text-sm font-medium">{data.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4">
            Active Threads
          </h4>
          
          {data.threads.map((thread: { title: string; id: string }, i: number) => (
            <Link 
              key={i} 
              href={`/forums/thread?id=${thread.id}`}
              className="p-6 rounded-2xl border border-stone-50 hover:bg-stone-50 cursor-pointer transition-all flex justify-between items-center group bg-white shadow-sm hover:shadow-md"
            >
              <span className="font-bold text-stone-700 group-hover:text-amber-500 transition-colors">
                {thread.title}
              </span>
              <span className="text-[10px] text-stone-400 font-black uppercase tracking-tighter group-hover:text-stone-600 transition-colors">
                View Discussion →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-stone-50">
          <button className="px-8 py-4 bg-amber-500 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-amber-600 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-200">
            + Start New Thread
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ForumViewPage() {
  return (
    <Suspense fallback={
      <div className="p-20 text-center animate-pulse flex flex-col items-center space-y-4">
        <div className="w-12 h-12 bg-stone-100 rounded-full"></div>
        <div className="text-stone-300 font-bold uppercase tracking-widest text-xs">Loading Category...</div>
      </div>
    }>
      <ForumViewContent />
    </Suspense>
  );
}