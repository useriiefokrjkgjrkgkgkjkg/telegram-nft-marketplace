import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Возвращаем тестовый ответ с фиксированными значениями
    return NextResponse.json({ 
      success: true, 
      message: "ТЕСТ",
      button: {
        text: "Открыть мини-приложение",
        url: "https://t.me/ndjkhdwfhwfhhfwohfbot/app" // Хардкодим URL для тестирования
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