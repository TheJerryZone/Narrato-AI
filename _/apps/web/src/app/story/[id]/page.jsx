"use client";

import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { Book, Sparkles, ArrowLeft, Loader2, Wand2 } from "lucide-react";

export default function StoryPage({ params }) {
  const { data: user, loading: userLoading } = useUser();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && params.id) {
      fetchStory();
    }
  }, [user, params.id]);

  const fetchStory = async () => {
    try {
      const res = await fetch(`/api/stories/${params.id}`);
      if (!res.ok) {
        throw new Error("Story not found");
      }
      const data = await res.json();
      setStory(data.story);

      // If no panels exist, generate them automatically
      if (!data.story.panels || data.story.panels.length === 0) {
        generateComic();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load story");
    } finally {
      setLoading(false);
    }
  };

  const generateComic = async () => {
    setGenerating(true);
    setError(null);

    try {
      const res = await fetch(`/api/stories/${params.id}/generate`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to generate comic");
      }

      const data = await res.json();
      setStory((prev) => ({ ...prev, panels: data.panels }));
    } catch (err) {
      console.error(err);
      setError("Failed to generate comic. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const getThemeColors = (theme) => {
    switch (theme) {
      case "modern":
        return {
          primary: "from-[#FF6B6B] to-[#FF8E53]",
          accent: "#FF6B6B",
          border: "border-[#FF6B6B]/30",
        };
      case "vintage":
        return {
          primary: "from-[#A78BFA] to-[#C084FC]",
          accent: "#A78BFA",
          border: "border-[#A78BFA]/30",
        };
      default:
        return {
          primary: "from-[#FFD700] to-[#FFA500]",
          accent: "#FFD700",
          border: "border-[#FFD700]/30",
        };
    }
  };

  if (userLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0933] via-[#2d1b4e] to-[#0a0118] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#FFD700] animate-spin mx-auto mb-4" />
          <p className="text-white text-xl font-bold">Loading story...</p>
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

  if (error && !story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0933] via-[#2d1b4e] to-[#0a0118] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#FF6B6B] text-xl font-bold mb-4">{error}</p>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] text-white font-bold rounded-xl hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const themeColors = getThemeColors(story?.theme);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0933] via-[#2d1b4e] to-[#0a0118] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-24 h-24 bg-[#FFD700] opacity-10 rounded-full animate-pulse"></div>
        <div
          className="absolute top-[30%] right-[10%] w-32 h-32 bg-[#FF6B6B] opacity-10 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
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
                style={{ textShadow: "2px 2px 0px rgba(255,215,0,0.3)" }}
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
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 relative z-10">
        {/* Story Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-block px-4 py-2 bg-gradient-to-r ${themeColors.primary} rounded-full mb-4`}
          >
            <span className="text-[#1a0933] font-black text-sm uppercase tracking-wide">
              {story?.theme} Style
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-black text-white mb-4"
            style={{ textShadow: "2px 2px 0px rgba(255,215,0,0.3)" }}
          >
            {story?.title}
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            {story?.notes}
          </p>
        </div>

        {/* Generating State */}
        {generating && (
          <div className="bg-white/5 backdrop-blur border-2 border-white/10 rounded-3xl p-12 text-center mb-8">
            <Loader2 className="w-16 h-16 text-[#FFD700] animate-spin mx-auto mb-4" />
            <h3 className="text-2xl font-black text-white mb-2">
              Creating Your Comic...
            </h3>
            <p className="text-white/70">
              Our AI is working its magic! This may take a minute... ✨
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-[#FF6B6B]/20 border-2 border-[#FF6B6B] rounded-xl p-6 text-center mb-8">
            <p className="text-[#FF6B6B] font-bold text-lg mb-4">{error}</p>
            <button
              onClick={generateComic}
              disabled={generating}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a0933] font-bold rounded-xl hover:shadow-lg transition-all"
            >
              <Wand2 className="w-5 h-5" />
              Try Again
            </button>
          </div>
        )}

        {/* Comic Panels */}
        {story?.panels && story.panels.length > 0 && (
          <div className="space-y-8">
            {story.panels.map((panel, index) => (
              <div
                key={index}
                className={`bg-white/5 backdrop-blur border-4 ${themeColors.border} rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-all`}
              >
                <div className="p-4 bg-gradient-to-r from-white/10 to-transparent border-b-4 border-white/20">
                  <span className="text-white font-black text-lg">
                    Panel {index + 1}
                  </span>
                </div>

                {panel.imageUrl ? (
                  <div className="relative">
                    <img
                      src={panel.imageUrl}
                      alt={`Panel ${index + 1}`}
                      className="w-full h-auto"
                      style={{ maxHeight: "600px", objectFit: "contain" }}
                    />
                    {panel.text && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                        <p className="text-white font-bold text-xl text-center leading-relaxed">
                          {panel.text}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="bg-white/10 rounded-2xl p-8 mb-4">
                      <Loader2 className="w-12 h-12 text-white/40 animate-spin mx-auto" />
                    </div>
                    <p className="text-white/60">Generating panel image...</p>
                  </div>
                )}

                {!panel.imageUrl && panel.sceneDescription && (
                  <div className="p-6 border-t-2 border-white/10">
                    <p className="text-white/80 text-center italic">
                      {panel.sceneDescription}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <button
                onClick={generateComic}
                disabled={generating}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a0933] font-black text-lg rounded-full hover:shadow-2xl hover:shadow-[#FFD700]/50 transition-all transform hover:scale-105 disabled:opacity-50"
              >
                <Wand2 className="w-5 h-5" />
                Regenerate Comic
              </button>
            </div>
          </div>
        )}
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
