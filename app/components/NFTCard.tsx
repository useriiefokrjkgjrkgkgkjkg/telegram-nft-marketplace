'use client';

import { Box, Image, Text, VStack, HStack, Icon, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

interface NFTGift {
  id: string;
  name: string;
  imageUrl: string;
  stars: number;
  level: number;
  owner: string;
}

interface NFTCardProps {
  gift: NFTGift;
}

export const NFTCard: React.FC<NFTCardProps> = ({ gift }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      _hover={{ transform: 'scale(1.02)', transition: 'all 0.2s' }}
    >
      <Image
        src={gift.imageUrl}
        alt={gift.name}
        borderRadius="md"
        objectFit="cover"
        w="100%"
        h="200px"
      />
      
      <VStack align="start" mt={4} spacing={2}>
        <Text fontSize="xl" fontWeight="bold">{gift.name}</Text>
        
        <HStack>
          <Icon as={StarIcon} color="yellow.400" />
          <Text>{gift.stars} звезд</Text>
        </HStack>
        
        <Text>Уровень: {gift.level}</Text>
        <Text>Владелец: {gift.owner}</Text>
        
        <Button colorScheme="blue" width="100%" mt={2}>
          Подробнее
        </Button>
      </VStack>
    </Box>
  );
}; 