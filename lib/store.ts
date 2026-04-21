"use client";

import { useEffect, useState } from "react";
import {
  initialAssignments,
  initialActivities,
  initialCourses,
  initialAnnouncements,
  type Assignment,
  type Activity,
  type Course,
  type Announcement,
} from "./data";

export function useAssignmentStore() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAssignments = localStorage.getItem("assignments");
    const storedActivities = localStorage.getItem("activities");
    const storedCourses = localStorage.getItem("courses");
    const storedAnnouncements = localStorage.getItem("announcements");

    if (storedAssignments) {
      let parsedStoredAssignments: Assignment[] = JSON.parse(storedAssignments);
      // If the stored data is missing the new 'instructions' field, reset to initial
      const isOldData = parsedStoredAssignments.length > 0 && !parsedStoredAssignments[0].instructions;
      if (isOldData) {
        setAssignments(initialAssignments);
        localStorage.setItem("assignments", JSON.stringify(initialAssignments));
      } else {
        const initialAssignmentsString = JSON.stringify(initialAssignments);

        // Create a map of stored assignments for efficient lookup
        const storedMap = new Map<number, Assignment>();
        parsedStoredAssignments.forEach(a => storedMap.set(a.id, a));

        // Merge initial assignments with stored assignments, prioritizing stored data for user-modified fields
        const mergedAssignments: Assignment[] = initialAssignments.map(initial => {
          const stored = storedMap.get(initial.id);
          const merged = stored ? { ...initial, ...stored } : initial; // Preserve user changes (status, submission)

          // Migration: Normalize statuses to the new allowed set
          if (merged.status === "Not Started") merged.status = "Pending";
          if (merged.status === "In Progress") merged.status = "On Progress";

          return merged;
        });

        // Only update if there's an actual difference to avoid unnecessary re-renders and localStorage writes
        // This comparison ensures that if initial data changes, it's reflected, but user data is preserved.
        if (JSON.stringify(mergedAssignments) !== storedAssignments) {
          setAssignments(mergedAssignments);
          localStorage.setItem("assignments", JSON.stringify(mergedAssignments));
        } else {
          setAssignments(parsedStoredAssignments);
        }
      }
    } else {
      setAssignments(initialAssignments);
      localStorage.setItem("assignments", JSON.stringify(initialAssignments));
    }

    if (storedActivities) {
      let parsedStoredActivities: Activity[] = JSON.parse(storedActivities);
      const storedMap = new Map<number, Activity>();
      parsedStoredActivities.forEach(a => storedMap.set(a.id, a));

      const mergedActivities: Activity[] = initialActivities.map(initial => {
        const stored = storedMap.get(initial.id);
        return stored ? { ...initial, ...stored } : initial;
      });

      // Add any activities that exist only in localStorage (e.g., user-generated activities)
      parsedStoredActivities.filter(stored => !mergedActivities.some(m => m.id === stored.id)).forEach(stored => mergedActivities.push(stored));

      if (JSON.stringify(mergedActivities) !== storedActivities) {
        setActivities(mergedActivities);
        localStorage.setItem("activities", JSON.stringify(mergedActivities));
      } else {
        setActivities(parsedStoredActivities);
      }
    } else {
      setActivities(initialActivities);
      localStorage.setItem("activities", JSON.stringify(initialActivities));
    }

    if (storedCourses) {
      let parsedStoredCourses: Course[] = JSON.parse(storedCourses);
      const storedMap = new Map<number, Course>();
      parsedStoredCourses.forEach(a => storedMap.set(a.id, a));

      const mergedCourses: Course[] = initialCourses.map(initial => {
        const stored = storedMap.get(initial.id);
        return stored ? { ...initial, ...stored } : initial;
      });

      // Add any courses that exist only in localStorage
      parsedStoredCourses.filter(stored => !mergedCourses.some(m => m.id === stored.id)).forEach(stored => mergedCourses.push(stored));

      if (JSON.stringify(mergedCourses) !== storedCourses) {
        setCourses(mergedCourses);
        localStorage.setItem("courses", JSON.stringify(mergedCourses));
      } else {
        setCourses(parsedStoredCourses);
      }
    } else {
      setCourses(initialCourses);
      localStorage.setItem("courses", JSON.stringify(initialCourses));
    }

    if (storedAnnouncements) {
      let parsedStoredAnnouncements: Announcement[] = JSON.parse(storedAnnouncements);
      const storedMap = new Map<number, Announcement>();
      parsedStoredAnnouncements.forEach(a => storedMap.set(a.id, a));

      const mergedAnnouncements: Announcement[] = initialAnnouncements.map(initial => {
        const stored = storedMap.get(initial.id);
        return stored ? { ...initial, ...stored } : initial;
      });

      // Add any announcements that exist only in localStorage
      parsedStoredAnnouncements.filter(stored => !mergedAnnouncements.some(m => m.id === stored.id)).forEach(stored => mergedAnnouncements.push(stored));

      if (JSON.stringify(mergedAnnouncements) !== storedAnnouncements) {
        setAnnouncements(mergedAnnouncements);
        localStorage.setItem("announcements", JSON.stringify(mergedAnnouncements));
      } else {
        setAnnouncements(parsedStoredAnnouncements);
      }
    } else {
      setAnnouncements(initialAnnouncements);
      localStorage.setItem("announcements", JSON.stringify(initialAnnouncements));
    }

    setLoading(false);
  }, []);

  const updateAssignment = (id: number, updates: Partial<Assignment>) => {
    const updated = assignments.map((a) =>
      a.id === id ? { ...a, ...updates } : a,
    );
    setAssignments(updated);
    localStorage.setItem("assignments", JSON.stringify(updated));
  };

  const addActivity = (activity: Omit<Activity, "id">) => {
    const newActivity = {
      ...activity,
      id: Date.now(),
    };
    const updated = [newActivity, ...activities];
    setActivities(updated);
    localStorage.setItem("activities", JSON.stringify(updated));
  };

  const removeActivityByTitle = (title: string) => {
    const updated = activities.filter((act) => act.title !== title);
    setActivities(updated);
    localStorage.setItem("activities", JSON.stringify(updated));
  };

  const submitAssignment = (
    id: number,
    submission: { files: { name: string; type: string }[]; comment: string },
  ) => {
    const assignment = assignments.find((a) => a.id === id);
    if (!assignment) return;

    updateAssignment(id, {
      status: "Submitted",
      submission: {
        ...submission,
        submittedAt: new Date().toISOString(),
      },
    });

    const title = `Submitted: ${assignment.title}`;
    const filteredActivities = activities.filter((act) => act.title !== title);

    const newActivity = {
      id: Date.now(),
      type: "submission",
      title: title,
      time: "Just now",
      detail: `${submission.files.length} file(s) submitted`,
    };

    const finalActivities = [newActivity, ...filteredActivities];
    setActivities(finalActivities);
    localStorage.setItem("activities", JSON.stringify(finalActivities));
  };

  const removeSubmission = (id: number) => {
    const assignment = assignments.find((a) => a.id === id);
    if (!assignment) return;

    updateAssignment(id, {
      status: "Pending",
      submission: undefined,
    });

    removeActivityByTitle(`Submitted: ${assignment.title}`);
  };

  return {
    assignments,
    activities,
    courses,
    announcements,
    loading,
    updateAssignment,
    submitAssignment,
    removeSubmission,
  };
}
