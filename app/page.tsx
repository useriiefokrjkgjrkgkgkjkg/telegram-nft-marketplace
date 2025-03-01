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
  useColorModeValue,
  Badge,
  VStack,
  Icon,
  Progress,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { AddIcon, MinusIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FaShoppingCart, FaGavel, FaGift, FaImages, FaChartLine, FaRandom, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px #63B3ED; }
  50% { box-shadow: 0 0 20px #63B3ED; }
  100% { box-shadow: 0 0 5px #63B3ED; }
`;

export default function Home() {
  const [balance] = useState('0.087');
  const bgColor = useColorModeValue('gray.900', 'gray.900');

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
      bg={bgColor} 
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
      <Box borderBottom="1px solid" borderColor="gray.700" bg="gray.800">
        <Container maxW="container.lg" py={2}>
          <HStack spacing={4} justify="space-between">
            <HStack spacing={2} 
              cursor="pointer" 
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              <Text fontSize="lg" color="blue.400">▼</Text>
              <Text fontSize="lg" color="blue.400">{balance}</Text>
              <ChevronDownIcon boxSize={5} color="blue.400" />
            </HStack>
            <HStack spacing={2}>
              <IconButton
                aria-label="Add balance"
                icon={<AddIcon />}
                size="sm"
                bg="blue.500"
                color="white"
                borderRadius="full"
                _hover={{ 
                  bg: 'blue.400',
                  transform: 'scale(1.1)',
                }}
                transition="all 0.2s"
              />
              <IconButton
                aria-label="Subtract balance"
                icon={<MinusIcon />}
                size="sm"
                bg="blue.500"
                color="white"
                borderRadius="full"
                _hover={{ 
                  bg: 'blue.400',
                  transform: 'scale(1.1)',
                }}
                transition="all 0.2s"
              />
              <Button
                bg="blue.500"
                color="white"
                size="sm"
                _hover={{ 
                  bg: 'blue.400',
                  transform: 'scale(1.02)',
                }}
                transition="all 0.2s"
                borderRadius="full"
                px={4}
                leftIcon={<Text as="span" fontSize="md">▼</Text>}
                animation={`${glowAnimation} 2s infinite`}
              >
                Connect Wallet
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Фильтры */}
      <Box borderBottom="1px solid" borderColor="gray.700" bg="gray.800">
        <Container maxW="container.lg" py={3}>
          <HStack spacing={4} justify="space-between">
            <HStack spacing={4}>
              <Box position="relative" w="150px">
                <Text position="absolute" top="-3.5" left="4" fontSize="xs" color="gray.400">
                  NFTs
                </Text>
                <Select
                  variant="filled"
                  bg="gray.700"
                  border="1px solid"
                  borderColor="gray.600"
                  h="45px"
                  pt="3"
                  color="white"
                  icon={<ChevronDownIcon />}
                  defaultValue="all"
                  _hover={{ bg: 'gray.600' }}
                  transition="all 0.2s"
                >
                  <option value="all">All</option>
                </Select>
              </Box>
              <Box position="relative" w="150px">
                <Text position="absolute" top="-3.5" left="4" fontSize="xs" color="gray.400">
                  Model
                </Text>
                <Select
                  variant="filled"
                  bg="gray.700"
                  border="1px solid"
                  borderColor="gray.600"
                  h="45px"
                  pt="3"
                  color="white"
                  icon={<ChevronDownIcon />}
                  defaultValue="all"
                  _hover={{ bg: 'gray.600' }}
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
                color="gray.400"
                _hover={{ 
                  color: 'white',
                  transform: 'scale(1.1)',
                }}
                transition="all 0.2s"
              />
              <IconButton
                aria-label="Delete"
                icon={<Icon as={FaTrash} />}
                variant="ghost"
                color="gray.400"
                _hover={{ 
                  color: 'white',
                  transform: 'scale(1.1)',
                }}
                transition="all 0.2s"
              />
              <IconButton
                aria-label="More"
                icon={<ChevronDownIcon />}
                variant="ghost"
                color="gray.400"
                _hover={{ 
                  color: 'white',
                  transform: 'scale(1.1)',
                }}
                transition="all 0.2s"
              />
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Корзина с прогрессом */}
      <Box borderBottom="1px solid" borderColor="gray.700" bg="gray.800">
        <Container maxW="container.lg" py={2}>
          <HStack>
            <Icon 
              as={FaShoppingCart} 
              color="blue.400" 
              _hover={{ transform: 'scale(1.1)' }}
              transition="all 0.2s"
              cursor="pointer"
            />
            <Progress
              value={0}
              size="sm"
              colorScheme="blue"
              flex="1"
              borderRadius="full"
              bg="gray.700"
              sx={{
                '& > div': {
                  transition: 'all 0.3s',
                }
              }}
            />
            <Text color="gray.400" fontWeight="bold">0</Text>
          </HStack>
        </Container>
      </Box>

      {/* Основной контент */}
      <Box flex="1" overflow="auto" bg="gray.900" position="relative">
        <Container maxW="container.lg" py={4}>
          <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4}>
            {/* Пустое состояние */}
            <Box 
              position="absolute" 
              top="50%" 
              left="50%" 
              transform="translate(-50%, -50%)"
              textAlign="center"
              color="gray.500"
            >
              <Text fontSize="lg">Пока никто не выставил NFT на продажу</Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Нижняя навигация */}
      <Box 
        borderTop="1px solid" 
        borderColor="gray.700"
        py={3}
        bg="gray.800"
      >
        <Container maxW="container.lg">
          <HStack justify="space-between">
            <VStack 
              spacing={1} 
              color="blue.400"
              cursor="pointer"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <Icon as={FaShoppingCart} boxSize={5} />
              <Text fontSize="xs">Market</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color="gray.500"
              cursor="pointer"
              _hover={{ 
                color: 'gray.300',
                transform: 'translateY(-2px)'
              }}
              transition="all 0.2s"
            >
              <Icon as={FaGavel} boxSize={5} />
              <Text fontSize="xs">Auctions</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color="gray.500"
              cursor="pointer"
              _hover={{ 
                color: 'gray.300',
                transform: 'translateY(-2px)'
              }}
              transition="all 0.2s"
            >
              <Icon as={FaGift} boxSize={5} />
              <Text fontSize="xs">My Gifts</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color="gray.500"
              cursor="pointer"
              _hover={{ 
                color: 'gray.300',
                transform: 'translateY(-2px)'
              }}
              transition="all 0.2s"
            >
              <Icon as={FaImages} boxSize={5} />
              <Text fontSize="xs">Gallery</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color="gray.500"
              cursor="pointer"
              _hover={{ 
                color: 'gray.300',
                transform: 'translateY(-2px)'
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