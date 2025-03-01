import { Box, Text, Container, Table, Thead, Tbody, Tr, Th, HStack, Icon } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';

export const Activity = () => {
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
      {/* Заголовок таблицы */}
      <HStack 
        spacing={4} 
        bg={colors.buttonBg} 
        p={4} 
        borderRadius="md"
        mb={4}
      >
        <Text flex="1" color={colors.muted}>Gift</Text>
        <Text width="100px" color={colors.muted}>Price</Text>
        <Text width="100px" color={colors.muted}>Type</Text>
        <Icon as={FaChevronRight} color={colors.muted} />
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
          No activity found
        </Text>
      </Box>
    </Container>
  );
}; 