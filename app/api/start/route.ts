import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const BOT_USERNAME = process.env.TELEGRAM_BOT_USERNAME;

    if (!TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
    }

    if (!BOT_USERNAME) {
      throw new Error('TELEGRAM_BOT_USERNAME is not defined in environment variables');
    }

    // В реальном приложении здесь будет отправка сообщения через Telegram Bot API
    // const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     chat_id: chatId, // Нужно получить chat_id пользователя
    //     text: "ТЕСТ",
    //     reply_markup: {
    //       inline_keyboard: [[
    //         {
    //           text: "Открыть мини-приложение",
    //           url: `https://t.me/${BOT_USERNAME}/app`
    //         }
    //       ]]
    //     }
    //   }),
    // });
    
    // const telegramData = await telegramResponse.json();
    // if (!telegramData.ok) {
    //   throw new Error(telegramData.description || 'Failed to send message via Telegram Bot API');
    // }

    // Пока возвращаем тестовый ответ
    return NextResponse.json({ 
      success: true, 
      message: "ТЕСТ",
      button: {
        text: "Открыть мини-приложение",
        url: `https://t.me/${BOT_USERNAME}/app`
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