"use client";
import {
  motion,
  type Variant,
  type Transition,
  type UseInViewOptions,
} from "framer-motion";

interface InViewProps {
  children: React.ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
}

export const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const defaultTransition = {
  ease: "easeInOut",
};

export const blurTransition = {
  duration: 0.4,
  ease: "easeInOut",
};

export const blurVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(2px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function View({
  children,
  variants = defaultVariants,
  transition = defaultTransition,
}: InViewProps) {
  return (
    <motion.section
      initial="hidden"
      animate={"visible"}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.section>
  );
}
