import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

// URL вашего приложения будет автоматически определен Vercel
const APP_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

// Инициализируем бота без polling
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
  polling: false
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
          inline_keyboard: [
            [
              {
                text: '🎁 Открыть NFT Маркет',
                web_app: { url: APP_URL }
              }
            ]
          ]
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