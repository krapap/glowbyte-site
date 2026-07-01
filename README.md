# GlowByte — сайт

Статический промо-сайт GlowByte (BI и Big Data) на чистом HTML/CSS/JS.

## Структура

- `index.html` — главная страница
- `blog.html` — блог
- `events.html` — мероприятия
- `assets/` — стили, скрипты, логотипы
  - `site.css`, `site.js` — общие стили и скрипты внутренних страниц
  - `logo-white.svg`, `logo-orange.svg` — логотип GlowByte
  - `clients/` — логотипы клиентов (см. `clients/README.txt`)

## Локальный просмотр

Открыть `index.html` в браузере двойным кликом, либо поднять локальный сервер:

```bash
python3 -m http.server 8000
# затем открыть http://localhost:8000
```

## Публикация (GitHub Pages)

Сайт полностью статический с относительными путями — работает на GitHub Pages без сборки.
Settings → Pages → Source: `Deploy from a branch`, ветка `main`, папка `/ (root)`.
