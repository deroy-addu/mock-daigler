# Recently Added Code - Detailed Documentation

## Scope

This document explains the recently added route files in detail:

- app/course/[id]/page.tsx
- app/lessons/[id]/page.tsx

The explanations below follow the source line order and describe each line's purpose in the runtime behavior and UI flow.

---

## File: app/course/[id]/page.tsx

### Lines 1-7: Component mode and imports

1. `"use client";` marks this route as a client component so hooks and browser interactions are allowed.
2. Blank line separates directive from imports.
3. `import Link from "next/link";` loads Next.js Link for client-side navigation.
4. `import React, { useMemo, useState } from "react";` imports React plus memoization/state hooks.
5. `import { useParams, useRouter } from "next/navigation";` imports dynamic route params and imperative router navigation.
6. `import { initialCourses } from "@/lib/data";` pulls course data from the shared mock data source.
7. `import { useAssignmentStore } from "@/lib/store";` pulls assignment data + loading state from the local store hook.

### Lines 8-15: Tab model and tab options

8. Blank line for readability.
9. `type TabKey = "about" | "assignments" | "lessons";` constrains tab state to valid keys.
10. Blank line.
11. `const tabItems...` defines static tab metadata for rendering buttons.
12. `key: "about"` maps to about tab logic.
13. `key: "assignments"` maps to assignments tab logic.
14. `key: "lessons"` maps to lessons tab logic.
15. Closing array statement.

### Lines 16-37: TabButton helper component

16. Blank line.
17. `function TabButton(...)` starts reusable tab button UI.
    18-21. Destructures props (`label`, `active`, `onClick`) for dynamic button behavior.
    22-26. Inline props typing enforces required values and callback signature.
18. Returns JSX button.
19. Button root element.
20. `onClick={onClick}` wires click action from parent.
    30-34. Conditional Tailwind classes:

- active: amber background + white text + border + subtle shadow.
- inactive: neutral style + amber hover affordance.

35. Button label text output.
    36-37. Close JSX and function.

### Lines 38-50: StatusPill helper component

38. Blank line.
39. `function StatusPill...` starts a status badge renderer for lesson progress states.
    40-45. `styleMap` maps each status to visual semantics:

- Completed -> green
- In Progress -> amber
- Pending -> neutral gray

46. `as const` locks object values as literal types.
47. Blank line.
    48-49. Returns badge span with class selected by `styleMap[status]`.
48. Closes helper.

### Lines 51-70: Main page setup and derived data

51. Blank line.
52. `export default function CourseDetailPage()` begins dynamic course detail route component.
53. `const params = useParams();` reads URL params from `/course/[id]`.
54. `const router = useRouter();` enables programmatic navigation on row clicks.
55. `const id = Number(params.id);` normalizes route param to numeric ID.
56. `useState<TabKey>("about")` initializes tab to About.
57. Blank line.
58. Pulls assignments and loading from assignment store.
59. Blank line.
    60-62. `course` is memoized lookup by matching `item.id === id`.
60. Blank line.
    64-67. `courseAssignments` filters all assignments down to those linked by `course.assignmentIds`.
    68-70. Closes memo block.

### Lines 71-91: Loading and not-found guards

71. Blank line.
72. `if (loading)` shows skeleton while store data initializes.
    73-80. Skeleton UI with animated placeholders.
73. Closes loading guard.
74. Blank line.
75. `if (!course)` handles invalid route IDs.
    84-90. Displays not-found message with navigation back to dashboard.
76. Closes not-found guard.

### Lines 92-133: Page shell and course hero

92. Blank line.
93. Main return starts full page content.
94. Root container sets page width, spacing, and margins.
    95-102. Breadcrumb nav: Dashboard -> current course title.
95. Blank line.
    104-127. Hero card section:

- background image from `course.thumbnail`
- dark gradient overlay for text contrast
- course label/title/instructor text
- progress bar showing `course.progress`
- color bar driven by `course.color`
  128-133. Close hero section.

### Lines 134-145: Tab strip

134. Blank line.
135. Starts tabbed content card.
136. `flex-wrap` ensures tabs wrap on smaller screens.
     137-143. Maps `tabItems` to `TabButton` components with active state + click handlers.
     144-145. Close tab strip container.

### Lines 146-184: About tab content

146. Blank line.
147. Conditional render when `activeTab === "about"`.
     148-149. Grid layout splits description/instructor panels.
     150-165. Left article:

- heading for course description
- `course.description`
- learning objectives section
- objectives mapped into bullet-style rows with amber dot marker
  166-183. Right instructor aside:
- title "Your Instructor"
- initials avatar from `course.instructorInitials`
- instructor name + role
- contextual guidance text

184. Closes About tab block.

### Lines 185-237: Assignments tab (hover + click routing)

185. Blank line.
186. Conditional render when assignments tab is active.
187. Vertical list container.
188. Ternary checks if there are course-linked assignments.
     189-234. Map each assignment into a fully interactive row:

- row has `role="button"`, `tabIndex={0}` for accessibility
- `onClick` routes to `/assignments/[id]`
- `onKeyDown` handles Enter/Space keyboard activation
- hover uses amber background + border emphasis
- title uses `group-hover` amber text
- due date displayed beneath title
- right side status pill color depends on assignment status
- action button routes to submit/edit path
- `event.stopPropagation()` prevents button click from triggering row-level route
  235-237. Empty-state card when there are no linked assignments.

### Lines 238-275: Lessons tab (hover + click routing)

238. Blank line.
239. Conditional render when lessons tab is active.
240. Vertical list container for lessons.
     241-273. Maps lessons to interactive rows:

- row is fully clickable and keyboard accessible
- row click routes to `/lessons/[id]`
- hover adds amber surface + border + title color emphasis
- module, title, type, duration are shown
- `StatusPill` displays progress state
- side button text changes by status: Review/Continue/Start
- side button also routes to lesson page and stops event bubbling
  274-275. Close lessons block and section.

### Lines 276-284: Final closes

276-283. Closes content section, page wrapper, return, and component function. 284. End of file.

---

## File: app/lessons/[id]/page.tsx

### Lines 1-6: Client mode and imports

1. `"use client";` enables hooks and client-side interactions.
2. Blank line.
3. Imports `Link` for breadcrumb navigation.
4. Imports React + `useMemo` + `useState`.
5. Imports `useParams` and `useRouter` from Next navigation.
6. Imports `initialCourses` to locate the lesson and parent course data.

### Lines 7-24: ResourceRow helper component

7. Blank line.
8. `function ResourceRow({ name, type })` defines a reusable row for lesson resources.
   9-10. Returns outer container with spacing, border, and white background.
9. Left side resource identity group.
10. Icon badge container.
11. File icon SVG.
12. Icon container close.
13. Text container start.
14. Resource filename output with truncation.
15. Resource type output in tiny uppercase style.
16. Text container close.
17. Left group close.
18. Right-side `Open` action button.
    21-23. Closes row JSX.
19. Closes helper function.

### Lines 25-42: Main page setup and lesson lookup

25. Blank line.
26. `export default function LessonDetailPage()` starts dynamic lesson route.
27. `params` fetches route value from `/lessons/[id]`.
28. `router` enables button-based routing.
29. `lessonId` converts param to number.
30. Blank line.
    31-32. Local state for class and private comments.
31. Blank line.
    34-41. Memoized lookup across all courses:

- loops each course
- finds lesson where `item.id === lessonId`
- returns `{ course, lesson }` when found
- returns `undefined` if no match

42. Closes memo logic.

### Lines 43-54: Not-found state

43. Blank line.
44. `if (!found)` handles bad lesson IDs.
    45-53. Shows not-found message and dashboard back-link.
45. Closes guard.

### Lines 55-66: Found data and breadcrumb

55. Blank line.
56. Destructures resolved `course` and `lesson` from lookup result.
57. Blank line.
58. Return starts full page layout.
59. Root container with spacing and max width.
    60-64. Breadcrumb links back to parent course, then current lesson title.
60. Blank line.
61. Starts main lesson detail section card.

### Lines 67-107: Left instruction panel

67. Split layout grid: content area + right sidebar.
68. Left column wrapper with responsive padding and section spacing.
69. Title/info cluster wrapper.
70. Lesson title heading.
    71-73. Instructor name + availability date line.
71. Close title cluster.
72. Blank line.
    76-79. Instruction card:

- section heading
- `lesson.instructions` displayed as body text

80. Blank line.
    81-106. Class comments + metadata card:

- heading
- input bound to `classComment`
- change handler updates state on typing
- post button visual only
- module and duration detail labels/values

107. Close left column.

### Lines 108-138: Right resources and private comments

108. Blank line.
109. Right aside wrapper with subtle background and stacked cards.
110. Resource card container.
     111-117. Header row:

- title `Lesson Resources`
- dynamic status badge styling based on `lesson.status`

118. Blank line.
     119-123. Maps `lesson.resources` to `ResourceRow` entries.
119. Blank line.
     125-127. `+ Add Note` action button.
120. Blank line.
     129-134. `Back to Course` button uses router push to `/course/[id]`.
121. Close resource card.
122. Blank line.
     137-146. Private comments card:

- heading
- textarea bound to `privateComment`
- update handler on change
- focus styles for user feedback

147. Close right aside.
148. Close grid layout.
149. Close section.

### Lines 150-153: Final closes

150-152. Close page wrapper, return, and function. 153. End of file.

---

## Architectural Notes for the Added Code

- The new pages are client-driven so tab switching and row click routing are instantaneous without page reload.
- `useMemo` is used in both pages to avoid recalculating lookups on every render.
- Data is centralized in `lib/data.ts`, while assignment state remains in `lib/store.ts`.
- Interaction model is event-driven: rows emit navigation events via `router.push(...)`.
- Visual style matches your existing design language: stone neutrals, amber highlights, rounded cards, and subtle shadows.
