import type { Metadata } from "next";
import { studio } from "@/data/studio";
import { Reveal } from "@/components/Reveal";
import { Kinetic } from "@/components/Kinetic";

export const metadata: Metadata = {
  title: "Студия",
  description: studio.blurb,
};

export default function AboutPage() {
  return (
    <div className="px-[var(--edge)] pb-[12vh] pt-[26vh]">
      <Kinetic
        as="h1"
        text="Нейроконтент, собранный руками"
        className="u-display block max-w-[16ch] text-[clamp(2.6rem,9vw,7rem)] leading-[0.9]"
      />

      <div className="mt-12 max-w-[60ch] space-y-5 text-lg leading-relaxed text-ink/75">
        <p>{studio.blurb}</p>
        <p>
          Название <span className="text-burgundy">eiggie</span> ничего не
          значит — это временный логотип-заглушка, который пока живёт как жидкая
          надпись. Настоящий знак появится позже.
        </p>
        <p>Локация: {studio.location}</p>
      </div>

      <section className="mt-[16vh] grid gap-x-12 gap-y-20 md:grid-cols-2">
        {studio.founders.map((f) => (
          <Reveal key={f.name} wonky>
            <img
              src={f.photo}
              alt={f.name}
              className="w-full rounded-[10px] bg-ink/5 object-cover"
              style={{ aspectRatio: "1 / 1" }}
            />
            <h2 className="u-display mt-8 text-3xl">{f.name}</h2>
            <p className="mt-3 text-sm uppercase tracking-[0.12em] text-ink/45">
              {f.role}
            </p>
            <p className="mt-5 max-w-[42ch] leading-relaxed text-ink/70">{f.bio}</p>
          </Reveal>
        ))}
      </section>

      <section className="mt-[18vh] border-t border-ink/12 py-16">
        <h2 className="text-[13px] uppercase tracking-[0.16em] text-ink/45">
          Как мы работаем
        </h2>
        <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {[
            ["Идея вперёд инструмента", "Сначала решаем, что за история. Модель подбираем под неё, а не наоборот."],
            ["Пайплайн, а не рулетка", "Собираем повторяемый процесс: консистентные персонажи, кадры, стиль."],
            ["Ручной финал", "Монтаж, грейд, звук, типографика — всегда вручную."],
          ].map(([t, d]) => (
            <div key={t}>
              <h3 className="u-display text-2xl">{t}</h3>
              <p className="mt-3 leading-relaxed text-ink/70">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
