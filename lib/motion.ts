import type { Transition, Variants } from "framer-motion";

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const defaultTransition: Transition = {
  duration: 0.8,
  ease: easeOutExpo,
};

export const defaultViewport = {
  once: true,
  margin: "-80px" as const,
};

/** Single block fade-up (use with initial / whileInView). */
export const fadeUpHidden = { opacity: 0, y: 40 };
export const fadeUpVisible = { opacity: 1, y: 0 };

export function fadeUpTransition(reducedMotion: boolean | null): Transition {
  if (reducedMotion) return { duration: 0 };
  return defaultTransition;
}

export function revealMotionProps(reducedMotion: boolean | null) {
  const instant = !!reducedMotion;
  return {
    initial: instant ? fadeUpVisible : fadeUpHidden,
    whileInView: fadeUpVisible,
    transition: fadeUpTransition(reducedMotion),
    viewport: defaultViewport,
  };
}

/** Scale reveal variant. */
export const scaleRevealHidden = { opacity: 0, scale: 0.96 };
export const scaleRevealVisible = { opacity: 1, scale: 1 };

/** Parent only orchestrates stagger; children carry opacity motion. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export function staggerVariants(reducedMotion: boolean | null): {
  container: Variants;
  item: Variants;
} {
  if (reducedMotion) {
    return {
      container: {
        hidden: {},
        visible: { transition: { duration: 0 } },
      },
      item: {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      },
    };
  }
  return { container: staggerContainer, item: staggerItem };
}
