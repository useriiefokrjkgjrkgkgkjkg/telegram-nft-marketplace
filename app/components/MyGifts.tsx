import { Box, Text, Container } from '@chakra-ui/react';

export const MyGifts = () => {
  return (
    <Container maxW="container.lg" py={4}>
      <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        transform="translate(-50%, -50%)"
        textAlign="center"
        color="#808080"
      >
        <Text fontSize="lg">
          У вас пока нет подарков
        </Text>
      </Box>
    </Container>
  );
}; 