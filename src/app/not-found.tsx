import Link from "next/link";
import { LiquidWordmark } from "@/components/LiquidWordmark";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-[var(--edge)] text-center">
      <LiquidWordmark className="text-[22vw] leading-none" />
      <p className="u-display text-3xl">Такой страницы нет</p>
      <Link
        href="/"
        data-cursor-target
        className="border-b border-burgundy pb-0.5 text-burgundy"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
