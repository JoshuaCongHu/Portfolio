"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  inViewMargin?: string;
}

export default function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.5,
  yOffset = 12,
  inViewMargin = "-40px",
}: BlurFadeProps) {
  const prefersReducedMotion = useReducedMotion();

  // Keep motion.div in both cases: swapping to a plain <div> after SSR left
  // the server-rendered opacity:0 inline style in place, hiding the page for
  // reduced-motion users. initial={false} renders at the final values.
  return (
    <motion.div
      className={cn(className)}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, filter: "blur(6px)", y: yOffset }
      }
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: inViewMargin }}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
