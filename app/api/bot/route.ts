import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

// URL вашего приложения будет автоматически определен Vercel
const APP_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
  polling: false // Отключаем polling, так как будем использовать вебхуки
});

// Настраиваем кнопку меню для бота
bot.setMyCommands([
  { command: '/start', description: 'Открыть NFT маркет' }
]);

// Обработка команды /start
bot.onText(/\/start/, async (msg: Message) => {
  const chatId = msg.chat.id;
  
  // Создаем кнопку для открытия веб-приложения
  const keyboard = {
    keyboard: [
      [
        {
          text: '🎁 Открыть NFT Маркет',
          web_app: { url: APP_URL }
        }
      ]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  };

  await bot.sendMessage(
    chatId,
    'Добро пожаловать в NFT Gifts Marketplace! 🎉\n\nЗдесь вы можете:\n✨ Просматривать NFT подарки\n💝 Улучшать подарки\n🎯 Передавать подарки другим\n\nНажмите на кнопку ниже, чтобы открыть маркетплейс:',
    {
      reply_markup: keyboard,
      parse_mode: 'HTML'
    }
  );
});

// Обработчик для веб-хуков
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Проверяем, что это команда /start
    if (data.message?.text === '/start') {
      const chatId = data.message.chat.id;
      
      // Создаем кнопку для открытия веб-приложения
      const keyboard = {
        reply_markup: {
          keyboard: [
            [
              {
                text: '🎁 Открыть NFT Маркет',
                web_app: { url: APP_URL }
              }
            ]
          ],
          resize_keyboard: true,
          one_time_keyboard: false
        }
      };

      // Отправляем приветственное сообщение с кнопкой
      await bot.sendMessage(
        chatId,
        'Добро пожаловать в NFT Gifts Marketplace! 🎉\n\nЗдесь вы можете:\n✨ Просматривать NFT подарки\n💝 Улучшать подарки\n🎯 Передавать подарки другим\n\nНажмите на кнопку ниже, чтобы открыть маркетплейс:',
        keyboard
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Ошибка обработки веб-хука' },
      { status: 500 }
    );
  }
}

// Эндпоинт для проверки работоспособности
export async function GET() {
  return NextResponse.json({ status: 'Bot is running' });
} 