'use client'

import { Box, Container, Heading, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center">
        <Heading mb={4}>NFT Marketplace</Heading>
        <Text>Добро пожаловать в NFT Marketplace! Используйте бота в Telegram для взаимодействия.</Text>
      </Box>
    </Container>
  )
} 