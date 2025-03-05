import { Box, Button, HStack, Text, VStack, useDisclosure, Grid, GridItem, Select, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { BsSnow2 } from 'react-icons/bs'
import { FaGift, FaHammer } from 'react-icons/fa'
import { BiShoppingBag } from 'react-icons/bi'
import { TbActivity } from 'react-icons/tb'
import { TonLogo } from './components/TonLogo'

export default function Home() {
  const [activeTab, setActiveTab] = useState('market')
  const [walletAddress, setWalletAddress] = useState('')

  return (
    <Box minH="100vh" bg="#1A1D1F" color="white">
      {/* Top Bar */}
      <HStack 
        p={3} 
        justify="space-between" 
        borderBottom="1px solid #2A2D2F"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        bg="rgba(26, 29, 31, 0.8)"
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <HStack spacing={2}>
          <TonLogo w="20px" h="20px" />
          <Text fontSize="sm">0.087</Text>
          <IconButton 
            aria-label="Add" 
            icon={<Text fontSize="sm">+</Text>} 
            variant="ghost"
            size="sm"
            _hover={{ bg: 'whiteAlpha.200' }}
            transition="all 0.2s"
          />
          <IconButton 
            aria-label="Subtract" 
            icon={<Text fontSize="sm">-</Text>} 
            variant="ghost"
            size="sm"
            _hover={{ bg: 'whiteAlpha.200' }}
            transition="all 0.2s"
          />
        </HStack>
        <Button 
          size="sm"
          colorScheme="blue"
          leftIcon={<TonLogo w="16px" h="16px" />}
          _hover={{ bg: 'blue.500' }}
          transition="all 0.2s"
          px={3}
        >
          Connect
        </Button>
      </HStack>

      {/* Main Content */}
      <Box pt="50px" pb="60px">
        {/* Filters */}
        <HStack p={3} spacing={3}>
          <Box 
            bg="#2A2D2F" 
            p={2} 
            borderRadius="md" 
            flex={1}
            _hover={{ bg: '#3A3D3F' }}
            transition="all 0.2s"
          >
            <Select 
              variant="unstyled" 
              defaultValue="all" 
              color="white"
              fontSize="sm"
            >
              <option value="all">NFTs: All</option>
            </Select>
          </Box>
          <Box 
            bg="#2A2D2F" 
            p={2} 
            borderRadius="md" 
            flex={1}
            _hover={{ bg: '#3A3D3F' }}
            transition="all 0.2s"
          >
            <Select 
              variant="unstyled" 
              defaultValue="all" 
              color="white"
              fontSize="sm"
            >
              <option value="all">Model: All</option>
            </Select>
          </Box>
        </HStack>

        {/* NFT Grid */}
        <Grid templateColumns="repeat(2, 1fr)" gap={3} p={3}>
          {[1, 2, 3, 4].map((item) => (
            <Box 
              key={item} 
              bg="#2A2D2F" 
              borderRadius="xl" 
              overflow="hidden"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <Box 
                bg={["#8B6E63", "#78909C", "#7E57C2", "#26A69A"][item-1]} 
                h="150px"
                position="relative"
              />
              <VStack p={3} align="start" spacing={1}>
                <Text fontSize="sm" fontWeight="500">Desk Calendar</Text>
                <Text fontSize="xs" color="gray.400">#{184029 + (item-1)*36}</Text>
                <Button 
                  w="full" 
                  colorScheme="blue"
                  size="sm"
                  fontSize="sm"
                  h="32px"
                >
                  0.55 <TonLogo w="14px" h="14px" ml={1} />
                </Button>
              </VStack>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Navigation */}
      <HStack 
        position="fixed" 
        bottom={0} 
        left={0}
        right={0}
        h="60px"
        bg="rgba(26, 29, 31, 0.8)"
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        borderTop="1px solid rgba(42, 45, 47, 0.8)" 
        justify="space-between" 
        px={4}
        spacing={0}
      >
        {[
          { icon: BsSnow2, label: 'Market', id: 'market' },
          { icon: FaHammer, label: 'Auctions', id: 'auctions' },
          { icon: FaGift, label: 'My Gifts', id: 'gifts' },
          { icon: BiShoppingBag, label: 'Gallery', id: 'gallery' },
          { icon: TbActivity, label: 'Activity', id: 'activity' }
        ].map((item) => (
          <VStack 
            key={item.id}
            spacing={1} 
            flex={1}
            cursor="pointer"
            color={activeTab === item.id ? '#3B82F6' : 'gray.400'}
            onClick={() => setActiveTab(item.id)}
            transition="all 0.2s"
            _hover={{ color: activeTab === item.id ? '#3B82F6' : 'gray.300' }}
          >
            <Box>
              <item.icon size={20} />
            </Box>
            <Text 
              fontSize="11px"
              transition="all 0.2s"
            >
              {item.label}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  )
} 