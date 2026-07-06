import { promises as fs } from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

async function getPrivacyContent() {
  const filePath = path.join(process.cwd(), 'src/data/privacy.md');
  const content = await fs.readFile(filePath, 'utf-8');
  return content;
}

export default async function PrivacyPage() {
  const privacyContent = await getPrivacyContent();
  
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <div>
        <p className="mono-label mb-2">Legal</p>
        <h1 className="title text-3xl sm:text-4xl">Privacy policy</h1>
      </div>

      <div className="prose dark:prose-invert">
        <ReactMarkdown>{privacyContent}</ReactMarkdown>
      </div>
    </article>
  );
}