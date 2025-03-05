import { Box, Button, HStack, Text, VStack, useDisclosure, Grid, GridItem, Select, IconButton, SlideFade, Fade } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { BsSnow2 } from 'react-icons/bs'
import { FaGift, FaHammer, FaStar } from 'react-icons/fa'
import { BiShoppingBag } from 'react-icons/bi'
import { TbActivity } from 'react-icons/tb'

export default function Home() {
  const [activeTab, setActiveTab] = useState('market')
  const [walletAddress, setWalletAddress] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('all')

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const handleTabChange = (tabId: string) => {
    setIsLoading(true)
    setActiveTab(tabId)
    setTimeout(() => setIsLoading(false), 300)
  }

  return (
    <Box minH="100vh" bg="#1A1D1F" color="white" position="relative">
      {/* Top Bar */}
      <HStack 
        p={3} 
        justify="space-between" 
        borderBottom="1px solid rgba(42, 45, 47, 0.8)"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        bg="rgba(26, 29, 31, 0.9)"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        transition="all 0.3s ease"
      >
        <HStack spacing={2}>
          <Box 
            role="group" 
            position="relative" 
            cursor="pointer"
            _hover={{ transform: 'rotate(180deg)' }}
            transition="transform 0.6s ease"
          >
            <FaStar size={16} />
          </Box>
          <Text fontSize="sm" fontWeight="500">0.087</Text>
          <IconButton 
            aria-label="Add" 
            icon={<Text fontSize="sm">+</Text>} 
            variant="ghost"
            size="sm"
            _hover={{ bg: 'whiteAlpha.200', transform: 'scale(1.1)' }}
            transition="all 0.2s ease"
          />
          <IconButton 
            aria-label="Subtract" 
            icon={<Text fontSize="sm">-</Text>} 
            variant="ghost"
            size="sm"
            _hover={{ bg: 'whiteAlpha.200', transform: 'scale(1.1)' }}
            transition="all 0.2s ease"
          />
        </HStack>
        <Button 
          size="sm"
          bg="rgba(59, 130, 246, 0.9)"
          color="white"
          leftIcon={<FaStar size={14} />}
          _hover={{ 
            bg: 'blue.500',
            transform: 'translateY(-2px)',
            shadow: 'lg'
          }}
          _active={{
            transform: 'translateY(0)',
            bg: 'blue.600'
          }}
          transition="all 0.2s ease"
          px={3}
        >
          Connect
        </Button>
      </HStack>

      {/* Main Content */}
      <Box pt="60px" pb="70px">
        {/* Filters */}
        <HStack p={3} spacing={3}>
          <Box 
            bg="rgba(42, 45, 47, 0.8)"
            p={2} 
            borderRadius="md" 
            flex={1}
            _hover={{ bg: 'rgba(58, 61, 63, 0.8)', transform: 'translateY(-1px)' }}
            transition="all 0.2s ease"
            cursor="pointer"
            role="group"
          >
            <Select 
              variant="unstyled" 
              defaultValue="all" 
              color="white"
              fontSize="sm"
              onChange={(e) => setSelectedFilter(e.target.value)}
              _hover={{ color: 'blue.300' }}
              transition="all 0.2s ease"
            >
              <option value="all">NFTs: All</option>
              <option value="rare">Rare</option>
              <option value="common">Common</option>
            </Select>
          </Box>
          <Box 
            bg="rgba(42, 45, 47, 0.8)"
            p={2} 
            borderRadius="md" 
            flex={1}
            _hover={{ bg: 'rgba(58, 61, 63, 0.8)', transform: 'translateY(-1px)' }}
            transition="all 0.2s ease"
            cursor="pointer"
            role="group"
          >
            <Select 
              variant="unstyled" 
              defaultValue="all" 
              color="white"
              fontSize="sm"
              _hover={{ color: 'blue.300' }}
              transition="all 0.2s ease"
            >
              <option value="all">Model: All</option>
              <option value="new">New</option>
              <option value="trending">Trending</option>
            </Select>
          </Box>
        </HStack>

        {/* NFT Grid */}
        <Grid templateColumns="repeat(2, 1fr)" gap={3} p={3}>
          <SlideFade in={!isLoading} offsetY="20px">
            {[1, 2, 3, 4].map((item) => (
              <Box 
                key={item} 
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
                  bg={["#8B6E63", "#78909C", "#7E57C2", "#26A69A"][item-1]} 
                  h="150px"
                  position="relative"
                  overflow="hidden"
                  _after={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bg: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  _groupHover={{
                    _after: {
                      opacity: 1
                    }
                  }}
                />
                <VStack p={3} align="start" spacing={1}>
                  <Text 
                    fontSize="sm" 
                    fontWeight="500"
                    _groupHover={{ color: 'blue.300' }}
                    transition="all 0.2s ease"
                  >
                    Desk Calendar
                  </Text>
                  <Text fontSize="xs" color="gray.400">#{184029 + (item-1)*36}</Text>
                  <Button 
                    w="full" 
                    bg="rgba(59, 130, 246, 0.9)"
                    color="white"
                    size="sm"
                    fontSize="sm"
                    h="32px"
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
                    0.55 
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
            ))}
          </SlideFade>
        </Grid>
      </Box>

      {/* Navigation */}
      <HStack 
        position="fixed" 
        bottom={0} 
        left={0}
        right={0}
        h="65px"
        bg="rgba(26, 29, 31, 0.95)"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        borderTop="1px solid rgba(42, 45, 47, 0.8)" 
        justify="space-between" 
        px={4}
        spacing={0}
        transition="all 0.3s ease"
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
            onClick={() => handleTabChange(item.id)}
            transition="all 0.3s ease"
            _hover={{ 
              color: activeTab === item.id ? '#3B82F6' : 'gray.300',
              transform: 'translateY(-2px)'
            }}
            role="group"
          >
            <Box
              transform={activeTab === item.id ? 'scale(1.2)' : 'scale(1)'}
              transition="all 0.3s ease"
            >
              <item.icon 
                size={20}
                style={{
                  filter: activeTab === item.id ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' : 'none'
                }}
              />
            </Box>
            <Text 
              fontSize="11px"
              fontWeight={activeTab === item.id ? "600" : "normal"}
              transition="all 0.2s ease"
              opacity={activeTab === item.id ? 1 : 0.8}
            >
              {item.label}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  )
} 