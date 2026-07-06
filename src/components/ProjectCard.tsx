import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/Card";
import { Project } from "@/lib/schemas";
import Link from "next/link";
import Markdown from "react-markdown";
import Icon from "./Icon";
import ImageWithSkeleton from "./ImageWithSkeleton";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const { name, href, description, image, video, metric, active, tags, links } =
    project;

  return (
    <Card className="group flex flex-col overflow-hidden duration-200 hover:-translate-y-0.5 dark:hover:translate-y-0">
      {video ? (
        <Link href={href || video} target="_blank">
          <video
            src={video}
            poster={image}
            aria-label={`${name} demo`}
            autoPlay
            muted
            loop
            playsInline
            className="aspect-[2/1] w-full border-b bg-muted object-cover object-top"
          />
        </Link>
      ) : (
        image && (
          <Link href={href || image} target="_blank">
            <ImageWithSkeleton
              src={image}
              alt={`${name} screenshot`}
              width={1280}
              height={800}
              sizes="(max-width: 640px) calc(100vw - 4rem), 640px"
              quality={80}
              containerClassName="w-full border-b"
              className="aspect-[2/1] w-full object-cover object-top"
            />
          </Link>
        )
      )}
      {metric &&
        (image ? (
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b bg-muted/50 px-6 py-3">
            <p className="font-mono text-xl tracking-tight">{metric.value}</p>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 border-b bg-muted/50 px-6 py-8">
            <p className="font-mono text-3xl tracking-tight sm:text-4xl">
              {metric.value}
            </p>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
          </div>
        ))}
      <CardContent className="flex flex-col gap-2 pt-6">
        <CardTitle className="flex items-center gap-2 text-lg">
          {active && <span className="status-dot status-dot-live" />}
          {name}
        </CardTitle>
        <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
          {description}
        </Markdown>
      </CardContent>
      <CardFooter className="flex h-full flex-col items-start justify-between gap-3">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.toSorted().map((tag) => (
              <Badge
                key={tag}
                className="px-1 py-0 text-[10px] font-normal"
                variant="secondary"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links.toSorted().map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  <Icon name={link.icon} className="size-3" />
                  {link.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
