'use client';

import {
  Box,
  Container,
  HStack,
  Button,
  Text,
  Select,
  IconButton,
  VStack,
  Icon,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FaShoppingCart, FaGavel, FaGift, FaImages, FaChartLine, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { keyframes } from '@emotion/react';
import { Market } from './components/Market';
import { Auctions } from './components/Auctions';
import { MyGifts } from './components/MyGifts';
import { Activity } from './components/Activity';
import { ModelSelector } from './components/ModelSelector';

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
  const [activeGiftsTab, setActiveGiftsTab] = useState('listed');
  const [selectedModel, setSelectedModel] = useState('all');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  
  useEffect(() => {
    const savedWallet = localStorage.getItem('connectedWallet');
    if (savedWallet) {
      setConnectedWallet(savedWallet);
    }
  }, []);

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

  const colors = {
    bg: '#0E1621',
    panel: '#17212B',
    accent: '#0098EA',
    text: '#FFFFFF',
    border: '#253340',
    muted: '#6D7883',
    hover: '#253340',
    buttonBg: '#242F3D',
    orange: '#FF9500',
    red: '#FF3B30'
  };

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
          <>
            {/* Volume и Referrals */}
            <Box bg={colors.panel} borderBottom="1px solid" borderColor={colors.border}>
              <Container maxW="container.lg" py={2}>
                <HStack spacing={8}>
                  <HStack spacing={2}>
                    <Icon as={FaGift} color={colors.accent} boxSize={4} />
                    <Text color={colors.muted} fontSize="sm">Volume</Text>
                    <Text color={colors.text} fontSize="sm">20.18</Text>
                  </HStack>
                  <HStack spacing={2}>
                    <Text color={colors.muted} fontSize="sm">Referrals</Text>
                    <Text color={colors.text} fontSize="sm">1</Text>
                  </HStack>
                </HStack>
              </Container>
            </Box>

            {/* Табы */}
            <Box bg={colors.panel} borderBottom="1px solid" borderColor={colors.border}>
              <Container maxW="container.lg" py={2}>
                <HStack spacing={2}>
                  <Button
                    variant="ghost"
                    color={colors.text}
                    bg={colors.buttonBg}
                    h="32px"
                    fontSize="sm"
                    _hover={{ bg: colors.hover }}
                  >
                    Gifts
                  </Button>
                  <Button
                    variant="ghost"
                    color={colors.muted}
                    h="32px"
                    fontSize="sm"
                    _hover={{ bg: colors.hover }}
                  >
                    Activity
                  </Button>
                  <Button
                    variant="ghost"
                    color={colors.muted}
                    h="32px"
                    fontSize="sm"
                    _hover={{ bg: colors.hover }}
                  >
                    Orders
                  </Button>
                  <Button
                    variant="ghost"
                    color={colors.muted}
                    h="32px"
                    fontSize="sm"
                    _hover={{ bg: colors.hover }}
                  >
                    Deals
                  </Button>
                </HStack>
              </Container>
            </Box>

            {/* Пустое состояние */}
            <Box 
              position="absolute" 
              top="50%" 
              left="50%" 
              transform="translate(-50%, -50%)"
              textAlign="center"
              color={colors.muted}
            >
              <Text fontSize="md">
                Gallery is empty
              </Text>
            </Box>
          </>
        );
      case 'activity':
        return <Activity />;
      default:
        return <Market />;
    }
  };

  return (
    <Box 
      bg={colors.bg}
      minHeight="100vh"
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
      <Box bg={colors.panel} borderBottom="1px solid" borderColor={colors.border}>
        <Container maxW="container.lg" py={2}>
          <HStack spacing={4} justify="space-between">
            <HStack spacing={1}>
              <TonLogo />
              <Text color={colors.text} fontSize="sm">0.087</Text>
              <ChevronDownIcon color={colors.text} boxSize={4} />
            </HStack>
            <HStack spacing={2}>
              <IconButton
                aria-label="Add"
                icon={<AddIcon boxSize={3} />}
                size="sm"
                bg={colors.accent}
                color="white"
                borderRadius="full"
                h="24px"
                minW="24px"
                _hover={{ opacity: 0.8 }}
              />
              <IconButton
                aria-label="Subtract"
                icon={<MinusIcon boxSize={3} />}
                size="sm"
                bg={colors.accent}
                color="white"
                borderRadius="full"
                h="24px"
                minW="24px"
                _hover={{ opacity: 0.8 }}
              />
              <Button
                leftIcon={<SmallTonLogo />}
                bg={colors.accent}
                color="white"
                size="sm"
                borderRadius="full"
                h="24px"
                px={3}
                fontSize="xs"
                _hover={{ opacity: 0.8 }}
                onClick={connectWallet}
              >
                Connect Wallet
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Фильтры */}
      <Box bg={colors.panel} borderBottom="1px solid" borderColor={colors.border}>
        <Container maxW="container.lg" py={2}>
          <HStack spacing={4} justify="space-between">
            <HStack spacing={2}>
              <Box position="relative" w="120px">
                <Text position="absolute" top="-2.5" left="3" fontSize="xs" color={colors.muted}>
                  NFTs
                </Text>
                <Select
                  bg={colors.buttonBg}
                  color={colors.text}
                  border="none"
                  h="36px"
                  pt="2"
                  fontSize="sm"
                  icon={<ChevronDownIcon boxSize={4} />}
                  defaultValue="all"
                  _hover={{ bg: colors.hover }}
                >
                  <option value="all">All</option>
                </Select>
              </Box>
              <Box position="relative" w="120px">
                <Text position="absolute" top="-2.5" left="3" fontSize="xs" color={colors.muted}>
                  Model
                </Text>
                <Box
                  as="button"
                  bg={colors.buttonBg}
                  color={colors.text}
                  h="36px"
                  w="full"
                  pt="2"
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  px={4}
                  _hover={{ bg: colors.hover }}
                  onClick={onOpen}
                >
                  <Text>{selectedModel === 'all' ? 'All' : selectedModel}</Text>
                  <ChevronDownIcon boxSize={4} color={colors.muted} />
                </Box>
              </Box>
            </HStack>
            <HStack spacing={2}>
              <IconButton
                aria-label="Delete"
                icon={<Icon as={FaTrash} boxSize={4} />}
                variant="ghost"
                color={colors.muted}
                bg={colors.buttonBg}
                h="36px"
                w="36px"
                _hover={{ bg: colors.hover }}
              />
              <IconButton
                aria-label="More"
                icon={<ChevronDownIcon boxSize={4} />}
                variant="ghost"
                color={colors.muted}
                bg={colors.buttonBg}
                h="36px"
                w="36px"
                _hover={{ bg: colors.hover }}
              />
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Основной контент */}
      <Box flex="1" overflow="auto" bg={colors.bg}>
        {renderContent()}
      </Box>

      {/* Нижняя навигация */}
      <Box bg={colors.panel} borderTop="1px solid" borderColor={colors.border}>
        <Container maxW="container.lg" py={2}>
          <HStack justify="space-between">
            <VStack 
              spacing={1} 
              color={activeTab === 'market' ? colors.accent : colors.muted}
              cursor="pointer"
              onClick={() => setActiveTab('market')}
              _hover={{ color: colors.accent }}
              w="64px"
            >
              <Icon as={FaShoppingCart} boxSize={4} />
              <Text fontSize="xs">Market</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color={activeTab === 'auctions' ? colors.accent : colors.muted}
              cursor="pointer"
              onClick={() => setActiveTab('auctions')}
              _hover={{ color: colors.accent }}
              w="64px"
            >
              <Icon as={FaGavel} boxSize={4} />
              <Text fontSize="xs">Auctions</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color={activeTab === 'gifts' ? colors.accent : colors.muted}
              cursor="pointer"
              onClick={() => setActiveTab('gifts')}
              _hover={{ color: colors.accent }}
              w="64px"
            >
              <Icon as={FaGift} boxSize={4} />
              <Text fontSize="xs">My Gifts</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color={activeTab === 'gallery' ? colors.accent : colors.muted}
              cursor="pointer"
              onClick={() => setActiveTab('gallery')}
              _hover={{ color: colors.accent }}
              w="64px"
            >
              <Icon as={FaImages} boxSize={4} />
              <Text fontSize="xs">Gallery</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color={activeTab === 'activity' ? colors.accent : colors.muted}
              cursor="pointer"
              onClick={() => setActiveTab('activity')}
              _hover={{ color: colors.accent }}
              w="64px"
            >
              <Icon as={FaChartLine} boxSize={4} />
              <Text fontSize="xs">Activity</Text>
            </VStack>
          </HStack>
        </Container>
      </Box>

      {/* Модальное окно выбора модели */}
      <ModelSelector
        isOpen={isOpen}
        onClose={onClose}
        onSelect={(model) => {
          setSelectedModel(model.name);
          toast({
            title: "Model selected",
            description: `You selected ${model.name}`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }}
      />
    </Box>
  );
} 