"use client";

import { useEffect, useState } from "react";
import { initialAssignments, initialActivities } from "./data";

export function useAssignmentStore() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAssignments = localStorage.getItem("assignments");
    const storedActivities = localStorage.getItem("activities");

    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    } else {
      setAssignments(initialAssignments);
      localStorage.setItem("assignments", JSON.stringify(initialAssignments));
    }

    if (storedActivities) {
      setActivities(JSON.parse(storedActivities));
    } else {
      setActivities(initialActivities);
      localStorage.setItem("activities", JSON.stringify(initialActivities));
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

    const newActivity: Activity = {
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
    loading,
    updateAssignment,
    submitAssignment,
    removeSubmission,
  };
}
