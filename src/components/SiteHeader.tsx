"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Работы" },
  { href: "/about", label: "Студия" },
  { href: "/contact", label: "Контакты" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[var(--edge)] py-4 mix-blend-difference">
      <Link
        href="/"
        data-cursor-target
        className="u-display text-2xl text-paper"
        aria-label="eiggie — на главную"
      >
        eiggie
      </Link>
      <nav className="flex items-center gap-5 text-[13px] font-medium uppercase tracking-[0.12em] text-paper">
        {NAV.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-cursor-target
              className="relative py-1"
            >
              <span className={active ? "opacity-100" : "opacity-60 hover:opacity-100"}>
                {item.label}
              </span>
              {active && (
                <span className="absolute -bottom-0.5 left-0 h-px w-full bg-paper" />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
