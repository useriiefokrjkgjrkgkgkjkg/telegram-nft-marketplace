import TelegramBot from 'node-telegram-bot-api';

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is not defined');
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true
});

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Добро пожаловать в NFT Marketplace! 🎁\nЗдесь вы можете покупать и продавать NFT подарки.');
});

// Обработка команды /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `
Доступные команды:
/start - Начать работу с ботом
/help - Показать это сообщение
/market - Показать доступные NFT
/my_gifts - Показать мои подарки
/balance - Показать баланс
  `);
});

export default bot; 