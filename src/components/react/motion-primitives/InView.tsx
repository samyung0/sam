"use client";
import React from "react";
import {
  motion,
  useInView,
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

const defaultVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const defaultTransition = {
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

const defaultOption = {
  once: true,
};

export function InView({
  children,
  variants = defaultVariants,
  transition = defaultTransition,
  viewOptions = defaultOption,
}: InViewProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
