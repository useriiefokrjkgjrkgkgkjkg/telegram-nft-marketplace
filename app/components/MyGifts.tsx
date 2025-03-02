import { Box, Text, Container, VStack } from '@chakra-ui/react';

export const MyGifts = () => {
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
    <Container maxW="container.lg" py={2}>
      <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        transform="translate(-50%, -50%)"
        textAlign="center"
        color={colors.muted}
      >
        <VStack spacing={1}>
          <Text fontSize="md">
            Want to sell your Gift?
          </Text>
          <Text fontSize="sm">
            Transfer it to <Text as="span" color={colors.accent}>@GiftRelayer</Text>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
}; 