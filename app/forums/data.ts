export const THREAD_CONTENT: Record<string, any> = {
  // --- GENERAL DISCUSSION ---
  "best-coffee-shops": {
    title: "Best coffee shops on campus",
    category: "General Discussion",
    catId: "general-discussion",
    messages: [
      { user: "Lebron James", text: "Looking for a quiet place with good espresso. Any suggestions?", time: "2h ago", isMe: true },
      { user: "Kevin Durant", text: "The Library Cafe has the best lattes, but it's always packed.", time: "1h ago", isMe: false },
      { user: "Stephen Curry", text: "Try the Science Building basement. Hidden gem, great cold brew!", time: "45m ago", isMe: false },
    ]
  },
  "exam-tips": {
    title: "Exam season survival tips",
    category: "General Discussion",
    catId: "general-discussion",
    messages: [
      { user: "Lebron James", text: "How is everyone staying sane during finals week?", time: "3h ago", isMe: true },
      { user: "Anthony Davis", text: "Hydration and 20-minute power naps are saving me right now.", time: "2h ago", isMe: false },
    ]
  },
  "summer-plans": {
    title: "Summer break plans",
    category: "General Discussion",
    catId: "general-discussion",
    messages: [
      { user: "Lebron James", text: "Anyone doing internships or just traveling?", time: "5h ago", isMe: true },
      { user: "Austin Reaves", text: "Heading to Europe for two weeks then starting a dev internship!", time: "4h ago", isMe: false },
    ]
  },

  // --- PROJECT COLLABORATION ---
  "react-dev": {
    title: "Looking for a React developer",
    category: "Project Collaboration",
    catId: "project-collaboration",
    messages: [
      { user: "Lebron James", text: "Need someone who knows Tailwind and Framer Motion for a SaaS project.", time: "1d ago", isMe: true },
      { user: "Kyrie Irving", text: "I've got experience with those. Check your DMs.", time: "20h ago", isMe: false },
    ]
  },
  "project-alpha": {
    title: "Project Alpha - Deadline sync",
    category: "Project Collaboration",
    catId: "project-collaboration",
    messages: [
      { user: "Lebron James", text: "Are we still on track for the Friday submission?", time: "2h ago", isMe: true },
      { user: "Kevin Love", text: "I'm wrapping up the backend today. We should be good.", time: "1h ago", isMe: false },
    ]
  },
  "doc-sync": {
    title: "Finalizing the documentation",
    category: "Project Collaboration",
    catId: "project-collaboration",
    messages: [
      { user: "Lebron James", text: "Who's taking lead on the ReadMe file?", time: "4h ago", isMe: true },
      { user: "Tristan Thompson", text: "I can handle that. Just need the API keys list.", time: "3h ago", isMe: false },
    ]
  },

  // --- BUG REPORTS & HELP ---
  "tailwind-bug": {
    title: "Tailwind config not loading",
    category: "Bug Reports & Help",
    catId: "bug-reports",
    messages: [
      { user: "Lebron James", text: "My custom colors aren't showing up after the update.", time: "30m ago", isMe: true },
      { user: "Draymond Green", text: "Did you check your content array in tailwind.config.ts?", time: "15m ago", isMe: false },
    ]
  },
  "hydration-error": {
    title: "Next.js 14 hydration error",
    category: "Bug Reports & Help",
    catId: "bug-reports",
    messages: [
      { user: "Lebron James", text: "Getting 'Text content did not match' error on refresh.", time: "2h ago", isMe: true },
      { user: "Chris Paul", text: "Check if you have any window or document calls outside of useEffect.", time: "1h ago", isMe: false },
    ]
  },
  "api-404": {
    title: "API Route returning 404",
    category: "Bug Reports & Help",
    catId: "bug-reports",
    messages: [
      { user: "Lebron James", text: "Localhost works but Vercel deployment returns 404.", time: "5h ago", isMe: true },
      { user: "Russell Westbrook", text: "Verify your environment variables on the Vercel dashboard.", time: "4h ago", isMe: false },
    ]
  }
};