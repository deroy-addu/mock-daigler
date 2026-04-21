"use client";

import React, { useActionState, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAssignmentStore } from "../../../../lib/store";
import Link from "next/link";

export default function SubmitAssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const { assignments, loading, submitAssignment } = useAssignmentStore();
  const assignment = assignments.find((a) => a.id === id);

  const [selectedFiles, setSelectedFiles] = useState<{ name: string; type: string }[]>([]);

  // Redirect if already submitted
  useEffect(() => {
    if (!loading && assignment && assignment.status === "Submitted") {
      router.replace(`/assignments/${id}/edit`);
    }
  }, [loading, assignment, id, router]);

  async function handleFormSubmit(prevState: any, formData: FormData) {
    const comment = formData.get("comment") as string;

    if (selectedFiles.length === 0) {
      return { error: "Please select at least one file." };
    }

    submitAssignment(id, {
      files: selectedFiles,
      comment: comment,
    });

    // Return to the assignment detail page after submission
    router.push(`/assignments/${id}`);
    return { success: true };
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, null);

  if (loading) return <div className="p-8 text-stone-500">Loading...</div>;
  if (!assignment)
    return <div className="p-8 text-red-500">Assignment not found.</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-stone-500">
        <Link
          href="/assignments"
          className="hover:underline"
        >
          Assignments
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/assignments/${id}`}
          className="hover:underline"
        >
          {assignment.title}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-stone-900 font-medium">Submit</span>
      </nav>

      <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
            {assignment.title}
          </h2>
          <p className="text-stone-500 mt-1">{assignment.course}</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-stone-400 uppercase tracking-wider">
            Status:
          </span>
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              assignment.status === "Submitted"
                ? "bg-emerald-100 text-emerald-700"
                  : assignment.status === "On Progress"
                  ? "bg-blue-100 text-blue-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {assignment.status}
          </span>
        </div>

        <form
          action={formAction}
          className="space-y-6"
        >
          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-800">
              Upload File
            </label>
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                selectedFiles.length > 0
                  ? "border-amber-200 bg-amber-50"
                  : "border-stone-100 hover:border-amber-200"
              }`}
            >
              <input
                type="file"
                name="file"
                className="hidden"
                id="file-upload"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    setSelectedFiles(Array.from(files).map(f => ({ name: f.name, type: f.type || "File" })));
                  }
                }}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-amber-50 text-[#F9A825] rounded-2xl flex items-center justify-center mb-4">
                    {selectedFiles.length > 0 ? (
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
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    ) : (
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
                    )}
                  </div>
                  <p className="text-sm font-bold text-stone-800 max-w-xs truncate px-4">
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} file(s) selected`
                      : "Click to browse or drag & drop"}
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    {selectedFiles.length > 0
                      ? "Click to change selection"
                      : "PDF, ZIP, or DOCX (Max 20MB)"}
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Comment Area */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-800">
              Comment / Description
            </label>
            <textarea
              name="comment"
              rows={4}
              placeholder="Add any notes about your submission..."
              className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-[#F9A825] transition-all text-sm resize-none"
            />
          </div>

          {state?.error && (
            <p className="text-red-500 text-sm font-medium">{state.error}</p>
          )}

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={selectedFiles.length === 0 || isPending}
              className="flex-1 py-4 bg-[#F9A825] text-white font-bold rounded-2xl shadow-lg shadow-amber-100 hover:bg-[#D97706] hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none transition-all duration-300"
            >
              {isPending ? "Submitting..." : "Submit Assignment"}
            </button>
            {/* Cancel returns to the assignment detail page */}
            <Link
              href={`/assignments/${id}`}
              className="px-8 py-4 bg-stone-100 text-stone-600 font-bold rounded-2xl hover:bg-stone-200 transition-all text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
