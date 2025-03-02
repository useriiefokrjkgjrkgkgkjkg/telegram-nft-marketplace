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
import { AddIcon, MinusIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

// Объявляем типы для Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        expand: () => void;
        enableClosingConfirmation: () => void;
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
      display="flex"
      flexDirection="column"
    >
      {/* Верхняя панель */}
      <Box 
        bg="#17212B" 
        py={4} 
        px={6}
        borderBottom="1px solid"
        borderColor="#253340"
      >
        <HStack spacing={6} justify="space-between">
          <HStack spacing={3}>
            <TonLogo size="32px" />
            <Text color="white" fontSize="lg" fontWeight="bold">0.087</Text>
          </HStack>
          <HStack spacing={3}>
            <IconButton
              aria-label="Add"
              icon={<AddIcon boxSize={4} />}
              size="lg"
              bg="#0098EA"
              color="white"
              borderRadius="full"
              h="40px"
              minW="40px"
              _hover={{ bg: "#0088D1" }}
              onClick={onDepositOpen}
              isDisabled={isWithdrawOpen}
            />
            <IconButton
              aria-label="Subtract"
              icon={<MinusIcon boxSize={4} />}
              size="lg"
              bg="#0098EA"
              color="white"
              borderRadius="full"
              h="40px"
              minW="40px"
              _hover={{ bg: "#0088D1" }}
              onClick={onWithdrawOpen}
              isDisabled={isDepositOpen}
            />
            <Button
              bg="#0098EA"
              color="white"
              size="lg"
              borderRadius="full"
              h="40px"
              px={6}
              fontSize="md"
              fontWeight="bold"
              _hover={{ bg: "#0088D1" }}
              leftIcon={
                <Image 
                  src={window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url || "https://via.placeholder.com/32"}
                  alt="User"
                  width="24px"
                  height="24px"
                  borderRadius="full"
                  fallbackSrc="https://via.placeholder.com/32"
                />
              }
            >
              Connect Wallet
            </Button>
          </HStack>
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