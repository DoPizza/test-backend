import { Hono } from 'hono';

const app = new Hono();

// Тестовое мероприятие
const events = [
    {
        id: 1,
        title: 'Тестовое мероприятие',
        status: 'pending'
    }
];

// Проверка работы backend
app.get('/', (c) => {
    return c.json({
        status: 'success',
        message: 'Backend работает!'
    });
});

// Получение мероприятий
app.get('/api/events', (c) => {
    return c.json(events);
});

// Добавление мероприятия
app.post('/api/add-event', async (c) => {
    try {
        const body = await c.req.json();

        if (!body.title) {
            return c.json({
                status: 'error',
                message: 'Не указано название мероприятия'
            }, 400);
        }

        const event = {
            id: events.length + 1,
            title: body.title,
            status: 'pending'
        };

        events.push(event);

        return c.json({
            status: 'success',
            message: `Мероприятие "${body.title}" добавлено!`,
            event: event
        });

    } catch {
        return c.json({
            status: 'error',
            message: 'Некорректный JSON'
        }, 400);
    }
});

export default app;
