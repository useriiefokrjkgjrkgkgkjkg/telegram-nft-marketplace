import { NextResponse } from 'next/server';
import { commands, setWebhook } from '../../../lib/telegram';

export async function POST(request: Request) {
  try {
    const update = await request.json();
    
    // Обработка входящих сообщений
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      // Здесь можно добавить дополнительную логику обработки сообщений
      console.log('Received message:', text);

      // Обработка команд
      if (text.startsWith('/')) {
        const command = text.substring(1);
        if (command in commands) {
          await commands[command as keyof typeof commands](chatId);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Установка вебхука при старте сервера
if (process.env.VERCEL_URL) {
  const webhookUrl = `https://${process.env.VERCEL_URL}/api/telegram/webhook`;
  setWebhook(webhookUrl).then(() => {
    console.log('Webhook set to:', webhookUrl);
  }).catch((error) => {
    console.error('Failed to set webhook:', error);
  });
} 