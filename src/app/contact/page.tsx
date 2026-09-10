import type { Metadata } from "next";
import { studio } from "@/data/studio";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Связаться со студией eiggie.",
};

export default function ContactPage() {
  // Everything here is a placeholder — real handles go in src/data/studio.ts
  const rows = [
    ["Почта", studio.contacts.email, `mailto:${studio.contacts.email}`],
    ["Telegram", studio.contacts.telegram, null],
    ["Instagram", studio.contacts.instagram, null],
    ["Behance", studio.contacts.behance, null],
  ] as const;

  return (
    <div className="px-[var(--edge)] pb-[18vh] pt-[26vh]">
      <p
        className="u-display text-[clamp(1.9rem,5vw,3.4rem)] italic leading-[1.05] text-burgundy"
        style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
      >
        напишите нам —
      </p>
      <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink/70">
        Контакты пока заглушки, обновим, как только определимся с адресами. Пишите
        про проекты, коллаборации и странные идеи.
      </p>

      <div className="mt-16 max-w-3xl border-t border-ink/12">
        {rows.map(([label, value, href]) => (
          <div key={label} className="border-b border-ink/12">
            {href ? (
              <a
                href={href}
                data-cursor-target
                className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-6 transition-colors hover:text-burgundy"
              >
                <span className="w-24 shrink-0 text-sm uppercase tracking-[0.12em] text-ink/45">
                  {label}
                </span>
                <span className="u-display text-[clamp(1.4rem,3.4vw,2.2rem)]">
                  {value}
                </span>
              </a>
            ) : (
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-6 text-ink/70">
                <span className="w-24 shrink-0 text-sm uppercase tracking-[0.12em] text-ink/45">
                  {label}
                </span>
                <span className="u-display text-[clamp(1.4rem,3.4vw,2.2rem)]">
                  {value}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
