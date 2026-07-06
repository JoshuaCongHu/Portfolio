import data from "@/data/skills.json";
import { skillsSchema } from "@/lib/schemas";
import { Badge } from "./ui/Badge";

export default function Skills() {
  const categories = skillsSchema.parse(data).categories;

  return (
    <section className="flex flex-col gap-5">
      {categories.map((category) => (
        <div key={category.name} className="flex flex-col gap-2">
          <p className="mono-label">{category.name}</p>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
