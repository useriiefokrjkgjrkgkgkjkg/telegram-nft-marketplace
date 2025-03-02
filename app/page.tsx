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
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
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
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 8V16L12 22L21 16V8L12 2ZM12 4.236L18.618 8.764L12 13.291L5.382 8.764L12 4.236ZM5 10.618L11.5 15.073V19.927L5 15.472V10.618ZM12.5 19.927V15.073L19 10.618V15.472L12.5 19.927Z" fill="currentColor"/>
  </svg>
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
        py={2} 
        px={4}
        borderBottom="1px solid"
        borderColor="#253340"
      >
        <HStack spacing={4} justify="space-between">
          <HStack spacing={2}>
            <TonLogo />
            <Text color="white" fontSize="sm">0</Text>
          </HStack>
          <HStack spacing={2}>
            <IconButton
              aria-label="Add"
              icon={<AddIcon boxSize={3} />}
              size="sm"
              bg="#0098EA"
              color="white"
              borderRadius="full"
              h="24px"
              minW="24px"
              _hover={{ opacity: 0.8 }}
              onClick={onDepositOpen}
              isDisabled={isWithdrawOpen}
            />
            <IconButton
              aria-label="Subtract"
              icon={<MinusIcon boxSize={3} />}
              size="sm"
              bg="#0098EA"
              color="white"
              borderRadius="full"
              h="24px"
              minW="24px"
              _hover={{ opacity: 0.8 }}
              onClick={onWithdrawOpen}
              isDisabled={isDepositOpen}
            />
            <Button
              bg="#0098EA"
              color="white"
              size="sm"
              borderRadius="full"
              h="24px"
              px={3}
              fontSize="xs"
              _hover={{ opacity: 0.8 }}
              leftIcon={
                <Image 
                  src={window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url || "https://via.placeholder.com/24"}
                  alt="User"
                  width="16px"
                  height="16px"
                  borderRadius="full"
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