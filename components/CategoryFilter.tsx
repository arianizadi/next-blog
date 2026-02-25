"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCategory, categoryConfig, Category } from "@/contexts/CategoryContext";
import { Cpu, Bot, Brain, Shield, LayoutGrid, Search, X, ChevronUp, ChevronDown } from "lucide-react";

const categoryIcons: Record<Category, React.ReactNode> = {
  all: <LayoutGrid size={14} />,
  systems: <Cpu size={14} />,
  robotics: <Bot size={14} />,
  data: <Brain size={14} />,
  security: <Shield size={14} />,
};

const CategoryFilter = () => {
  const { 
    selectedCategories, 
    toggleCategory, 
    clearFilters, 
    searchQuery, 
    setSearchQuery,
    suggestions,
    currentMatchIndex,
    nextMatch,
    prevMatch,
    totalMatches
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

  const hasActiveFilters = selectedCategories.some(c => c !== "all") || searchQuery;

  return (
    <div className="sticky top-14 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Categories - Horizontal Scroll on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex items-center gap-1.5 min-w-max">
              {(Object.keys(categoryConfig) as Category[]).map((category) => {
                const config = categoryConfig[category];
                const isSelected = selectedCategories.includes(category);

                return (
                  <motion.button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
                      transition-all duration-300 border whitespace-nowrap
                      ${isSelected
                        ? `bg-emerald-500/10 text-emerald-400 border-emerald-500/40`
                        : "bg-zinc-900/50 text-zinc-500 border-zinc-800/50 hover:border-zinc-700 hover:text-zinc-300"
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={isSelected ? "text-emerald-400" : "text-zinc-500"}>
                      {categoryIcons[category]}
                    </span>
                    <span>{config.label}</span>
                  </motion.button>
                );
              })}
              
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-2 p-1.5 text-zinc-500 hover:text-emerald-400 transition-colors rounded-full hover:bg-zinc-900"
                  title="Clear all filters"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Search - Sleeker on Desktop */}
          <div className="flex items-center gap-2">
            <div className="relative" ref={suggestionRef}>
              <div className="relative group">
                <Search 
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    searchQuery ? "text-emerald-500" : "text-zinc-600 group-focus-within:text-emerald-500"
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
                  className="w-full md:w-64 bg-zinc-900/40 border border-zinc-800/80 text-zinc-300 text-xs rounded-lg py-2 pl-9 pr-8 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/40 transition-all placeholder:text-zinc-600"
                />
                
                {searchQuery && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {totalMatches > 0 && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-bold tracking-tighter">
                        {currentMatchIndex + 1}/{totalMatches}
                      </span>
                    )}
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-zinc-600 hover:text-zinc-400 transition-colors p-0.5 hover:bg-zinc-800 rounded"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>

              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 left-0 md:left-auto md:w-64 mt-2 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-lg overflow-hidden shadow-2xl z-50"
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-3 py-2 text-[11px] text-zinc-400 hover:bg-zinc-800 hover:text-emerald-400 transition-colors flex items-center gap-2 border-b border-zinc-800/30 last:border-0"
                      >
                        <Search size={12} className="text-zinc-600" />
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {searchQuery && totalMatches > 0 && (
              <div className="flex items-center bg-zinc-900/60 border border-emerald-500/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <button
                  onClick={prevMatch}
                  className="p-2 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-all border-r border-zinc-800"
                  title="Previous match (Shift+Enter)"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={nextMatch}
                  className="p-2 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-all"
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
