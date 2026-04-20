"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useAssignmentStore } from "@/lib/store";
import { initialCourses } from "@/lib/data";

// --- Mock Data ---

const courses = initialCourses;

const deadlines = [
  { id: 1, title: "Final Project Submission", course: "Advanced Web Dev", date: "Apr 12, 2026", priority: "High" },
  { id: 2, title: "Quiz 4: Neural Networks", course: "Machine Learning", date: "Apr 15, 2026", priority: "Medium" },
  { id: 3, title: "Design Critique", course: "UI/UX Design", date: "Apr 18, 2026", priority: "Low" },
];

const announcements = [
  { id: 1, title: "Easter Break Schedule", date: "2 hours ago", content: "The university will be closed from Friday to Monday..." },
  { id: 2, title: "New Library Resources", date: "1 day ago", content: "Access to IEEE Xplore is now available for all students..." },
];

export default function DashboardPage() {
  const { activities, loading } = useAssignmentStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");

  const processedCourses = useMemo(() => {
    return [...courses]
      .filter((course) => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "title-desc") return b.title.localeCompare(a.title);
        if (sortBy === "progress") return b.progress - a.progress;
        return 0;
      });
  }, [searchQuery, sortBy]);

  if (loading) return <div className="p-8 text-stone-500">Loading Dashboard...</div>;

  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Welcome back, Lebron!</h2>
        <p className="text-stone-500 mt-1">Here&apos;s what&apos;s happening with your courses today.</p>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Course Overview & Widgets */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Section: Course Overview (Carousel Placeholder) */}
          <section>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-bold text-stone-800 whitespace-nowrap">Course Overview</h3>
              
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[200px]">
                  <span className="absolute inset-y-0 left-3 flex items-center text-stone-400">
                    <SearchIcon />
                  </span>
                  <input 
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-[#F9A825] transition-all"
                  />
                </div>

                {/* Sort Dropdown */}
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-100 transition-all cursor-pointer"
                >
                  <option value="title">Sort: Course (A-Z)</option>
                  <option value="title-desc">Sort: Course (Z-A)</option>
                  <option value="progress">Sort: Progress</option>
                </select>

                <button className="px-4 py-2 bg-[#F9A825] text-white text-xs font-bold rounded-xl hover:bg-[#D97706] transition-all shadow-sm shadow-amber-100 whitespace-nowrap">
                  View All
                </button>
              </div>
            </div>
            
            <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
              {processedCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/course/${course.id}`}
                  className="min-w-[320px] bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer overflow-hidden"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-stone-700 shadow-sm">
                        {course.instructor}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="font-bold text-stone-800 text-lg leading-tight mb-4 group-hover:text-[#F9A825] transition-colors">
                      {course.title}
                    </h4>

                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-xl border border-amber-100 bg-amber-50 text-[11px] font-bold text-amber-700 uppercase tracking-wide">
                        View Course
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-stone-400 font-medium tracking-wide">PROGRESS</span>
                        <span className="text-stone-900 font-bold">{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${course.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {processedCourses.length === 0 && (
                <div className="w-full py-12 text-center bg-stone-50 rounded-3xl border border-dashed border-stone-200">
                  <p className="text-stone-400 font-medium">No courses found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </section>

          {/* Bottom Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Announcements Widget */}
            <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-stone-800">Announcements</h3>
                <span className="bg-amber-50 text-[#F9A825] p-2 rounded-xl">
                  <AnnouncementIcon />
                </span>
              </div>
              <div className="space-y-4">
                {announcements.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold text-stone-800 group-hover:text-[#F9A825] transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-semibold text-stone-400 uppercase">{item.date}</span>
                    </div>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {item.content}
                    </p>
                    <div className="mt-3 border-b border-stone-50 group-last:border-none" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Widget */}
            <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-stone-800">Recent Activity</h3>
                <span className="bg-amber-50 text-[#F9A825] p-2 rounded-xl">
                  <ActivityIcon />
                </span>
              </div>
              <div className="space-y-6">
                {activities.length > 0 ? activities.map((activity) => (
                  <div key={activity.id} className="flex space-x-4">
                    <div className="mt-1">
                      <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400">
                        {activity.type === "grade" ? <GradeIcon /> : 
                         activity.type === "submission" ? <UploadIcon /> : <UploadIcon />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-stone-800">{activity.title}</h4>
                        <span className="text-[10px] font-semibold text-stone-400">{activity.time}</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{activity.detail}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-stone-400 text-center py-4">No recent activity.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm sticky top-28">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-stone-800">Deadlines</h3>
              <div className="w-10 h-10 bg-amber-50 text-[#F9A825] rounded-2xl flex items-center justify-center">
                <CalendarIcon />
              </div>
            </div>
            
            <div className="space-y-6">
              {deadlines.map((deadline) => (
                <div key={deadline.id} className="flex group cursor-pointer items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${
                      deadline.priority === 'High' ? 'bg-red-500' : 
                      deadline.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <div className="w-0.5 flex-1 bg-stone-100 mt-2 group-last:hidden" />
                  </div>
                  <div className="flex-1 pb-6 group-last:pb-0 border-b border-stone-50 group-last:border-none">
                    <h4 className="text-sm font-bold text-stone-800 group-hover:text-[#F9A825] transition-colors">
                      {deadline.title}
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 font-medium">{deadline.course}</p>
                    <div className="flex items-center mt-3 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      <ClockIcon />
                      <span className="ml-1.5">{deadline.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-4 bg-[#F9A825] text-white font-bold rounded-2xl shadow-lg shadow-amber-100 hover:bg-[#D97706] hover:-translate-y-0.5 transition-all duration-300">
              View All Deadlines
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

// --- Icons ---

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const AnnouncementIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8Z"/><path d="M22 12h-4"/><path d="M18 10h4"/><path d="M18 14h4"/></svg>
);

const ActivityIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);

const GradeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><rect width="20" height="14" x="2" y="5" rx="2"/></svg>
);

const UploadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
