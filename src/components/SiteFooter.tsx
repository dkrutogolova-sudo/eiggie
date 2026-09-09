import Link from "next/link";
import { studio } from "@/data/studio";
import { LiquidWordmark } from "./LiquidWordmark";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-[12vh] border-t border-ink/10 px-[var(--edge)] pb-10 pt-14">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.14em] text-ink/50">
            Давайте сделаем что-нибудь странное
          </p>
          {/* Contacts are placeholders — see src/data/studio.ts */}
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-lg">
            <li>
              <a data-cursor-target href={`mailto:${studio.contacts.email}`} className="hover:text-burgundy">
                {studio.contacts.email}
              </a>
            </li>
            <li>
              <a data-cursor-target href="#" className="hover:text-burgundy">
                Telegram {studio.contacts.telegram}
              </a>
            </li>
            <li>
              <a data-cursor-target href="#" className="hover:text-burgundy">
                Instagram
              </a>
            </li>
            <li>
              <a data-cursor-target href="#" className="hover:text-burgundy">
                Behance
              </a>
            </li>
          </ul>
        </div>
        <nav className="flex gap-5 text-[13px] font-medium uppercase tracking-[0.12em] text-ink/60">
          <Link data-cursor-target href="/" className="hover:text-ink">Работы</Link>
          <Link data-cursor-target href="/about" className="hover:text-ink">Студия</Link>
          <Link data-cursor-target href="/contact" className="hover:text-ink">Контакты</Link>
        </nav>
      </div>

      <div className="pointer-events-none mt-10 overflow-hidden">
        <LiquidWordmark className="text-[24vw] leading-[0.8]" />
      </div>

      <p className="mt-6 text-xs text-ink/40">
        © {new Date().getFullYear()} {studio.name}. Все проекты на этой странице —
        плейсхолдеры.
      </p>
    </footer>
  );
}
