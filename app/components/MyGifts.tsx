import { Box, Text, Container, HStack, Button, Icon, Tabs, TabList, Tab } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';

export const MyGifts = () => {
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
      {/* Табы */}
      <Tabs variant="soft-rounded" mb={4}>
        <TabList>
          <Tab 
            _selected={{ color: 'white', bg: colors.accent }}
            color={colors.muted}
            bg={colors.buttonBg}
            mr={2}
          >
            Gifts
          </Tab>
          <Tab 
            _selected={{ color: 'white', bg: colors.accent }}
            color={colors.muted}
            bg={colors.buttonBg}
            mr={2}
          >
            Activity
          </Tab>
          <Tab 
            _selected={{ color: 'white', bg: colors.accent }}
            color={colors.muted}
            bg={colors.buttonBg}
            mr={2}
          >
            Orders
          </Tab>
          <Tab 
            _selected={{ color: 'white', bg: colors.accent }}
            color={colors.muted}
            bg={colors.buttonBg}
          >
            Deals
          </Tab>
        </TabList>
      </Tabs>

      {/* Пустое состояние */}
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