"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import Fuse, { type FuseResult } from "fuse.js";

export interface SearchableItem {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  technologies?: string[];
  type: "project" | "experience" | "opensource" | "tech";
}

interface CategoryContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  suggestions: string[];
  fuzzyResults: FuseResult<SearchableItem>[];
  setSearchableItems: React.Dispatch<React.SetStateAction<SearchableItem[]>>;
  currentMatchIndex: number;
  nextMatch: () => void;
  prevMatch: () => void;
  totalMatches: number;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchableItems, setSearchableItems] = useState<SearchableItem[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

  const clearFilters = () => {
    setSearchQuery("");
    setCurrentMatchIndex(-1);
  };

  const fuse = useMemo(() => {
    return new Fuse(searchableItems, {
      keys: [
        { name: "title", weight: 2 },
        { name: "technologies", weight: 2 },
        { name: "subtitle", weight: 1.5 },
        { name: "description", weight: 1 },
      ],
      threshold: 0.35,
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

  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];

    const terms = new Set<string>();
    const queryLower = searchQuery.toLowerCase();

    searchableItems.forEach((item) => {
      if (item.title.toLowerCase().includes(queryLower)) terms.add(item.title);
      item.technologies?.forEach((tech) => {
        if (tech.toLowerCase().includes(queryLower)) terms.add(tech);
      });
      if (item.subtitle?.toLowerCase().includes(queryLower)) terms.add(item.subtitle);
    });

    return Array.from(terms).slice(0, 5);
  }, [searchableItems, searchQuery]);

  return (
    <CategoryContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        clearFilters,
        suggestions,
        fuzzyResults,
        setSearchableItems,
        currentMatchIndex,
        nextMatch,
        prevMatch,
        totalMatches,
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
