import { Box, Text, Container, Icon, HStack, Select, IconButton } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaChevronDown } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Activity = () => {
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
      {/* Фильтры */}
      <Box 
        bg={colors.panel} 
        p={4} 
        borderRadius="2xl" 
        mb={4}
        border="1px solid"
        borderColor={colors.border}
        animation={`${fadeIn} 0.3s ease-out`}
      >
        <HStack spacing={4} justify="space-between">
          <HStack spacing={4}>
            <Box position="relative" w="120px">
              <Text 
                position="absolute" 
                top="-2.5" 
                left="3" 
                fontSize="xs" 
                color={colors.muted}
                fontWeight="500"
              >
                Type
              </Text>
              <Select
                bg={colors.hover}
                color={colors.text}
                border="none"
                h="36px"
                pt="2"
                fontSize="sm"
                icon={<Icon as={FaChevronDown} color={colors.muted} />}
                _hover={{ bg: colors.hover }}
                _focus={{ 
                  boxShadow: 'none',
                  borderColor: colors.accent 
                }}
                css={{
                  '& option': {
                    bg: colors.panel,
                  }
                }}
              >
                <option value="all">All</option>
                <option value="sales">Sales</option>
                <option value="transfers">Transfers</option>
                <option value="listings">Listings</option>
              </Select>
            </Box>
            <Box position="relative" w="120px">
              <Text 
                position="absolute" 
                top="-2.5" 
                left="3" 
                fontSize="xs" 
                color={colors.muted}
                fontWeight="500"
              >
                Time
              </Text>
              <Select
                bg={colors.hover}
                color={colors.text}
                border="none"
                h="36px"
                pt="2"
                fontSize="sm"
                icon={<Icon as={FaChevronDown} color={colors.muted} />}
                _hover={{ bg: colors.hover }}
                _focus={{ 
                  boxShadow: 'none',
                  borderColor: colors.accent 
                }}
                css={{
                  '& option': {
                    bg: colors.panel,
                  }
                }}
              >
                <option value="all">All Time</option>
                <option value="24h">Last 24h</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </Select>
            </Box>
          </HStack>
          <HStack spacing={2}>
            <IconButton
              aria-label="More options"
              icon={<Icon as={FaChevronDown} boxSize={4} />}
              variant="ghost"
              color={colors.muted}
              bg={colors.hover}
              h="36px"
              w="36px"
              _hover={{ 
                color: colors.accent,
                transform: 'scale(1.05)'
              }}
              transition="all 0.2s ease"
            />
          </HStack>
        </HStack>
      </Box>

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
            No activity found
          </Text>
        </Box>
      </Box>
    </Container>
  );
}; 