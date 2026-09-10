/**
 * One-shot media pipeline for eiggie.
 *
 * Reads the raw drops in ~/Downloads/{Андрес,Дашка}, transcodes every clip to a
 * web-safe H.264 MP4 (capped at 1080 on the short edge, +faststart), pulls a
 * poster frame, and downsizes the photo series to JPG. Output lands in
 * public/work/<slug>/.
 *
 *   node scripts/transcode.mjs           # do everything (skips existing)
 *   node scripts/transcode.mjs --force   # re-encode even if the output exists
 *
 * ffmpeg comes from the `ffmpeg-static` devDependency — no system install.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
import ffmpegPath from "ffmpeg-static";

const FORCE = process.argv.includes("--force");
const ROOT = join(import.meta.dirname, "..");
const A = join(homedir(), "Downloads", "Андрес");
const D = join(homedir(), "Downloads", "Дашка");
const OUT = join(ROOT, "public", "work");

/** slug -> { videos: [[srcPath, name]], images: [[srcPath, name]] } */
const MANIFEST = {
  "bottega-veneta": { videos: [[join(A, "Bottega Veneta.mp4"), "film"]] },
  diesel: { videos: [[join(A, "Diesel.mp4"), "film"]] },
  "diesel-mismillato": { videos: [[join(A, "DIESEL x Mismillato.mp4"), "film"]] },
  "gentle-monster": { videos: [[join(A, "Gentle Monster.mp4"), "film"]] },
  "maison-margiela": { videos: [[join(A, "Maison Margiela.mp4"), "film"]] },
  "consistency-studies": {
    videos: [
      [join(A, "hf_20260716_211955_2a51b6fd-8c72-43a9-9c8f-4c4ccc0837d6.mp4"), "motion"],
    ],
    images: [
      [join(A, "Серия фото 2", "freepik__lowangle-fashion-editorial-portraitcamera-position__14908.png"), "a-01"],
      [join(A, "Серия фото 2", "freepik__leave-everything-unchanged-in-the-first-photo-but-__51733.png"), "a-02"],
      [join(A, "Серия фото 2", "freepik__leave-the-first-frame-unchanged-replace-the-eye-co__51736.png"), "a-03"],
      [join(A, "Серия фото 2", "freepik__leave-the-fifth-frame-unchanged-make-the-angle-exa__51734.png"), "a-04"],
      [join(A, "Серия фото 2", "freepik__leave-the-fifth-frame-unchanged-make-the-angle-exa__64775.png"), "a-05"],
      [join(A, "Серия фото 1", "61b0a768aff2be48449b02b06c2a0ac6_f11939eb-aa77-4a77-9072-de0a642cacd1.jpg"), "b-01"],
      [join(A, "Серия фото 1", "78eee6841863dda9e449a0cac156fc2d_cc930aa6-3378-4e39-877b-d21790ad3d69.jpg"), "b-02"],
      [join(A, "Серия фото 1", "f77edf67827bfebe7c63ebc63af07b88_1eeca354-2ad0-40a7-aa93-8b5eb898b387.jpg"), "b-03"],
    ],
  },
  "film-emulation": {
    videos: [
      [join(D, "dehancer-1773420091790 2.MOV"), "01"],
      [join(D, "dehancer-1773532060592.MOV"), "02"],
      [join(D, "dehancer-1779195483129.MOV"), "03"],
      [join(D, "dehancer-1784679694500.MOV"), "04"],
      [join(D, "dehancer-1785937467005.MOV"), "05"],
    ],
  },
  "long-form": {
    videos: [
      [join(D, "-6376069564772447483.MP4"), "01"],
      [join(D, "1798263621388941179.MP4"), "02"],
    ],
  },
};

const SCALE = "scale='if(gt(a,1),-2,1080)':'if(gt(a,1),1080,-2)'";
const mb = (p) => (statSync(p).size / 1048576).toFixed(1) + " MB";

function ff(args) {
  execFileSync(ffmpegPath, ["-hide_banner", "-loglevel", "error", "-y", ...args], {
    stdio: ["ignore", "inherit", "inherit"],
  });
}

function duration(src) {
  const out = execFileSync(ffmpegPath, ["-hide_banner", "-i", src], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).toString?.() ?? "";
  // ffmpeg prints "Duration: HH:MM:SS.xx" to stderr; execFileSync throws on the
  // "no output" exit, so this is caught below and parsed from the error.
  return out;
}
function durSeconds(src) {
  let text = "";
  try {
    execFileSync(ffmpegPath, ["-hide_banner", "-i", src], { stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    text = (e.stderr || "").toString();
  }
  const m = text.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
  if (!m) return 6;
  return +m[1] * 3600 + +m[2] * 60 + +m[3];
}

let done = 0;
let skipped = 0;

for (const [slug, entry] of Object.entries(MANIFEST)) {
  const dir = join(OUT, slug);
  mkdirSync(dir, { recursive: true });

  for (const [src, name] of entry.videos ?? []) {
    if (!existsSync(src)) {
      console.error(`  MISSING  ${src}`);
      continue;
    }
    const mp4 = join(dir, `${name}.mp4`);
    const poster = join(dir, `${name}.jpg`);

    if (!FORCE && existsSync(mp4) && existsSync(poster)) {
      skipped++;
      console.log(`  skip     ${slug}/${name}`);
      continue;
    }

    console.log(`  encode   ${slug}/${name}  (${mb(src)} source)`);
    ff([
      "-i", src,
      "-map", "0:v:0", "-map", "0:a:0?",
      "-vf", SCALE,
      "-c:v", "libx264", "-profile:v", "high", "-preset", "medium", "-crf", "24",
      "-pix_fmt", "yuv420p",
      "-c:a", "aac", "-b:a", "128k",
      "-movflags", "+faststart",
      mp4,
    ]);

    const at = Math.max(0.1, durSeconds(src) * 0.35).toFixed(2);
    ff(["-ss", at, "-i", src, "-frames:v", "1", "-vf", SCALE, "-q:v", "3", poster]);
    console.log(`           -> ${name}.mp4 ${mb(mp4)}, poster ${mb(poster)}`);
    done++;
  }

  for (const [src, name] of entry.images ?? []) {
    if (!existsSync(src)) {
      console.error(`  MISSING  ${src}`);
      continue;
    }
    const jpg = join(dir, `${name}.jpg`);
    if (!FORCE && existsSync(jpg)) {
      skipped++;
      console.log(`  skip     ${slug}/${name}`);
      continue;
    }
    console.log(`  image    ${slug}/${name}`);
    ff(["-i", src, "-vf", "scale='min(1800,iw)':-2", "-q:v", "3", jpg]);
    done++;
  }
}

console.log(`\ndone: ${done} written, ${skipped} skipped.`);
