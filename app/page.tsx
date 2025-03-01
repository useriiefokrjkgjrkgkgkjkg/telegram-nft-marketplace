'use client';

import {
  Box,
  Container,
  HStack,
  Button,
  Text,
  Select,
  IconButton,
  Flex,
  SimpleGrid,
  Image,
  VStack,
  Icon,
  Progress,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FaShoppingCart, FaGavel, FaGift, FaImages, FaChartLine, FaRandom, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { keyframes } from '@emotion/react';
import { Market } from './components/Market';
import { Auctions } from './components/Auctions';
import { MyGifts } from './components/MyGifts';

const fadeInAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const TonLogo = () => (
  <svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z" fill="#0098EA"/>
    <path d="M36.1165 15.0615L25.0001 10L13.8837 15.0615V32.6157L25.0001 40L36.1165 32.6157V15.0615ZM25.0001 17.5436L32.5441 21.0897L25.0001 24.6358L17.4561 21.0897L25.0001 17.5436ZM16.5997 23.4182L24.1437 26.9643V36.7332L16.5997 32.1435V23.4182ZM25.8565 26.9643L33.4005 23.4182V32.1435L25.8565 36.7332V26.9643Z" fill="white"/>
  </svg>
);

const SmallTonLogo = () => (
  <svg width="16" height="16" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z" fill="white"/>
    <path d="M36.1165 15.0615L25.0001 10L13.8837 15.0615V32.6157L25.0001 40L36.1165 32.6157V15.0615ZM25.0001 17.5436L32.5441 21.0897L25.0001 24.6358L17.4561 21.0897L25.0001 17.5436ZM16.5997 23.4182L24.1437 26.9643V36.7332L16.5997 32.1435V23.4182ZM25.8565 26.9643L33.4005 23.4182V32.1435L25.8565 36.7332V26.9643Z" fill="#0098EA"/>
  </svg>
);

export default function Home() {
  const [balance] = useState('0.087');
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('market');
  const toast = useToast();
  
  // Загружаем сохраненный адрес кошелька при запуске
  useEffect(() => {
    const savedWallet = localStorage.getItem('connectedWallet');
    if (savedWallet) {
      setConnectedWallet(savedWallet);
    }
  }, []);

  // Функция подключения кошелька
  const connectWallet = async () => {
    try {
      // @ts-ignore
      if (window.Telegram?.WebApp?.showScanQrPopup) {
        // @ts-ignore
        window.Telegram.WebApp.showScanQrPopup({
          text: "Отсканируйте QR-код вашего TON кошелька",
        });
        
        // @ts-ignore
        window.Telegram.WebApp.onEvent('qrTextReceived', (qrText) => {
          // Сохраняем адрес кошелька
          localStorage.setItem('connectedWallet', qrText);
          setConnectedWallet(qrText);
          
          toast({
            title: "Кошелек подключен",
            description: "Ваш TON кошелек успешно подключен",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          
          // @ts-ignore
          window.Telegram.WebApp.closeScanQrPopup();
        });
      } else {
        toast({
          title: "Ошибка",
          description: "Функция сканирования QR недоступна",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка подключения",
        description: "Не удалось подключить кошелек",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Обновляем цветовую схему
  const colors = {
    bg: '#1A1B1E',
    panel: '#25272A',
    accent: '#0098EA',
    text: '#FFFFFF',
    border: '#2C2D30',
    muted: '#808080',
    hover: '#2C2D30'
  };

  // Устанавливаем высоту для мини-приложения Telegram
  useEffect(() => {
    // @ts-ignore
    if (window.Telegram?.WebApp) {
      // @ts-ignore
      window.Telegram.WebApp.expand();
      // @ts-ignore
      window.Telegram.WebApp.enableClosingConfirmation();
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'market':
        return <Market />;
      case 'auctions':
        return <Auctions />;
      case 'gifts':
        return <MyGifts />;
      case 'gallery':
        return (
          <Container maxW="container.lg" py={4}>
            <Box 
              position="absolute" 
              top="50%" 
              left="50%" 
              transform="translate(-50%, -50%)"
              textAlign="center"
              color={colors.muted}
            >
              <Text fontSize="lg">
                Галерея пока пуста
              </Text>
            </Box>
          </Container>
        );
      case 'activity':
        return (
          <Container maxW="container.lg" py={4}>
            <Box 
              position="absolute" 
              top="50%" 
              left="50%" 
              transform="translate(-50%, -50%)"
              textAlign="center"
              color={colors.muted}
            >
              <Text fontSize="lg">
                Нет активности
              </Text>
            </Box>
          </Container>
        );
      default:
        return <Auctions />;
    }
  };

  return (
    <Box 
      bg={colors.bg}
      height="100vh"
      maxHeight="100vh"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
    >
      {/* Верхняя панель */}
      <Box 
        borderBottom="1px solid"
        borderColor={colors.border}
        bg={colors.panel}
      >
        <Container maxW="container.lg" py={2}>
          <HStack spacing={4} justify="space-between">
            <HStack spacing={2} 
              cursor="pointer" 
              _hover={{ opacity: 0.8 }}
              transition="all 0.2s"
            >
              <TonLogo />
              <Text 
                fontSize="lg" 
                color={colors.text}
                fontWeight="500"
              >{balance}</Text>
              <ChevronDownIcon 
                boxSize={5} 
                color={colors.text}
              />
            </HStack>
            <HStack spacing={2}>
              <IconButton
                aria-label="Add balance"
                icon={<AddIcon />}
                size="sm"
                bg={colors.accent}
                color="white"
                borderRadius="md"
                _hover={{ 
                  opacity: 0.9
                }}
                transition="all 0.2s"
              />
              <IconButton
                aria-label="Subtract balance"
                icon={<MinusIcon />}
                size="sm"
                bg={colors.accent}
                color="white"
                borderRadius="md"
                _hover={{ 
                  opacity: 0.9
                }}
                transition="all 0.2s"
              />
              <Button
                bg={colors.accent}
                color="white"
                size="sm"
                onClick={connectWallet}
                _hover={{ 
                  opacity: 0.9
                }}
                transition="all 0.2s"
                borderRadius="md"
                px={4}
                leftIcon={<SmallTonLogo />}
              >
                {connectedWallet ? 'Кошелек подключен' : 'Connect Wallet'}
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Фильтры */}
      <Box 
        borderBottom="1px solid"
        borderColor={colors.border}
        bg={colors.panel}
      >
        <Container maxW="container.lg" py={3}>
          <HStack spacing={4} justify="space-between">
            <HStack spacing={4}>
              <Box position="relative" w="150px">
                <Text position="absolute" top="-3.5" left="4" fontSize="xs" color={colors.muted}>
                  NFTs
                </Text>
                <Select
                  variant="filled"
                  bg={colors.bg}
                  border="1px solid"
                  borderColor={colors.border}
                  h="45px"
                  pt="3"
                  color={colors.text}
                  icon={<ChevronDownIcon />}
                  defaultValue="all"
                  _hover={{ borderColor: colors.accent }}
                  transition="all 0.2s"
                >
                  <option value="all">All</option>
                </Select>
              </Box>
              <Box position="relative" w="150px">
                <Text position="absolute" top="-3.5" left="4" fontSize="xs" color={colors.muted}>
                  Model
                </Text>
                <Select
                  variant="filled"
                  bg={colors.bg}
                  border="1px solid"
                  borderColor={colors.border}
                  h="45px"
                  pt="3"
                  color={colors.text}
                  icon={<ChevronDownIcon />}
                  defaultValue="all"
                  _hover={{ borderColor: colors.accent }}
                  transition="all 0.2s"
                >
                  <option value="all">All</option>
                </Select>
              </Box>
            </HStack>
            <HStack spacing={2}>
              <IconButton
                aria-label="Delete"
                icon={<Icon as={FaTrash} />}
                variant="ghost"
                color={colors.muted}
                _hover={{ 
                  color: colors.accent,
                  bg: colors.hover
                }}
                transition="all 0.2s"
              />
              <IconButton
                aria-label="More"
                icon={<ChevronDownIcon />}
                variant="ghost"
                color={colors.muted}
                _hover={{ 
                  color: colors.accent,
                  bg: colors.hover
                }}
                transition="all 0.2s"
              />
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Корзина с прогрессом */}
      <Box 
        borderBottom="1px solid"
        borderColor={colors.border}
        bg={colors.panel}
      >
        <Container maxW="container.lg" py={2}>
          <HStack>
            <Icon 
              as={FaShoppingCart} 
              color={colors.accent}
              _hover={{ opacity: 0.8 }}
              transition="all 0.2s"
              cursor="pointer"
            />
            <Progress
              value={0}
              size="sm"
              flex="1"
              borderRadius="full"
              bg={colors.border}
              sx={{
                '& > div': {
                  background: colors.accent,
                  transition: 'all 0.3s'
                }
              }}
            />
            <Text 
              color={colors.text}
              fontWeight="500"
            >0</Text>
          </HStack>
        </Container>
      </Box>

      {/* Основной контент */}
      <Box 
        flex="1" 
        overflow="auto" 
        bg={colors.bg}
        position="relative"
      >
        {renderContent()}
      </Box>

      {/* Нижняя навигация */}
      <Box 
        borderTop="1px solid"
        borderColor={colors.border}
        py={3}
        bg={colors.panel}
      >
        <Container maxW="container.lg">
          <HStack justify="space-between">
            <VStack 
              spacing={1} 
              color={activeTab === 'market' ? colors.accent : colors.muted}
              cursor="pointer"
              onClick={() => setActiveTab('market')}
              _hover={{ 
                color: colors.accent
              }}
              transition="all 0.2s"
            >
              <Icon as={FaShoppingCart} boxSize={5} />
              <Text fontSize="xs">Market</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color={activeTab === 'auctions' ? colors.accent : colors.muted}
              cursor="pointer"
              onClick={() => setActiveTab('auctions')}
              _hover={{ 
                color: colors.accent
              }}
              transition="all 0.2s"
            >
              <Icon as={FaGavel} boxSize={5} />
              <Text fontSize="xs">Auctions</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color={activeTab === 'gifts' ? colors.accent : colors.muted}
              cursor="pointer"
              onClick={() => setActiveTab('gifts')}
              _hover={{ 
                color: colors.accent
              }}
              transition="all 0.2s"
            >
              <Icon as={FaGift} boxSize={5} />
              <Text fontSize="xs">My Gifts</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color={activeTab === 'gallery' ? colors.accent : colors.muted}
              cursor="pointer"
              onClick={() => setActiveTab('gallery')}
              _hover={{ 
                color: colors.accent
              }}
              transition="all 0.2s"
            >
              <Icon as={FaImages} boxSize={5} />
              <Text fontSize="xs">Gallery</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color={activeTab === 'activity' ? colors.accent : colors.muted}
              cursor="pointer"
              onClick={() => setActiveTab('activity')}
              _hover={{ 
                color: colors.accent
              }}
              transition="all 0.2s"
            >
              <Icon as={FaChartLine} boxSize={5} />
              <Text fontSize="xs">Activity</Text>
            </VStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
} 