# Деплой eiggie

Хостинг — **Vercel** (план Hobby, бесплатный). Исходники — **GitHub**.
Видео закоммичены в репозиторий (`public/work/**/*.mp4`, ~78 МБ) и отдаются с CDN Vercel.

---

## 1. GitHub (делаешь ты)

1. Создай аккаунт на github.com.
2. Создай пустой репозиторий `eiggie` (без README, без .gitignore — они уже в проекте).
   Приватный можно.
3. Дай мне URL репозитория (`https://github.com/<логин>/eiggie.git`) — я запушу код.
   Либо запушь сам из папки проекта:

   ```bash
   cd ~/eiggie
   git remote add origin https://github.com/<логин>/eiggie.git
   git branch -M main
   git push -u origin main
   ```

   (Первый push ~80 МБ из-за видео — это нормально, один раз.)

## 2. Vercel (делаешь ты, ~2 минуты)

1. Зайди на vercel.com → **Sign up** → войти через GitHub.
2. **Add New… → Project** → выбери репозиторий `eiggie` → **Import**.
3. Настройки определятся автоматически (Framework: Next.js). Ничего менять не надо.
4. **Deploy**. Через ~1–2 минуты сайт живёт на `https://<имя>.vercel.app`.

С этого момента каждый `git push` в `main` = автоматический деплой.
Каждый пуш в другую ветку / PR = отдельная preview-ссылка.

## 3. Домен (когда купишь)

1. Купи домен у любого регистратора (Cloudflare Registrar, Namecheap, reg.ru…).
2. В Vercel: **Project → Settings → Domains → Add** → введи домен.
3. Vercel покажет, что прописать у регистратора. Обычно один из двух вариантов:
   - **A-запись** `@ → 76.76.21.21` и **CNAME** `www → cname.vercel-dns.com`, либо
   - перевод **неймсерверов** домена на Vercel (он их укажет).
4. Пришли мне домен — я выставлю его в коде:
   - `NEXT_PUBLIC_SITE_URL` в **Vercel → Settings → Environment Variables**
     (значение — `https://твойдомен`), это включит правильные ссылки в
     `metadataBase`, OG-превью, `sitemap.xml`, `robots.txt`.
   - После добавления переменной нужен один redeploy (кнопка в Vercel или пустой пуш).

## Что уже готово в проекте

- `next build` проходит чисто, 16 статических страниц.
- `public/og.png` — превью для мессенджеров; `src/app/icon.svg` — favicon.
- `src/app/sitemap.ts`, `src/app/robots.ts` — генерируются автоматически.
- `.nvmrc` = Node 20 (Vercel и так возьмёт правильную версию).

## Обновление контента после запуска

Правишь `src/data/projects.ts` / `src/data/studio.ts` (или присылаешь мне), затем:

```bash
cd ~/eiggie
git add -A && git commit -m "текст" && git push
```

Vercel сам пересоберёт и выкатит. Новые видео — класть в `public/work/<slug>/`,
можно прогнать через `node scripts/transcode.mjs` из сырых файлов.

## Если трафик вырастет

Hobby-план Vercel = 100 ГБ трафика в месяц. ~78 МБ видео при большом наплыве
это съедят. Тогда переносим видео на Cloudflare R2 / Stream или Vercel Blob и
меняем пути в `projects.ts` на внешние URL — отдельная небольшая задача.
