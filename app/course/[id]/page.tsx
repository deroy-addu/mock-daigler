"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { initialCourses } from "@/lib/data";
import { useAssignmentStore } from "@/lib/store";

type TabKey = "about" | "assignments" | "lessons";

const tabItems: Array<{ key: TabKey; label: string }> = [
  { key: "about", label: "About" },
  { key: "assignments", label: "Assignments" },
  { key: "lessons", label: "Lessons" },
];

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
        active
          ? "bg-[#F9A825] text-white border-[#F9A825] shadow-sm shadow-amber-100"
          : "bg-white text-stone-600 border-stone-200 hover:border-amber-200 hover:text-[#F9A825]"
      }`}
    >
      {label}
    </button>
  );
}

function StatusPill({ status }: { status: "Completed" | "In Progress" | "Pending" }) {
  const styleMap = {
    Completed: "bg-emerald-100 text-emerald-700",
    "In Progress": "bg-amber-100 text-amber-700",
    Pending: "bg-stone-100 text-stone-600",
  } as const;

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${styleMap[status]}`}>
      {status}
    </span>
  );
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [activeTab, setActiveTab] = useState<TabKey>("about");

  const { assignments, loading } = useAssignmentStore();

  const course = useMemo(() => {
    return initialCourses.find((item) => item.id === id);
  }, [id]);

  const courseAssignments = useMemo(() => {
    if (!course) return [];
    return assignments.filter((item) => course.assignmentIds.includes(item.id));
  }, [assignments, course]);

  if (loading) {
    return (
      <div className="p-8 max-w-(--breakpoint-2xl) mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-stone-200 rounded w-72" />
          <div className="h-56 bg-stone-200 rounded-3xl" />
          <div className="h-44 bg-stone-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-8 max-w-(--breakpoint-2xl) mx-auto text-center pt-24 space-y-3">
        <p className="text-stone-500 font-medium">Course not found.</p>
        <Link href="/dashboard" className="text-[#F9A825] font-bold hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8">
      <nav className="flex items-center space-x-2 text-sm">
        <Link href="/dashboard" className="text-stone-400 hover:text-[#F9A825] font-semibold transition-colors">
          Dashboard
        </Link>
        <span className="text-stone-300">/</span>
        <span className="text-stone-700 font-semibold truncate">{course.title}</span>
      </nav>

      <section className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="relative h-52 md:h-64 overflow-hidden">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-stone-900/10 to-transparent" />
        </div>

        <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Course</p>
            <h1 className="text-3xl font-bold text-stone-900 tracking-tight">{course.title}</h1>
            <p className="text-sm text-stone-500 font-medium">Instructor: {course.instructor}</p>
          </div>

          <div className="min-w-[240px] max-w-[320px] w-full">
            <div className="flex justify-between text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
              <span>Progress</span>
              <span className="text-stone-900">{course.progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
              <div className={`h-full ${course.color}`} style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap gap-3">
          {tabItems.map((tab) => (
            <TabButton
              key={tab.key}
              label={tab.label}
              active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            />
          ))}
        </div>

        {activeTab === "about" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <article className="xl:col-span-2 bg-stone-50 border border-stone-100 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-stone-900">Course Description</h2>
              <p className="text-sm text-stone-600 leading-relaxed">{course.description}</p>

              <div className="pt-2">
                <h3 className="text-sm font-bold text-stone-800 mb-3">Learning Objectives</h3>
                <ul className="space-y-2">
                  {course.objectives.map((objective) => (
                    <li key={objective} className="flex items-start gap-2 text-sm text-stone-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F9A825]" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <aside className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500">Your Instructor</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 font-black flex items-center justify-center">
                  {course.instructorInitials}
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-sm">{course.instructor}</p>
                  <p className="text-xs text-stone-500">{course.instructorRole}</p>
                </div>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Reach out via course forum for clarification on weekly activities and project milestones.
              </p>
            </aside>
          </div>
        )}

        {activeTab === "assignments" && (
          <div className="space-y-4">
            {courseAssignments.length > 0 ? (
              courseAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/assignments/${assignment.id}`)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      router.push(`/assignments/${assignment.id}`);
                    }
                  }}
                  className="group border border-stone-100 rounded-2xl p-5 bg-white hover:bg-amber-100/60 hover:border-amber-200 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-stone-800 group-hover:text-amber-700 transition-colors">{assignment.title}</h3>
                    <p className="text-xs text-stone-500 mt-1">Due: {assignment.due}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${
                        assignment.status === "Submitted"
                          ? "bg-emerald-100 text-emerald-700"
                          : assignment.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {assignment.status}
                    </span>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        router.push(
                          assignment.status === "Submitted"
                            ? `/assignments/${assignment.id}/edit`
                            : `/assignments/${assignment.id}/submit`
                        );
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                        assignment.status === "Submitted"
                          ? "border border-amber-200 text-amber-700 hover:bg-amber-50"
                          : "bg-[#F9A825] text-white hover:bg-[#D97706]"
                      }`}
                    >
                      {assignment.status === "Submitted" ? "Edit Submission" : "Submit"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center bg-stone-50 border border-dashed border-stone-200 rounded-2xl">
                <p className="text-stone-400 font-medium text-sm">No assignments linked to this course yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "lessons" && (
          <div className="space-y-4">
            {course.lessons.map((lesson) => (
              <div
                key={lesson.id}
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/lessons/${lesson.id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    router.push(`/lessons/${lesson.id}`);
                  }
                }}
                className="group border border-stone-100 rounded-2xl p-5 bg-white hover:bg-amber-100/60 hover:border-amber-200 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-stone-400 font-bold mb-1">{lesson.module}</p>
                  <h3 className="font-bold text-stone-800 truncate group-hover:text-amber-700 transition-colors">{lesson.title}</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {lesson.resourceType} • {lesson.duration}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <StatusPill status={lesson.status} />
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      router.push(`/lessons/${lesson.id}`);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold border border-stone-200 text-stone-600 hover:text-amber-700 hover:border-amber-200 hover:bg-amber-50 transition-colors"
                  >
                    {lesson.status === "Completed" ? "Review" : lesson.status === "In Progress" ? "Continue" : "Start"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
