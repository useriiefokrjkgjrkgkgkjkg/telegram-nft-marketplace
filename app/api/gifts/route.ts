import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });

export async function GET() {
  try {
    // В будущем здесь будет реальная логика получения подарков
    const mockGifts = [
      {
        id: '1',
        name: 'Золотое сердце',
        imageUrl: 'https://placekitten.com/200/200',
        stars: 25,
        level: 2,
        owner: '@PalmAngeleges'
      }
    ];

    return NextResponse.json(mockGifts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Произошла ошибка при получении подарков' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Здесь будет логика обработки нового подарка
    // и отправка уведомления в Telegram
    
    await bot.sendMessage(process.env.TELEGRAM_ADMIN_USERNAME!, 
      `Новый подарок добавлен в маркет: ${data.name}`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Произошла ошибка при добавлении подарка' },
      { status: 500 }
    );
  }
} 