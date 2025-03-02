import { Box, Text, Container, HStack, Icon } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaShoppingCart } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

export const Market = () => {
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
      {/* Корзина и счетчик */}
      <HStack 
        spacing={2} 
        mb={2}
        animation={`${fadeIn} 0.3s ease-out`}
        bg={colors.panel}
        p={2}
        borderRadius="full"
        width="fit-content"
        boxShadow="0 2px 8px rgba(0,0,0,0.2)"
        _hover={{
          bg: colors.hover,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          '& > *': {
            color: colors.accent,
          }
        }}
        transition="all 0.2s ease"
      >
        <Icon 
          as={FaShoppingCart} 
          color={colors.muted} 
          boxSize={4}
          transition="all 0.2s ease"
        />
        <Text 
          color={colors.muted} 
          fontSize="sm"
          fontWeight="500"
          transition="all 0.2s ease"
        >
          0
        </Text>
      </HStack>

      {/* Пустое состояние */}
      <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        transform="translate(-50%, -50%)"
        textAlign="center"
        color={colors.muted}
        animation={`${fadeIn} 0.5s ease-out`}
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
          animation={`${pulse} 3s infinite ease-in-out`}
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