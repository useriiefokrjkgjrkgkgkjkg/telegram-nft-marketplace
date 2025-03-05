'use client';

import { useEffect, useState } from 'react';
import { Button, VStack, Text, Link, useToast } from '@chakra-ui/react';

export default function StartCommand() {
  const [message, setMessage] = useState<string | null>(null);
  const [buttonUrl, setButtonUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleStartCommand = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/start', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(data.message);
        setButtonUrl(data.button.url);
        toast({
          title: "Команда обработана",
          description: "Команда 'старт' успешно обработана",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(data.error || 'Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Ошибка при обработке команды:', error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : 'Произошла ошибка при обработке команды',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={4} p={4}>
      <Button
        onClick={handleStartCommand}
        colorScheme="blue"
        isLoading={isLoading}
        loadingText="Отправка..."
      >
        Отправить команду "старт"
      </Button>

      {message && (
        <VStack spacing={2}>
          <Text fontSize="xl" fontWeight="bold">{message}</Text>
          {buttonUrl && (
            <Button
              as="a"
              href={buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="green"
            >
              Открыть мини-приложение
            </Button>
          )}
        </VStack>
      )}
    </VStack>
  );
} 