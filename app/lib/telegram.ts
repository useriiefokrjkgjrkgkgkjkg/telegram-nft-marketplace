const TELEGRAM_API = 'https://api.telegram.org/bot';

export async function sendMessage(chatId: number, text: string) {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN is not defined');
  }

  console.log('Sending message:', { chatId, text });
  
  try {
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      throw new Error(`Telegram API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Message sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export async function setWebhook(url: string) {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN is not defined');
  }

  console.log('Setting webhook to:', url);
  
  try {
    const response = await fetch(`${TELEGRAM_API}${process.env.TELEGRAM_BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        allowed_updates: ['message'],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      throw new Error(`Telegram API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Webhook set successfully:', result);
    return result;
  } catch (error) {
    console.error('Error setting webhook:', error);
    throw error;
  }
}

export const commands = {
  start: async (chatId: number) => {
    return sendMessage(
      chatId,
      `Добро пожаловать в NFT Marketplace! 🎁

Здесь вы можете:
• Покупать и продавать NFT подарки
• Участвовать в аукционах
• Отслеживать свои транзакции

Используйте команду /help чтобы увидеть список всех доступных команд.`
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
/balance - Показать баланс

Если у вас есть вопросы, используйте команду /support`
    );
  },

  market: async (chatId: number) => {
    return sendMessage(
      chatId,
      `🛍 Маркетплейс NFT

Доступные NFT:
1. Winter Collection 2024 ❄️
2. Valentine's Special 💝
3. Rare Gems 💎

Для покупки используйте команду /buy [номер]`
    );
  },

  my_gifts: async (chatId: number) => {
    return sendMessage(
      chatId,
      `🎁 Ваши NFT подарки:

Listing:
• Winter Star ⭐️ (0.5 TON)
• Love Letter 💌 (0.8 TON)

Unlisted:
• Crystal Snowflake ❄️
• Golden Key 🔑`
    );
  },

  balance: async (chatId: number) => {
    return sendMessage(
      chatId,
      `💎 Ваш баланс:

TON: 1.234
Gifts: 4
Listed: 2`
    );
  },

  support: async (chatId: number) => {
    return sendMessage(
      chatId,
      `📞 Поддержка

Если у вас возникли вопросы, напишите нам:
@support_nft_market

Время работы: 24/7`
    );
  },
}; 