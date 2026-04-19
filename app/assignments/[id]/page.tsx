"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAssignmentStore } from "../../../lib/store";

//Types

type Status = "Pending" | "In Progress" | "Not Started" | "Submitted";

interface AssignmentDetail {
  description: string;
  instructions: string[];
  points: number;
  submissionType: string;
}

//Static detail data

const assignmentDetails: Record<number, AssignmentDetail> = {
  1: {
    description:
      "In this assignment, you will dive deep into React's component architecture by building a fully functional multi-step form using advanced component patterns including compound components, render props, and custom hooks.",
    instructions: [
      "Create a reusable multi-step form component using the compound component pattern.",
      "Implement at least three custom hooks: useFormState, useStepNavigation, and useFormValidation.",
      "Use React Context to share form state across nested components without prop drilling.",
      "Add animated transitions between steps using CSS transitions or Framer Motion.",
      "Write unit tests for each custom hook using React Testing Library.",
      "Document your component API using JSDoc comments and include a usage example in the README.",
    ],
    points: 100,
    submissionType: "ZIP file (source code + README)",
  },
  2: {
    description:
      "Explore the foundational architectures of neural networks by implementing a feedforward network from scratch in Python, then comparing its performance against a modern deep learning framework implementation.",
    instructions: [
      "Implement a feedforward neural network from scratch using only NumPy — no ML libraries for the core logic.",
      "Your network must support configurable hidden layers, activation functions (ReLU, Sigmoid, Tanh), and learning rates.",
      "Train on the MNIST dataset and achieve at least 92% test accuracy.",
      "Re-implement the same architecture using PyTorch or TensorFlow and compare training curves.",
      "Write a 2–3 page report analyzing the performance difference, including loss/accuracy graphs.",
      "Submit a Jupyter notebook with clear markdown explanations for each section.",
    ],
    points: 120,
    submissionType: "Jupyter Notebook (.ipynb) + PDF Report",
  },
  3: {
    description:
      "Design and document a comprehensive design system from first principles. You will establish visual tokens, component specifications, and usage guidelines that could serve as the foundation for a real product.",
    instructions: [
      "Define a complete set of design tokens: color palette (with semantic aliases), typography scale, spacing system, border radii, and shadow levels.",
      "Document at least 10 reusable UI components with variants, states, and accessibility notes.",
      "Create a component library in Figma (or a tool of your choice) and export design specs.",
      "Write a contribution guide explaining how future designers should extend the system.",
      "Include a dark mode specification for each token and component.",
      "Present your system in a 5-minute recorded walkthrough — upload the video link in your submission.",
    ],
    points: 80,
    submissionType: "Figma link + PDF Documentation + Video link",
  },
};

//Shared icons

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const FileIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

//Sub-components

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    Submitted: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "Not Started": "bg-stone-100 text-stone-600",
  };
  return (
    <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>
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
            <h2 className="text-xl font-bold text-stone-900">Submit Assignment</h2>
            <p className="text-sm text-stone-500 mt-0.5">{assignmentTitle}</p>
          </div>
        </div>

        {/* File upload */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-800">Upload File</label>
          <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
            selectedFileName ? "border-amber-200 bg-amber-50" : "border-stone-200 hover:border-amber-200"
          }`}>
            <input
              type="file"
              className="hidden"
              id={`file-upload-panel-${assignmentId}`}
              onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name ?? "")}
            />
            <label htmlFor={`file-upload-panel-${assignmentId}`} className="cursor-pointer flex flex-col items-center">
              <div className="w-12 h-12 bg-amber-50 text-[#F9A825] rounded-2xl flex items-center justify-center mb-4">
                {selectedFileName ? <FileIcon size={24} /> : <UploadIcon />}
              </div>
              <p className="text-sm font-bold text-stone-800 max-w-xs truncate px-4">
                {selectedFileName || "Click to browse or drag & drop"}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                {selectedFileName ? "Click to change file" : "PDF, ZIP, or DOCX (Max 20MB)"}
              </p>
            </label>
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-800">Comment / Description</label>
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
    <div
      className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden"
      style={{ animation: "fadeSlideUp 0.22s ease-out both" }}
    >
      <div className="h-1 bg-gradient-to-r from-[#F9A825] to-[#D97706]" />
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-stone-900">Edit Submission</h2>
            <p className="text-sm text-stone-500 mt-0.5">{assignmentTitle}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onRemove}
              className="px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl border border-red-100 transition-colors"
            >
              Remove
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-xl transition-all"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Current file */}
        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
              <FileIcon />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Current File</p>
              <p className="text-sm font-bold text-stone-800 truncate max-w-xs">{fileName}</p>
            </div>
          </div>
          <label htmlFor={`edit-file-${assignmentId}`} className="text-xs font-bold text-amber-600 hover:text-amber-700 cursor-pointer">
            Change
          </label>
          <input
            type="file"
            id={`edit-file-${assignmentId}`}
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) setFileName(e.target.files[0].name); }}
          />
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-800">Comment / Description</label>
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
            onClick={handleSave}
            disabled={isPending}
            className="flex-1 py-3.5 bg-[#F9A825] text-white font-bold rounded-2xl shadow-lg shadow-amber-100 hover:bg-[#D97706] hover:-translate-y-0.5 disabled:opacity-50 transition-all duration-300 text-sm"
          >
            {isPending ? "Saving…" : "Save Changes"}
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

//Assignment Detail Page

export default function AssignmentDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const { assignments, loading, removeSubmission } = useAssignmentStore();
  const assignment = assignments.find((a) => a.id === id);
  const details = assignmentDetails[id];

  const [activePanel, setActivePanel] = useState<"submit" | "edit" | null>(null);

  const togglePanel = (panel: "submit" | "edit") =>
    setActivePanel((prev) => (prev === panel ? null : panel));

  const handleRemoveSubmission = () => {
    if (confirm("Remove this submission? The status will revert to Pending.")) {
      removeSubmission(id);
      setActivePanel(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-(--breakpoint-2xl) mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-4 bg-stone-200 rounded w-48" />
          <div className="h-10 bg-stone-200 rounded w-96" />
          <div className="h-64 bg-stone-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="p-8 max-w-(--breakpoint-2xl) mx-auto text-center space-y-4 pt-24">
        <p className="text-stone-500 font-medium">Assignment not found.</p>
        <Link href="/assignments" className="text-[#F9A825] font-bold hover:underline">
          ← Back to Assignments
        </Link>
      </div>
    );
  }

  const isSubmitted = assignment.status === "Submitted";

  return (
    <div
      className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8"
      style={{ animation: "fadeSlideUp 0.22s ease-out both" }}
    >
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm">
        <Link
          href="/assignments"
          className="flex items-center space-x-1.5 text-stone-400 hover:text-[#F9A825] font-semibold transition-colors group"
        >
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:-translate-x-0.5 transition-transform"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Assignments</span>
        </Link>
        <span className="text-stone-300">/</span>
        <span className="text-stone-700 font-semibold truncate max-w-xs">{assignment.title}</span>
      </nav>

      {/* Hero header */}
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#F9A825] to-[#D97706]" />
        <div className="p-8 md:p-10 space-y-6">
          {/* Title row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={assignment.status} />
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  {assignment.course}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-stone-900 tracking-tight leading-tight">
                {assignment.title}
              </h1>
            </div>

            {/* Primary CTA */}
            <div className="flex-shrink-0">
              {isSubmitted ? (
                <button
                  onClick={() => togglePanel("edit")}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#F9A825] text-white font-bold rounded-2xl shadow-lg shadow-amber-100 hover:bg-[#D97706] hover:-translate-y-0.5 transition-all duration-200 text-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span>{activePanel === "edit" ? "Close Editor" : "Edit Submission"}</span>
                </button>
              ) : (
                <button
                  onClick={() => togglePanel("submit")}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#F9A825] text-white font-bold rounded-2xl shadow-lg shadow-amber-100 hover:bg-[#D97706] hover:-translate-y-0.5 transition-all duration-200 text-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                  <span>{activePanel === "submit" ? "Close" : "Submit Assignment"}</span>
                </button>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-stone-50">
            {/* Due date */}
            <div className="flex items-center space-x-2 bg-stone-50 border border-stone-100 px-4 py-2 rounded-xl">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F9A825" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-xs font-bold text-stone-600">Due: {assignment.due}</span>
            </div>

            {details && (
              <>
                {/* Points */}
                <div className="flex items-center space-x-2 bg-stone-50 border border-stone-100 px-4 py-2 rounded-xl">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F9A825" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="text-xs font-bold text-stone-600">{details.points} pts</span>
                </div>

                {/* Submission type */}
                <div className="flex items-center space-x-2 bg-stone-50 border border-stone-100 px-4 py-2 rounded-xl">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F9A825" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                  <span className="text-xs font-bold text-stone-600">{details.submissionType}</span>
                </div>

                {/* Course */}
                <div className="flex items-center space-x-2 bg-stone-50 border border-stone-100 px-4 py-2 rounded-xl">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F9A825" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  <span className="text-xs font-bold text-stone-600">{assignment.course}</span>
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
          {details ? (
            <section className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8 space-y-8">
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Description</h2>
                <p className="text-stone-700 leading-relaxed">{details.description}</p>
              </div>

              <div className="border-t border-stone-100" />

              <div className="space-y-5">
                <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Instructions</h2>
                <ol className="space-y-5">
                  {details.instructions.map((step, i) => (
                    <li
                      key={i}
                      className="flex space-x-4"
                      style={{ animation: `fadeSlideUp 0.2s ease-out ${0.05 * i}s both` }}
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-50 text-[#F9A825] text-xs font-black flex items-center justify-center border border-amber-100 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-stone-700 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          ) : (
            <section className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8 space-y-4">
              <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Description</h2>
              <p className="text-stone-700 leading-relaxed">No description available for this assignment.</p>
            </section>
          )}
        </div>

        {/* Right: submission status */}
        <div className="space-y-6">
          {isSubmitted && assignment.submission ? (
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 space-y-4">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Submitted</h2>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100 flex-shrink-0">
                  <FileIcon size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-emerald-800 truncate">{assignment.submission.fileName}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">
                    {new Date(assignment.submission.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {assignment.submission.comment && (
                <p className="text-sm text-emerald-700 bg-white/70 rounded-2xl p-4 border border-emerald-100 leading-relaxed">
                  {assignment.submission.comment}
                </p>
              )}
              <button
                onClick={() => togglePanel("edit")}
                className="block w-full text-center py-3 bg-white border border-emerald-200 text-emerald-700 font-bold rounded-2xl hover:bg-emerald-50 transition-colors text-sm"
              >
                {activePanel === "edit" ? "Close Editor" : "Edit Submission"}
              </button>
            </div>
          ) : (
            <div className="bg-white border border-stone-100 rounded-3xl p-6 space-y-3 shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Not Yet Submitted</h2>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed">
                Use the <span className="font-semibold text-stone-700">Submit Assignment</span> button above to upload your work before the due date.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}