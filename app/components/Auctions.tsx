import { Box, Text, Container, Icon, HStack, Select, IconButton } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaGavel, FaChevronDown } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(-2deg); }
  75% { transform: translateY(5px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
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
                NFTs
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
                <option value="active">Active</option>
                <option value="ending">Ending Soon</option>
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
                Price
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
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
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
        animation={`${fadeIn} 0.6s ease-out`}
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
          animation={`${float} 4s infinite ease-in-out`}
          transition="all 0.3s ease"
          _hover={{
            transform: 'scale(1.02)',
            bg: colors.hover,
            boxShadow: '0 16px 60px rgba(0,0,0,0.5)',
            borderColor: colors.accent
          }}
        >
          <Icon 
            as={FaGavel} 
            boxSize={10} 
            color="transparent"
            mb={6}
            bgGradient={colors.gradient}
            bgClip="text"
          />
          <Text 
            fontSize="sm"
            fontWeight="500"
            letterSpacing="0.1em"
            bgGradient={colors.gradient}
            bgClip="text"
            textTransform="uppercase"
            opacity={0.9}
          >
            No gifts found with the filters you selected
          </Text>
        </Box>
      </Box>
    </Container>
  );
}; 