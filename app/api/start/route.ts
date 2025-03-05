import { NextResponse } from 'next/server';
import { commands } from '../../lib/telegram';

export async function POST(request: Request) {
  try {
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined');
    }

    // Отправляем команду start боту
    const chatId = 1234567890; // Здесь нужен реальный chat_id пользователя
    await commands.start(chatId);

    return NextResponse.json({ 
      success: true, 
      message: "Команда 'старт' успешно отправлена",
      button: {
        text: "Открыть мини-приложение",
        url: `https://t.me/${process.env.TELEGRAM_BOT_USERNAME}/app`
      }
    });
  } catch (error) {
    console.error('Error in /api/start:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Произошла ошибка при обработке команды" 
    }, { status: 500 });
  }
} 