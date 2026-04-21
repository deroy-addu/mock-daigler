interface Announcement {
  id: number;
  title: string;
  date: string;
  author: string;
  content: string;
}

interface Activity {
  id: number;
  type: "grade" | "upload" | "submission";
  title: string;
  time: string;
  detail: string;
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  due: string;
  status: "Pending" | "In Progress" | "Not Started" | "Submitted";
  description?: string;
  submission?: {
    fileName: string;
    comment: string;
    submittedAt: string;
  };
}

interface Deadline {
  id: number;
  title: string;
  course: string;
  date: string;
  priority: string;
}

interface Exam {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  duration: string;
}

interface Forum {
  id: number;
  title: string;
  posts: number;
  unread: number;
  lastActive: string;
}

interface Grade {
  id: number;
  course: string;
  assessment: string;
  score: string;
  weight: string;
  date: string;
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: string;
  color: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  timezone: string;
}
