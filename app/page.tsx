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
  0% { box-shadow: 0 0 5px #9F7AEA; }
  50% { box-shadow: 0 0 20px #9F7AEA; }
  100% { box-shadow: 0 0 5px #9F7AEA; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const fadeInAnimation = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

export default function Home() {
  const [balance] = useState('0.087');
  
  // Новые градиенты и цвета
  const gradientBg = 'linear-gradient(135deg, #0F1322 0%, #131B2E 50%, #1A1A2E 100%)';
  const panelBg = 'linear-gradient(to bottom, rgba(29, 32, 43, 0.95), rgba(16, 20, 35, 0.95))';
  const neonBlue = '#00F5FF';
  const neonPink = '#FF10F0';
  const accentColor = neonBlue;
  const hoverAccentColor = neonPink;

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
      bg={gradientBg}
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
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${neonBlue}, transparent)`,
          animation: `${shimmerAnimation} 3s infinite linear`
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.1) 0%, transparent 60%)',
          pointerEvents: 'none'
        }
      }}
    >
      {/* Верхняя панель */}
      <Box 
        borderBottom="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
        bgImage={panelBg}
        backdropFilter="blur(10px)"
        animation={`${fadeInAnimation} 0.5s ease-out`}
      >
        <Container maxW="container.lg" py={2}>
          <HStack spacing={4} justify="space-between">
            <HStack spacing={2} 
              cursor="pointer" 
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              <Text 
                fontSize="lg" 
                color={accentColor}
                animation={`${floatAnimation} 2s ease-in-out infinite`}
                textShadow={`0 0 10px ${accentColor}`}
              >▼</Text>
              <Text 
                fontSize="lg" 
                color={accentColor}
                textShadow={`0 0 10px ${accentColor}`}
              >{balance}</Text>
              <ChevronDownIcon 
                boxSize={5} 
                color={accentColor}
                animation={`${pulseAnimation} 2s infinite`}
              />
            </HStack>
            <HStack spacing={2}>
              <IconButton
                aria-label="Add balance"
                icon={<AddIcon />}
                size="sm"
                bg={`${accentColor}22`}
                color={accentColor}
                borderRadius="full"
                border="1px solid"
                borderColor={`${accentColor}44`}
                _hover={{ 
                  bg: `${hoverAccentColor}33`,
                  color: hoverAccentColor,
                  transform: 'scale(1.1)',
                  borderColor: `${hoverAccentColor}66`
                }}
                transition="all 0.2s"
              />
              <IconButton
                aria-label="Subtract balance"
                icon={<MinusIcon />}
                size="sm"
                bg={`${accentColor}22`}
                color={accentColor}
                borderRadius="full"
                border="1px solid"
                borderColor={`${accentColor}44`}
                _hover={{ 
                  bg: `${hoverAccentColor}33`,
                  color: hoverAccentColor,
                  transform: 'scale(1.1)',
                  borderColor: `${hoverAccentColor}66`
                }}
                transition="all 0.2s"
              />
              <Button
                bg={`${accentColor}22`}
                color={accentColor}
                size="sm"
                border="1px solid"
                borderColor={`${accentColor}44`}
                _hover={{ 
                  bg: `${hoverAccentColor}33`,
                  color: hoverAccentColor,
                  transform: 'scale(1.02)',
                  borderColor: `${hoverAccentColor}66`
                }}
                transition="all 0.2s"
                borderRadius="full"
                px={4}
                leftIcon={<Text as="span" fontSize="md">▼</Text>}
                textShadow={`0 0 10px ${accentColor}`}
                boxShadow={`0 0 20px ${accentColor}33`}
              >
                Connect Wallet
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Фильтры */}
      <Box 
        borderBottom="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
        bgImage={panelBg}
        backdropFilter="blur(10px)"
        animation={`${fadeInAnimation} 0.5s ease-out 0.2s`}
        opacity="0"
        sx={{ animationFillMode: 'forwards' }}
      >
        <Container maxW="container.lg" py={3}>
          <HStack spacing={4} justify="space-between">
            <HStack spacing={4}>
              <Box position="relative" w="150px">
                <Text position="absolute" top="-3.5" left="4" fontSize="xs" color="gray.400">
                  NFTs
                </Text>
                <Select
                  variant="filled"
                  bg={`${accentColor}11`}
                  border="1px solid"
                  borderColor={`${accentColor}33`}
                  h="45px"
                  pt="3"
                  color="white"
                  icon={<ChevronDownIcon />}
                  defaultValue="all"
                  _hover={{ 
                    bg: `${accentColor}22`,
                    borderColor: `${accentColor}66`
                  }}
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
                  bg={`${accentColor}11`}
                  border="1px solid"
                  borderColor={`${accentColor}33`}
                  h="45px"
                  pt="3"
                  color="white"
                  icon={<ChevronDownIcon />}
                  defaultValue="all"
                  _hover={{ 
                    bg: `${accentColor}22`,
                    borderColor: `${accentColor}66`
                  }}
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
                  color: accentColor,
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
                  color: accentColor,
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
                  color: accentColor,
                  transform: 'scale(1.1)',
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
        borderColor="rgba(255, 255, 255, 0.1)"
        bgImage={panelBg}
        backdropFilter="blur(10px)"
        animation={`${fadeInAnimation} 0.5s ease-out 0.4s`}
        opacity="0"
        sx={{ animationFillMode: 'forwards' }}
      >
        <Container maxW="container.lg" py={2}>
          <HStack>
            <Icon 
              as={FaShoppingCart} 
              color={accentColor}
              _hover={{ 
                transform: 'scale(1.1) rotate(10deg)',
                color: hoverAccentColor,
              }}
              transition="all 0.3s"
              cursor="pointer"
            />
            <Progress
              value={0}
              size="sm"
              flex="1"
              borderRadius="full"
              bg={`${accentColor}11`}
              sx={{
                '& > div': {
                  transition: 'all 0.3s',
                  background: `linear-gradient(90deg, ${accentColor}, ${hoverAccentColor})`,
                  backgroundSize: '200% 100%',
                  animation: `${shimmerAnimation} 2s infinite linear`
                }
              }}
            />
            <Text 
              color={accentColor}
              fontWeight="bold"
              animation={`${pulseAnimation} 2s infinite`}
              textShadow={`0 0 10px ${accentColor}`}
            >0</Text>
          </HStack>
        </Container>
      </Box>

      {/* Основной контент */}
      <Box 
        flex="1" 
        overflow="auto" 
        bgImage={gradientBg}
        position="relative"
        animation={`${fadeInAnimation} 0.5s ease-out 0.6s`}
        opacity="0"
        sx={{ 
          animationFillMode: 'forwards',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.05) 0%, transparent 70%)',
            pointerEvents: 'none'
          }
        }}
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
              color="gray.400"
              animation={`${floatAnimation} 3s ease-in-out infinite`}
            >
              <Text 
                fontSize="lg"
                textShadow={`0 0 20px ${accentColor}`}
              >
                Пока никто не выставил NFT на продажу
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Нижняя навигация */}
      <Box 
        borderTop="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
        py={3}
        bgImage={panelBg}
        backdropFilter="blur(10px)"
        animation={`${fadeInAnimation} 0.5s ease-out 0.8s`}
        opacity="0"
        sx={{ animationFillMode: 'forwards' }}
      >
        <Container maxW="container.lg">
          <HStack justify="space-between">
            <VStack 
              spacing={1} 
              color={accentColor}
              cursor="pointer"
              _hover={{ 
                transform: 'translateY(-2px) rotate(5deg)',
                color: hoverAccentColor,
              }}
              transition="all 0.3s"
            >
              <Icon 
                as={FaShoppingCart} 
                boxSize={5}
                animation={`${rotateAnimation} 10s linear infinite`}
              />
              <Text 
                fontSize="xs"
                textShadow={`0 0 10px ${accentColor}`}
              >Market</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color="gray.500"
              cursor="pointer"
              _hover={{ 
                color: hoverAccentColor,
                transform: 'translateY(-2px) rotate(-5deg)'
              }}
              transition="all 0.3s"
            >
              <Icon 
                as={FaGavel} 
                boxSize={5}
                animation={`${rotateAnimation} 12s linear infinite`}
              />
              <Text fontSize="xs">Auctions</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color="gray.500"
              cursor="pointer"
              _hover={{ 
                color: hoverAccentColor,
                transform: 'translateY(-2px) rotate(5deg)'
              }}
              transition="all 0.3s"
            >
              <Icon 
                as={FaGift} 
                boxSize={5}
                animation={`${rotateAnimation} 14s linear infinite`}
              />
              <Text fontSize="xs">My Gifts</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color="gray.500"
              cursor="pointer"
              _hover={{ 
                color: hoverAccentColor,
                transform: 'translateY(-2px) rotate(-5deg)'
              }}
              transition="all 0.3s"
            >
              <Icon 
                as={FaImages} 
                boxSize={5}
                animation={`${rotateAnimation} 16s linear infinite`}
              />
              <Text fontSize="xs">Gallery</Text>
            </VStack>
            <VStack 
              spacing={1} 
              color="gray.500"
              cursor="pointer"
              _hover={{ 
                color: hoverAccentColor,
                transform: 'translateY(-2px) rotate(5deg)'
              }}
              transition="all 0.3s"
            >
              <Icon 
                as={FaChartLine} 
                boxSize={5}
                animation={`${rotateAnimation} 18s linear infinite`}
              />
              <Text fontSize="xs">Activity</Text>
            </VStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
} 