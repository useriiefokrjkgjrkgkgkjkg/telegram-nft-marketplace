import { Box, Text, Container } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Auctions = () => {
  const colors = {
    bg: '#0A0F15',
    panel: '#151C24',
    accent: '#2D7AF4',
    text: '#FFFFFF',
    border: '#1E2730',
    muted: '#4A5561',
    hover: '#1A2330',
    gradient: 'linear-gradient(135deg, #2D7AF4 0%, #14B4FF 100%)',
  };

  return (
    <Container maxW="container.lg" py={2}>
      {/* Пустое состояние */}
      <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        transform="translate(-50%, -50%)"
        textAlign="center"
        color={colors.muted}
        width="100%"
        maxW="400px"
      >
        <Box
          bg={colors.panel}
          p={8}
          borderRadius="2xl"
          boxShadow="0 8px 32px rgba(0,0,0,0.3)"
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor={colors.border}
          transition="all 0.3s ease"
          _hover={{
            transform: 'scale(1.02)',
            bg: colors.hover,
            boxShadow: '0 12px 48px rgba(0,0,0,0.4)'
          }}
        >
          <Text 
            fontSize="sm"
            fontWeight="500"
            letterSpacing="wide"
            bgGradient={colors.gradient}
            bgClip="text"
            textTransform="uppercase"
          >
            No gifts found with the filters you selected
          </Text>
        </Box>
      </Box>
    </Container>
  );
}; 