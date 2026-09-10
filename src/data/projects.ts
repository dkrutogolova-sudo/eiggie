/**
 * Real work, wired to transcoded media in /public/work/<slug>/.
 * Video (.mp4) is git-ignored and regenerated from the raw drops with
 * `node scripts/transcode.mjs`; poster/still JPGs are committed.
 *
 * Descriptions here are our best-guess placeholders — years and stacks too.
 * Correct them freely; the shapes are what matters.
 */

export type AccentKey = "burgundy" | "glacier" | "nightsky" | "silver";
export type Author = "Андрей Почивалов" | "Дарья Крутоголова" | "eiggie";

export type Media =
  | { kind: "video"; src: string; poster: string; aspect: number; caption?: string }
  | { kind: "image"; src: string; aspect: number; caption?: string }
  | { kind: "series"; aspect: number; images: string[]; caption?: string };

export type Project = {
  slug: string;
  title: string;
  /** Год создания — уточнить */
  year: number;
  /** Стек создания — модели и инструменты продакшена (примерно) */
  stack: string[];
  role: string;
  author: Author;
  client: string;
  /** one-liner for the index */
  summary: string;
  /** full paragraphs for the detail page */
  description: string[];
  accent: AccentKey;
  /** representative still for the index / cards */
  cover: string;
  coverAspect: number;
  media: Media[];
};

const BRAND_STACK = ["Kling 2.0", "Midjourney v7", "Magnific", "After Effects", "DaVinci Resolve"];
const ANDREY_ROLE = "Идея, режиссура, продакшн";
const DARYA_ROLE = "Арт-дирекшн, цвет, пайплайн";

export const projects: Project[] = [
  {
    slug: "bottega-veneta",
    title: "Bottega Veneta",
    year: 2025,
    stack: BRAND_STACK,
    role: ANDREY_ROLE,
    author: "Андрей Почивалов",
    client: "Bottega Veneta · концепт",
    summary: "Вертикальный тизер: фактура кожи и свет, целиком сгенерированные.",
    description: [
      "Шестисекундная петля под ленту соцсетей. Задача — не «показать сумку», а передать тактильность: плетение, блик, вес материала.",
      "Снято без камеры. Реф-сеты собирались под конкретную фактуру, движение доводилось покадрово, чтобы кожа вела себя как кожа.",
      "Финальный грейд и зерно — вручную.",
    ],
    accent: "burgundy",
    cover: "/work/bottega-veneta/film.jpg",
    coverAspect: 0.558,
    media: [
      {
        kind: "video",
        src: "/work/bottega-veneta/film.mp4",
        poster: "/work/bottega-veneta/film.jpg",
        aspect: 0.558,
        caption: "Тизер, 6 сек",
      },
    ],
  },
  {
    slug: "gentle-monster",
    title: "Gentle Monster",
    year: 2025,
    stack: BRAND_STACK,
    role: ANDREY_ROLE,
    author: "Андрей Почивалов",
    client: "Gentle Monster · концепт",
    summary: "Ролик в фирменной «странной» эстетике бренда — объекты, которые почти живые.",
    description: [
      "Gentle Monster живёт сюрреалистичными инсталляциями. Мы попробовали продолжить этот язык генеративно: предмет в кадре ведёт себя не по физике.",
      "Ключевое — удержать один и тот же объект узнаваемым через несколько планов.",
      "Девять секунд, вертикаль, петля.",
    ],
    accent: "glacier",
    cover: "/work/gentle-monster/film.jpg",
    coverAspect: 0.558,
    media: [
      {
        kind: "video",
        src: "/work/gentle-monster/film.mp4",
        poster: "/work/gentle-monster/film.jpg",
        aspect: 0.558,
        caption: "Ролик, 9 сек",
      },
    ],
  },
  {
    slug: "maison-margiela",
    title: "Maison Margiela",
    year: 2025,
    stack: BRAND_STACK,
    role: ANDREY_ROLE,
    author: "Андрей Почивалов",
    client: "Maison Margiela · концепт",
    summary: "Тихий, почти документальный кадр — ткань, шов, движение по телу.",
    description: [
      "Эстетика Margiela — недосказанность и деконструкция. Здесь минимум событий: свет по ткани, лёгкое движение, крупный план шва.",
      "Вся сложность — в консистентности материала между кадрами.",
      "Восемь секунд, вертикаль.",
    ],
    accent: "nightsky",
    cover: "/work/maison-margiela/film.jpg",
    coverAspect: 0.558,
    media: [
      {
        kind: "video",
        src: "/work/maison-margiela/film.mp4",
        poster: "/work/maison-margiela/film.jpg",
        aspect: 0.558,
        caption: "Ролик, 8 сек",
      },
    ],
  },
  {
    slug: "diesel",
    title: "Diesel",
    year: 2025,
    stack: BRAND_STACK,
    role: ANDREY_ROLE,
    author: "Андрей Почивалов",
    client: "Diesel · концепт",
    summary: "Более резкий монтажный ритм — деним, металл, контровой свет.",
    description: [
      "Diesel — это дерзость и деним. Ролик собран на более жёстком ритме, с контровым светом и фактурой металла.",
      "Десять секунд под вертикальную ленту.",
    ],
    accent: "burgundy",
    cover: "/work/diesel/film.jpg",
    coverAspect: 0.558,
    media: [
      {
        kind: "video",
        src: "/work/diesel/film.mp4",
        poster: "/work/diesel/film.jpg",
        aspect: 0.558,
        caption: "Ролик, 10 сек",
      },
    ],
  },
  {
    slug: "diesel-mismillato",
    title: "Diesel × Mismillato",
    year: 2025,
    stack: BRAND_STACK,
    role: ANDREY_ROLE,
    author: "Андрей Почивалов",
    client: "Diesel × Mismillato · концепт",
    summary: "Более длинная работа: коллаба, где два визуальных языка перетекают друг в друга.",
    description: [
      "Семнадцать секунд — почти полноценная сцена. Идея коллаборации: два стиля не рядом, а один сквозь другой, с переходом внутри кадра.",
      "Самый длинный ролик серии — здесь уже есть развитие, а не только настроение.",
    ],
    accent: "glacier",
    cover: "/work/diesel-mismillato/film.jpg",
    coverAspect: 0.558,
    media: [
      {
        kind: "video",
        src: "/work/diesel-mismillato/film.mp4",
        poster: "/work/diesel-mismillato/film.jpg",
        aspect: 0.558,
        caption: "Ролик, 17 сек",
      },
    ],
  },
  {
    slug: "consistency-studies",
    title: "Пробы на консистентность",
    year: 2026,
    stack: ["Freepik", "Flux Kontext", "Higgsfield", "Nano Banana", "Photoshop"],
    role: ANDREY_ROLE,
    author: "Андрей Почивалов",
    client: "Внутренний проект",
    summary: "Один портрет, десятки итераций: держим лицо, меняем ракурс, взгляд, кадр.",
    description: [
      "Рабочая серия про главную боль генеративного продакшена — консистентность персонажа. Берём один портрет и прогоняем через управляемые правки: «оставь лицо, поменяй ракурс», «оставь всё, поменяй цвет глаз».",
      "Между кадрами меняется ровно то, что нужно, остальное держится. По этим пробам потом собираются пайплайны для клиентских проектов.",
    ],
    accent: "silver",
    cover: "/work/consistency-studies/a-01.jpg",
    coverAspect: 0.806,
    media: [
      {
        kind: "series",
        aspect: 0.806,
        caption: "Итерации портрета — ракурс, взгляд, кадр",
        images: [
          "/work/consistency-studies/a-01.jpg",
          "/work/consistency-studies/a-02.jpg",
          "/work/consistency-studies/a-03.jpg",
          "/work/consistency-studies/a-04.jpg",
          "/work/consistency-studies/a-05.jpg",
        ],
      },
    ],
  },
  {
    // TODO: настоящее название и описание — что это за серия
    slug: "portrait-series",
    title: "Портретная серия",
    year: 2026,
    stack: ["Midjourney v7", "Flux Kontext", "Photoshop"],
    role: ANDREY_ROLE,
    author: "Андрей Почивалов",
    client: "Внутренний проект",
    summary: "Отдельная портретная серия — три кадра.",
    description: [
      "Три кадра одного образа. Плейсхолдер-описание — замени.",
    ],
    accent: "burgundy",
    cover: "/work/portrait-series/b-01.jpg",
    coverAspect: 0.806,
    media: [
      {
        kind: "series",
        aspect: 0.806,
        images: [
          "/work/portrait-series/b-01.jpg",
          "/work/portrait-series/b-02.jpg",
          "/work/portrait-series/b-03.jpg",
        ],
      },
    ],
  },
  {
    // TODO: настоящее название и описание
    slug: "portrait-motion",
    title: "Портрет в движении",
    year: 2026,
    stack: ["Higgsfield", "Kling 2.0", "After Effects"],
    role: ANDREY_ROLE,
    author: "Андрей Почивалов",
    client: "Внутренний проект",
    summary: "Отдельный мувинг-тест портрета — 15 секунд вертикали.",
    description: [
      "Короткий тест того же типа лица в движении. Плейсхолдер-описание — замени.",
    ],
    accent: "nightsky",
    cover: "/work/portrait-motion/motion.jpg",
    coverAspect: 0.5625,
    media: [
      {
        kind: "video",
        src: "/work/portrait-motion/motion.mp4",
        poster: "/work/portrait-motion/motion.jpg",
        aspect: 0.5625,
        caption: "Мувинг-тест, 15 сек",
      },
    ],
  },
  {
    slug: "film-emulation",
    title: "Плёночная эмуляция",
    year: 2026,
    stack: ["Kling 2.0", "Runway Gen-3", "Dehancer", "DaVinci Resolve"],
    role: DARYA_ROLE,
    author: "Дарья Крутоголова",
    client: "Внутренний проект",
    summary: "Пять клипов о том, как цифровая генерация получает характер плёнки.",
    description: [
      "Генеративное видео по умолчанию «слишком чистое». Серия проб: снимаем генеративно, потом прогоняем через плёночную эмуляцию — зерно, галация, сдвиг цвета, мягкие хайлайты.",
      "Разные исходники, разные форматы — от 4K-горизонтали до вертикали — и одна задача: чтобы кадр перестал выглядеть как рендер.",
    ],
    accent: "nightsky",
    cover: "/work/film-emulation/03.jpg",
    coverAspect: 1.778,
    media: [
      { kind: "video", src: "/work/film-emulation/01.mp4", poster: "/work/film-emulation/01.jpg", aspect: 1.791, caption: "01 — зерно и галация" },
      { kind: "video", src: "/work/film-emulation/02.mp4", poster: "/work/film-emulation/02.jpg", aspect: 1.791, caption: "02 — длинный проход" },
      { kind: "video", src: "/work/film-emulation/03.mp4", poster: "/work/film-emulation/03.jpg", aspect: 1.778, caption: "03 — 4K, мягкие хайлайты" },
      { kind: "video", src: "/work/film-emulation/04.mp4", poster: "/work/film-emulation/04.jpg", aspect: 1.778, caption: "04 — 4K, холодный сдвиг" },
      { kind: "video", src: "/work/film-emulation/05.mp4", poster: "/work/film-emulation/05.jpg", aspect: 0.5625, caption: "05 — вертикаль" },
    ],
  },
  {
    slug: "long-form",
    title: "Длинный метр",
    year: 2026,
    stack: ["Kling 2.0", "Veo 3", "Dehancer", "Premiere Pro"],
    role: DARYA_ROLE,
    author: "Дарья Крутоголова",
    client: "Внутренний проект",
    summary: "Две минутные работы — атмосферные, без склеек ради склеек.",
    description: [
      "Большинство генеративных роликов короткие: модель тяжело держит консистентность дольше нескольких секунд. Здесь — попытка минуты: длинные планы, минимум монтажа, ставка на настроение.",
      "Две работы примерно по минуте, горизонталь.",
    ],
    accent: "glacier",
    cover: "/work/long-form/01.jpg",
    coverAspect: 1.778,
    media: [
      { kind: "video", src: "/work/long-form/01.mp4", poster: "/work/long-form/01.jpg", aspect: 1.778, caption: "Фильм 1, ~60 сек" },
      { kind: "video", src: "/work/long-form/02.mp4", poster: "/work/long-form/02.jpg", aspect: 1.778, caption: "Фильм 2, ~64 сек" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
