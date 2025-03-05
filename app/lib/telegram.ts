const TELEGRAM_API = 'https://api.telegram.org/bot';

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is not defined');
}

export async function sendMessage(chatId: number, text: string) {
  const response = await fetch(`${TELEGRAM_API}${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
    }),
  });

  return response.json();
}

export async function setWebhook(url: string) {
  const response = await fetch(`${TELEGRAM_API}${process.env.TELEGRAM_BOT_TOKEN}/setWebhook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: url,
    }),
  });

  return response.json();
}

export const commands = {
  start: async (chatId: number) => {
    return sendMessage(
      chatId,
      'Добро пожаловать в NFT Marketplace! 🎁\nЗдесь вы можете покупать и продавать NFT подарки.'
    );
  },
  
  help: async (chatId: number) => {
    return sendMessage(
      chatId,
      `Доступные команды:
/start - Начать работу с ботом
/help - Показать это сообщение
/market - Показать доступные NFT
/my_gifts - Показать мои подарки
/balance - Показать баланс`
    );
  },
}; 