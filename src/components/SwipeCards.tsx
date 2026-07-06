"use client";

import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { KeyboardEvent, useState } from "react";
import ImageWithSkeleton from "./ImageWithSkeleton";

interface SwipeCardsProps {
  className?: string;
  photos?: string[];
}

const SwipeCards = ({ className, photos }: SwipeCardsProps) => {
  // Front of the deck is the last element in the array.
  const cardData: Card[] =
    photos && photos.length > 0
      ? photos.map((url, i) => ({ id: i + 1, url }))
      : [{ id: 1 }];
  const [cards, setCards] = useState<Card[]>(cardData);

  const cycleToBack = (id: number) => {
    setCards((prev) => {
      const card = prev.find((c) => c.id === id);
      if (!card) return prev;
      return [card, ...prev.filter((c) => c.id !== id)];
    });
  };

  return (
    <div
      className={cn(
        "relative grid h-[233px] w-[175px] place-items-center",
        className,
      )}
    >
      {cards.map((card, index) => {
        const depth = cards.length - 1 - index;
        return (
          <Card
            key={card.id}
            cards={cards}
            cycleToBack={cycleToBack}
            depth={depth}
            {...card}
          />
        );
      })}
    </div>
  );
};

const Card = ({
  id,
  url,
  cycleToBack,
  cards,
  depth,
}: {
  id: number;
  url?: string;
  cycleToBack: (id: number) => void;
  cards: Card[];
  depth: number;
}) => {
  const x = useMotionValue(0);
  const [failed, setFailed] = useState(false);
  const showFallback = !url || failed;
  const prefersReducedMotion = useReducedMotion();

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);

  const isFront = id === cards.at(-1)?.id;
  const interactive = isFront && cards.length > 1 && !showFallback;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const advance = () => {
    if (!interactive) return;
    if (prefersReducedMotion) {
      x.set(0);
      cycleToBack(id);
      return;
    }
    animate(x, 220, {
      type: "spring",
      stiffness: 400,
      damping: 40,
    }).then(() => {
      x.set(0);
      cycleToBack(id);
    });
  };

  const handleDragEnd = (event: any, info: { offset: { x: number } }) => {
    if (!interactive) return;
    if (Math.abs(info.offset.x) > 100) {
      const dir = info.offset.x > 0 ? 1 : -1;
      if (prefersReducedMotion) {
        x.set(0);
        cycleToBack(id);
        return;
      }
      animate(x, dir * 220, {
        type: "spring",
        stiffness: 400,
        damping: 40,
      }).then(() => {
        x.set(0);
        cycleToBack(id);
      });
    } else {
      animate(x, 0, {
        type: "spring",
        stiffness: 400,
        damping: 40,
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      advance();
    }
  };

  return (
    <motion.div
      className={cn(
        "absolute h-[233px] w-[175px] origin-bottom overflow-hidden rounded-lg bg-white",
        interactive && "hover:cursor-pointer active:cursor-grabbing",
      )}
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        boxShadow: isFront
          ? "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
          : undefined,
      }}
      animate={{
        // Ensure the top card is always the largest paint candidate.
        scale: isFront ? 1 : Math.max(0.85, 0.94 - depth * 0.04),
      }}
      transition={prefersReducedMotion ? { duration: 0 } : undefined}
      drag={interactive ? "x" : false}
      dragConstraints={{
        left: -150,
        right: 150,
        top: 0,
        bottom: 0,
      }}
      onDragEnd={handleDragEnd}
      onTap={advance}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "button" : undefined}
      aria-label={interactive ? "Shuffle to next photo" : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
    >
      {showFallback ? (
        <div className="dotted-grid pointer-events-none flex h-full w-full select-none flex-col items-center justify-center gap-1 border bg-card">
          <span className="title text-4xl text-foreground">JH</span>
          <span className="mono-label">Joshua Hu</span>
        </div>
      ) : (
        // Quality/sizes must stay identical across front/back so cycling
        // never changes the generated image URL — that's what keeps the
        // same <img> src cached and avoids a refetch on every shuffle.
        <ImageWithSkeleton
          src={url}
          alt={isFront ? "Photo of Joshua" : ""}
          width={175}
          height={233}
          sizes="175px"
          quality={75}
          draggable={false}
          containerClassName="h-full w-full pointer-events-none"
          className="h-full w-full select-none object-cover"
          fetchPriority={isFront ? "high" : "low"}
          priority
          onError={() => setFailed(true)}
        />
      )}
    </motion.div>
  );
};

export default SwipeCards;

type Card = {
  id: number;
  url?: string;
};
