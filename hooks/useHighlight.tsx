"use client";

import { useCategory, Category } from "@/contexts/CategoryContext";

export const useHighlight = (itemCategories: Category[]) => {
  const { selectedCategories } = useCategory();

  const noFilter = selectedCategories.includes("all") || selectedCategories.length === 0;
  if (noFilter) {
    return { isHighlighted: true, opacity: "opacity-100" };
  }

  const isHighlighted = selectedCategories.some(cat => itemCategories.includes(cat));
  return {
    isHighlighted,
    opacity: isHighlighted ? "opacity-100" : "opacity-30",
  };
};

export const getHighlightClasses = (
  selectedCategories: Category[],
  itemCategories: Category[],
  highlightColor: string = "border-emerald-500/50"
) => {
  const noFilter = selectedCategories.includes("all") || selectedCategories.length === 0;
  if (noFilter) {
    return {
      containerClass: "",
      isHighlighted: true,
    };
  }

  const isHighlighted = selectedCategories.some(cat => itemCategories.includes(cat));
  return {
    containerClass: isHighlighted
      ? `ring-2 ${highlightColor} ring-offset-2 ring-offset-zinc-950`
      : "opacity-30 grayscale",
    isHighlighted,
  };
};
