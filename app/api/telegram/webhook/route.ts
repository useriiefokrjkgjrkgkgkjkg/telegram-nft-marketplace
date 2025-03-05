import { NextResponse } from 'next/server';
import bot from '../../../lib/telegram';

export async function POST(request: Request) {
  try {
    const update = await request.json();
    
    // Обработка входящих сообщений
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      // Здесь можно добавить дополнительную логику обработки сообщений
      console.log('Received message:', text);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Установка вебхука при старте сервера
const webhookUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}/api/telegram/webhook`
  : 'https://your-domain.com/api/telegram/webhook';

bot.setWebHook(webhookUrl).then(() => {
  console.log('Webhook set to:', webhookUrl);
}).catch((error) => {
  console.error('Failed to set webhook:', error);
}); 