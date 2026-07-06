import Projects from "@/components/Projects";

export default async function ProjectPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <div>
        <p className="mono-label mb-2">Portfolio</p>
        <h1 className="title text-3xl sm:text-4xl">Projects</h1>
      </div>

      <Projects />
    </article>
  );
}
