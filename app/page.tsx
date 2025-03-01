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

const fadeInAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const TonLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#0098EA"/>
    <path d="M7.2 6L12 3L16.8 6L12 9L7.2 6Z" fill="white"/>
    <path d="M7.2 9V15L12 18V9L7.2 9Z" fill="white"/>
    <path d="M16.8 9V15L12 18V9L16.8 9Z" fill="white"/>
  </svg>
);

const SmallTonLogo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="white"/>
    <path d="M7.2 6L12 3L16.8 6L12 9L7.2 6Z" fill="#0098EA"/>
    <path d="M7.2 9V15L12 18V9L7.2 9Z" fill="#0098EA"/>
    <path d="M16.8 9V15L12 18V9L16.8 9Z" fill="#0098EA"/>
  </svg>
);

export default function Home() {
  const [balance] = useState('0.087');
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
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

  // Элегантная черно-белая цветовая схема
  const colors = {
    bg: '#FFFFFF',
    panel: '#FAFAFA',
    accent: '#0098EA', // Цвет TON
    text: '#1A1B1E',
    border: '#EAEAEA',
    muted: '#757575',
    hover: '#F5F5F5'
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
                  bg="white"
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
                  bg="white"
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
                aria-label="Random"
                icon={<Icon as={FaRandom} />}
                variant="ghost"
                color={colors.muted}
                _hover={{ 
                  color: colors.accent,
                  bg: colors.hover
                }}
                transition="all 0.2s"
              />
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
        <Container maxW="container.lg" py={4}>
          <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4}>
            {/* Пустое состояние */}
            <Box 
              position="absolute" 
              top="50%" 
              left="50%" 
              transform="translate(-50%, -50%)"
              textAlign="center"
              color={colors.muted}
            >
              <Text fontSize="lg">
                Пока никто не выставил NFT на продажу
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
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
              color={colors.accent}
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
              transition="all 0.2s"
            >
              <Icon as={FaShoppingCart} boxSize={5} />
              <Text fontSize="xs">Market</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color={colors.muted}
              cursor="pointer"
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
              color={colors.muted}
              cursor="pointer"
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
              color={colors.muted}
              cursor="pointer"
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
              color={colors.muted}
              cursor="pointer"
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