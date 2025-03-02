import { Box, Text, Container, HStack, Button, Tabs, TabList, Tab, Icon } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaInfoCircle, FaGift } from 'react-icons/fa';

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const fadeInUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

export const MyGifts = () => {
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
      <HStack 
        spacing={3} 
        mb={4}
        css={{ animation: `${slideIn} 0.4s ease-out` }}
      >
        <Button
          bg={colors.panel}
          color={colors.text}
          height="40px"
          fontSize="sm"
          px={6}
          leftIcon={<Icon as={FaInfoCircle} color={colors.accent} boxSize={4} />}
          _hover={{ 
            bg: colors.hover,
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(45,122,244,0.2)'
          }}
          _active={{
            transform: 'translateY(0)',
            boxShadow: 'none'
          }}
          transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
          border="1px solid"
          borderColor={colors.border}
        >
          Internal Purchase
        </Button>
        <Button
          bg={colors.panel}
          color={colors.text}
          height="40px"
          fontSize="sm"
          px={6}
          leftIcon={<Icon as={FaInfoCircle} color={colors.accent} boxSize={4} />}
          _hover={{ 
            bg: colors.hover,
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(45,122,244,0.2)'
          }}
          _active={{
            transform: 'translateY(0)',
            boxShadow: 'none'
          }}
          transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
          border="1px solid"
          borderColor={colors.border}
        >
          Performance
        </Button>
      </HStack>

      <Tabs 
        variant="unstyled" 
        mb={4}
        css={{ animation: `${slideIn} 0.4s ease-out 0.2s backwards` }}
      >
        <TabList bg={colors.panel} p={1} borderRadius="xl" width="fit-content">
          <Tab
            color={colors.muted}
            bg="transparent"
            _selected={{ 
              color: colors.text,
              bg: colors.hover,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            fontSize="sm"
            height="36px"
            px={6}
            mr={1}
            borderRadius="lg"
            transition="all 0.2s ease"
            _hover={{ color: colors.text }}
          >
            Listed Gifts
          </Tab>
          <Tab
            color={colors.muted}
            bg="transparent"
            _selected={{ 
              color: colors.text,
              bg: colors.hover,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            fontSize="sm"
            height="36px"
            px={6}
            borderRadius="lg"
            transition="all 0.2s ease"
            _hover={{ color: colors.text }}
          >
            Unlisted Gifts
          </Tab>
        </TabList>
      </Tabs>

      <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        transform="translate(-50%, -50%)"
        textAlign="center"
        color={colors.muted}
        css={{ animation: `${fadeInUp} 0.6s ease-out 0.4s backwards` }}
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
          transition="all 0.3s ease"
          _hover={{
            transform: 'scale(1.02)',
            bg: colors.hover,
            boxShadow: '0 16px 60px rgba(0,0,0,0.5)',
            borderColor: colors.accent
          }}
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, ${colors.panel}, ${colors.hover}, ${colors.panel})`,
            opacity: 0.1,
            animation: `${shimmer} 2s infinite linear`
          }}
        >
          <Icon 
            as={FaGift} 
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