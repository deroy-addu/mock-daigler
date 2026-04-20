export interface Activity {
  id: number;
  type: 'grade' | 'upload' | 'submission';
  title: string;
  time: string;
  detail: string;
}

export interface Assignment {
  id: number;
  title: string;
  course: string;
  due: string;
  status: 'Pending' | 'In Progress' | 'Not Started' | 'Submitted';
  description?: string;
  submission?: {
    fileName: string;
    comment: string;
    submittedAt: string;
  };
}

export interface CourseLesson {
  id: number;
  title: string;
  module: string;
  duration: string;
  availableUntil: string;
  status: "Completed" | "In Progress" | "Pending";
  resourceType: "Video" | "Document" | "Quiz" | "Lab";
  instructions: string;
  resources: Array<{
    id: string;
    name: string;
    type: string;
  }>;
}

export interface Course {
  id: number;
  title: string;
  shortTitle: string;
  instructor: string;
  instructorRole: string;
  instructorInitials: string;
  progress: number;
  thumbnail: string;
  color: string;
  description: string;
  objectives: string[];
  assignmentIds: number[];
  lessons: CourseLesson[];
}

export const initialAssignments: Assignment[] = [
  { id: 1, title: "React Components Deep Dive", course: "Advanced Web Dev", due: "Tomorrow", status: "Pending" },
  { id: 2, title: "Neural Network Architecture", course: "Machine Learning", due: "In 3 days", status: "In Progress" },
  { id: 3, title: "Design System Documentation", course: "UI/UX Design", due: "Next Week", status: "Not Started" },
];

export const initialCourses: Course[] = [
  {
    id: 1,
    title: "Advanced Web Development",
    shortTitle: "Advanced Web Dev",
    instructor: "Dr. Sarah Miller",
    instructorRole: "Senior Frontend Architect",
    instructorInitials: "SM",
    progress: 75,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    color: "bg-blue-500",
    description:
      "This course focuses on production-grade frontend architecture using React and Next.js. Students learn how to design scalable UI systems, data-driven interfaces, and maintainable component patterns used in enterprise projects.",
    objectives: [
      "Build reusable components with clear API boundaries.",
      "Design client and server rendering flows in Next.js.",
      "Apply performance and accessibility best practices in real features.",
      "Ship a capstone project that mirrors enterprise quality standards.",
    ],
    assignmentIds: [1],
    lessons: [
      {
        id: 101,
        title: "Next.js App Router Deep Dive",
        module: "Module 1",
        duration: "32 min",
        availableUntil: "May 2, 2026",
        status: "Completed",
        resourceType: "Video",
        instructions: "Watch the lecture then summarize key App Router rendering strategies in 3 bullet points.",
        resources: [
          { id: "r-101-1", name: "app-router-overview.pdf", type: "PDF Document" },
          { id: "r-101-2", name: "lecture-slides.pptx", type: "Slides" },
        ],
      },
      {
        id: 102,
        title: "Server and Client Component Boundaries",
        module: "Module 1",
        duration: "28 min",
        availableUntil: "May 6, 2026",
        status: "Completed",
        resourceType: "Document",
        instructions: "Review the boundary checklist and identify two components in your current project that should become server components.",
        resources: [
          { id: "r-102-1", name: "component-boundary-checklist.pdf", type: "PDF Document" },
          { id: "r-102-2", name: "server-client-examples.zip", type: "ZIP Archive" },
        ],
      },
      {
        id: 103,
        title: "Advanced State Patterns",
        module: "Module 2",
        duration: "40 min",
        availableUntil: "May 10, 2026",
        status: "In Progress",
        resourceType: "Lab",
        instructions: "Implement a reducer-driven form module and document why you selected each state transition.",
        resources: [
          { id: "r-103-1", name: "state-patterns-lab.md", type: "Markdown Guide" },
          { id: "r-103-2", name: "starter-code.zip", type: "ZIP Archive" },
        ],
      },
      {
        id: 104,
        title: "Routing and Data Fetching Quiz",
        module: "Module 2",
        duration: "15 min",
        availableUntil: "May 12, 2026",
        status: "Pending",
        resourceType: "Quiz",
        instructions: "Complete the timed quiz and upload a screenshot of your result summary to the activity thread.",
        resources: [
          { id: "r-104-1", name: "quiz-guidelines.pdf", type: "PDF Document" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    shortTitle: "Machine Learning",
    instructor: "Prof. Alan Turing",
    instructorRole: "Machine Learning Professor",
    instructorInitials: "AT",
    progress: 40,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80",
    color: "bg-emerald-500",
    description:
      "Students learn core machine learning concepts such as supervised learning, optimization, and model evaluation. The class balances conceptual understanding and implementation by combining mathematics with practical coding tasks.",
    objectives: [
      "Understand core ML problem types and workflows.",
      "Implement baseline models and evaluate results.",
      "Interpret learning curves and error metrics.",
      "Communicate model behavior and trade-offs.",
    ],
    assignmentIds: [2],
    lessons: [
      {
        id: 201,
        title: "Linear Regression Foundations",
        module: "Module 1",
        duration: "35 min",
        availableUntil: "May 3, 2026",
        status: "Completed",
        resourceType: "Video",
        instructions: "Review the derivation notes and solve the provided gradient descent warm-up problems.",
        resources: [
          { id: "r-201-1", name: "regression-notes.pdf", type: "PDF Document" },
          { id: "r-201-2", name: "warmup-problems.docx", type: "DOCX Worksheet" },
        ],
      },
      {
        id: 202,
        title: "Gradient Descent Intuition",
        module: "Module 1",
        duration: "24 min",
        availableUntil: "May 7, 2026",
        status: "In Progress",
        resourceType: "Video",
        instructions: "Run the notebook and record how learning rate changes affect convergence after 200 epochs.",
        resources: [
          { id: "r-202-1", name: "gradient-descent-notebook.ipynb", type: "Jupyter Notebook" },
          { id: "r-202-2", name: "learning-rate-lab.pdf", type: "PDF Document" },
        ],
      },
      {
        id: 203,
        title: "Classification Metrics Explained",
        module: "Module 2",
        duration: "18 min",
        availableUntil: "May 9, 2026",
        status: "Pending",
        resourceType: "Document",
        instructions: "Create a confusion matrix from the sample dataset and explain precision and recall in your own words.",
        resources: [
          { id: "r-203-1", name: "metrics-reference.pdf", type: "PDF Document" },
          { id: "r-203-2", name: "sample-dataset.csv", type: "CSV File" },
        ],
      },
      {
        id: 204,
        title: "Model Evaluation Checkpoint",
        module: "Module 2",
        duration: "20 min",
        availableUntil: "May 13, 2026",
        status: "Pending",
        resourceType: "Quiz",
        instructions: "Take the checkpoint quiz and post one model evaluation insight in the course discussion board.",
        resources: [
          { id: "r-204-1", name: "checkpoint-instructions.pdf", type: "PDF Document" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "UI/UX Design Systems",
    shortTitle: "UI/UX Design",
    instructor: "Jane Cooper",
    instructorRole: "Product Design Lead",
    instructorInitials: "JC",
    progress: 90,
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&w=900&q=80",
    color: "bg-amber-500",
    description:
      "This course covers end-to-end design system creation, from token architecture to component governance. Learners define reusable visual foundations and translate them into cross-functional product guidelines.",
    objectives: [
      "Create token systems for color, typography, and spacing.",
      "Define scalable component guidelines and states.",
      "Establish documentation patterns for teams.",
      "Align accessibility standards with visual language.",
    ],
    assignmentIds: [3],
    lessons: [
      {
        id: 301,
        title: "Design Tokens and Semantic Layers",
        module: "Module 1",
        duration: "31 min",
        availableUntil: "May 4, 2026",
        status: "Completed",
        resourceType: "Video",
        instructions: "Audit your current color palette and convert it into semantic tokens based on intent.",
        resources: [
          { id: "r-301-1", name: "token-audit-template.fig", type: "Figma File" },
          { id: "r-301-2", name: "semantic-token-guide.pdf", type: "PDF Document" },
        ],
      },
      {
        id: 302,
        title: "Component Anatomy and States",
        module: "Module 1",
        duration: "26 min",
        availableUntil: "May 8, 2026",
        status: "Completed",
        resourceType: "Document",
        instructions: "Map default, hover, active, and disabled states for five core components from your design system.",
        resources: [
          { id: "r-302-1", name: "component-state-matrix.pdf", type: "PDF Document" },
          { id: "r-302-2", name: "design-system-library.fig", type: "Figma File" },
        ],
      },
      {
        id: 303,
        title: "Accessibility in Systems",
        module: "Module 2",
        duration: "22 min",
        availableUntil: "May 11, 2026",
        status: "Completed",
        resourceType: "Lab",
        instructions: "Run an accessibility check on three key screens and submit your remediation list.",
        resources: [
          { id: "r-303-1", name: "a11y-checklist.pdf", type: "PDF Document" },
          { id: "r-303-2", name: "audit-report-template.docx", type: "DOCX Template" },
        ],
      },
      {
        id: 304,
        title: "Governance and Handoff Review",
        module: "Module 2",
        duration: "19 min",
        availableUntil: "May 15, 2026",
        status: "Pending",
        resourceType: "Quiz",
        instructions: "Review governance scenarios and choose the correct ownership path for each handoff situation.",
        resources: [
          { id: "r-304-1", name: "governance-scenarios.pdf", type: "PDF Document" },
        ],
      },
    ],
  },
];

export const initialActivities: Activity[] = [
  { id: 1, type: "grade", title: "Assignment 3 Graded", time: "10 mins ago", detail: "85/100 in Web Dev" },
  { id: 2, type: "upload", title: "New Material Uploaded", time: "1 hour ago", detail: "Lecture notes on React 19" },
];
