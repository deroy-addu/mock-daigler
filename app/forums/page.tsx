import Link from "next/link";
import { DiscussionIcon } from "@/components/Icons"; // Assuming you have your ForumsIcon there

const forumTopics = [
  {
    id: "bug-reports",
    title: "Bug Reports & Help",
    newPosts: 12,
    totalPosts: 89,
    lastActive: "JUST NOW",
  },
  {
    id: "project-collaboration",
    title: "Project Collaboration",
    newPosts: 3,
    totalPosts: 24,
    lastActive: "15M AGO",
  },
  {
    id: "general-discussion",
    title: "General Discussion",
    newPosts: 0,
    totalPosts: 156,
    lastActive: "2H AGO",
  },
];

export default function ForumsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-stone-900">Discussion Forums</h2>
        <p className="text-stone-500">Connect and collaborate with your peers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {forumTopics.map((forum) => (
          <Link 
            key={forum.id} 
            href={`/forums/view?topic=${forum.id}`}
            className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center border border-stone-100">
                <DiscussionIcon size={24} />
              </div>
              {forum.newPosts > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter">
                  {forum.newPosts} New
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-stone-800 group-hover:text-amber-500 transition-colors mb-8">
              {forum.title}
            </h3>

            <div className="flex justify-between items-center text-[10px] font-black text-stone-400 uppercase tracking-widest">
              <span>{forum.totalPosts} Posts</span>
              <span>Active {forum.lastActive}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}