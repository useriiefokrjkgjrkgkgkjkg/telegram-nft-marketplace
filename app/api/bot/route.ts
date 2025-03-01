import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

// Используем полный URL для веб-приложения
const APP_URL = 'https://telegram-nft-marketplace-nine.vercel.app';

// Инициализируем бота без polling
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
  polling: false
});

// Обработчик для веб-хуков
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Логируем входящие данные
    console.log('Received webhook data:', JSON.stringify(data, null, 2));
    
    // Проверяем наличие сообщения и текста
    if (!data.message) {
      console.log('No message in webhook data');
      return NextResponse.json({ ok: true });
    }

    const { text, chat } = data.message;
    console.log('Message text:', text);
    
    // Проверяем команду /start
    if (text && (text.trim() === '/start' || text.trim().toLowerCase() === 'старт')) {
      console.log('Processing /start command');
      const chatId = chat.id;
      
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
      console.log('Sending welcome message to chat:', chatId);
      await bot.sendMessage(
        chatId,
        'Добро пожаловать в NFT Gifts Marketplace! 🎉\n\nЗдесь вы можете:\n✨ Просматривать NFT подарки\n💝 Улучшать подарки\n🎯 Передавать подарки другим\n\nНажмите на кнопку ниже, чтобы открыть маркетплейс:',
        keyboard
      );
      console.log('Welcome message sent successfully');
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