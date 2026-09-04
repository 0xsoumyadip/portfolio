import Link from "next/link";
import { siteConfig } from "@/config/site";
const nav = ["About", "Skills", "Experience", "Projects", "Contact"];
export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[color:var(--canvas)]/95 backdrop-blur-sm">
      <nav
        className="shell flex h-16 items-center justify-between px-6 md:px-10"
        aria-label="Main navigation"
      >
        <Link href="/" className="font-semibold tracking-[-.04em]">
          {siteConfig.name}
          <span className="text-[var(--accent)]">.</span>
        </Link>
        <div className="hidden gap-6 text-sm text-[var(--muted)] md:flex">
          {nav.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-[var(--ink)]"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-white"
        >
          Let&apos;s talk
        </a>
      </nav>
    </header>
  );
}
