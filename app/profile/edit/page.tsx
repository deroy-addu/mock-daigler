"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type CurrentUser = {
  fullName?: string;
  email?: string;
  studentId?: string;
  createdAt?: string;
  loggedIn?: boolean;
};

export default function EditProfilePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("Guest");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser: CurrentUser | null = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (storedUser?.fullName) {
      setFullName(storedUser.fullName);
    }
  }, []);

  const onSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setError("Name cannot be empty.");
      return;
    }

    const storedUser: CurrentUser | null = JSON.parse(localStorage.getItem("currentUser") || "null");
    const updatedUser: CurrentUser = {
      ...(storedUser || {}),
      fullName: trimmedName,
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    window.dispatchEvent(new CustomEvent("userUpdated", { detail: updatedUser }));
    router.push("/profile");
  };

  return (
    <div className="p-6 lg:p-10 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-900">Edit Profile</h1>
        <Link
          href="/profile"
          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium rounded-md transition-colors"
        >
          Cancel
        </Link>
      </div>

      <form onSubmit={onSave} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-5">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-semibold text-stone-800">
            Full Name
          </label>
          <input
            id="fullName"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (error) setError("");
            }}
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="Enter your full name"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-md transition-colors"
          >
            Save Changes
          </button>
          <Link
            href="/profile"
            className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-md transition-colors"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
