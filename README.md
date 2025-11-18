# Тестовое задание: NestJS + Vue 3 + Нагрузочное тестирование

## Как запустить

git clone <ваш-репозиторий>
cd <папка-проекта>

# Первый запуск (создаст БД, применит миграции и заполнит 50 000 записей)
docker-compose up -d --build

## URL

Frontend (нагрузочный тест):http://localhost:3001
API:http://localhost:3000/items?limit=10

## Оптимизации
Индексы на id и created_at, ORDER BY
Cursor-based пагинация вместо offset
Connection pool увеличен до 50 соединений
Кэширование результатов запроса