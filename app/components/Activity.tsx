import { Box, Text, Container, Icon, VStack, HStack, Select, IconButton } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaChartLine, FaRegClock, FaChevronDown } from 'react-icons/fa';

const fadeInScale = keyframes`
  from { 
    opacity: 0; 
    transform: translate(-50%, -50%) scale(0.9);
  }
  to { 
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const wave = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(-5deg); }
  75% { transform: translateY(5px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(45,122,244,0); }
  50% { box-shadow: 0 0 40px rgba(45,122,244,0.2); }
  100% { box-shadow: 0 0 20px rgba(45,122,244,0); }
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
        animation={`${fadeInScale} 0.3s ease-out`}
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

      <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        transform="translate(-50%, -50%)"
        textAlign="center"
        color={colors.muted}
        css={{ animation: `${fadeInScale} 0.5s cubic-bezier(0.16, 1, 0.3, 1)` }}
        width="100%"
        maxW="400px"
      >
        <Box
          bg={colors.panel}
          p={10}
          borderRadius="3xl"
          boxShadow="0 12px 40px rgba(0,0,0,0.4)"
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor={colors.border}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          css={{ animation: `${glow} 3s infinite ease-in-out` }}
          _hover={{
            transform: 'scale(1.02)',
            bg: colors.hover,
            boxShadow: '0 16px 60px rgba(0,0,0,0.5)',
            borderColor: colors.accent
          }}
        >
          <VStack spacing={6}>
            <Box position="relative">
              <Icon 
                as={FaChartLine} 
                boxSize={12} 
                color="transparent"
                bgGradient={colors.gradient}
                bgClip="text"
                css={{ animation: `${wave} 3s infinite ease-in-out` }}
              />
              <Icon 
                as={FaRegClock} 
                position="absolute"
                bottom="-2"
                right="-2"
                boxSize={6}
                color={colors.accent}
                opacity={0.8}
              />
            </Box>
            <Text 
              fontSize="sm"
              fontWeight="500"
              letterSpacing="0.1em"
              bgGradient={colors.gradient}
              bgClip="text"
              textTransform="uppercase"
              opacity={0.9}
            >
              No activity found
            </Text>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
}; 