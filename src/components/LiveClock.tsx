"use client";

import { useEffect, useState } from "react";

interface LiveClockProps {
  location?: string;
}

function formatDate(d: Date) {
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const day = d.getDate().toString().padStart(2, "0");
  return `${weekday}, ${month} ${day}, ${d.getFullYear()}`;
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
}

export default function LiveClock({ location = "Buffalo, NY" }: LiveClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <p className="font-mono text-lg tabular-nums tracking-wide">
        {now ? formatTime(now) : "--:--:--"}
      </p>
      <p className="mono-label tabular-nums">
        {now ? `${formatDate(now)} · ${location}` : " "}
      </p>
    </div>
  );
}
