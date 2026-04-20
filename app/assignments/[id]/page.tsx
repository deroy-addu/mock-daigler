"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { initialCourses } from "@/lib/data";
import { useAssignmentStore } from "@/lib/store";

interface AssignmentDetail {
  instructions: string;
  checklist: string[];
}

const assignmentDetails: Record<number, AssignmentDetail> = {
  1: {
    instructions:
      "Read and follow the given instructions. Build a complete multi-step React workflow with clear component boundaries and submit your source bundle before the due date.",
    checklist: [
      "Use compound components for reusable form structure.",
      "Implement form state with custom hooks.",
      "Document architecture choices in your README.",
    ],
  },
  2: {
    instructions:
      "Implement and compare your neural-network training pipeline. Include your observations on convergence behavior, model accuracy, and practical trade-offs.",
    checklist: [
      "Train baseline and framework versions.",
      "Include metrics and comparative analysis.",
      "Attach notebook and short PDF report.",
    ],
  },
  3: {
    instructions:
      "Define a complete design system baseline including tokens, components, and contribution standards for future contributors.",
    checklist: [
      "Provide semantic tokens and aliases.",
      "Document component states and accessibility.",
      "Attach handoff assets and walkthrough.",
    ],
  },
};

function FileRow({ fileName, fileType }: { fileName: string; fileType: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2.5">
      <div className="flex items-center gap-2 min-w-0">
        <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold text-stone-800 truncate">{fileName}</p>
          <p className="text-[10px] text-stone-400 uppercase tracking-wider">{fileType}</p>
        </div>
      </div>
      <button className="text-stone-300 hover:text-stone-500 transition-colors" aria-label="Remove file">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>
  );
}

export default function AssignmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [classComment, setClassComment] = useState("");
  const [privateComment, setPrivateComment] = useState("");

  const { assignments, loading } = useAssignmentStore();
  const assignment = assignments.find((item) => item.id === id);

  const course = useMemo(() => {
    if (!assignment) return undefined;
    return initialCourses.find((item) => item.shortTitle === assignment.course || item.title === assignment.course);
  }, [assignment]);

  const detail = assignmentDetails[id];

  if (loading) {
    return (
      <div className="p-8 max-w-(--breakpoint-2xl) mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-stone-200 rounded w-72" />
          <div className="h-96 bg-stone-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="p-8 max-w-(--breakpoint-2xl) mx-auto text-center pt-24 space-y-4">
        <p className="text-stone-500 font-medium">Assignment not found.</p>
        <Link href="/assignments" className="text-[#F9A825] font-bold hover:underline">
          Back to Assignments
        </Link>
      </div>
    );
  }

  const yourWorkFiles = assignment.submission
    ? [{ name: assignment.submission.fileName, type: "Submitted File" }]
    : [
        { name: `${assignment.title.replace(/\s+/g, "-").toLowerCase()}.pdf`, type: "Draft" },
        { name: "supporting-notes.docx", type: "Attachment" },
      ];

  const rightActionHref = assignment.status === "Submitted" ? `/assignments/${assignment.id}/edit` : `/assignments/${assignment.id}/submit`;
  const rightActionLabel = assignment.status === "Submitted" ? "Resubmit" : "Submit";

  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-6">
      <nav className="text-sm text-stone-500">
        <Link href="/assignments" className="hover:text-[#F9A825] transition-colors font-medium">Assignments</Link>
        <span className="mx-2">/</span>
        <span className="text-stone-900 font-semibold">{assignment.title}</span>
      </nav>

      <section className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-0">
          <div className="p-6 md:p-8 border-b xl:border-b-0 xl:border-r border-stone-100 space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight uppercase">{assignment.title}</h1>
              <p className="text-xs text-stone-500 font-medium">
                {course?.instructor || "Course Instructor"} • Due {assignment.due}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
              <h2 className="text-sm font-black text-amber-700 uppercase tracking-wider mb-2">Instructions</h2>
              <p className="text-sm text-stone-700 leading-relaxed">{detail?.instructions || "Follow all assignment guidelines and upload your completed work."}</p>
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

              {detail?.checklist && (
                <ul className="space-y-2 pt-2">
                  {detail.checklist.map((item) => (
                    <li key={item} className="text-xs text-stone-600 flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <aside className="p-6 bg-stone-50/50 space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">Your Work</h3>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${assignment.status === "Submitted" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {assignment.status === "Submitted" ? "Submitted" : "Pending"}
                </span>
              </div>

              <div className="space-y-2">
                {yourWorkFiles.map((file) => (
                  <FileRow key={file.name} fileName={file.name} fileType={file.type} />
                ))}
              </div>

              <button className="w-full py-2 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold hover:bg-amber-50 transition-colors">
                + Add or Create
              </button>

              <button
                onClick={() => router.push(rightActionHref)}
                className="w-full py-2.5 rounded-xl bg-[#F9A825] text-white text-xs font-bold hover:bg-[#D97706] transition-colors"
              >
                {rightActionLabel}
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
