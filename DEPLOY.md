# Деплой eiggie — GitHub Pages

Сайт статический (`output: "export"`). Хостинг — **GitHub Pages**, сборка —
**GitHub Actions** (`.github/workflows/deploy.yml`). Vercel недоступен из РФ.

## Разовая настройка (делаешь ты в браузере)

1. Код уже в репозитории `dkrutogolova-sudo/eiggie`.
2. Открой репозиторий → **Settings** → слева **Pages**.
3. **Build and deployment → Source** → выбери **GitHub Actions**.
4. Всё. При следующем пуше (или вкладка **Actions** → workflow → **Run workflow**)
   соберётся и выкатится на:
   **https://dkrutogolova-sudo.github.io/eiggie/**

Дальше каждый `git push` в `main` = авто-пересборка и деплой (~2–3 мин).

## Кастомный домен (когда купишь)

Домен покупай у российского регистратора (**reg.ru**, **nic.ru**, **timeweb**) —
зарубежные не оплатить рос. картой.

Когда домен будет:

1. В репозитории: **Settings → Pages → Custom domain** → вписать домен → Save.
   Появится файл `CNAME` в репозитории — это нормально.
2. У регистратора в DNS добавить записи (для apex-домена `example.com`):
   ```
   A   @   185.199.108.153
   A   @   185.199.109.153
   A   @   185.199.110.153
   A   @   185.199.111.153
   CNAME  www   dkrutogolova-sudo.github.io.
   ```
   (для поддомена вида `www.example.com` — только CNAME на `dkrutogolova-sudo.github.io.`)
3. В **Settings → Pages** дождаться галочки, включить **Enforce HTTPS**.
4. Прислать мне домен — я уберу `NEXT_PUBLIC_BASE_PATH` из
   `.github/workflows/deploy.yml` и поставлю `NEXT_PUBLIC_SITE_URL` на домен
   (пути перестанут быть `/eiggie/...`, станут от корня). Один коммит.

## Обновление контента

Правишь `src/data/projects.ts` / `src/data/studio.ts` (или присылаешь мне) →
`git push` → Actions сам пересоберёт. Новое видео — в `public/work/<slug>/`,
прогнать можно `node scripts/transcode.mjs`.

## Если репозиторий приватный

GitHub Pages для приватных репозиториев доступен на бесплатном плане
(GitHub Free) — сайт при этом публичный. Если Pages не включается — сделай
репозиторий публичным (**Settings → General → Danger Zone → Change visibility**).
