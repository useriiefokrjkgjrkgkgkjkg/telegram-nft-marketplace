import { Message } from 'node-telegram-bot-api';

// Расширяем тип Message из библиотеки
export interface TelegramMessage extends Message {
  message_id: number;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    username?: string;
    language_code?: string;
  };
  chat: {
    id: number;
    first_name: string;
    username?: string;
    type: string;
  };
  date: number;
  text?: string;
} 