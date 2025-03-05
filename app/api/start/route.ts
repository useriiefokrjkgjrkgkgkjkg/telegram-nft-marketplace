import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Здесь будет логика отправки сообщения через Telegram Bot API
    // Пока возвращаем тестовый ответ
    return NextResponse.json({ 
      success: true, 
      message: "ТЕСТ",
      button: {
        text: "Открыть мини-приложение",
        url: "https://t.me/your_bot_username/app" // Замените на реальный URL вашего бота
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: "Произошла ошибка при обработке команды" 
    }, { status: 500 });
  }
} 