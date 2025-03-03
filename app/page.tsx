'use client';

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
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, StarIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { BsThreeDots, BsChevronRight } from 'react-icons/bs';
import { FaImage, FaGift } from 'react-icons/fa';

// Объявляем типы для Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        expand: () => void;
        enableClosingConfirmation: () => void;
        close: () => void;
        initDataUnsafe?: {
          user?: {
            photo_url?: string;
          };
        };
      };
    };
  }
}

// Компонент для логотипа TON
const TonLogo = ({ size = "24px" }: { size?: string }) => (
  <Image 
    src="https://ton.org/assets/ton_symbol.svg"
    alt="TON"
    width={size}
    height={size}
  />
);

export default function Home() {
  const {
    isOpen: isDepositOpen,
    onOpen: onDepositOpen,
    onClose: onDepositClose
  } = useDisclosure();

  const {
    isOpen: isWithdrawOpen,
    onOpen: onWithdrawOpen,
    onClose: onWithdrawClose
  } = useDisclosure();

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.enableClosingConfirmation();
    }
  }, []);

  return (
    <Box 
      bg="#17212B"
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
    >
      {/* Панель с балансом */}
      <Box 
        bg="#17212B" 
        py={2} 
        px={4}
        borderBottom="1px solid"
        borderColor="#253340"
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
              <Text fontSize="xl" color="white">?</Text>
            </Box>
            <Text color="white" fontSize="xl" fontWeight="medium">0</Text>
            <IconButton
              aria-label="Add"
              icon={<AddIcon />}
              bg="#0098EA"
              color="white"
              borderRadius="full"
              size="md"
              isDisabled={isWithdrawOpen}
              onClick={() => {
                if (!isDepositOpen && !isWithdrawOpen) {
                  onDepositOpen();
                }
              }}
              _hover={{ bg: "#0088D1" }}
            />
            <IconButton
              aria-label="Subtract"
              icon={<MinusIcon />}
              bg="#0098EA"
              color="white"
              borderRadius="full"
              size="md"
              isDisabled={isDepositOpen}
              onClick={() => {
                if (!isDepositOpen && !isWithdrawOpen) {
                  onWithdrawOpen();
                }
              }}
              _hover={{ bg: "#0088D1" }}
            />
          </HStack>
          <Button
            bg="#0098EA"
            color="white"
            borderRadius="full"
            size="md"
            px={4}
            leftIcon={<StarIcon />}
            _hover={{ bg: "#0088D1" }}
          >
            Connect Wallet
          </Button>
        </HStack>
      </Box>

      {/* Панель выбора модели и стиля */}
      <Box 
        bg="#17212B" 
        py={3} 
        px={4}
        borderBottom="1px solid"
        borderColor="#253340"
      >
        <HStack justify="center" align="center" spacing={4}>
          <Button
            variant="ghost"
            color="white"
            fontSize="16px"
            fontWeight="500"
            p={0}
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={2}
            _hover={{ bg: 'transparent', opacity: 0.8 }}
            border="1px solid"
            borderColor="#253340"
            borderRadius="md"
            width="140px"
            height="40px"
            px={3}
            justifyContent="space-between"
          >
            <HStack>
              <FaImage size={16} />
              <Text>Модель</Text>
            </HStack>
            <BsChevronRight size={16} />
          </Button>
          <Button
            variant="ghost"
            color="white"
            fontSize="16px"
            fontWeight="500"
            p={0}
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={2}
            _hover={{ bg: 'transparent', opacity: 0.8 }}
            border="1px solid"
            borderColor="#253340"
            borderRadius="md"
            width="140px"
            height="40px"
            px={3}
            justifyContent="space-between"
          >
            <HStack>
              <FaGift size={16} />
              <Text>Стиль</Text>
            </HStack>
            <BsChevronRight size={16} />
          </Button>
        </HStack>
      </Box>

      {/* Основной контент с ошибкой */}
      <Box 
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text 
          color="white"
          fontSize="24px"
          fontWeight="bold"
        >
          ОШИБКА ПЗДЦ
        </Text>
      </Box>

      {/* Модальное окно депозита */}
      <Modal 
        isOpen={isDepositOpen} 
        onClose={onDepositClose} 
        isCentered
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent
          bg="#17212B"
          color="white"
          borderRadius="xl"
          mx={4}
          maxW="400px"
        >
          <ModalHeader textAlign="center">Deposit</ModalHeader>
          <ModalCloseButton color="#6D7883" />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Text color="#6D7883" fontSize="sm" textAlign="center">
                Enter the amount you want to deposit
              </Text>
              <Box
                bg="#242F3D"
                p={2}
                borderRadius="xl"
                width="100%"
                border="1px solid"
                borderColor="#253340"
              >
                <HStack>
                  <TonLogo size="32px" />
                  <Input
                    variant="unstyled"
                    placeholder="Amount"
                    color="white"
                    fontSize="md"
                    _placeholder={{ color: "#6D7883" }}
                  />
                </HStack>
              </Box>
              <HStack width="100%" justify="flex-end">
                <Text color="#6D7883" fontSize="sm">Balance: </Text>
                <HStack spacing={1}>
                  <Text color="white" fontSize="sm">0</Text>
                  <TonLogo size="16px" />
                </HStack>
              </HStack>
              <Button
                width="100%"
                bg="#0098EA"
                color="white"
                size="lg"
                borderRadius="xl"
                _hover={{ opacity: 0.8 }}
                fontSize="md"
              >
                Connect Wallet
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Модальное окно вывода средств */}
      <Modal 
        isOpen={isWithdrawOpen} 
        onClose={onWithdrawClose} 
        isCentered
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent
          bg="#17212B"
          color="white"
          borderRadius="xl"
          mx={4}
          maxW="400px"
        >
          <ModalHeader textAlign="center">Withdraw</ModalHeader>
          <ModalCloseButton color="#6D7883" />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Text color="#6D7883" fontSize="sm" textAlign="center">
                Enter the amount you want to withdraw
              </Text>
              <Box
                bg="#242F3D"
                p={2}
                borderRadius="xl"
                width="100%"
                border="1px solid"
                borderColor="#253340"
              >
                <HStack>
                  <TonLogo size="32px" />
                  <Input
                    variant="unstyled"
                    placeholder="Amount"
                    color="white"
                    fontSize="md"
                    _placeholder={{ color: "#6D7883" }}
                  />
                </HStack>
              </Box>
              <HStack width="100%" justify="flex-end">
                <Text color="#6D7883" fontSize="sm">Balance: </Text>
                <HStack spacing={1}>
                  <Text color="white" fontSize="sm">0</Text>
                  <TonLogo size="16px" />
                </HStack>
              </HStack>
              <Button
                width="100%"
                bg="#0098EA"
                color="white"
                size="lg"
                borderRadius="xl"
                _hover={{ opacity: 0.8 }}
                fontSize="md"
              >
                Connect Wallet
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
} 