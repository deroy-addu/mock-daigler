import Image from "next/image";
import { DiscussionIcon } from "@/components/Icons";
import Link from "next/link";

const forums: Forum[] = [
  {
    id: 1,
    title: "Project Collaboration",
    posts: 24,
    unread: 3,
    lastActive: "15m ago",
  },
  {
    id: 2,
    title: "General Discussion",
    posts: 156,
    unread: 0,
    lastActive: "2h ago",
  },
  {
    id: 3,
    title: "Bug Reports & Help",
    posts: 89,
    unread: 12,
    lastActive: "Just now",
  },
];

function ForumItem({ forum }: { forum: Forum }) {
  return (
    <div
      key={forum.id}
      className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group border border-transparent hover:border-amber-100"
    >
      <div className="flex justify-between items-center mb-6">
        {/* Updated Icon Container */}
        <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center group-hover:bg-amber-50 transition-colors">
          <DiscussionIcon size={32} />
        </div>
        
        {forum.unread > 0 && (
          <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-black rounded-full shadow-sm">
            {forum.unread} NEW
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-stone-800 group-hover:text-amber-500 transition-colors">
        {forum.title}
      </h3>
      
      {/* Rest of your component... */}
      <div className="mt-8 pt-6 border-t border-stone-50 flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-widest">
        <span>{forum.posts} Posts</span>
        <span>Active {forum.lastActive}</span>
      </div>
    </div>
  );
}

export default function ForumsPage() {
  return (
    <div className="p-8 max-w-(--breakpoint-2xl) mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
          Discussion Forums
        </h2>
        <p className="text-stone-500 mt-1">
          Connect and collaborate with your peers.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {forums.map((forum, i) => (
          <ForumItem
            key={i}
            forum={forum}
          />
        ))}
      </div>
    </div>
  );
}
