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
      const parsedStoredAssignments = JSON.parse(storedAssignments);
      // If the stored data is missing the new 'instructions' field, reset to initial
      const isOldData = parsedStoredAssignments.length > 0 && !parsedStoredAssignments[0].instructions;
      if (isOldData) {
        setAssignments(initialAssignments);
        localStorage.setItem("assignments", JSON.stringify(initialAssignments));
      } else {
        const initialAssignmentsString = JSON.stringify(initialAssignments);
        const storedAssignmentsString = JSON.stringify(parsedStoredAssignments);
        if (initialAssignmentsString !== storedAssignmentsString) {
          setAssignments(initialAssignments);
          localStorage.setItem("assignments", initialAssignmentsString);
        } else {
          setAssignments(parsedStoredAssignments);
        }
      }
    } else {
      setAssignments(initialAssignments);
      localStorage.setItem("assignments", JSON.stringify(initialAssignments));
    }

    if (storedActivities) {
      const parsedStoredActivities = JSON.parse(storedActivities);
      const initialActivitiesString = JSON.stringify(initialActivities);
      const storedActivitiesString = JSON.stringify(parsedStoredActivities);
      if (initialActivitiesString !== storedActivitiesString) {
        setActivities(initialActivities);
        localStorage.setItem("activities", initialActivitiesString);
      } else {
        setActivities(parsedStoredActivities);
      }
    } else {
      setActivities(initialActivities);
      localStorage.setItem("activities", JSON.stringify(initialActivities));
    }

    if (storedCourses) {
      const parsedStoredCourses = JSON.parse(storedCourses);
      const initialCoursesString = JSON.stringify(initialCourses);
      const storedCoursesString = JSON.stringify(parsedStoredCourses);
      if (initialCoursesString !== storedCoursesString) {
        setCourses(initialCourses);
        localStorage.setItem("courses", initialCoursesString);
      } else {
        setCourses(parsedStoredCourses);
      }
    } else {
      setCourses(initialCourses);
      localStorage.setItem("courses", JSON.stringify(initialCourses));
    }

    if (storedAnnouncements) {
      const parsedStoredAnnouncements = JSON.parse(storedAnnouncements);
      const initialAnnouncementsString = JSON.stringify(initialAnnouncements);
      const storedAnnouncementsString = JSON.stringify(parsedStoredAnnouncements);
      // If the initial announcements from data.ts are different from what's in localStorage,
      // update localStorage and the store with the latest from data.ts.
      if (initialAnnouncementsString !== storedAnnouncementsString) {
        setAnnouncements(initialAnnouncements);
        localStorage.setItem("announcements", initialAnnouncementsString);
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
    submission: { fileName: string; comment: string },
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
      detail: `File: ${submission.fileName}`,
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
