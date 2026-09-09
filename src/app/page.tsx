import { Hero } from "@/components/Hero";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Reveal } from "@/components/Reveal";
import { studio } from "@/data/studio";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectIndex />

      <Reveal
        as="section"
        wonky
        stagger
        className="grid gap-8 px-[var(--edge)] py-[18vh] md:grid-cols-[0.9fr_1.1fr] md:gap-12"
      >
        <h2 className="u-display text-[clamp(2rem,6vw,4rem)] leading-[1]">
          Студия из двух человек и очень большого числа генераций
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-ink/70">
          <p>{studio.blurb}</p>
          <p>
            Мы не верим в «нажал кнопку — получил результат». Нейросети у нас — это
            материал и инструмент, а режиссура, монтаж и вкус остаются ручными.
          </p>
          <Link
            href="/about"
            data-cursor-target
            className="inline-block border-b border-burgundy pb-0.5 text-burgundy"
          >
            Подробнее о студии →
          </Link>
        </div>
      </Reveal>
    </>
  );
}
