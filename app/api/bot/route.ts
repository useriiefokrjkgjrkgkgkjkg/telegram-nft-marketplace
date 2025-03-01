import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';
import { TelegramMessage } from '@/app/types/telegram';

// URL вашего приложения будет автоматически определен Vercel
const APP_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
  polling: true
});

// Настраиваем кнопку меню для бота
bot.setMyCommands([
  { command: '/start', description: 'Открыть NFT маркет' }
]);

// Обработка команды /start
bot.onText(/\/start/, async (msg: TelegramMessage) => {
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
    
    if (data.message?.text === '/start') {
      const chatId = data.message.chat.id;
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

// Простой GET-эндпоинт для проверки работоспособности
export async function GET() {
  return NextResponse.json({ status: 'Bot is running' });
} 