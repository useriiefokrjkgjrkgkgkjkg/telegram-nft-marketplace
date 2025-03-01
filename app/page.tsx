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
  Icon
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FaShoppingCart, FaGavel, FaGift, FaImages, FaChartLine } from 'react-icons/fa';
import { useState } from 'react';

export default function Home() {
  const [balance] = useState('0.087');
  const bgColor = useColorModeValue('gray.900', 'gray.900');
  const buttonBg = useColorModeValue('blue.400', 'blue.400');

  return (
    <Box bg={bgColor} minH="100vh" color="white">
      {/* Верхняя панель */}
      <Box p={4} borderBottom="1px solid" borderColor="gray.700">
        <Container maxW="container.lg">
          <HStack spacing={4} justify="space-between">
            <HStack>
              <Text fontSize="xl">◈</Text>
              <Text fontSize="xl">{balance}</Text>
              <ChevronDownIcon />
            </HStack>
            <HStack>
              <IconButton
                aria-label="Add balance"
                icon={<AddIcon />}
                size="md"
                colorScheme="blue"
                variant="ghost"
              />
              <IconButton
                aria-label="Subtract balance"
                icon={<MinusIcon />}
                size="md"
                colorScheme="blue"
                variant="ghost"
              />
              <Button colorScheme="blue" leftIcon={<Text>◈</Text>}>
                Connect Wallet
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Фильтры */}
      <Box p={4} borderBottom="1px solid" borderColor="gray.700">
        <Container maxW="container.lg">
          <HStack spacing={4} justify="space-between">
            <HStack spacing={4}>
              <Select
                variant="filled"
                bg="gray.800"
                w="150px"
                icon={<ChevronDownIcon />}
                defaultValue="all"
              >
                <option value="all">All NFTs</option>
              </Select>
              <Select
                variant="filled"
                bg="gray.800"
                w="150px"
                icon={<ChevronDownIcon />}
                defaultValue="all"
              >
                <option value="all">All Models</option>
              </Select>
            </HStack>
            <HStack>
              <IconButton
                aria-label="Filter"
                icon={<Icon as={FaShoppingCart} />}
                variant="ghost"
              />
              <IconButton
                aria-label="Delete"
                icon={<Icon as={FaGavel} />}
                variant="ghost"
              />
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Основной контент */}
      <Container maxW="container.lg" py={8}>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6}>
          {/* Здесь будут карточки NFT */}
        </SimpleGrid>
      </Container>

      {/* Нижняя навигация */}
      <Box 
        position="fixed" 
        bottom={0} 
        w="100%" 
        bg="gray.900" 
        borderTop="1px solid" 
        borderColor="gray.700"
        py={2}
      >
        <Container maxW="container.lg">
          <HStack justify="space-between">
            <VStack spacing={1} color="blue.400">
              <Icon as={FaShoppingCart} boxSize={6} />
              <Text fontSize="sm">Market</Text>
            </VStack>
            <VStack spacing={1} color="gray.500">
              <Icon as={FaGavel} boxSize={6} />
              <Text fontSize="sm">Auctions</Text>
            </VStack>
            <VStack spacing={1} color="gray.500">
              <Icon as={FaGift} boxSize={6} />
              <Text fontSize="sm">My Gifts</Text>
            </VStack>
            <VStack spacing={1} color="gray.500">
              <Icon as={FaImages} boxSize={6} />
              <Text fontSize="sm">Gallery</Text>
            </VStack>
            <VStack spacing={1} color="gray.500">
              <Icon as={FaChartLine} boxSize={6} />
              <Text fontSize="sm">Activity</Text>
            </VStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
} 