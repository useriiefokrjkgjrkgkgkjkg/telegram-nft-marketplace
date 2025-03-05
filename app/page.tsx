'use client';

import {
  Box,
  HStack,
  Image,
  Text,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  VStack,
  useDisclosure,
  Collapse,
  SlideFade,
  BoxProps,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, StarIcon, CloseIcon, CheckIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { BsThreeDots, BsChevronRight, BsTrash, BsChevronDown, BsActivity } from 'react-icons/bs';
import { FaImage, FaGift, FaGavel } from 'react-icons/fa';

// Объявляем типы для Telegram WebApp и TonKeeper
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        expand: () => void;
        enableClosingConfirmation: () => void;
        close: () => void;
        initDataUnsafe?: {
          user?: {
            photo_url?: string;
          };
        };
      };
    };
    ton?: {
      send: (method: string, params?: any[]) => Promise<any>;
      on: (event: string, callback: (params: any) => void) => void;
      isConnected: boolean;
    };
  }
}

// Компонент для логотипа TON
const TonLogo = ({ size = "24px" }: { size?: string }) => (
  <Image 
    src="https://i.imgur.com/4E0Jp4G.png"
    alt="TON"
    width={size}
    height={size}
    style={{
      filter: 'brightness(1.2) contrast(1.1)',
      transition: 'all 0.3s ease'
    }}
  />
);

// Компонент для анимации загрузки
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.9);
  const [textOpacity, setTextOpacity] = useState(0);
  const [textScale, setTextScale] = useState(0.95);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
      setScale(1);
    }, 100);

    setTimeout(() => {
      setTextOpacity(1);
      setTextScale(1);
    }, 600);

    const hideTimer = setTimeout(() => {
      setTextOpacity(0);
      setTextScale(0.95);
      setTimeout(() => {
        setOpacity(0);
        setScale(0.9);
      }, 600);
      setTimeout(onComplete, 1200);
    }, 2000);

    return () => clearTimeout(hideTimer);
  }, [onComplete]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="linear-gradient(135deg, #000000 0%, #1A1A1A 100%)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{ 
        opacity,
        transform: `scale(${scale})`,
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Box 
        textAlign="center"
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale}) translateY(${textOpacity ? '0' : '20px'})`,
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Text
          color="white"
          fontSize="4xl"
          fontWeight="bold"
          letterSpacing="wider"
          mb={4}
          style={{
            textShadow: '0 0 30px rgba(0, 152, 234, 0.3)'
          }}
        >
          NFT Market
        </Text>
      </Box>
    </Box>
  );
};

// Функция для сокращения адреса кошелька
const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

interface Gift {
  id: string;
  name: string;
  number: string;
  isListed: boolean;
  price?: number;
}

interface NFT {
  id: string;
  name: string;
  number: string;
  price: number;
  model: string;
}

interface CustomBoxProps extends BoxProps {
  children: React.ReactNode;
}

type TabType = 'market' | 'auctions' | 'gifts' | 'activity';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    isOpen: isDepositOpen,
    onOpen: onDepositOpen,
    onClose: onDepositClose
  } = useDisclosure();

  const {
    isOpen: isWithdrawOpen,
    onOpen: onWithdrawOpen,
    onClose: onWithdrawClose
  } = useDisclosure();

  const {
    isOpen: isNFTSelectOpen,
    onOpen: onNFTSelectOpen,
    onClose: onNFTSelectClose
  } = useDisclosure();

  const {
    isOpen: isNFTDetailOpen,
    onOpen: onNFTDetailOpen,
    onClose: onNFTDetailClose
  } = useDisclosure();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isBackgroundOpen, setIsBackgroundOpen] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  const [isSymbolOpen, setIsSymbolOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [symbolSearchQuery, setSymbolSearchQuery] = useState('');
  const [isNumberOpen, setIsNumberOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [numberSearchQuery, setNumberSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('market');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [activeGiftsTab, setActiveGiftsTab] = useState<'listed' | 'unlisted'>('listed');
  const [activityItems, setActivityItems] = useState([
    { id: '1', name: 'Vintage Cigar', number: '#14444', price: 4.2, type: 'Bid', date: '05 Mar 06:17:39 GMT' },
    { id: '2', name: 'Party Sparkler', number: '#56843', price: 6, type: 'Sale', date: '05 Mar 06:17:34 GMT' },
    { id: '3', name: 'Toy Bear', number: '#15795', price: 2, type: 'Sale', date: '05 Mar 06:17:33 GMT' },
    { id: '4', name: 'Star Notepad', number: '#26755', price: 0.5, type: 'Sale', date: '05 Mar 06:17:19 GMT' },
    { id: '5', name: 'Loot Bag', number: '#298', price: 3.68, type: 'Bid', date: '05 Mar 06:17:13 GMT' },
    { id: '6', name: 'Evil Eye', number: '#20057', price: 0.75, type: 'Sale', date: '05 Mar 06:17:10 GMT' },
    { id: '7', name: 'Genie Lamp', number: '#1483', price: 64, type: 'Sale', date: '05 Mar 06:17:10 GMT' },
  ]);
  const [userGifts, setUserGifts] = useState<Gift[]>([
    { id: '1', name: 'Lol Pop', number: '#107605', isListed: true, price: 1.1 },
    { id: '2', name: 'Toy Bear', number: '#203401', isListed: true, price: 2.5 },
    { id: '3', name: 'Love Potion', number: '#405302', isListed: false },
    { id: '4', name: 'Crystal Ball', number: '#506701', isListed: false },
  ]);
  const [selectedGiftForListing, setSelectedGiftForListing] = useState<Gift | null>(null);
  const [listingPrice, setListingPrice] = useState('');
  const {
    isOpen: isListingModalOpen,
    onOpen: onListingModalOpen,
    onClose: onListingModalClose
  } = useDisclosure();
  const [balance, setBalance] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const nftList = [
    { name: 'Record Player', isNew: true },
    { name: 'Sleigh Bell', isNew: true },
    { name: 'Sakura Flower', isNew: true },
    { name: 'Top Hat', isNew: true },
    { name: 'Diamond Ring', isNew: true },
    { name: 'Love Potion', isNew: true },
    { name: 'Toy Bear', isNew: true },
    { name: 'Loot Bag', isNew: true },
    { name: 'Astral Shard', isNew: false },
    { name: 'B-Day Candle', isNew: false },
    { name: 'Berry Box', isNew: false },
    { name: 'Bunny Muffin', isNew: false },
    { name: 'Cookie Heart', isNew: false },
    { name: 'Crystal Ball', isNew: false },
    { name: 'Desk Calendar', isNew: false },
    { name: "Durov's Cap", isNew: false },
    { name: 'Eternal Candle', isNew: false },
    { name: 'Eternal Rose', isNew: false },
    { name: 'Evil Eye', isNew: false },
    { name: 'Flying Broom', isNew: false },
    { name: 'Genie Lamp', isNew: false },
    { name: 'Ginger Cookie', isNew: false },
    { name: 'Hanging Star', isNew: false },
    { name: 'Hex Pot', isNew: false },
    { name: 'Homemade Cake', isNew: false },
    { name: 'Hypno Lollipop', isNew: false },
    { name: 'Ion Gem', isNew: false },
    { name: 'Jelly Bunny', isNew: false },
    { name: 'Jester Hat', isNew: false },
    { name: 'Jingle Bells', isNew: false },
    { name: 'Kissed Frog', isNew: false },
    { name: 'Lol Pop', isNew: false },
    { name: 'Love Candle', isNew: false },
    { name: 'Lunar Snake', isNew: false },
    { name: 'Mad Pumpkin', isNew: false },
    { name: 'Magic Potion', isNew: false },
    { name: 'Mini Oscar', isNew: false },
    { name: 'Party Sparkler', isNew: false },
    { name: 'Perfume Bottle', isNew: false },
    { name: 'Plush Pepe', isNew: false },
    { name: 'Precious Peach', isNew: false },
    { name: 'Santa Hat', isNew: false },
    { name: 'Scared Cat', isNew: false },
    { name: 'Sharp Tongue', isNew: false },
    { name: 'Signet Ring', isNew: false },
    { name: 'Skull Flower', isNew: false },
    { name: 'Snow Mittens', isNew: false },
    { name: 'Spiced Wine', isNew: false },
    { name: 'Spy Agaric', isNew: false },
    { name: 'Star Notepad', isNew: false },
    { name: 'Swiss Watch', isNew: false },
    { name: 'Trapped Heart', isNew: false },
    { name: 'Vintage Cigar', isNew: false },
    { name: 'Voodoo Doll', isNew: false },
    { name: 'Witch Hat', isNew: false }
  ];

  const backgroundList = [
    { name: 'Emerald', color: '#50C878' },
    { name: 'Gunship Green', color: '#2C3539' },
    { name: 'Light Olive', color: '#6B8E23' },
    { name: 'Coral Red', color: '#FF4040' },
    { name: 'Steel Grey', color: '#43464B' },
    { name: 'Raspberry', color: '#E30B5D' },
    { name: 'Camo Green', color: '#78866B' },
    { name: 'Celtic Blue', color: '#246BCE' },
    { name: 'Jade Green', color: '#00A36C' },
    { name: 'Chocolate', color: '#D2691E' },
    { name: 'Persimmon', color: '#EC5800' },
    { name: 'Pacific Green', color: '#1F4037' },
    { name: 'Feldgrau', color: '#4D5D53' }
  ];

  const symbolList = [
    'Ring',
    'Toilet Paper',
    'Hamburger',
    'Boat',
    'Carrot',
    'Scarab',
    'Alert Serpent',
    'Plum',
    'Toy Bucket',
    'February 14',
    'Ghost',
    'Sakura',
    'Worker Ant',
    'La Corona',
    'Cheese',
    'Serpent',
    'Smartphone',
    'Lovely Key'
  ];

  const filteredNFTs = nftList.filter(nft => 
    nft.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSymbols = symbolList.filter(symbol => 
    symbol.toLowerCase().includes(symbolSearchQuery.toLowerCase())
  );

  // Функция для фильтрации подарков
  const filteredGifts = userGifts.filter(gift => 
    activeGiftsTab === 'listed' ? gift.isListed : !gift.isListed
  );

  const [marketNFTs, setMarketNFTs] = useState<NFT[]>([
    { id: '1', name: 'Lol Pop', number: '#107605', price: 1.1, model: 'Sweetheart' },
    { id: '2', name: 'Toy Bear', number: '#203401', price: 2.5, model: 'Classic' },
    { id: '3', name: 'Love Potion', number: '#405302', price: 3.2, model: 'Sweetheart' },
    { id: '4', name: 'Crystal Ball', number: '#506701', price: 1.8, model: 'Magic' },
    { id: '5', name: 'Genie Lamp', number: '#607801', price: 2.7, model: 'Magic' },
    { id: '6', name: 'Trapped Heart', number: '#708901', price: 1.5, model: 'Sweetheart' }
  ]);

  // Функция для фильтрации NFT на маркете
  const filteredMarketNFTs = marketNFTs.filter(nft => {
    // Проверяем соответствие выбранным NFT
    const matchesSelectedNFTs = selectedNFTs.length === 0 || selectedNFTs.includes(nft.name);
    
    // Проверяем соответствие цене
    const matchesPrice = (!priceFrom || nft.price >= Number(priceFrom)) && 
                        (!priceTo || nft.price <= Number(priceTo));

    return matchesSelectedNFTs && matchesPrice;
  });

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.enableClosingConfirmation();
    }

    // Предотвращаем масштабирование
    const preventDefault = (e: Event) => {
      if ((e as TouchEvent).touches?.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventDefault, { passive: false });

    // Проверяем статус подключения при загрузке
    const checkConnection = async () => {
      try {
        // @ts-ignore
        const provider = window.ton;
        if (provider?.isConnected) {
          const accounts = await provider.send('ton_requestAccounts');
          if (accounts?.[0]) {
            setWalletAddress(accounts[0]);
          }
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    };

    // Слушаем события подключения/отключения
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      } else {
        setWalletAddress('');
      }
    };

    // @ts-ignore
    if (window.ton) {
      // @ts-ignore
      window.ton.on('accountsChanged', handleAccountsChanged);
      checkConnection();
    }

    return () => {
      document.removeEventListener('touchstart', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
      // @ts-ignore
      if (window.ton) {
        // @ts-ignore
        window.ton.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handlePriceFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Разрешаем только цифры
    if (/^\d*$/.test(value)) {
      setPriceFrom(value);
    }
  };

  const handlePriceToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Разрешаем только цифры и проверяем максимальное значение
    if (/^\d*$/.test(value) && (Number(value) <= 10000 || value === '')) {
      setPriceTo(value);
    }
  };

  const toggleNFTSelection = (nftName: string) => {
    setSelectedNFTs(prev => 
      prev.includes(nftName) 
        ? prev.filter(name => name !== nftName)
        : [...prev, nftName]
    );
  };

  const getSelectedNFTsDisplayText = (selectedNFTs: string[]) => {
    if (selectedNFTs.length === 0) return "All";
    if (selectedNFTs.length === 1) return selectedNFTs[0];
    return `${selectedNFTs.length} NFTs`;
  };

  // Функция для подключения кошелька
  const connectWallet = async () => {
    try {
      const universalLink = `https://app.tonkeeper.com/ton-connect?v=2&id=1&r=https%3A%2F%2Ftelegram-nft-marketplace.vercel.app%2F`;
      window.location.href = universalLink;
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // Функция для листинга подарка
  const handleListGift = (gift: Gift, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedGiftForListing(gift);
    setListingPrice('');
    onListingModalOpen();
  };

  // Функция для подтверждения листинга
  const confirmListing = () => {
    if (selectedGiftForListing && listingPrice) {
      setUserGifts(prev => prev.map(gift => 
        gift.id === selectedGiftForListing.id 
          ? { ...gift, isListed: true, price: Number(listingPrice) }
          : gift
      ));
      onListingModalClose();
    }
  };

  // Функция для отмены листинга
  const handleUnlistGift = (giftId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserGifts(prev => prev.map(gift => 
      gift.id === giftId 
        ? { ...gift, isListed: false, price: undefined }
        : gift
    ));
  };

  // Функция для обработки покупки
  const handleBuyNFT = (nftItem: NFT) => {
    if (!walletAddress) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (balance < nftItem.price) {
      alert('Insufficient balance');
      return;
    }

    // Добавляем новую транзакцию в активность
    const now = new Date();
    const formattedDate = now.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });

    setActivityItems(prev => [{
      id: String(prev.length + 1),
      name: nftItem.name,
      number: nftItem.number,
      price: nftItem.price,
      type: 'Sale',
      date: formattedDate
    }, ...prev]);

    // Удаляем NFT из маркета
    setMarketNFTs(prev => prev.filter(item => item.id !== nftItem.id));
    
    // Добавляем в список подарков пользователя
    setUserGifts(prev => [...prev, {
      id: nftItem.id,
      name: nftItem.name,
      number: nftItem.number,
      isListed: false
    }]);
    
    // Уменьшаем баланс
    setBalance(prev => prev - nftItem.price);
  };

  // Функция для пополнения баланса
  const handleDeposit = async () => {
    if (!depositAmount || Number(depositAmount) <= 0) return;
    
    const amount = Number(depositAmount);
    const fee = amount * 0.03; // 3% комиссия
    const totalAmount = amount + fee;

    try {
      // Создаем транзакцию через TonKeeper
      const universalLink = `https://app.tonkeeper.com/transfer/${walletAddress}?amount=${totalAmount * 1000000000}&text=Deposit to NFT Market`;
      window.location.href = universalLink;
      
      // После успешной транзакции
      setBalance(prev => prev + amount);
      setDepositAmount('');
      onDepositClose();
    } catch (error) {
      console.error('Error depositing:', error);
    }
  };

  // Функция для вывода средств
  const handleWithdraw = async () => {
    if (!withdrawAmount || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > balance) return;
    
    try {
      const amount = Number(withdrawAmount);
      // Создаем транзакцию вывода через TonKeeper
      const universalLink = `https://app.tonkeeper.com/transfer/${walletAddress}?amount=${amount * 1000000000}&text=Withdraw from NFT Market`;
      window.location.href = universalLink;
      
      // После успешной транзакции
      setBalance(prev => prev - amount);
      setWithdrawAmount('');
      onWithdrawClose();
    } catch (error) {
      console.error('Error withdrawing:', error);
    }
  };

  const ActivityList = () => {
    return (
      <VStack spacing={0} width="100%" bg="#1C1C1E" borderRadius="xl" overflow="hidden">
        <HStack px={4} py={3} width="100%" bg="#2C2C2E">
          <Text flex={1} color="#8E8E93">Gift</Text>
          <Text flex={1} color="#8E8E93">Price</Text>
          <Text flex={1} textAlign="right" color="#8E8E93">Type</Text>
        </HStack>
        {activityItems.map((item) => (
          <HStack 
            key={item.id} 
            px={4} 
            py={3} 
            width="100%" 
            borderTop="1px solid #2C2C2E"
            _hover={{ bg: "#2C2C2E" }}
            transition="background 0.2s"
            cursor="pointer"
          >
            <Box flex={1}>
              <HStack spacing={3}>
                <Image src={`/nft/${item.name.toLowerCase().replace(' ', '-')}.png`} width="40px" height="40px" />
                <VStack align="start" spacing={0}>
                  <Text color="white" fontSize="md">{item.name}</Text>
                  <Text color="#8E8E93" fontSize="sm">{item.number}</Text>
                </VStack>
              </HStack>
            </Box>
            <Box flex={1}>
              <HStack spacing={2}>
                <Image src="https://i.imgur.com/4E0Jp4G.png" width="20px" height="20px" />
                <Text color="white" fontSize="md">{item.price}</Text>
              </HStack>
            </Box>
            <Box flex={1} textAlign="right">
              <Text 
                color={item.type === 'Bid' ? '#F0B90B' : '#0A84FF'} 
                fontSize="md"
              >
                {item.type}
              </Text>
              <Text color="#8E8E93" fontSize="sm">{item.date}</Text>
            </Box>
            <ChevronLeftIcon color="#8E8E93" transform="rotate(180deg)" />
          </HStack>
        ))}
      </VStack>
    );
  };

  const Navigation = () => {
    return (
      <Box 
        position="fixed" 
        bottom={0} 
        left={0} 
        right={0} 
        bg="#1C1C1E"
        borderTop="1px solid #2C2C2E"
        px={4}
        py={2}
        zIndex={1000}
      >
        <HStack justify="space-between">
          <VStack 
            spacing={1} 
            cursor="pointer"
            onClick={() => setActiveTab('market')}
            opacity={activeTab === 'market' ? 1 : 0.5}
            transition="opacity 0.2s"
          >
            <FaImage color={activeTab === 'market' ? '#0A84FF' : '#8E8E93'} size={24} />
            <Text color={activeTab === 'market' ? '#0A84FF' : '#8E8E93'} fontSize="sm">Market</Text>
          </VStack>
          <VStack 
            spacing={1}
            cursor="pointer"
            onClick={() => setActiveTab('auctions')}
            opacity={activeTab === 'auctions' ? 1 : 0.5}
            transition="opacity 0.2s"
          >
            <FaGavel color={activeTab === 'auctions' ? '#0A84FF' : '#8E8E93'} size={24} />
            <Text color={activeTab === 'auctions' ? '#0A84FF' : '#8E8E93'} fontSize="sm">Auctions</Text>
          </VStack>
          <VStack 
            spacing={1}
            cursor="pointer"
            onClick={() => setActiveTab('gifts')}
            opacity={activeTab === 'gifts' ? 1 : 0.5}
            transition="opacity 0.2s"
          >
            <FaGift color={activeTab === 'gifts' ? '#0A84FF' : '#8E8E93'} size={24} />
            <Text color={activeTab === 'gifts' ? '#0A84FF' : '#8E8E93'} fontSize="sm">My Gifts</Text>
          </VStack>
          <VStack 
            spacing={1}
            cursor="pointer"
            onClick={() => setActiveTab('activity')}
            opacity={activeTab === 'activity' ? 1 : 0.5}
            transition="opacity 0.2s"
          >
            <BsActivity color={activeTab === 'activity' ? '#0A84FF' : '#8E8E93'} size={24} />
            <Text color={activeTab === 'activity' ? '#0A84FF' : '#8E8E93'} fontSize="sm">Activity</Text>
          </VStack>
        </HStack>
      </Box>
    );
  };

  return (
    <Box minH="100vh" bg="#000000" pb={20}>
      <Navigation />
      <Box p={4}>
        {!walletAddress ? (
          <VStack spacing={4} align="center" p={6}>
            <Text color="white" fontSize="xl" textAlign="center">
              Connect your crypto wallet to view your NFT gifts
            </Text>
            <Button
              bg="linear-gradient(135deg, #0098EA 0%, #0088D1 100%)"
              color="white"
              borderRadius="full"
              size="lg"
              px={8}
              leftIcon={<StarIcon />}
              onClick={connectWallet}
              _hover={{ 
                bg: "linear-gradient(135deg, #0088D1 0%, #0078C1 100%)",
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 15px rgba(0, 152, 234, 0.3)'
              }}
              _active={{
                transform: 'translateY(0)',
                boxShadow: 'none'
              }}
            >
              Connect Wallet
            </Button>
          </VStack>
        ) : (
          <Text color="white">Wallet connected: {walletAddress}</Text>
        )}
      </Box>
    </Box>
  );
} 