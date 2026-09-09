/**
 * PLACEHOLDER PROJECTS
 * --------------------
 * 12 fictional case studies so the layout, grid and animations have real shape.
 * Descriptions are written by us as stand-ins — swap freely.
 * Media is generated on the fly by <PlaceholderMedia/> (no binary assets yet):
 *   - kind: "image"  -> single frame
 *   - kind: "video"  -> single frame tagged as motion
 *   - kind: "series" -> a group of N frames that live inside ONE project
 *
 * Real assets later: drop files in /public/work/<slug>/ and replace `media`
 * with { kind, src, alt, aspect }.
 */

export type AccentKey = "burgundy" | "glacier" | "nightsky" | "silver";

export type Media =
  | { kind: "image"; aspect?: number; caption?: string }
  | { kind: "video"; aspect?: number; caption?: string }
  | { kind: "series"; count: number; aspect?: number; caption?: string };

export type Project = {
  slug: string;
  title: string;
  /** Год создания */
  year: number;
  /** Стек создания — модели и инструменты продакшена */
  stack: string[];
  role: string;
  client: string;
  /** one-liner for the index */
  summary: string;
  /** full paragraphs for the detail page */
  description: string[];
  accent: AccentKey;
  media: Media[];
};

export const projects: Project[] = [
  {
    slug: "synthetic-bloom",
    title: "Synthetic Bloom",
    year: 2025,
    stack: ["Midjourney v7", "Runway Gen-3", "Kling 2.0", "After Effects", "Blender"],
    role: "Идея, режиссура, пост-продакшн",
    client: "Парфюмерный бренд (NDA)",
    summary: "Ботанический фильм для запуска аромата — цветы, которых не существует.",
    description: [
      "Заказчик хотел ролик про аромат без единой реальной съёмки. Мы собрали библиотеку из 200+ несуществующих растений и вырастили из них 60 секунд непрерывного цветения.",
      "Ключевая задача — консистентность: один и тот же вымышленный цветок должен раскрываться в трёх разных сценах. Собрали пайплайн из reference-сетов и покадрового ретайминга, чтобы движение выглядело органично, а не как морфинг.",
      "Финальный грейдинг и звук — вручную. Нейронки дали материал, но ритм фильма ставили на монтажном столе.",
    ],
    accent: "burgundy",
    media: [
      { kind: "video", aspect: 16 / 9, caption: "Мастер-ролик, 60 сек" },
      { kind: "series", count: 6, aspect: 3 / 4, caption: "Каталог несуществующих растений" },
      { kind: "image", aspect: 16 / 9, caption: "Кадр из финальной сцены" },
    ],
  },
  {
    slug: "echo-chamber",
    title: "Echo Chamber",
    year: 2025,
    stack: ["Stable Diffusion XL", "TouchDesigner", "Ableton Live", "ComfyUI"],
    role: "Визуальная система, реал-тайм",
    client: "Электронный музыкант",
    summary: "Клип, где картинка целиком управляется звуком в реальном времени.",
    description: [
      "Не пост-фактум монтаж под трек, а обратная связь: амплитуда и спектр гонят латентное пространство модели, картинка дышит вместе с музыкой.",
      "Собрали в TouchDesigner цепочку, которая дёргает диффузию покадрово и держит 24 fps на одной RTX 4090.",
      "Артефакты и глитчи оставили намеренно — это часть эстетики, а не баг.",
    ],
    accent: "nightsky",
    media: [
      { kind: "video", aspect: 16 / 9, caption: "Официальный клип" },
      { kind: "series", count: 4, aspect: 16 / 9, caption: "Стоп-кадры реакции на бас" },
    ],
  },
  {
    slug: "paper-cities",
    title: "Paper Cities",
    year: 2024,
    stack: ["Flux.1", "ComfyUI", "Photoshop", "Risograph"],
    role: "Арт-серия, печать",
    client: "Собственный проект",
    summary: "Серия архитектурных коллажей: города, сложенные из бумаги.",
    description: [
      "Личный проект студии: 24 изображения вымышленных городов, где вся архитектура выглядит как бумажный макет в масштабе 1:100.",
      "Каждый кадр досводился вручную и печатался ризографом в два прогона — цифровая генерация, аналоговый вывод.",
      "Серия целиком показывалась на групповой выставке; шесть работ ушли в частные коллекции.",
    ],
    accent: "silver",
    media: [
      { kind: "series", count: 6, aspect: 1, caption: "24 города, отобрано 6" },
      { kind: "image", aspect: 4 / 5, caption: "Ризо-отпечаток, деталь" },
    ],
  },
  {
    slug: "neon-fauna",
    title: "Neon Fauna",
    year: 2025,
    stack: ["Midjourney v7", "Nano Banana", "Cinema 4D", "Octane"],
    role: "Дизайн вселенной, 3D",
    client: "Стриминговый сервис",
    summary: "Вселенная из 40 существ-маскотов для сезонной кампании.",
    description: [
      "Нужен был не один маскот, а целый бестиарий с единой пластикой: 40 существ, узнаваемых силуэтом даже в миниатюре.",
      "Двумерные концепты из Midjourney переносили в Cinema 4D, чтобы получить консистентные повороты и анимацию для соцсетей.",
      "Гайдлайн на 60 страниц: как существа двигаются, как звучат, что им можно и нельзя.",
    ],
    accent: "glacier",
    media: [
      { kind: "series", count: 9, aspect: 1, caption: "Бестиарий, 40 существ" },
      { kind: "video", aspect: 1, caption: "Луп-анимация для сторис" },
    ],
  },
  {
    slug: "the-weather-room",
    title: "The Weather Room",
    year: 2024,
    stack: ["ComfyUI", "Unreal Engine 5", "Kinect", "Notch"],
    role: "Инсталляция, интерактив",
    client: "Музей современного искусства",
    summary: "Комната, которая генерирует погоду по вашим движениям.",
    description: [
      "Интерактивная инсталляция: сенсор считывает позу и скорость посетителя, модель рисует небо, проекция на четыре стены.",
      "Медленно идёшь — туман и штиль; резко машешь руками — собирается гроза. Ни один сеанс не повторяется.",
      "За три месяца через комнату прошло около 14 000 человек.",
    ],
    accent: "nightsky",
    media: [
      { kind: "video", aspect: 16 / 9, caption: "Документация инсталляции" },
      { kind: "series", count: 5, aspect: 16 / 9, caption: "Состояния неба" },
    ],
  },
  {
    slug: "soft-machine",
    title: "Soft Machine",
    year: 2025,
    stack: ["Krea", "Magnific", "Nuke", "DaVinci Resolve"],
    role: "Ки-вижуалы кампании",
    client: "Бренд бытовой техники",
    summary: "Продуктовая кампания, где вся техника снята камерой, которой нет.",
    description: [
      "Восемь ки-вижуалов для наружки и диджитала: продукт в невозможных интерьерах, снятый несуществующими объективами.",
      "Реальные 3D-модели продукта комбинировали с нейро-фонами и апскейлили до 8K под печать на билбордах.",
      "Композ и чистка — в Nuke, чтобы отражения и тени на продукте были физически корректны.",
    ],
    accent: "burgundy",
    media: [
      { kind: "series", count: 8, aspect: 4 / 5, caption: "Ки-вижуалы кампании" },
      { kind: "image", aspect: 16 / 9, caption: "Раскладка наружки" },
    ],
  },
  {
    slug: "dream-logs",
    title: "Dream Logs",
    year: 2024,
    stack: ["DALL·E 3", "GPT-4o", "Figma", "Cursor"],
    role: "Генеративный проект, 365 дней",
    client: "Собственный проект",
    summary: "Ежедневный визуальный дневник: 365 снов, по одному в день.",
    description: [
      "Год студия каждое утро записывала обрывок сна текстом и в тот же день превращала его в изображение по фиксированному пайплайну.",
      "Правило: никакого черри-пикинга. Первая генерация — она же финальная, что бы ни вышло.",
      "К концу года собрался архив на 365 работ и издание в виде книги-календаря.",
    ],
    accent: "glacier",
    media: [
      { kind: "series", count: 12, aspect: 1, caption: "Выборка из 365" },
      { kind: "image", aspect: 3 / 2, caption: "Разворот книги" },
    ],
  },
  {
    slug: "chromatophore",
    title: "Chromatophore",
    year: 2025,
    stack: ["Flux Kontext", "Runway Gen-3", "After Effects", "DaVinci Resolve"],
    role: "Лукбук, моушн",
    client: "Модный бренд",
    summary: "Лукбук, в котором ткань меняет цвет прямо в кадре.",
    description: [
      "Съёмка одежды, где материал ведёт себя как кожа осьминога — цвет и паттерн текут по ткани, реагируя на движение модели.",
      "Реальную фотосессию использовали как основу, нейро-слой добавлял хроматофорный эффект покадрово с сохранением драпировки.",
      "12 образов, из них 4 в движении для показа на маркетплейсе.",
    ],
    accent: "burgundy",
    media: [
      { kind: "video", aspect: 9 / 16, caption: "Образ в движении" },
      { kind: "series", count: 6, aspect: 3 / 4, caption: "Лукбук, 12 образов" },
    ],
  },
  {
    slug: "ghost-typography",
    title: "Ghost Typography",
    year: 2024,
    stack: ["Stable Diffusion", "Houdini", "GSAP", "Lottie"],
    role: "Кинетический шрифт, система",
    client: "Диджитал-агентство",
    summary: "Живой шрифт для сайта: буквы собираются из дыма и распадаются.",
    description: [
      "Задача — заголовочный шрифт, который на вебе выглядит как объёмная субстанция, но весит как обычный шрифт.",
      "Симуляции дыма в Houdini прогнали через диффузию для фактуры, потом запекли в спрайт-листы и оживили через GSAP.",
      "Итог — библиотека из 30 анимированных глифов, работает в браузере на 60 fps.",
    ],
    accent: "nightsky",
    media: [
      { kind: "video", aspect: 16 / 9, caption: "Демо шрифта" },
      { kind: "series", count: 4, aspect: 16 / 9, caption: "Стадии сборки глифа" },
    ],
  },
  {
    slug: "second-nature",
    title: "Second Nature",
    year: 2025,
    stack: ["Kling 2.0", "Veo 3", "Premiere Pro", "RX 11"],
    role: "Короткий метр, режиссура",
    client: "Экологический фонд",
    summary: "Псевдодокументальный фильм о рефайндинге через 100 лет.",
    description: [
      "10-минутный фильм-предположение: как выглядят заброшенные города, отданные природе, через век.",
      "Снят целиком нейросетями в стилистике натурфильма — с «архивными» вставками и закадровым голосом.",
      "Показан на трёх фестивалях, взял приз за визуальные решения на одном из них.",
    ],
    accent: "glacier",
    media: [
      { kind: "video", aspect: 16 / 9, caption: "Трейлер" },
      { kind: "series", count: 5, aspect: 16 / 9, caption: "Кадры: города через 100 лет" },
    ],
  },
  {
    slug: "vending-mythology",
    title: "Vending Mythology",
    year: 2024,
    stack: ["Midjourney v6", "Pika 1.5", "Luma", "After Effects"],
    role: "Рекламная серия",
    client: "Бренд напитков",
    summary: "Абсурдистская серия роликов: боги, которые покупают газировку в автомате.",
    description: [
      "Шесть 15-секундных роликов для соцсетей: античные божества сталкиваются с торговым автоматом и проигрывают.",
      "Быстрый пайплайн — от сценария до готового ролика три дня на штуку, чтобы попадать в новостную повестку.",
      "Суммарно серия набрала несколько миллионов просмотров без платного продвижения.",
    ],
    accent: "burgundy",
    media: [
      { kind: "series", count: 6, aspect: 1, caption: "6 роликов серии" },
      { kind: "video", aspect: 1, caption: "Ролик «Зевс и сдача»" },
    ],
  },
  {
    slug: "latent-space-tourism",
    title: "Latent Space Tourism",
    year: 2025,
    stack: ["SDXL", "Photoshop", "Risograph", "Blender"],
    role: "Плакатная серия, печать",
    client: "Собственный проект",
    summary: "Ретро-плакаты путешествий по местам, которых не может быть.",
    description: [
      "Оммаж плакатам середины XX века: 16 постеров туристических направлений внутри латентного пространства модели.",
      "Тщательная работа с типографикой и палитрой под ризо-печать — генерация давала только «фотофон».",
      "Тираж 100 нумерованных комплектов, разошёлся за две недели.",
    ],
    accent: "silver",
    media: [
      { kind: "series", count: 8, aspect: 3 / 4, caption: "16 плакатов, отобрано 8" },
      { kind: "image", aspect: 3 / 4, caption: "Постер «Побережье №7»" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
