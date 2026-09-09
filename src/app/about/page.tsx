import type { Metadata } from "next";
import { studio } from "@/data/studio";
import { Reveal } from "@/components/Reveal";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";

export const metadata: Metadata = {
  title: "Студия",
  description: studio.blurb,
};

export default function AboutPage() {
  return (
    <div className="px-[var(--edge)] pt-[22vh]">
      <Reveal as="h1" className="u-display max-w-[16ch] text-[clamp(2.6rem,9vw,7rem)] leading-[0.9]">
        Нейроконтент, собранный руками
      </Reveal>

      <div className="mt-12 max-w-[60ch] space-y-5 text-lg text-ink/75">
        <p>{studio.blurb}</p>
        <p>
          Название <span className="text-burgundy">eiggie</span> ничего не
          значит — это временный логотип-заглушка, который пока живёт как жидкая
          надпись. Настоящий знак появится позже.
        </p>
        <p>Локация: {studio.location}</p>
      </div>

      <section className="mt-[12vh] grid gap-12 md:grid-cols-2">
        {studio.founders.map((f, i) => (
          <Reveal key={f.name} wonky>
            <PlaceholderMedia
              seed={`founder-${i}`}
              accent={i === 0 ? "burgundy" : "glacier"}
              aspect={4 / 5}
              index={i}
            />
            <h2 className="u-display mt-4 text-3xl">{f.name}</h2>
            <p className="text-sm uppercase tracking-[0.12em] text-ink/45">
              {f.role}
            </p>
            <p className="mt-3 text-ink/70">{f.bio}</p>
          </Reveal>
        ))}
      </section>

      <section className="mt-[14vh] border-t border-ink/12 py-14">
        <h2 className="text-[13px] uppercase tracking-[0.16em] text-ink/45">
          Как мы работаем
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {[
            ["Идея вперёд инструмента", "Сначала решаем, что за история. Модель подбираем под неё, а не наоборот."],
            ["Пайплайн, а не рулетка", "Собираем повторяемый процесс: консистентные персонажи, кадры, стиль."],
            ["Ручной финал", "Монтаж, грейд, звук, типографика — всегда вручную."],
          ].map(([t, d]) => (
            <div key={t}>
              <h3 className="u-display text-2xl">{t}</h3>
              <p className="mt-2 text-ink/70">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
