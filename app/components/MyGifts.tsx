import { Box, Text, Container, HStack, Button, Icon, VStack } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';
import { useState } from 'react';

export const MyGifts = () => {
  const [activeTab, setActiveTab] = useState('listed');

  const colors = {
    bg: '#17212B',
    panel: '#242F3D',
    accent: '#0098EA',
    text: '#FFFFFF',
    border: '#253340',
    muted: '#6D7883',
    hover: '#253340',
  };

  return (
    <Container maxW="container.lg" py={4}>
      {/* Пустое состояние */}
      <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        transform="translate(-50%, -50%)"
        textAlign="center"
        color={colors.muted}
      >
        <VStack spacing={2}>
          <Text fontSize="lg">
            Want to sell your Gift?
          </Text>
          <Text fontSize="md">
            Transfer it to <Text as="span" color={colors.accent}>@GiftRelayer</Text>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
}; 