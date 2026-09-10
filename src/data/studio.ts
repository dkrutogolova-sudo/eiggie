export const studio = {
  name: "eiggie",
  tagline: "Нейроконтент-студия",
  // Placeholder blurb — replace with the real "about" copy.
  blurb:
    "eiggie — студия нейроконтента. Мы придумываем и собираем визуальные истории на стыке генеративных моделей и ручного продакшена: фильмы, кампании, инсталляции, айдентику.",
  founders: [
    {
      name: "Андрей Почивалов",
      role: "Креативный директор / продакшн",
      photo: "/about/andrey.jpg",
      // Placeholder — replace.
      bio: "Отвечает за идею, режиссуру и то, чтобы из тысячи генераций осталась одна нужная.",
    },
    {
      name: "Дарья Крутоголова",
      role: "Арт-директор / пайплайн",
      photo: "/about/darya.jpg",
      // Placeholder — replace.
      bio: "Строит визуальный язык проекта и пайплайн, в котором нейронки работают предсказуемо.",
    },
  ],
  // All contacts are placeholders — fill in later.
  contacts: {
    email: "hello@eiggie.studio", // TODO: заглушка
    telegram: "@eiggie", // TODO: заглушка
    instagram: "eiggie.studio", // TODO: заглушка
    behance: "eiggie", // TODO: заглушка
  },
  location: "TODO: город / удалённо",
} as const;
