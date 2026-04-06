"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import Fuse from "fuse.js";

export type Category = "all" | "systems" | "robotics" | "data" | "security";

export interface SearchableItem {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  technologies?: string[];
  type: "project" | "experience" | "opensource";
  categories: Category[];
}

interface CategoryContextType {
  selectedCategories: Category[];
  toggleCategory: (category: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  suggestions: string[];
  fuzzyResults: any[];
  setSearchableItems: React.Dispatch<React.SetStateAction<SearchableItem[]>>;
  currentMatchIndex: number;
  setCurrentMatchIndex: (index: number) => void;
  nextMatch: () => void;
  prevMatch: () => void;
  totalMatches: number;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(["all"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchableItems, setSearchableItems] = useState<SearchableItem[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) => {
      if (category === "all") return ["all"];
      
      const newCategories = prev.filter((c) => c !== "all");
      if (newCategories.includes(category)) {
        const filtered = newCategories.filter((c) => c !== category);
        return filtered.length === 0 ? ["all"] : filtered;
      } else {
        return [...newCategories, category];
      }
    });
  };

  const clearFilters = () => {
    setSelectedCategories(["all"]);
    setSearchQuery("");
    setCurrentMatchIndex(-1);
  };

  // Configure Fuse.js for likeness/fuzzy matching
  const fuse = useMemo(() => {
    return new Fuse(searchableItems, {
      keys: [
        { name: "title", weight: 2 },
        { name: "technologies", weight: 2 },
        { name: "subtitle", weight: 1.5 },
        { name: "description", weight: 1 },
      ],
      threshold: 0.35, // Forgiving threshold for likeness (0.0 perfect, 1.0 match anything)
      ignoreLocation: true,
      includeMatches: true,
      minMatchCharLength: 2,
    });
  }, [searchableItems]);

  const fuzzyResults = useMemo(() => {
    if (!searchQuery) return [];
    return fuse.search(searchQuery);
  }, [fuse, searchQuery]);

  const totalMatches = fuzzyResults.length;

  // Auto-set first match when search query changes
  React.useEffect(() => {
    if (totalMatches > 0) {
      setCurrentMatchIndex(0);
    } else {
      setCurrentMatchIndex(-1);
    }
  }, [totalMatches]);

  const nextMatch = () => {
    if (totalMatches === 0) return;
    setCurrentMatchIndex((prev) => (prev + 1) % totalMatches);
  };

  const prevMatch = () => {
    if (totalMatches === 0) return;
    setCurrentMatchIndex((prev) => (prev - 1 + totalMatches) % totalMatches);
  };

  // Generate autocomplete suggestions based on current query
  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const terms = new Set<string>();
    const queryLower = searchQuery.toLowerCase();
    
    searchableItems.forEach(item => {
      if (item.title.toLowerCase().includes(queryLower)) terms.add(item.title);
      item.technologies?.forEach(tech => {
        if (tech.toLowerCase().includes(queryLower)) terms.add(tech);
      });
      if (item.subtitle?.toLowerCase().includes(queryLower)) terms.add(item.subtitle);
    });

    return Array.from(terms).slice(0, 5); // Limit to top 5 suggestions
  }, [searchableItems, searchQuery]);

  return (
    <CategoryContext.Provider 
      value={{ 
        selectedCategories, 
        toggleCategory, 
        searchQuery, 
        setSearchQuery,
        clearFilters,
        suggestions,
        fuzzyResults,
        setSearchableItems,
        currentMatchIndex,
        setCurrentMatchIndex,
        nextMatch,
        prevMatch,
        totalMatches
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

export const categoryConfig: Record<Category, { label: string; color: string; description: string }> = {
  all: { label: "All", color: "from-zinc-500 to-zinc-400", description: "Show everything" },
  systems: { label: "Systems Engineering", color: "from-emerald-500 to-green-400", description: "C++, Rust, Embedded, OS, Build Systems" },
  robotics: { label: "Robotics", color: "from-blue-500 to-cyan-400", description: "LiDAR, CV, Autonomous Vehicles, Perception" },
  data: { label: "Data Science", color: "from-cyan-500 to-teal-400", description: "ML, Deep Learning, Pipelines, Analytics" },
  security: { label: "Cybersecurity", color: "from-red-500 to-orange-400", description: "CTF, Reverse Engineering, Security" },
};
