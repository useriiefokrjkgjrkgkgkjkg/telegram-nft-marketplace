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
  Progress
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FaShoppingCart, FaGavel, FaGift, FaImages, FaChartLine, FaTrash, FaRandom } from 'react-icons/fa';
import { useState } from 'react';

export default function Home() {
  const [balance] = useState('0');
  const bgColor = useColorModeValue('gray.900', 'gray.900');

  return (
    <Box bg={bgColor} minH="100vh" color="white">
      {/* Верхняя панель */}
      <Box p={4} borderBottom="1px solid" borderColor="gray.700">
        <Container maxW="container.lg">
          <HStack spacing={4} justify="space-between">
            <HStack spacing={2}>
              <Text fontSize="lg" color="blue.400">◈</Text>
              <Text fontSize="lg">{balance}</Text>
              <ChevronDownIcon boxSize={5} />
            </HStack>
            <HStack spacing={2}>
              <IconButton
                aria-label="Add balance"
                icon={<AddIcon />}
                size="md"
                bg="blue.500"
                color="white"
                borderRadius="full"
                _hover={{ bg: 'blue.600' }}
              />
              <IconButton
                aria-label="Subtract balance"
                icon={<MinusIcon />}
                size="md"
                bg="blue.500"
                color="white"
                borderRadius="full"
                _hover={{ bg: 'blue.600' }}
              />
              <Box w="2" />
              <Button
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
                borderRadius="full"
                px={6}
                leftIcon={<Text as="span" fontSize="lg">◈</Text>}
              >
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
              <Box position="relative" w="150px">
                <Text position="absolute" top="-3.5" left="4" fontSize="xs" color="gray.500">
                  NFTs
                </Text>
                <Select
                  variant="filled"
                  bg="gray.800"
                  border="1px solid"
                  borderColor="gray.700"
                  h="45px"
                  pt="3"
                  icon={<ChevronDownIcon />}
                  defaultValue="all"
                >
                  <option value="all">All</option>
                </Select>
              </Box>
              <Box position="relative" w="150px">
                <Text position="absolute" top="-3.5" left="4" fontSize="xs" color="gray.500">
                  Model
                </Text>
                <Select
                  variant="filled"
                  bg="gray.800"
                  border="1px solid"
                  borderColor="gray.700"
                  h="45px"
                  pt="3"
                  icon={<ChevronDownIcon />}
                  defaultValue="all"
                >
                  <option value="all">All</option>
                </Select>
              </Box>
            </HStack>
            <HStack>
              <IconButton
                aria-label="Random"
                icon={<Icon as={FaRandom} />}
                variant="ghost"
                color="gray.400"
              />
              <IconButton
                aria-label="Delete"
                icon={<Icon as={FaTrash} />}
                variant="ghost"
                color="gray.400"
              />
              <IconButton
                aria-label="More"
                icon={<ChevronDownIcon />}
                variant="ghost"
                color="gray.400"
              />
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Корзина с прогрессом */}
      <Box px={4} py={2}>
        <Container maxW="container.lg">
          <HStack>
            <Icon as={FaShoppingCart} color="blue.400" />
            <Progress
              value={0}
              size="sm"
              colorScheme="blue"
              flex="1"
              borderRadius="full"
              bg="gray.800"
            />
            <Text color="gray.400">0</Text>
          </HStack>
        </Container>
      </Box>

      {/* Основной контент */}
      <Container maxW="container.lg" py={8} pb="100px">
        <SimpleGrid columns={{ base: 2, md: 2 }} spacing={6}>
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
        py={3}
        px={4}
      >
        <Container maxW="container.lg">
          <HStack justify="space-between">
            <VStack spacing={1} color="blue.400">
              <Icon as={FaShoppingCart} boxSize={5} />
              <Text fontSize="xs">Market</Text>
            </VStack>
            <VStack spacing={1} color="gray.500">
              <Icon as={FaGavel} boxSize={5} />
              <Text fontSize="xs">Auctions</Text>
            </VStack>
            <VStack spacing={1} color="gray.500">
              <Icon as={FaGift} boxSize={5} />
              <Text fontSize="xs">My Gifts</Text>
            </VStack>
            <VStack spacing={1} color="gray.500">
              <Icon as={FaImages} boxSize={5} />
              <Text fontSize="xs">Gallery</Text>
            </VStack>
            <VStack spacing={1} color="gray.500">
              <Icon as={FaChartLine} boxSize={5} />
              <Text fontSize="xs">Activity</Text>
            </VStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
} 