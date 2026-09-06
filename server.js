const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());
app.use(express.static('public')); // если фронтенд лежит на бэкенде, либо просто CORS

// Эндпоинт для создания счета Telegram Stars
app.post('/create-invoice', async (req, res) => {
    const token = process.env.BOT_TOKEN; // Токен берется из переменных Render
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/createInvoiceLink`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: '50 Telegram Stars',
                description: 'Покупка 50 звезд в игре Cookie Games',
                payload: 'stars_payment_50',
                currency: 'XTR', // Обязательно XTR для Stars
                prices: [{ label: 'Stars', amount: 50 }]
            })
        });

        const data = await response.json();
        if (data.ok) {
            res.json({ invoiceLink: data.result });
        } else {
            res.status(400).json({ error: data.description });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
