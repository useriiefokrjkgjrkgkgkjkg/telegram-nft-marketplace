'use client'

import { Box, Button, HStack, Text, VStack, useDisclosure, Grid, Select, IconButton, SlideFade, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { BsSnow2 } from 'react-icons/bs'
import { FaGift, FaHammer, FaStar } from 'react-icons/fa'
import { BiShoppingBag } from 'react-icons/bi'
import { TbActivity } from 'react-icons/tb'
import { NFTCard } from './components/NFTCard'

interface Gift {
  id: number
  title: string
  price: number
  image: string
  isListed: boolean
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('market')
  const [walletAddress, setWalletAddress] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [gifts, setGifts] = useState<Gift[]>([])
  const [listedTab, setListedTab] = useState(0)

  useEffect(() => {
    fetchGifts()
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const fetchGifts = async () => {
    try {
      const response = await fetch('/api/gifts')
      const data = await response.json()
      setGifts(data.gifts)
    } catch (error) {
      console.error('Error fetching gifts:', error)
    }
  }

  const handleTabChange = (tabId: string) => {
    setIsLoading(true)
    setActiveTab(tabId)
    setTimeout(() => setIsLoading(false), 300)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'market':
        return (
          <Box>
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

            <Grid templateColumns="repeat(2, 1fr)" gap={3} p={3}>
              <SlideFade in={!isLoading} offsetY="20px">
                {gifts.map((gift) => (
                  <NFTCard
                    key={gift.id}
                    id={gift.id}
                    title={gift.title}
                    price={gift.price}
                    image={gift.image}
                    onBuy={() => console.log('Buy:', gift.id)}
                  />
                ))}
              </SlideFade>
            </Grid>
          </Box>
        )

      case 'gifts':
        return (
          <Box p={3}>
            <Tabs 
              index={listedTab} 
              onChange={setListedTab}
              variant="soft-rounded"
              colorScheme="blue"
              bg="rgba(42, 45, 47, 0.8)"
              p={2}
              borderRadius="lg"
            >
              <TabList gap={2}>
                <Tab 
                  _selected={{ 
                    bg: 'blue.500',
                    color: 'white'
                  }}
                  fontSize="sm"
                  py={1}
                  px={4}
                >
                  Listed
                </Tab>
                <Tab 
                  _selected={{ 
                    bg: 'blue.500',
                    color: 'white'
                  }}
                  fontSize="sm"
                  py={1}
                  px={4}
                >
                  Unlisted
                </Tab>
              </TabList>
              <TabPanels mt={3}>
                <TabPanel p={0}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                    {gifts.filter(gift => gift.isListed).map((gift) => (
                      <NFTCard
                        key={gift.id}
                        id={gift.id}
                        title={gift.title}
                        price={gift.price}
                        image={gift.image}
                        onBuy={() => console.log('Buy:', gift.id)}
                      />
                    ))}
                  </Grid>
                </TabPanel>
                <TabPanel p={0}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                    {gifts.filter(gift => !gift.isListed).map((gift) => (
                      <NFTCard
                        key={gift.id}
                        id={gift.id}
                        title={gift.title}
                        price={gift.price}
                        image={gift.image}
                        onBuy={() => console.log('Buy:', gift.id)}
                      />
                    ))}
                  </Grid>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )

      case 'auctions':
        return (
          <Box p={4} textAlign="center">
            <Text fontSize="lg" color="gray.400">
              Auctions coming soon!
            </Text>
          </Box>
        )

      case 'activity':
        return (
          <Box p={4}>
            <VStack spacing={3} align="stretch">
              {[1, 2, 3].map((item) => (
                <Box 
                  key={item}
                  bg="rgba(42, 45, 47, 0.8)"
                  p={3}
                  borderRadius="lg"
                  _hover={{
                    bg: 'rgba(58, 61, 63, 0.8)',
                    transform: 'translateX(4px)'
                  }}
                  transition="all 0.2s ease"
                  cursor="pointer"
                >
                  <HStack justify="space-between">
                    <Text fontSize="sm">Transaction #{item}</Text>
                    <Text fontSize="sm" color="blue.300">0.55 TON</Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.400" mt={1}>
                    2 hours ago
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        )

      default:
        return null
    }
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
        {renderContent()}
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