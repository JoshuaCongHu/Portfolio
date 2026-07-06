import * as React from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
}

export default function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex gap-[--gap] overflow-hidden [--duration:40s] [--gap:1rem]",
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          className={cn("flex shrink-0 animate-marquee items-center gap-[--gap]", {
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
