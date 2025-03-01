'use client';

import { Box, Container, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import { NFTCard } from './components/NFTCard';
import { useState, useEffect } from 'react';

interface NFTGift {
  id: string;
  name: string;
  imageUrl: string;
  stars: number;
  level: number;
  owner: string;
}

export default function Home() {
  const [gifts, setGifts] = useState<NFTGift[]>([]);
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    // В будущем здесь будет загрузка реальных данных
    const mockGifts: NFTGift[] = [
      {
        id: '1',
        name: 'Золотое сердце',
        imageUrl: 'https://placekitten.com/200/200',
        stars: 25,
        level: 2,
        owner: '@PalmAngeleges'
      },
      // Добавьте больше мок-данных по необходимости
    ];
    setGifts(mockGifts);
  }, []);

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <Heading mb={8} textAlign="center">NFT Подарки Telegram</Heading>
        <Text mb={8} textAlign="center" fontSize="lg">
          Уникальная коллекция подарков, которые можно улучшать и передавать
        </Text>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {gifts.map((gift) => (
            <NFTCard key={gift.id} gift={gift} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
} 