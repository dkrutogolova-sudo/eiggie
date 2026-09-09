import type { AccentKey } from "@/data/projects";

/**
 * Stand-in for real project media. Deterministic playful gradient derived from a
 * seed string so the same project always renders the same frame. Replace with
 * <Image/> / <video> once assets land in /public/work/<slug>/.
 */

const PALETTE: Record<AccentKey, [string, string, string]> = {
  burgundy: ["#A63A4E", "#7C2B3B", "#F4EFE6"],
  glacier: ["#AAC9D9", "#5E93AE", "#F7F3EB"],
  nightsky: ["#1E2A3A", "#5E93AE", "#E3E4E6"],
  silver: ["#E3E4E6", "#AAC9D9", "#F7F3EB"],
};

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.4'/></svg>`,
  );

export function PlaceholderMedia({
  seed,
  accent,
  aspect = 16 / 9,
  kind = "image",
  index,
  label,
  className = "",
}: {
  seed: string;
  accent: AccentKey;
  aspect?: number;
  kind?: "image" | "video" | "series";
  index?: number;
  label?: string;
  className?: string;
}) {
  const a = hash(seed);
  const b = hash(seed + "b");
  const c = hash(seed + "c");
  const [c1, c2, c3] = PALETTE[accent];

  const bg = [
    `radial-gradient(60% 80% at ${10 + a * 80}% ${10 + b * 30}%, ${c1} 0%, transparent 60%)`,
    `radial-gradient(70% 90% at ${80 - b * 60}% ${70 + c * 25}%, ${c2} 0%, transparent 65%)`,
    `radial-gradient(120% 120% at ${50 + (a - 0.5) * 40}% ${50}%, ${c3} 0%, ${c3} 20%, transparent 70%)`,
    `linear-gradient(${Math.round(a * 360)}deg, ${c2}, ${c1})`,
  ].join(", ");

  return (
    <div
      className={`relative isolate overflow-hidden rounded-[10px] ${className}`}
      style={{ aspectRatio: String(aspect), background: bg }}
    >
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-[0.25]"
        style={{ backgroundImage: `url("${GRAIN}")`, backgroundSize: "180px 180px" }}
      />
      {typeof index === "number" && (
        <span className="u-display absolute -bottom-4 -left-1 select-none text-[28vw] leading-none text-paper/15 md:text-[10rem]">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      {kind === "video" && (
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-paper backdrop-blur">
          <svg width="8" height="9" viewBox="0 0 8 9" fill="currentColor">
            <path d="M0 0l8 4.5L0 9z" />
          </svg>
          video
        </span>
      )}
      {kind === "series" && (
        <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-paper backdrop-blur">
          серия
        </span>
      )}
      {label && (
        <span className="absolute bottom-3 left-3 right-3 text-[11px] font-medium text-paper/90 drop-shadow">
          {label}
        </span>
      )}
    </div>
  );
}
