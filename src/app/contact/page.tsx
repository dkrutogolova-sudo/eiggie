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
    ["Telegram", studio.contacts.telegram, "#"],
    ["Instagram", studio.contacts.instagram, "#"],
    ["Behance", studio.contacts.behance, "#"],
  ] as const;

  return (
    <div className="px-[var(--edge)] pb-[18vh] pt-[26vh]">
      <h1 className="u-display max-w-[12ch] text-[clamp(2.8rem,10vw,8rem)] leading-[0.9]">
        Напишите нам
      </h1>
      <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-ink/70">
        Контакты пока заглушки — обновим, как только определимся с адресами.
        Пишите про проекты, коллаборации и странные идеи.
      </p>

      <ul className="mt-16 max-w-2xl divide-y divide-ink/12 border-y border-ink/12">
        {rows.map(([label, value, href]) => (
          <li key={label}>
            <a
              href={href}
              data-cursor-target
              className="flex items-center justify-between gap-6 py-6 text-lg transition-colors hover:text-burgundy"
            >
              <span className="text-sm uppercase tracking-[0.12em] text-ink/45">
                {label}
              </span>
              <span className="text-right">{value}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
