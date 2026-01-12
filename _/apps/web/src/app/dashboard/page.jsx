"use client";

import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import {
  Book,
  Sparkles,
  Plus,
  Clock,
  Palette,
  Download,
  Trash2,
  Eye,
  LogOut,
  Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const { data: user, loading: userLoading } = useUser();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStories();
    }
  }, [user]);

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/stories");
      if (res.ok) {
        const data = await res.json();
        setStories(data.stories || []);
      }
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStory = async (id) => {
    if (!confirm("Are you sure you want to delete this story?")) return;

    try {
      const res = await fetch(`/api/stories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setStories(stories.filter((s) => s.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete story:", error);
    }
  };

  if (userLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0933] via-[#2d1b4e] to-[#0a0118] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#FFD700] animate-spin mx-auto mb-4" />
          <p className="text-white text-xl font-bold">
            Loading your stories...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/account/signin";
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0933] via-[#2d1b4e] to-[#0a0118] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-24 h-24 bg-[#FFD700] opacity-10 rounded-full animate-pulse"></div>
        <div
          className="absolute top-[30%] right-[10%] w-32 h-32 bg-[#FF6B6B] opacity-10 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-[20%] left-[15%] w-20 h-20 bg-[#4ECDC4] opacity-15 animate-pulse"
          style={{
            animationDelay: "2s",
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          }}
        ></div>
      </div>

      {/* Header */}
      <nav className="sticky top-0 w-full backdrop-blur-lg border-b border-[#FFD700]/20 bg-[#1a0933]/80 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-8">
          <a href="/" className="inline-flex items-center gap-3">
            <div className="relative">
              <Book className="w-8 h-8 text-[#FFD700] fill-[#FFD700]" />
              <Sparkles className="w-4 h-4 text-[#FF6B6B] absolute -top-1 -right-1 animate-pulse fill-current" />
            </div>
            <div className="flex flex-col">
              <span
                className="text-2xl font-black text-white tracking-tight"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  textShadow: "2px 2px 0px rgba(255,215,0,0.3)",
                }}
              >
                Narrato
              </span>
              <span className="text-[9px] text-[#FFD700] font-medium tracking-widest uppercase">
                by TheJerryZone
              </span>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-white font-bold text-sm">
                {user.name || user.email}
              </span>
              <span className="text-white/60 text-xs">Comic Creator</span>
            </div>
            <a
              href="/account/logout"
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 relative z-10">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1
                className="text-4xl md:text-5xl font-black text-white mb-2"
                style={{ textShadow: "2px 2px 0px rgba(255,215,0,0.3)" }}
              >
                Your Comic Studio
              </h1>
              <p className="text-white/80 text-lg">
                Welcome back,{" "}
                <span className="text-[#FFD700] font-bold">
                  {user.name || "Creator"}
                </span>
                ! Ready to make some magic? ✨
              </p>
            </div>
            <a
              href="/create"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a0933] font-black text-lg rounded-full hover:shadow-lg hover:shadow-[#FFD700]/50 transition-all transform hover:scale-105"
            >
              <Plus className="w-6 h-6" />
              Create New Story
            </a>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 border-2 border-[#FFD700]/30 rounded-2xl p-6 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#FFD700] rounded-xl flex items-center justify-center">
                  <Book className="w-7 h-7 text-[#1a0933]" />
                </div>
                <div>
                  <div className="text-3xl font-black text-white">
                    {stories.length}
                  </div>
                  <div className="text-white/70 text-sm font-semibold">
                    Total Stories
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF8E53]/10 border-2 border-[#FF6B6B]/30 rounded-2xl p-6 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#FF6B6B] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-black text-white">
                    {
                      stories.filter((s) => s.panels && s.panels.length > 0)
                        .length
                    }
                  </div>
                  <div className="text-white/70 text-sm font-semibold">
                    Completed
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#4ECDC4]/20 to-[#44A08D]/10 border-2 border-[#4ECDC4]/30 rounded-2xl p-6 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#4ECDC4] rounded-xl flex items-center justify-center">
                  <Palette className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-black text-white">
                    {new Set(stories.map((s) => s.theme)).size}
                  </div>
                  <div className="text-white/70 text-sm font-semibold">
                    Themes Used
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div>
          <h2 className="text-3xl font-black text-white mb-6">Your Stories</h2>

          {stories.length === 0 ? (
            <div className="bg-white/5 backdrop-blur border-2 border-white/10 rounded-3xl p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#1a0933]">
                <Book className="w-12 h-12 text-[#1a0933]" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">
                No Stories Yet!
              </h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Your comic adventure starts here. Click the button below to
                create your first amazing story!
              </p>
              <a
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] text-white font-bold text-lg rounded-full hover:shadow-lg hover:shadow-[#4ECDC4]/50 transition-all transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                Create Your First Story
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white/5 backdrop-blur border-2 border-white/10 rounded-2xl overflow-hidden hover:border-[#FFD700]/50 transition-all transform hover:scale-[1.02] group"
                >
                  {/* Story Preview */}
                  <div
                    className={`h-48 bg-gradient-to-br ${
                      story.theme === "modern"
                        ? "from-[#FF6B6B] to-[#FF8E53]"
                        : story.theme === "vintage"
                          ? "from-[#A78BFA] to-[#C084FC]"
                          : "from-[#FFD700] to-[#FFA500]"
                    } flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full"></div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full"></div>
                    </div>
                    <div className="relative z-10 text-center">
                      <Book className="w-16 h-16 text-white mx-auto mb-2" />
                      <div className="text-white/80 text-sm font-bold">
                        {story.panels && story.panels.length > 0
                          ? `${story.panels.length} Panels`
                          : "Draft"}
                      </div>
                    </div>
                  </div>

                  {/* Story Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-black text-white mb-2 line-clamp-1">
                      {story.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {story.notes}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-white/40" />
                      <span className="text-white/60 text-xs">
                        {new Date(story.created_at).toLocaleDateString()}
                      </span>
                      <div className="ml-auto">
                        <span className="px-3 py-1 bg-[#4ECDC4]/20 border border-[#4ECDC4]/40 rounded-full text-[#4ECDC4] text-xs font-bold">
                          {story.theme}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <a
                        href={`/story/${story.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-[#4ECDC4]/30 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </a>
                      <button
                        onClick={() => deleteStory(story.id)}
                        className="px-4 py-2.5 bg-[#FF6B6B]/20 border border-[#FF6B6B]/40 text-[#FF6B6B] font-bold text-sm rounded-xl hover:bg-[#FF6B6B]/30 transition-all"
                        title="Delete Story"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 bg-[#0a0118]/50 backdrop-blur mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Book className="w-6 h-6 text-[#FFD700]" />
              <span className="text-white font-bold">Narrato</span>
              <span className="text-white/50 text-sm">by TheJerryZone</span>
            </div>
            <p className="text-white/50 text-sm">
              © 2026 Narrato. Turn notes into epic comics! 🎨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
