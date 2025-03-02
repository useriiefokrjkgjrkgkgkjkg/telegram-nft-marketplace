import { Box, Text, Container, SimpleGrid, HStack, Button, Image } from '@chakra-ui/react';

interface AuctionCard {
  id: string;
  name: string;
  image: string;
  number: string;
  highestBid: number;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export const Auctions = () => {
  const colors = {
    bg: '#17212B',
    panel: '#242F3D',
    accent: '#0098EA',
    text: '#FFFFFF',
    border: '#253340',
    muted: '#6D7883',
    hover: '#253340',
  };

  const auctions: AuctionCard[] = [
    {
      id: '1',
      name: 'Record Player',
      image: '/nft/record-player.jpg',
      number: '#4511',
      highestBid: 4.5,
      timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 }
    },
    {
      id: '2',
      name: 'Scared Cat',
      image: '/nft/scared-cat.jpg',
      number: '#15501',
      highestBid: 8,
      timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 }
    },
    {
      id: '3',
      name: 'Skull Flower',
      image: '/nft/skull-flower.jpg',
      number: '#9375',
      highestBid: 3.2,
      timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 }
    },
    {
      id: '4',
      name: 'Desk Calendar',
      image: '/nft/desk-calendar.jpg',
      number: '#12921',
      highestBid: 2.8,
      timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
  ];

  return (
    <Container maxW="container.lg" py={2}>
      <SimpleGrid columns={2} spacing={3}>
        {auctions.map((auction) => (
          <Box
            key={auction.id}
            bg={colors.panel}
            borderRadius="xl"
            overflow="hidden"
          >
            <Image
              src={auction.image}
              alt={auction.name}
              w="100%"
              h="160px"
              objectFit="cover"
            />
            
            <Box p={3}>
              <HStack justify="space-between" mb={2}>
                <Text color={colors.text} fontSize="sm" fontWeight="medium">
                  {auction.name}
                </Text>
                <Text color={colors.muted} fontSize="xs">
                  {auction.number}
                </Text>
              </HStack>
              
              <HStack justify="space-between" mb={2}>
                <Text color={colors.muted} fontSize="xs">Highest Bid</Text>
                <Text color={colors.text} fontSize="sm">
                  {auction.highestBid} ₸
                </Text>
              </HStack>
              
              <HStack justify="center" spacing={1} mb={2} fontSize="xs" color={colors.muted}>
                <Text>{auction.timeLeft.days}d</Text>
                <Text>:</Text>
                <Text>{auction.timeLeft.hours}h</Text>
                <Text>:</Text>
                <Text>{auction.timeLeft.minutes}m</Text>
                <Text>:</Text>
                <Text>{auction.timeLeft.seconds}s</Text>
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
                Bid {auction.highestBid} ₸
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}; 