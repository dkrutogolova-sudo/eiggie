import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProject } from "@/data/projects";
import { MediaGallery } from "@/components/MediaGallery";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="pt-[26vh]">
      <header className="px-[var(--edge)]">
        <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.16em] text-ink/50">
          {project.client}
        </p>
        <h1 className="u-display text-[clamp(2.6rem,9vw,7rem)] leading-[0.9]">
          {project.title}
        </h1>

        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 border-t border-ink/12 pt-6 text-sm md:grid-cols-3">
          <div>
            <dt className="mb-1 uppercase tracking-[0.12em] text-ink/45">Год</dt>
            <dd className="tabular-nums">{project.year}</dd>
          </div>
          <div>
            <dt className="mb-1 uppercase tracking-[0.12em] text-ink/45">Автор</dt>
            <dd>{project.author}</dd>
          </div>
          <div>
            <dt className="mb-1 uppercase tracking-[0.12em] text-ink/45">Роль</dt>
            <dd>{project.role}</dd>
          </div>
          <div className="col-span-2 md:col-span-3">
            <dt className="mb-1 uppercase tracking-[0.12em] text-ink/45">Стек</dt>
            <dd className="flex flex-wrap gap-x-2 gap-y-1">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-ink/15 px-2 py-0.5 text-[13px]"
                >
                  {s}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="mt-12 max-w-[62ch] space-y-4 text-lg leading-relaxed text-ink/75">
          {project.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </header>

      <div className="mt-[10vh]">
        <MediaGallery project={project} />
      </div>

      <Reveal
        as="section"
        className="mt-[14vh] border-t border-ink/12 px-[var(--edge)] py-14"
      >
        <p className="text-[13px] uppercase tracking-[0.16em] text-ink/45">
          Следующий проект
        </p>
        <Link
          href={`/work/${next.slug}`}
          data-cursor-target
          data-cursor-label="Открыть"
          className="u-display mt-2 inline-block text-[clamp(2rem,7vw,5rem)] transition-colors hover:text-burgundy"
        >
          {next.title} →
        </Link>
      </Reveal>
    </article>
  );
}
