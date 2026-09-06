const express = require('express');
const cors = require('cors');
const { Bot } = require('grammy');

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN || 'ВАШ_ТОКЕН_БОТА';
const bot = new Bot(BOT_TOKEN);

app.post('/create-stars-invoice', async (req, res) => {
  try {
    const { userId, amountStars } = req.body;

    const link = await bot.api.createInvoiceLink(
      'Покупка игровых звезд',
      'Пополнение баланса Cookie Games',
      `payload_${userId}_${Date.now()}`,
      '',
      'XTR',
      [{ label: 'Звёзды', amount: amountStars }]
    );

    res.json({ invoiceUrl: link });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка создания счета' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
