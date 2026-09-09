import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center gap-5 px-[var(--edge)] pt-[20vh] text-center">
      <p className="u-display text-[clamp(4rem,16vw,10rem)] leading-none text-burgundy">
        404
      </p>
      <p className="u-display text-2xl md:text-3xl">Такой страницы нет</p>
      <Link
        href="/"
        data-cursor-target
        className="border-b border-burgundy pb-0.5 text-burgundy transition-colors hover:text-burgundy-bright"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
