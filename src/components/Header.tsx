import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

import routesData from "@/data/routes.json";

// The full page lives on "/" as a single scrolling page; "/projects" and
// "/contact" still exist as standalone routes (for SEO + direct links), but
// nav links jump straight to the matching in-page section.
const anchorOverrides: Record<string, string> = {
  projects: "/#projects",
  contact: "/#contact",
};

const navLinks = routesData.routes
  .filter((route) => route.showInNav)
  .map((route) => ({
    name: route.name,
    href: anchorOverrides[route.name] ?? route.path,
    title: route.description,
  }));

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto max-w-4xl px-8 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm font-medium tracking-tight text-foreground"
          >
            joshua<span className="text-muted-foreground">.hu</span>
          </Link>

          <ul className="flex items-center gap-4 sm:gap-8">
            {navLinks.map((nav, id) => (
              <li key={id} className="link text-sm">
                <Link href={nav.href} title={nav.title}>
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 sm:gap-4">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
