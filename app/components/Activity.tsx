import { Box, Text, Container, VStack, HStack, Icon, Image } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';

interface ActivityItem {
  id: string;
  gift: {
    name: string;
    image: string;
    number: string;
  };
  price: number;
  type: 'Sale' | 'Bid';
  date: string;
}

export const Activity = () => {
  const colors = {
    bg: '#17212B',
    panel: '#242F3D',
    accent: '#0098EA',
    text: '#FFFFFF',
    border: '#253340',
    muted: '#6D7883',
    hover: '#253340',
    orange: '#FF9500'
  };

  const activities: ActivityItem[] = [
    {
      id: '1',
      gift: {
        name: 'Diamond Ring',
        image: '/nft/diamond-ring.jpg',
        number: '#9783'
      },
      price: 6.49,
      type: 'Sale',
      date: '28 Feb 18:18:15 GMT'
    },
    {
      id: '2',
      gift: {
        name: 'Toy Bear',
        image: '/nft/toy-bear.jpg',
        number: '#25512'
      },
      price: 6,
      type: 'Sale',
      date: '28 Feb 18:18:15 GMT'
    },
    {
      id: '3',
      gift: {
        name: 'Astral Shard',
        image: '/nft/astral-shard.jpg',
        number: '#786'
      },
      price: 8,
      type: 'Bid',
      date: '28 Feb 18:18:15 GMT'
    }
  ];

  return (
    <Container maxW="container.lg" py={2}>
      <VStack spacing={2} align="stretch">
        {activities.map((activity) => (
          <Box
            key={activity.id}
            bg={colors.panel}
            p={3}
            borderRadius="lg"
            _hover={{ bg: colors.hover }}
            cursor="pointer"
          >
            <HStack spacing={4} justify="space-between">
              <HStack spacing={3} flex={1}>
                <Image
                  src={activity.gift.image}
                  alt={activity.gift.name}
                  boxSize="36px"
                  borderRadius="md"
                  objectFit="cover"
                />
                <VStack align="start" spacing={0}>
                  <Text color={colors.text} fontSize="sm">
                    {activity.gift.name}
                  </Text>
                  <Text color={colors.muted} fontSize="xs">
                    {activity.gift.number}
                  </Text>
                </VStack>
              </HStack>
              
              <HStack spacing={4} flex={1} justify="space-between">
                <Text color={colors.text} fontSize="sm">
                  {activity.price} ₸
                </Text>
                <Text 
                  color={activity.type === 'Sale' ? colors.accent : colors.orange} 
                  fontSize="sm"
                >
                  {activity.type}
                </Text>
                <Text color={colors.muted} fontSize="xs">
                  {activity.date}
                </Text>
                <Icon as={FaChevronRight} color={colors.muted} boxSize={3} />
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
}; 