"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function Typewriter({
  text,
  speed = 110,
  className,
}: TypewriterProps) {
  const prefersReducedMotion = useReducedMotion();
  // Array.from splits on code points, so the 👋 emoji stays intact.
  const chars = Array.from(text);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(chars.length);
      return;
    }
    if (count >= chars.length) return;
    const timer = setInterval(
      () => setCount((c) => Math.min(c + 1, chars.length)),
      speed,
    );
    return () => clearInterval(timer);
  }, [prefersReducedMotion, count, chars.length, speed]);

  // The markup is identical on server and client (no reduced-motion branch)
  // to avoid hydration mismatches; reduced motion instead skips to the full
  // text on mount and hides the cursor via motion-reduce.
  //
  // text-wrap overrides the h1's text-balance so the placeholder and the
  // growing overlay wrap identically; the placeholder also carries a hidden
  // cursor so the reserved width matches the overlay exactly.
  return (
    <span
      aria-label={text}
      className={`relative inline-block text-wrap ${className ?? ""}`}
    >
      {/* Invisible full text reserves the final layout so nothing shifts while typing. */}
      <span aria-hidden="true" className="invisible">
        {text}
        <span className="ml-0.5 inline-block h-[1em] w-0 border-r-2" />
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {chars.slice(0, count).join("")}
        <span className="ml-0.5 inline-block h-[1em] w-0 translate-y-[0.15em] animate-blink border-r-2 border-current motion-reduce:hidden" />
      </span>
    </span>
  );
}
