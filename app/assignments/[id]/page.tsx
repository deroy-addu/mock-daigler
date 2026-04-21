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
    instructions: "Read and follow the given instructions. Build a complete multi-step React workflow with clear component boundaries and submit your source bundle before the due date.",
    checklist: [
      "Use compound components for reusable form structure.",
      "Implement form state with custom hooks.",
      "Document architecture choices in your README.",
    ],
  },
  2: {
    instructions: "Implement and compare your neural-network training pipeline. Include your observations on convergence behavior, model accuracy, and practical trade-offs.",
    checklist: [
      "Train baseline and framework versions.",
      "Include metrics and comparative analysis.",
      "Attach notebook and short PDF report.",
    ],
  },
  3: {
    instructions: "Define a complete design system baseline including tokens, components, and contribution standards for future contributors.",
    checklist: [
      "Provide semantic tokens and aliases.",
      "Document component states and accessibility.",
      "Attach handoff assets and walkthrough.",
    ],
  },
};

function FileRow({ fileName, fileType }: { fileName: string; fileType: string }) {
import { useParams } from "next/navigation";
import { useAssignmentStore } from "../../../lib/store";
import type { Assignment } from "../../../lib/data";

//Shared icons

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const FileIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const UploadIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line
      x1="12"
      x2="12"
      y1="3"
      y2="15"
    />
  </svg>
);

//Sub-components

function StatusBadge({ status }: { status: Assignment["status"] }) {
  const styles: Record<Assignment["status"], string> = {
    Submitted: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "Not Started": "bg-stone-100 text-stone-600",
  };
  return (
    <span
      className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function SubmissionPanel({
  assignmentId,
  assignmentTitle,
  onClose,
}: {
  assignmentId: number;
  assignmentTitle: string;
  onClose: () => void;
}) {
  const { submitAssignment } = useAssignmentStore();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [comment, setComment] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = () => {
    if (!selectedFileName) return;
    setIsPending(true);
    submitAssignment(assignmentId, { fileName: selectedFileName, comment });
    setTimeout(() => {
      setIsPending(false);
      onClose();
    }, 300);
  };

  return (
    <div
      className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden"
      style={{ animation: "fadeSlideUp 0.22s ease-out both" }}
    >
      <div className="h-1 bg-gradient-to-r from-[#F9A825] to-[#D97706]" />
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Submit Assignment
            </h2>
            <p className="text-sm text-stone-500 mt-0.5">{assignmentTitle}</p>
          </div>
        </div>

        {/* File upload */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-800">
            Upload File
          </label>
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
              selectedFileName
                ? "border-amber-200 bg-amber-50"
                : "border-stone-200 hover:border-amber-200"
            }`}
          >
            <input
              type="file"
              className="hidden"
              id={`file-upload-panel-${assignmentId}`}
              onChange={(e) =>
                setSelectedFileName(e.target.files?.[0]?.name ?? "")
              }
            />
            <label
              htmlFor={`file-upload-panel-${assignmentId}`}
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-amber-50 text-[#F9A825] rounded-2xl flex items-center justify-center mb-4">
                {selectedFileName ? <FileIcon size={24} /> : <UploadIcon />}
              </div>
              <p className="text-sm font-bold text-stone-800 max-w-xs truncate px-4">
                {selectedFileName || "Click to browse or drag & drop"}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                {selectedFileName
                  ? "Click to change file"
                  : "PDF, ZIP, or DOCX (Max 20MB)"}
              </p>
            </label>
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-800">
            Comment / Description
          </label>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add any notes about your submission..."
            className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-[#F9A825] transition-all text-sm resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSubmit}
            disabled={!selectedFileName || isPending}
            className="flex-1 py-3.5 bg-[#F9A825] text-white font-bold rounded-2xl shadow-lg shadow-amber-100 hover:bg-[#D97706] hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none transition-all duration-300 text-sm"
          >
            {isPending ? "Submitting…" : "Submit Assignment"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3.5 bg-stone-100 text-stone-600 font-bold rounded-2xl hover:bg-stone-200 transition-all text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function EditPanel({
  assignmentId,
  assignmentTitle,
  currentFileName,
  currentComment,
  onClose,
  onRemove,
}: {
  assignmentId: number;
  assignmentTitle: string;
  currentFileName: string;
  currentComment: string;
  onClose: () => void;
  onRemove: () => void;
}) {
  const { submitAssignment } = useAssignmentStore();
  const [fileName, setFileName] = useState(currentFileName);
  const [comment, setComment] = useState(currentComment);
  const [isPending, setIsPending] = useState(false);

  const handleSave = () => {
    setIsPending(true);
    submitAssignment(assignmentId, { fileName, comment });
    setTimeout(() => {
      setIsPending(false);
      onClose();
    }, 300);
  };

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
  const { assignments, loading, removeSubmission } = useAssignmentStore();
  const assignment = assignments.find((a) => a.id === id);

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
              <p className="text-sm text-stone-700 leading-relaxed">{detail?.instructions || "Follow all assignment guidelines."}</p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 space-y-4 min-h-[280px]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">Class Comments</h3>
              <div className="flex items-center gap-2">
                <input
                  value={classComment}
                  onChange={(e) => setClassComment(e.target.value)}
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
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-xs font-bold text-stone-600">
                Due: {assignment.due}
              </span>
            </div>

            {assignment.instructions && (
              <>
                {/* Points */}
                <div className="flex items-center space-x-2 bg-stone-50 border border-stone-100 px-4 py-2 rounded-xl">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F9A825"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="text-xs font-bold text-stone-600">
                    {assignment.points} pts
                  </span>
                </div>

                {/* Submission type */}
                <div className="flex items-center space-x-2 bg-stone-50 border border-stone-100 px-4 py-2 rounded-xl">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F9A825"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line
                      x1="12"
                      x2="12"
                      y1="3"
                      y2="15"
                    />
                  </svg>
                  <span className="text-xs font-bold text-stone-600">
                    {assignment.submissionType}
                  </span>
                </div>

                {/* Course */}
                <div className="flex items-center space-x-2 bg-stone-50 border border-stone-100 px-4 py-2 rounded-xl">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F9A825"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="4"
                      rx="2"
                    />
                    <line
                      x1="16"
                      x2="16"
                      y1="2"
                      y2="6"
                    />
                    <line
                      x1="8"
                      x2="8"
                      y1="2"
                      y2="6"
                    />
                    <line
                      x1="3"
                      x2="21"
                      y1="10"
                      y2="10"
                    />
                  </svg>
                  <span className="text-xs font-bold text-stone-600">
                    {assignment.course}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Inline panels */}
      {activePanel === "submit" && (
        <SubmissionPanel
          assignmentId={id}
          assignmentTitle={assignment.title}
          onClose={() => setActivePanel(null)}
        />
      )}
      {activePanel === "edit" && assignment.submission && (
        <EditPanel
          assignmentId={id}
          assignmentTitle={assignment.title}
          currentFileName={assignment.submission.fileName}
          currentComment={assignment.submission.comment}
          onClose={() => setActivePanel(null)}
          onRemove={handleRemoveSubmission}
        />
      )}

      {/* Body grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left: description & instructions */}
        <div className="xl:col-span-2">
          {assignment.instructions ? (
            <section className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8 space-y-8">
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                  Description
                </h2>
                <p className="text-stone-700 leading-relaxed">
                  {assignment.description}
                </p>
              </div>

              <div className="border-t border-stone-100" />

              <div className="space-y-5">
                <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                  Instructions
                </h2>
                <ol className="space-y-5">
                  {assignment.instructions.map((step: string, i: number) => (
                    <li
                      key={i}
                      className="flex space-x-4"
                      style={{
                        animation: `fadeSlideUp 0.2s ease-out ${0.05 * i}s both`,
                      }}
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-50 text-[#F9A825] text-xs font-black flex items-center justify-center border border-amber-100 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-stone-700 leading-relaxed">{step}</p>
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
                onChange={(e) => setPrivateComment(e.target.value)}
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