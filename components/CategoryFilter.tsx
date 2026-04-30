"use client";

import { useRef, useState, useEffect } from "react";
import { useCategory } from "@/contexts/CategoryContext";
import { Search, X, ChevronUp, ChevronDown } from "lucide-react";

const CategoryFilter = () => {
  const {
    searchQuery,
    setSearchQuery,
    suggestions,
    currentMatchIndex,
    nextMatch,
    prevMatch,
    totalMatches,
  } = useCategory();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        prevMatch();
      } else {
        nextMatch();
      }
    }
  };

  return (
    <div className="sticky top-[calc(5.25rem+env(safe-area-inset-top,0px))] z-40 hidden border-b border-border bg-background/80 backdrop-blur-xl md:block md:top-[calc(6rem+env(safe-area-inset-top,0px))]">
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end md:gap-6">
          <div className="flex shrink-0 items-center justify-end gap-2">
            <div className="relative" ref={suggestionRef}>
              <div className="relative group">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    searchQuery ? "text-foreground" : "text-muted-foreground group-focus-within:text-foreground"
                  }`}
                  size={14}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search..."
                  className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none focus:ring-1 focus:ring-foreground/20 md:w-64"
                />

                {searchQuery && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {totalMatches > 0 && (
                      <span className="text-[10px] bg-foreground/10 text-foreground border border-foreground/20 px-1.5 py-0.5 rounded font-mono font-bold">
                        {currentMatchIndex + 1}/{totalMatches}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-muted-foreground hover:text-foreground transition-colors p-0.5 hover:bg-foreground/5 rounded"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-border bg-card backdrop-blur-2xl md:left-auto md:w-64">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[11px] text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-colors flex items-center gap-2 border-b border-border/50 last:border-0"
                    >
                      <Search size={12} className="text-muted-foreground" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {searchQuery && totalMatches > 0 && (
              <div className="flex items-center overflow-hidden rounded-lg border border-border bg-card">
                <button
                  type="button"
                  onClick={prevMatch}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all border-r border-border"
                  title="Previous match (Shift+Enter)"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={nextMatch}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all"
                  title="Next match (Enter)"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
