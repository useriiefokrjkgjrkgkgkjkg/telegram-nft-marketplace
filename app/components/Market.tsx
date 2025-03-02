import { Box, Text, Container, SimpleGrid, HStack, Icon, Button, Image } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

interface NFTCard {
  id: string;
  name: string;
  image: string;
  price: number;
  number: string;
}

export const Market = () => {
  const colors = {
    bg: '#17212B',
    panel: '#242F3D',
    accent: '#0098EA',
    text: '#FFFFFF',
    border: '#253340',
    muted: '#6D7883',
    hover: '#253340',
  };

  const nfts: NFTCard[] = [
    {
      id: '1',
      name: 'Sleigh Bell',
      image: '/nft/sleigh-bell.jpg',
      price: 1.1,
      number: '#978'
    },
    {
      id: '2',
      name: 'Spiced Wine',
      image: '/nft/spiced-wine.jpg',
      price: 0.99,
      number: '#15461'
    },
    {
      id: '3',
      name: 'Sakura Flower',
      image: '/nft/sakura.jpg',
      price: 0.5,
      number: '#27124'
    },
    {
      id: '4',
      name: 'Lol Pop',
      image: '/nft/lolpop.jpg',
      price: 0.75,
      number: '#121348'
    }
  ];

  return (
    <Container maxW="container.lg" py={2}>
      {/* Корзина и счетчик */}
      <HStack spacing={2} mb={2}>
        <Icon as={FaShoppingCart} color={colors.muted} boxSize={4} />
        <Text color={colors.muted} fontSize="sm">0</Text>
      </HStack>

      {/* Сетка NFT карточек */}
      <SimpleGrid columns={2} spacing={3}>
        {nfts.map((nft) => (
          <Box
            key={nft.id}
            bg={colors.panel}
            borderRadius="xl"
            overflow="hidden"
            position="relative"
          >
            <Image
              src={nft.image}
              alt={nft.name}
              w="100%"
              h="160px"
              objectFit="cover"
            />
            
            {/* Кнопка корзины */}
            <Box
              position="absolute"
              bottom={4}
              right={4}
              bg={colors.accent}
              borderRadius="full"
              p={2}
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
            >
              <Icon as={FaShoppingCart} color="white" boxSize={4} />
            </Box>

            {/* Информация о NFT */}
            <Box p={3}>
              <HStack justify="space-between" mb={2}>
                <Text color={colors.text} fontSize="sm" fontWeight="medium">
                  {nft.name}
                </Text>
                <Text color={colors.muted} fontSize="xs">
                  {nft.number}
                </Text>
              </HStack>
              
              <Button
                bg={colors.accent}
                color="white"
                size="sm"
                width="100%"
                height="32px"
                fontSize="sm"
                _hover={{ opacity: 0.8 }}
              >
                {nft.price} ₸
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}; 