# ChatBot24.su

Лендинг и AI-виджет для инженерного бюро автоматизации ChatBot24.

## Описание

Сайт chatbot24.su объединяет:
- Лендинг с ценами (49 000₽ / 129 000₽ / 240 000₽)
- AI-виджет для приёма заявок
- Калькулятор потерь
- Кейсы, FAQ, преимущества

## Технологии

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Static Export

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Разработка
npm run dev

# Сборка
npm run build
```

## Структура

```
app/
  api/lead/route.ts    # API для приёма заявок
  globals.css          # Глобальные стили
  layout.tsx           # Корневой layout
  page.tsx             # Главная страница
components/
  ChatWidget.tsx       # Виджет чата
  sections/            # Секции лендинга
  ui/                  # UI компоненты
```

## Деплой

Сайт собирается как статический сайт (output: export) для размещения на Vercel.

```bash
npm run build
# Результат в папке dist/
```

## API

### POST /api/lead

Создание новой заявки.

**Body:**
```json
{
  "name": "Имя клиента",
  "phone": "+79991234567",
  "company": "Название компании",
  "message": "Описание задачи"
}
```

### GET /api/lead

Получение списка заявок (для админки).

## Лицензия

© 2025 ChatBot24. Все права защищены.
