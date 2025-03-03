'use client';

import { ChakraProvider } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <Script 
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
} 