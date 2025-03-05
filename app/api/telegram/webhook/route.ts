import { NextResponse } from 'next/server';
import { commands } from '../../../lib/telegram';

export async function POST(request: Request) {
  try {
    const update = await request.json();
    console.log('Received update:', JSON.stringify(update, null, 2));
    
    // Обработка входящих сообщений
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      console.log('Processing message:', { chatId, text });

      // Обработка команды "старт"
      if (text === '/start' || text === 'старт') {
        console.log('Executing start command for chat:', chatId);
        await commands.start(chatId);
        return NextResponse.json({ ok: true });
      }

      // Обработка других команд
      if (text?.startsWith('/')) {
        const command = text.substring(1);
        console.log('Processing command:', command);
        
        if (command in commands) {
          console.log('Executing command:', command);
          try {
            await commands[command as keyof typeof commands](chatId);
            console.log('Command executed successfully');
          } catch (error) {
            console.error('Error executing command:', error);
          }
        } else {
          console.log('Unknown command:', command);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
} 