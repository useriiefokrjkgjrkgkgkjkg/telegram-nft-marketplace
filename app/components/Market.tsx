import { Box, Text, Container, SimpleGrid, HStack, Icon } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

export const Market = () => {
  const colors = {
    bg: '#0E1621',
    panel: '#17212B',
    accent: '#0098EA',
    text: '#FFFFFF',
    border: '#253340',
    muted: '#6D7883',
    hover: '#253340',
    buttonBg: '#242F3D'
  };

  return (
    <Container maxW="container.lg" py={4}>
      {/* Корзина и счетчик */}
      <HStack spacing={2} mb={4}>
        <Icon as={FaShoppingCart} color={colors.muted} />
        <Text color={colors.muted}>0</Text>
      </HStack>

      {/* Пустое состояние */}
      <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        transform="translate(-50%, -50%)"
        textAlign="center"
        color={colors.muted}
      >
        <Text fontSize="lg">
          No gifts found with the filters you selected
        </Text>
      </Box>
    </Container>
  );
}; 