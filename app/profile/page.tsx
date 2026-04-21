"use client";

import React, { useEffect, useState } from "react";

const courses = [
  {
    id: 1,
    title: "Advanced Web Development",
    instructor: "Dr. Sarah Miller",
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    instructor: "Prof. Alan Turing",
  },
  {
    id: 3,
    title: "UI/UX Design Systems",
    instructor: "Jane Cooper",
  },
];

export default function ProfilePage() {
  const [user, setUser] = useState({
    fullName: "Guest",
    email: "guest@example.com",
    studentId: "230612",
    createdAt: "Apr 1, 2026, 10:00:00 AM",
  });
  const [lastLogin, setLastLogin] = useState<string>("Never");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (storedUser) {
      setUser({
        fullName: storedUser.fullName || "Guest",
        email: storedUser.email || "guest@example.com",
        studentId: storedUser.studentId || "230612",
        createdAt: storedUser.createdAt || "Apr 1, 2026, 10:00:00 AM",
      });
    }

    const storedHistory = JSON.parse(localStorage.getItem("sessionHistory") || "[]");
    if (storedHistory.length > 0) {
      setLastLogin(storedHistory[0].timestamp);
    }
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-8 rounded-xl border border-stone-200 shadow-sm mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-amber-100 border-2 border-amber-200 rounded-lg flex items-center justify-center text-2xl font-bold text-amber-700">
            {getInitials(user.fullName)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-stone-900">
              {user.fullName}
            </h1>
            <p className="text-stone-400 font-medium">Student ID: {user.studentId}</p>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 md:mt-0 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium rounded-md transition-colors"
        >
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-8">
          {/* User Details */}
          <section className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-stone-900">User details</h2>
              <button className="text-amber-600 text-sm hover:underline">
                Edit profile
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-stone-900">Email address</p>
                <p className="text-amber-600">{user.email}</p>
              </div>
              <div>
                <p className="font-semibold text-stone-900">Student ID</p>
                <p className="text-stone-600">{user.studentId}</p>
              </div>
            </div>
          </section>

          {/* Privacy and Policies */}
          <section className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h2 className="font-bold text-stone-900 mb-4">Privacy and policies</h2>
            <p className="text-amber-600 text-sm hover:underline cursor-pointer">
              Data Retention Summary
            </p>
          </section>
        </div>

        <div className="space-y-8">
          {/* Course Details */}
          <section className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h2 className="font-bold text-stone-900 mb-4">Course details</h2>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-stone-900">Course profiles</p>
              {courses.map((course, i) => (
                <p
                  key={i}
                  className="text-sm text-amber-600 hover:underline cursor-pointer"
                >
                  {course.title} - {course.instructor}
                </p>
              ))}
            </div>
          </section>

          {/* Miscellaneous */}
          <section className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h2 className="font-bold text-stone-900 mb-4">Miscellaneous</h2>
            <div className="space-y-2 text-sm text-amber-600">
              <p className="hover:underline cursor-pointer">Blog entries</p>
              <p className="hover:underline cursor-pointer">Forum posts</p>
              <p className="hover:underline cursor-pointer">Learning plans</p>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Login Activity */}
          <section className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h2 className="font-bold text-stone-900 mb-4">Login activity</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-stone-800">Account created</p>
                <p className="text-stone-500 font-light text-xs">
                  {user.createdAt}
                </p>
              </div>
              <div>
                <p className="font-semibold text-stone-800">Last login</p>
                <p className="text-stone-500 font-light text-xs">
                  {lastLogin}
                </p>
              </div>
            </div>
          </section>

          {/* Mobile App */}
          <section className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center text-center">
            <h2 className="font-bold text-stone-900 mb-4 self-start">Mobile app</h2>
            <div className="bg-stone-100 p-4 rounded-lg mb-4">
              <div className="w-32 h-32 bg-white border border-stone-300 flex items-center justify-center italic text-stone-400 text-xs text-wrap px-4">
                QR Code for {user.fullName}
              </div>
            </div>
            <p className="text-xs text-stone-500 mb-2">
              Scan the QR code with your mobile app to login.
            </p>
            <p className="text-xs text-amber-600 hover:underline cursor-pointer">
              Download the mobile app
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
