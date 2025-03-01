import { Box, Text, Container, SimpleGrid } from '@chakra-ui/react';

export const Market = () => {
  return (
    <Container maxW="container.lg" py={4}>
      <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4}>
        <Box 
          position="absolute" 
          top="50%" 
          left="50%" 
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="#808080"
        >
          <Text fontSize="lg">
            Пока никто не выставил NFT на продажу
          </Text>
        </Box>
      </SimpleGrid>
    </Container>
  );
}; 