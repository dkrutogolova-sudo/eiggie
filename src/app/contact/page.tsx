import type { Metadata } from "next";
import { studio } from "@/data/studio";
import { LiquidWordmark } from "@/components/LiquidWordmark";

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
    <div className="flex min-h-[100dvh] flex-col justify-between px-[var(--edge)] pt-[24vh]">
      <div>
        <h1 className="u-display text-[clamp(2.6rem,10vw,8rem)] leading-[0.88]">
          Напишите нам
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg text-ink/70">
          Контакты пока заглушки — обновим, как только определимся с адресами.
          Пишите про проекты, коллаборации и странные идеи.
        </p>

        <ul className="mt-12 max-w-2xl divide-y divide-ink/12 border-y border-ink/12">
          {rows.map(([label, value, href]) => (
            <li key={label}>
              <a
                href={href}
                data-cursor-target
                data-cursor-label="Скопировать"
                className="flex items-center justify-between py-5 text-lg transition-colors hover:text-burgundy"
              >
                <span className="text-sm uppercase tracking-[0.12em] text-ink/45">
                  {label}
                </span>
                <span>{value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="pointer-events-none overflow-hidden pb-6">
        <LiquidWordmark className="text-[30vw] leading-[0.8]" />
      </div>
    </div>
  );
}
