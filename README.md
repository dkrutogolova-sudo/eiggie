# eiggie

Портфолио нейроконтент-студии **eiggie**. Многостраничник на Next.js с постоянным
WebGL-фоном, «жидким» логотипом-заглушкой, метабол-курсором и скролл-анимацией.

См. [DESIGN.md](./DESIGN.md) — направление дизайна и анимации.

## Стек

- **Next.js 14** (App Router) + TypeScript
- **Three.js** — постоянный шейдерный фон (`@react-three/fiber` / `drei` подключены
  для будущих 3D-сцен на страницах проектов)
- **GSAP + ScrollTrigger** — скролл-анимация
- **Lenis** — инерционный скролл
- **Framer Motion** — переходы между страницами
- **Tailwind CSS** — вёрстка, токены палитры в `tailwind.config.ts`

## Запуск

Нужен Node.js 20+ (см. `.nvmrc`).

```bash
npm install
npm run dev
```

Открыть http://localhost:3000

## Структура

```
src/
  app/
    layout.tsx            корневой лэйаут: фон, курсор, плавный скролл, шапка/подвал
    template.tsx          переход между страницами
    page.tsx              главная (герой + список проектов + блок о студии)
    work/[slug]/page.tsx  страница проекта
    about/page.tsx
    contact/page.tsx
  components/
    BackgroundCanvas.tsx  WebGL-фон (шейдер)
    Cursor.tsx            метабол-курсор
    LiquidWordmark.tsx    логотип-заглушка
    SmoothScroll.tsx      Lenis + синхронизация с ScrollTrigger
    Reveal.tsx            обёртка для скролл-ревилов
    ProjectIndex.tsx      список проектов на главной
    ProjectCard.tsx       карточка проекта (мобильная сетка)
    MediaGallery.tsx      медиа на странице проекта (серии/видео/кадры)
    Hero.tsx, SiteHeader.tsx, SiteFooter.tsx
  data/
    projects.ts           12 проектов-заглушек (год, стек, описание, медиа)
    studio.ts              студия, основатели, контакты (заглушки)
  lib/
    goo.tsx               SVG goo-фильтры
    useReducedMotion.ts
```

## Что временное

Логотип, контакты, тексты о студии, все 12 проектов и вся медиа — плейсхолдеры.
Реальные ассеты кладём в `public/work/<slug>/`. Подробности — в конце `DESIGN.md`.

## Деплой

Проект готов к деплою на Vercel (`next build`). Домен подключим перед запуском.
