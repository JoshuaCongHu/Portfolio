import BlurFade from "@/components/BlurFade";
import Experience from "@/components/Experience";
import LinkWithIcon from "@/components/LinkWithIcon";
import LiveClock from "@/components/LiveClock";
import ProofStrip from "@/components/ProofStrip";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Socials from "@/components/Socials";
import SwipeCards from "@/components/SwipeCards";
import Typewriter from "@/components/Typewriter";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, ArrowUpRightIcon, FileDown, Send } from "lucide-react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";

import homeContent from "@/data/home.json";

const BIRTH_DATE = new Date(2005, 8, 29); // Sep 29, 2005 (month is 0-indexed)

function getAge(birthDate: Date) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

export default function Home() {
  const currentAge = getAge(BIRTH_DATE);

  // Only request hero photos that actually ship with the build; SwipeCards
  // falls back to monogram cards for the rest.
  const heroPhotos = [1, 2, 3, 4]
    .map((n) => `/img/joshua-${n}.jpg`)
    .filter((url) => existsSync(join(process.cwd(), "public", url)));

  return (
    <article className="flex flex-col gap-16 pb-16">
      <BlurFade delay={0.05}>
        <section className="dotted-grid -mx-8 flex flex-col gap-10 rounded-b-xl px-8 pb-8 pt-6 md:gap-12">
          <LiveClock />

          <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
            <div className="flex max-w-[320px] flex-col sm:max-w-full">
              <p className="mono-label mb-3">
                {homeContent.introduction.eyebrow} · {currentAge}, Buffalo, NY
              </p>

              <h1 className="title text-5xl sm:text-6xl">
                <Typewriter text={homeContent.introduction.greeting} />
              </h1>

              <p className="mt-4 max-w-sm text-pretty text-sm text-muted-foreground sm:text-base">
                {homeContent.introduction.description}
              </p>

              <section className="mt-6 flex flex-wrap items-center gap-4">
                <Link href="/resume.pdf" target="_blank">
                  <Button className="rounded-full">
                    <span className="font-semibold">Resume</span>
                    <FileDown className="ml-2 size-4" />
                  </Button>
                </Link>
                <Socials />
              </section>
            </div>

            <SwipeCards
              className={
                heroPhotos.length > 0
                  ? "self-center md:mr-8 md:self-auto"
                  : "hidden md:mr-8 md:grid"
              }
              photos={heroPhotos}
            />
          </div>
        </section>
      </BlurFade>

      <BlurFade className="-mt-8" delay={0.075}>
        <ProofStrip />
      </BlurFade>

      <BlurFade delay={0.1}>
        <Experience />
      </BlurFade>

      <BlurFade delay={0.15}>
        <section id="projects" className="scroll-anchor flex flex-col gap-8">
          <div className="flex items-end justify-between">
            <h2 className="title text-2xl sm:text-3xl">Projects</h2>
            <LinkWithIcon
              href="/projects"
              position="right"
              icon={<ArrowRightIcon className="size-4" />}
              text="all projects"
            />
          </div>
          <Projects />
        </section>
      </BlurFade>

      <BlurFade delay={0.2}>
        <Skills />
      </BlurFade>

      <BlurFade delay={0.25}>
        <section id="contact" className="scroll-anchor flex flex-col gap-6">
          <div>
            <h2 className="title text-2xl sm:text-3xl">Let&apos;s talk</h2>
            <p className="mt-2 max-w-lg text-pretty text-sm text-muted-foreground">
              Open to internships, research collaborations, or just talking
              multi-agent systems. Email is the fastest way to reach me.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="mailto:joshuahu2222@gmail.com">
              <Button className="rounded-full">
                <span className="font-semibold">joshuahu2222@gmail.com</span>
                <Send className="ml-2 size-4" />
              </Button>
            </Link>
            <LinkWithIcon
              href="https://linkedin.com/in/joshua-cong-hu"
              position="right"
              icon={<ArrowUpRightIcon className="size-4" />}
              text="LinkedIn"
            />
          </div>
        </section>
      </BlurFade>
    </article>
  );
}
