"use client";

import ActivitySVG from "@/assets/activity.svg";
import AnnouncementSVG from "@/assets/announcement.svg";
import CalendarSVG from "@/assets/calendar.svg";
import ClockSVG from "@/assets/clock.svg";
import GradeSVG from "@/assets/grade.svg";
import SearchSVG from "@/assets/search.svg";
import UploadSVG from "@/assets/upload.svg";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect  } from "react";
import { useAssignmentStore } from "@/lib/store";
import { AnnouncementsIcon } from "@/components/Icons";
import { ActivityIcon } from "@/components/Icons";
import { DeadlineIcon, ClockIcon as DueDateIcon } from "@/components/Icons";
import { initialCourses as courses } from "@/lib/data";

function DashboardCourseItem({ course }: { course: any }) {
  return (
    <div
      key={course.id}
      className="min-w-[320px] bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer overflow-hidden"
    >
      <div className="h-40 overflow-hidden relative">
        <Image
          src={course.thumbnail}
          alt={course.title}
          width={1024}
          height={1024}
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

        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-stone-400 font-medium tracking-wide">
              PROGRESS
            </span>
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
    </div>
  );
}

function DashboardCourseOverview({ courses }: { courses: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");

  const processedCourses = useMemo(() => {
    return Array.isArray(courses) ? [...courses]
      .filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "title":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          case "progress":
            return b.progress - a.progress;
          default:
            return 0;
        }
      }) : [];
  }, [courses, searchQuery, sortBy]);

  return (
    <section>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold text-stone-800 whitespace-nowrap">
          Course Overview
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-50">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <Image
                src={SearchSVG}
                alt="Search Icon"
                width={15}
              />
            </span>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-[#F9A825] transition-all"
            />
          </div>
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
          <DashboardCourseItem
            key={course.id}
            course={course}
          />
        ))}
        {processedCourses.length === 0 && (
          <div className="w-full py-12 text-center bg-stone-50 rounded-3xl border border-dashed border-stone-200">
            <p className="text-stone-400 font-medium">
              No courses found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function DashboardAnnouncementItem({
  announcement,
}: {
  announcement: any;
}) {
  return (
    <Link
      href={`/announcements/post?id=${announcement.id}`}
      className="block group cursor-pointer"
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className="text-sm font-bold text-stone-800 group-hover:text-amber-500 transition-colors">
          {announcement.title}
        </h4>
        <span className="text-[10px] font-semibold text-stone-400 uppercase">
          {announcement.date}
        </span>
      </div>
      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
        {announcement.content}
      </p>
      <div className="mt-3 border-b border-stone-50 group-last:border-none" />
    </Link>
  );
}

function DashboardAnnouncementWidget({ announcements }: { announcements: any[] }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-stone-800">Announcements</h3>
        <span className="bg-stone-50 p-2 rounded-xl border border-stone-100">
          <AnnouncementsIcon size={20} />
        </span>
      </div>
      <div className="space-y-4">
        {announcements.map((item: any) => (
          <DashboardAnnouncementItem key={item.id} announcement={item} />
        ))}
      </div>
    </div>
  );
}

function DashboardRecentActivityItem({ activity }: { activity: any }) {
  return (
    <div
      key={activity.id}
      className="flex space-x-4"
    >
      <div className="mt-1">
        <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400">
          <Image
            src={activity.type === "grade" ? GradeSVG : UploadSVG}
            alt="Activity Icon"
            width={20}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold text-stone-800">{activity.title}</h4>
          <span className="text-[10px] font-semibold text-stone-400">
            {activity.time}
          </span>
        </div>
        <p className="text-xs text-stone-500 mt-0.5">{activity.detail}</p>
      </div>
    </div>
  );
}

function DashboardRecentActivityWidget({ activities }: { activities: any[] }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-stone-800">Recent Activity</h3>
        <span className="bg-stone-50 p-2 rounded-xl border border-stone-100">
          <ActivityIcon size={20} />
        </span>
      </div>
      
      <div className="space-y-6">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="flex space-x-4">
              <div className="mt-1">
                <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center">
                  <ActivityIcon size={16} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-stone-800">{activity.title}</h4>
                  <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                    {activity.time}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">{activity.detail}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-stone-400 text-center py-4 italic">No recent activity.</p>
        )}
      </div>
    </div>
  );
}

function DashboardDeadlineItem({ assignments }: { assignments: any[] }) {
  // Map store assignments to a structure compatible with the Deadline display
  const deadlinesFromAssignments = useMemo(() => {
    if (!Array.isArray(assignments)) return [];
    return assignments.map(assignment => {
      let priority: "High" | "Medium" | "Low";
      switch (assignment.status) {
        case "Pending":
          priority = "High";
          break;
        case "In Progress":
          priority = "Medium";
          break;
        case "Not Started":
        case "Submitted": // Submitted assignments can be considered low priority for deadlines overview
        default:
          priority = "Low";
          break;
      }
      return {
        id: assignment.id,
        title: assignment.title,
        course: assignment.course,
        date: assignment.due, // Use 'due' from assignments as 'date' for deadlines
        priority: priority,
      };
    });
  }, [assignments]);

  return (
    <section className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm sticky top-28">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-stone-800">Deadlines</h3>
        <div className="w-10 h-10 bg-stone-50 rounded-2xl flex items-center justify-center border border-stone-100">
          <DeadlineIcon size={24} />
        </div>
      </div>

      <div className="space-y-6">
        {deadlinesFromAssignments.map((deadline) => (
          <Link
            key={deadline.id}
            href={`/assignments/${deadline.id}`}
            className="flex group cursor-pointer items-start space-x-4 transition-colors hover:bg-stone-50 rounded-xl -mx-4 px-4 py-2"
          >
            <div className="flex flex-col items-center">
              {/* Priority indicator */}
              <div
                className={`w-3 h-3 rounded-full mt-1.5 ${
                  deadline.priority === "High"
                    ? "bg-red-500"
                    : deadline.priority === "Medium"
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
              />
              <div className="w-0.5 flex-1 bg-stone-100 mt-2 group-last:hidden" />
            </div>
            <div className="flex-1 pb-4 group-last:pb-0 border-b border-stone-50 group-last:border-none">
              <h4 className="text-sm font-bold text-stone-800 group-hover:text-amber-500 transition-colors">
                {deadline.title}
              </h4>
              <p className="text-xs text-stone-400 mt-1 font-medium">
                {deadline.course}
              </p>
              <div className="flex items-center mt-2 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                <DueDateIcon size={14} /> {/* Using a more appropriate icon for due dates */}
                <span className="ml-1.5">{deadline.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link 
        href="/assignments?sort=due"
        className="block w-full mt-8 py-4 bg-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-stone-100 hover:bg-amber-600 hover:-translate-y-0.5 transition-all duration-300 text-center"
      >
        View All Deadlines
      </Link>
    </section>
  );
}

export default function DashboardPage() {
  const [firstName, setFirstName] = useState("Student");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (user?.fullName) {
      setFirstName(user.fullName.split(" ")[0]);
    }
  }, []);
  const { assignments, activities, courses, announcements, loading } = useAssignmentStore();

  if (loading) {
    return <div className="p-8 text-stone-500">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
          Welcome back, {firstName}!
        </h2>
        <p className="text-stone-500 mt-1">
          Here&apos;s what&apos;s happening with your courses today.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        <div className="xl:col-span-2 space-y-8">
          <DashboardCourseOverview courses={courses} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DashboardAnnouncementWidget announcements={announcements} />
            <DashboardRecentActivityWidget activities={activities} />
          </div>
        </div>

        <aside className="xl:sticky xl:top-8 h-fit">
          <DashboardDeadlineItem assignments={assignments} />
        </aside>

      </div>
    </div>
  );
}