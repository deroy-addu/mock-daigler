
export type Assignment = {
  id: number;
  title: string;
  course: string;
  due: string;
  status: string;
  description: string;
  instructions: string[];
  points: number;
  submissionType: string;
  submission?: {
    files: { name: string; type: string }[];
    comment: string;
    submittedAt: string;
  };
};

export type Course = {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: string;
  color: string;
};

export type Announcement = {
  id: number;
  title: string;
  date: string;
  author: string;
  content: string;
};

export type Activity = {
  id: number;
  type: string;
  title: string;
  time: string;
  detail: string;
};

export const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: "React Components Deep Dive",
    course: "Advanced Web Dev",
    due: "Tomorrow",
    status: "Pending",
    description: "In this assignment, you will dive deep into React's component architecture by building a fully functional multi-step form using advanced component patterns including compound components, render props, and custom hooks.",
    instructions: [
      "Create a reusable multi-step form component using the compound component pattern.",
      "Implement at least three custom hooks: useFormState, useStepNavigation, and useFormValidation.",
      "Use React Context to share form state across nested components without prop drilling.",
      "Add animated transitions between steps using CSS transitions or Framer Motion.",
      "Write unit tests for each custom hook using React Testing Library.",
      "Document your component API using JSDoc comments and include a usage example in the README.",
    ],
    points: 100,
    submissionType: "ZIP file (source code + README)",
  },
  {
    id: 2,
    title: "Neural Network Architecture",
    course: "Machine Learning",
    due: "In 3 days",
    status: "On Progress",
    description: "Explore the foundational architectures of neural networks by implementing a feedforward network from scratch in Python, then comparing its performance against a modern deep learning framework implementation.",
    instructions: [
      "Implement a feedforward neural network from scratch using only NumPy — no ML libraries for the core logic.",
      "Your network must support configurable hidden layers, activation functions (ReLU, Sigmoid, Tanh), and learning rates.",
      "Train on the MNIST dataset and achieve at least 92% test accuracy.",
      "Re-implement the same architecture using PyTorch or TensorFlow and compare training curves.",
      "Write a 2–3 page report analyzing the performance difference, including loss/accuracy graphs.",
      "Submit a Jupyter notebook with clear markdown explanations for each section.",
    ],
    points: 120,
    submissionType: "Jupyter Notebook (.ipynb) + PDF Report",
  },
  {
    id: 3,
    title: "Design System Documentation",
    course: "UI/UX Design",
    due: "Next Week",
    status: "Pending",
    description: "Design and document a comprehensive design system from first principles. You will establish visual tokens, component specifications, and usage guidelines that could serve as the foundation for a real product.",
    instructions: [
      "Define a complete set of design tokens: color palette (with semantic aliases), typography scale, spacing system, border radii, and shadow levels.",
      "Document at least 10 reusable UI components with variants, states, and accessibility notes.",
      "Create a component library in Figma (or a tool of your choice) and export design specs.",
      "Write a contribution guide explaining how future designers should extend the system.",
      "Include a dark mode specification for each token and component.",
      "Present your system in a 5-minute recorded walkthrough — upload the video link in your submission.",
    ],
    points: 80,
    submissionType: "Figma link + PDF Documentation + Video link",
  },
   {
    id: 4,
    title: "Mock Assignment",
    course: "UI/UX Design",
    due: "Next Week",
    status: "Pending",
    description: "Design and document a comprehensive design system from first principles. You will establish visual tokens, component specifications, and usage guidelines that could serve as the foundation for a real product.",
    instructions: [
      "Define a complete set of design tokens: color palette (with semantic aliases), typography scale, spacing system, border radii, and shadow levels.",
      "Document at least 10 reusable UI components with variants, states, and accessibility notes.",
      "Create a component library in Figma (or a tool of your choice) and export design specs.",
      "Write a contribution guide explaining how future designers should extend the system.",
      "Include a dark mode specification for each token and component.",
      "Present your system in a 5-minute recorded walkthrough — upload the video link in your submission.",
    ],
    points: 80,
    submissionType: "Figma link + PDF Documentation + Video link",
  }
];

export const initialCourses: Course[] = [
  {
    id: 1,
    title: "Advanced Web Development",
    instructor: "Dr. Sarah Miller",
    progress: 75,
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    instructor: "Prof. Alan Turing",
    progress: 40,
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=300&q=80",
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "UI/UX Design Systems",
    instructor: "Jane Cooper",
    progress: 90,
    thumbnail:
      "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&w=300&q=80",
    color: "bg-pink-500",
  },
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Exam Schedule Released",
    date: "April 5, 2026",
    author: "Academic Office",
    content: "The official examination schedule for the Spring 2026 semester has been finalized. Students are advised to log into their portals and check the 'Upcoming Exams' tab. Please ensure you arrive at the designated halls at least 30 minutes before the start time. Any conflicts in the schedule must be reported to the Academic Office by the end of this week.",
  },
  {
    id: 2,
    title: "Library Opening Hours",
    date: "April 2, 2026",
    author: "Library Services",
    content: "To support students during the final exam period, the Main Library will transition to 24/7 operations starting next Monday. Study pods and silent zones will be available on a first-come, first-served basis. Please remember to bring your student ID for entry after 10:00 PM. High-speed Wi-Fi and printing services will remain active throughout the night.",
  },
  {
    id: 3,
    title: "Mock Announcement",
    date: "April 21, 2026",
    author: "Department of Mock Affairs",
    content: "Random Description.",
  }
];

export const initialActivities: Activity[] = [
  {
    id: 1,
    type: "grade",
    title: "Assignment 3 Graded",
    time: "10 mins ago",
    detail: "85/100 in Web Dev",
  },
  {
    id: 2,
    type: "upload",
    title: "New Material Uploaded",
    time: "1 hour ago",
    detail: "Lecture notes on React 19",
  },
];
