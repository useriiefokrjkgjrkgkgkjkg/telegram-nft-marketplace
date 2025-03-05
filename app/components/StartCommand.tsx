'use client';

import { useEffect, useState } from 'react';

export default function StartCommand() {
  const [message, setMessage] = useState<string | null>(null);
  const [buttonUrl, setButtonUrl] = useState<string | null>(null);

  const handleStartCommand = async () => {
    try {
      const response = await fetch('/api/start', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(data.message);
        setButtonUrl(data.button.url);
      }
    } catch (error) {
      console.error('Ошибка при обработке команды:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={handleStartCommand}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Отправить команду "старт"
      </button>

      {message && (
        <div className="mt-4">
          <p className="text-xl font-bold">{message}</p>
          {buttonUrl && (
            <a
              href={buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Открыть мини-приложение
            </a>
          )}
        </div>
      )}
    </div>
  );
} 