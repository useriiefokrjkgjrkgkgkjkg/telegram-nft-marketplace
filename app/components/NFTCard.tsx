import { Box, Button, Text, VStack, Image } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'

interface NFTCardProps {
  id: number
  title: string
  price: number
  image: string
  onBuy?: () => void
}

export function NFTCard({ id, title, price, image, onBuy }: NFTCardProps) {
  return (
    <Box 
      bg="rgba(42, 45, 47, 0.8)"
      borderRadius="xl" 
      overflow="hidden"
      _hover={{ 
        transform: 'translateY(-4px)',
        shadow: '2xl',
        bg: 'rgba(58, 61, 63, 0.8)'
      }}
      transition="all 0.3s ease"
      cursor="pointer"
      role="group"
    >
      <Box 
        position="relative"
        h="150px"
        overflow="hidden"
      >
        <Image
          src={image}
          alt={title}
          objectFit="cover"
          w="full"
          h="full"
          transition="transform 0.3s ease"
          _groupHover={{ transform: 'scale(1.05)' }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)"
          opacity={0}
          transition="opacity 0.3s ease"
          _groupHover={{ opacity: 1 }}
        />
      </Box>
      <VStack p={3} align="start" spacing={1}>
        <Text 
          fontSize="sm" 
          fontWeight="500"
          _groupHover={{ color: 'blue.300' }}
          transition="all 0.2s ease"
        >
          {title}
        </Text>
        <Text fontSize="xs" color="gray.400">#{id}</Text>
        <Button 
          w="full" 
          bg="rgba(59, 130, 246, 0.9)"
          color="white"
          size="sm"
          fontSize="sm"
          h="32px"
          onClick={onBuy}
          _hover={{ 
            bg: 'blue.500',
            transform: 'scale(1.02)'
          }}
          _active={{
            bg: 'blue.600',
            transform: 'scale(0.98)'
          }}
          transition="all 0.2s ease"
        >
          {price} 
          <Box 
            as={FaStar} 
            size={12} 
            ml={1}
            transform="rotate(0deg)"
            _groupHover={{ transform: 'rotate(180deg)' }}
            transition="transform 0.6s ease"
          />
        </Button>
      </VStack>
    </Box>
  )
} 