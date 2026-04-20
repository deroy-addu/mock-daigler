"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { initialCourses } from "@/lib/data";

function ResourceRow({ name, type }: { name: string; type: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2.5">
      <div className="flex items-center gap-2 min-w-0">
        <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold text-stone-800 truncate">{name}</p>
          <p className="text-[10px] text-stone-400 uppercase tracking-wider">{type}</p>
        </div>
      </div>
      <button className="text-amber-700 text-[11px] font-bold hover:text-amber-800">Open</button>
    </div>
  );
}

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = Number(params.id);

  const [classComment, setClassComment] = useState("");
  const [privateComment, setPrivateComment] = useState("");

  const found = useMemo(() => {
    for (const course of initialCourses) {
      const lesson = course.lessons.find((item) => item.id === lessonId);
      if (lesson) return { course, lesson };
    }
    return undefined;
  }, [lessonId]);

  if (!found) {
    return (
      <div className="p-8 max-w-(--breakpoint-2xl) mx-auto text-center pt-24 space-y-4">
        <p className="text-stone-500 font-medium">Lesson not found.</p>
        <Link href="/dashboard" className="text-[#F9A825] font-bold hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const { course, lesson } = found;

  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-6">
      <nav className="text-sm text-stone-500">
        <Link href={`/course/${course.id}`} className="hover:text-[#F9A825] transition-colors font-medium">{course.title}</Link>
        <span className="mx-2">/</span>
        <span className="text-stone-900 font-semibold">{lesson.title}</span>
      </nav>

      <section className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-0">
          <div className="p-6 md:p-8 border-b xl:border-b-0 xl:border-r border-stone-100 space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight uppercase">{lesson.title}</h1>
              <p className="text-xs text-stone-500 font-medium">
                {course.instructor} • Available until {lesson.availableUntil}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
              <h2 className="text-sm font-black text-amber-700 uppercase tracking-wider mb-2">Instructions</h2>
              <p className="text-sm text-stone-700 leading-relaxed">{lesson.instructions}</p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 space-y-4 min-h-[280px]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">Class Comments</h3>
              <div className="flex items-center gap-2">
                <input
                  value={classComment}
                  onChange={(event) => setClassComment(event.target.value)}
                  placeholder="Add class comment..."
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
                <button className="px-4 py-2 rounded-xl bg-[#F9A825] text-white text-xs font-bold hover:bg-[#D97706] transition-colors">
                  Post
                </button>
              </div>

              <div className="text-xs text-stone-600 pt-2">
                <p className="font-semibold text-stone-700">Module</p>
                <p>{lesson.module}</p>
                <p className="mt-2 font-semibold text-stone-700">Duration</p>
                <p>{lesson.duration}</p>
              </div>
            </div>
          </div>

          <aside className="p-6 bg-stone-50/50 space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">Lesson Resources</h3>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${lesson.status === "Completed" ? "bg-emerald-100 text-emerald-700" : lesson.status === "In Progress" ? "bg-amber-100 text-amber-700" : "bg-stone-100 text-stone-600"}`}>
                  {lesson.status}
                </span>
              </div>

              <div className="space-y-2">
                {lesson.resources.map((resource) => (
                  <ResourceRow key={resource.id} name={resource.name} type={resource.type} />
                ))}
              </div>

              <button className="w-full py-2 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold hover:bg-amber-50 transition-colors">
                + Add Note
              </button>

              <button
                onClick={() => router.push(`/course/${course.id}`)}
                className="w-full py-2.5 rounded-xl bg-[#F9A825] text-white text-xs font-bold hover:bg-[#D97706] transition-colors"
              >
                Back to Course
              </button>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">Private Comments</h3>
              <textarea
                value={privateComment}
                onChange={(event) => setPrivateComment(event.target.value)}
                rows={4}
                placeholder="Add private comment..."
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
