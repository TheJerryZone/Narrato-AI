"use client";

import { useState } from "react";
import useUser from "@/utils/useUser";
import {
  Book,
  Sparkles,
  Wand2,
  ArrowLeft,
  Loader2,
  Palette,
  FileText,
  Zap,
} from "lucide-react";

export default function CreatePage() {
  const { data: user, loading: userLoading } = useUser();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [theme, setTheme] = useState("classic");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  const themes = [
    {
      id: "classic",
      name: "Classic Comic",
      colors: "from-[#FFD700] to-[#FFA500]",
      description: "Bold colors and dynamic action!",
    },
    {
      id: "modern",
      name: "Modern Pop",
      colors: "from-[#FF6B6B] to-[#FF8E53]",
      description: "Sleek and vibrant vibes",
    },
    {
      id: "vintage",
      name: "Vintage Style",
      colors: "from-[#A78BFA] to-[#C084FC]",
      description: "Retro comic nostalgia",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !notes.trim()) {
      setError("Please fill in both title and notes!");
      return;
    }

    setGenerating(true);

    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, notes, theme }),
      });

      if (!res.ok) {
        throw new Error("Failed to create story");
      }

      const data = await res.json();
      window.location.href = `/story/${data.id}`;
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again!");
      setGenerating(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0933] via-[#2d1b4e] to-[#0a0118] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#FFD700] animate-spin mx-auto mb-4" />
          <p className="text-white text-xl font-bold">Loading...</p>
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

          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center border-4 border-[#1a0933] shadow-lg">
              <Wand2 className="w-8 h-8 text-[#1a0933]" />
            </div>
          </div>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-3"
            style={{ textShadow: "2px 2px 0px rgba(255,215,0,0.3)" }}
          >
            Create Your Comic Story
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Share your ideas and watch them transform into an amazing comic
            adventure! ✨
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Input */}
          <div className="bg-white/5 backdrop-blur border-2 border-white/10 rounded-2xl p-8 hover:border-[#FFD700]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#FFD700]/20 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#FFD700]" />
              </div>
              <label className="text-xl font-black text-white">
                Story Title
              </label>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an epic title for your story..."
              className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/40 font-semibold text-lg focus:outline-none focus:border-[#FFD700] transition-all"
              disabled={generating}
            />
          </div>

          {/* Notes Input */}
          <div className="bg-white/5 backdrop-blur border-2 border-white/10 rounded-2xl p-8 hover:border-[#4ECDC4]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#4ECDC4]/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#4ECDC4]" />
              </div>
              <label className="text-xl font-black text-white">
                Your Story Notes
              </label>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe your story... What happens? Who are the characters? What's the adventure?"
              rows={8}
              className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/40 font-semibold text-lg focus:outline-none focus:border-[#4ECDC4] transition-all resize-none"
              disabled={generating}
            />
            <p className="text-white/50 text-sm mt-3">
              💡 Tip: The more details you provide, the better your comic will
              be!
            </p>
          </div>

          {/* Theme Selection */}
          <div className="bg-white/5 backdrop-blur border-2 border-white/10 rounded-2xl p-8 hover:border-[#FF6B6B]/30 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF6B6B]/20 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-[#FF6B6B]" />
              </div>
              <label className="text-xl font-black text-white">
                Choose Your Theme
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  disabled={generating}
                  className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    theme === t.id
                      ? "border-white bg-white/10 shadow-lg"
                      : "border-white/20 bg-white/5 hover:border-white/40"
                  }`}
                >
                  <div
                    className={`w-full h-20 bg-gradient-to-br ${t.colors} rounded-lg mb-4 border-2 border-[#1a0933]`}
                  ></div>
                  <h3 className="text-white font-black text-lg mb-1">
                    {t.name}
                  </h3>
                  <p className="text-white/60 text-sm">{t.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-[#FF6B6B]/20 border-2 border-[#FF6B6B] rounded-xl p-4 text-center">
              <p className="text-[#FF6B6B] font-bold">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={generating}
              className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a0933] font-black text-xl rounded-full hover:shadow-2xl hover:shadow-[#FFD700]/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {generating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Creating Your Comic...
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6" />
                  Generate Comic Story
                </>
              )}
            </button>
            {generating && (
              <p className="text-white/60 text-sm mt-4">
                ✨ Hang tight! We're bringing your story to life...
              </p>
            )}
          </div>
        </form>
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
