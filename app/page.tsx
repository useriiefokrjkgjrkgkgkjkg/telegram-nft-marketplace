'use client'

import {
  Box,
  HStack,
  Image,
  Text,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  VStack,
  useDisclosure,
  Collapse,
  SlideFade,
  BoxProps,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, StarIcon, CloseIcon, CheckIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { BsThreeDots, BsChevronRight, BsTrash, BsChevronDown, BsActivity } from 'react-icons/bs';
import { FaImage, FaGift, FaGavel } from 'react-icons/fa';
import StartCommand from './components/StartCommand';

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

// Объявляем типы для Telegram WebApp и TonKeeper
declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
    ton?: {
      send: (method: string, params?: any[]) => Promise<any>;
      on: (event: string, callback: (params: any) => void) => void;
      isConnected: boolean;
    };
  }
}

// Компонент для логотипа TON
const TonLogo = ({ size = "24px" }: { size?: string }) => (
  <Image 
    src="https://i.imgur.com/4E0Jp4G.png"
    alt="TON"
    width={size}
    height={size}
    style={{
      filter: 'brightness(1.2) contrast(1.1)',
      transition: 'all 0.3s ease'
    }}
  />
);

// Компонент для анимации загрузки
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.9);
  const [textOpacity, setTextOpacity] = useState(0);
  const [textScale, setTextScale] = useState(0.95);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
      setScale(1);
    }, 100);

    setTimeout(() => {
      setTextOpacity(1);
      setTextScale(1);
    }, 600);

    const hideTimer = setTimeout(() => {
      setTextOpacity(0);
      setTextScale(0.95);
      setTimeout(() => {
        setOpacity(0);
        setScale(0.9);
      }, 600);
      setTimeout(onComplete, 1200);
    }, 2000);

    return () => clearTimeout(hideTimer);
  }, [onComplete]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="linear-gradient(135deg, #000000 0%, #1A1A1A 100%)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{ 
        opacity,
        transform: `scale(${scale})`,
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Box 
        textAlign="center"
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale}) translateY(${textOpacity ? '0' : '20px'})`,
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Text
          color="white"
          fontSize="4xl"
          fontWeight="bold"
          letterSpacing="wider"
          mb={4}
          style={{
            textShadow: '0 0 30px rgba(0, 152, 234, 0.3)'
          }}
        >
          NFT Market
        </Text>
      </Box>
    </Box>
  );
};

// Функция для сокращения адреса кошелька
const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

interface Gift {
  id: string;
  name: string;
  number: string;
  isListed: boolean;
  price?: number;
}

interface NFT {
  id: string;
  name: string;
  number: string;
  price: number;
  model: string;
}

interface CustomBoxProps extends BoxProps {
  children: React.ReactNode;
}

type TabType = 'market' | 'auctions' | 'gifts' | 'activity';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const { isOpen: isDepositOpen, onOpen: onDepositOpen, onClose: onDepositClose } = useDisclosure();
  const { isOpen: isWithdrawOpen, onOpen: onWithdrawOpen, onClose: onWithdrawClose } = useDisclosure();

  const Navigation = () => (
    <Box>
      {/* Здесь будет навигация */}
    </Box>
  );

  return (
    <Box>
      <StartCommand />
      <Box minH="100vh" bg="#000000" pb={20}>
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <>
            <Navigation />
            <Box 
              bg="linear-gradient(135deg, #000000 0%, #0D0D0D 100%)"
              minHeight="100vh"
              height="100vh"
              display="flex"
              flexDirection="column"
              position="fixed"
              top={0}
              left={0}
              right={0}
              bottom={0}
              overflow="hidden"
              style={{
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                WebkitTextSizeAdjust: 'none',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y',
                userSelect: 'none',
                WebkitUserModify: 'read-only',
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                perspective: 1000,
                WebkitPerspective: 1000,
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {/* Фиксированный контейнер для верхних панелей */}
              <Box
                position="fixed"
                top={0}
                left={0}
                right={0}
                zIndex={2}
                bg="linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 100%)"
                backdropFilter="blur(10px)"
                transition="all 0.3s ease"
              >
                {/* Панель с балансом */}
                <Box 
                  py={2} 
                  px={4}
                  borderBottom="1px solid"
                  borderColor="rgba(255,255,255,0.1)"
                  transition="all 0.3s ease"
                >
                  <HStack justify="space-between" align="center">
                    <HStack spacing={2}>
                      <Box
                        width="32px"
                        height="32px"
                        borderRadius="md"
                        border="1px solid"
                        borderColor="whiteAlpha.300"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="whiteAlpha.50"
                      >
                        <TonLogo size="20px" />
                      </Box>
                      <Text color="white" fontSize="xl" fontWeight="medium">{balance.toFixed(2)}</Text>
                      <IconButton
                        aria-label="Add"
                        icon={<AddIcon w={2.5} h={2.5} />}
                        bg="linear-gradient(135deg, #0098EA 0%, #0088D1 100%)"
                        onClick={onDepositOpen}
                      />
                      <IconButton
                        aria-label="Withdraw"
                        icon={<MinusIcon w={2.5} h={2.5} />}
                        bg="linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)"
                        onClick={onWithdrawOpen}
                      />
                    </HStack>
                    <Text color="whiteAlpha.700" fontSize="sm">
                      {walletAddress ? truncateAddress(walletAddress) : 'Не подключен'}
                    </Text>
                  </HStack>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
} 