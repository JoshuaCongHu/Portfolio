import { Experience } from "@/lib/schemas";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Badge } from "./ui/Badge";
import Icon from "./Icon";

interface Props {
  experience: Experience;
}

export default function TimelineItem({ experience }: Props) {
  const { name, href, logo, positions } = experience;

  return (
    <li className="relative ml-10 py-4 pr-4">
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="absolute -left-16 top-4 flex items-center justify-center rounded-full bg-white"
      >
        <Avatar className="size-12 border">
          <AvatarImage
            src={logo}
            alt={name}
            loading="lazy"
            decoding="async"
            className="bg-background object-contain"
          />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <Link href={href} target="_blank" rel="noreferrer" className="w-fit">
          <h2 className="text-base font-semibold leading-none">{name}</h2>
        </Link>

        <Accordion type="multiple" className="flex flex-col gap-2 pt-1">
          {positions.map((position) => {
            const value = `${position.title}-${position.start}`;
            return (
              <AccordionItem key={value} value={value} className="border-none">
                <AccordionTrigger className="glass-row px-3 py-2.5 hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <div className="mr-3 flex flex-1 flex-col gap-1 text-left">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <p className="flex items-center gap-2 text-sm font-medium leading-none text-muted-foreground">
                        {!position.end && <span className="status-dot" />}
                        {position.title}
                      </p>
                      <time className="mono-label whitespace-nowrap tabular-nums">
                        <span>{position.start}</span>
                        <span>{" - "}</span>
                        <span>{position.end ?? "Present"}</span>
                      </time>
                    </div>
                    {position.summary && (
                      <p className="line-clamp-2 text-xs text-muted-foreground/80 sm:line-clamp-1">
                        {position.summary}
                      </p>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-3 pt-3">
                  {position.description && (
                    <ul className="ml-4 flex list-outside list-disc flex-col gap-2">
                      {position.description.map((desc, i) => (
                        <li
                          key={i}
                          className="prose text-pretty text-sm dark:prose-invert"
                        >
                          {desc}
                        </li>
                      ))}
                    </ul>
                  )}
                  {position.links && position.links.length > 0 && (
                    <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
                      {position.links.map((link) => (
                        <Link
                          href={link.href}
                          key={link.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Badge title={link.name} className="flex gap-2">
                            <Icon
                              name={link.icon}
                              aria-hidden="true"
                              className="size-3"
                            />
                            {link.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </li>
  );
}
