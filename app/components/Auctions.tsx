import { Box, Text, Container } from '@chakra-ui/react';

export const Auctions = () => {
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