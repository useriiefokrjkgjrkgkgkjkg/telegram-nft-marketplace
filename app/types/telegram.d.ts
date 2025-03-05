interface TelegramWebApp {
  expand: () => void;
  enableClosingConfirmation: () => void;
  close: () => void;
  initDataUnsafe?: {
    user?: {
      photo_url?: string;
    };
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export {}; 