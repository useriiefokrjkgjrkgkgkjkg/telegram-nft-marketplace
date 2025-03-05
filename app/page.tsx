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
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <Navigation />
          <Box 
            bg="linear-gradient(135deg, #000000 0%, #0D0D0D 100%)"
            minHeight="100vh"
            height="100vh"
            display="flex"
            flexDirection="column"
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            overflow="hidden"
            style={{
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
              WebkitTextSizeAdjust: 'none',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
              userSelect: 'none',
              WebkitUserModify: 'read-only',
              WebkitTransform: 'translateZ(0)',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              perspective: 1000,
              WebkitPerspective: 1000,
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {/* Фиксированный контейнер для верхних панелей */}
            <Box
              position="fixed"
              top={0}
              left={0}
              right={0}
              zIndex={2}
              bg="linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 100%)"
              backdropFilter="blur(10px)"
              transition="all 0.3s ease"
            >
              {/* Панель с балансом */}
              <Box 
                py={2} 
                px={4}
                borderBottom="1px solid"
                borderColor="rgba(255,255,255,0.1)"
                transition="all 0.3s ease"
              >
                <HStack justify="space-between" align="center">
                  <HStack spacing={2}>
                    <Box
                      width="32px"
                      height="32px"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="whiteAlpha.300"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg="whiteAlpha.50"
                    >
                      <TonLogo size="20px" />
                    </Box>
                    <Text color="white" fontSize="xl" fontWeight="medium">{balance.toFixed(2)}</Text>
                    <IconButton
                      aria-label="Add"
                      icon={<AddIcon w={2.5} h={2.5} />}
                      bg="linear-gradient(135deg, #0098EA 0%, #0088D1 100%)"
                      color="white"
                      borderRadius="full"
                      size="sm"
                      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                      _hover={{ 
                        bg: "linear-gradient(135deg, #0088D1 0%, #0078C1 100%)",
                        transform: 'translateY(-2px) scale(1.05)',
                        boxShadow: '0 4px 15px rgba(0, 152, 234, 0.3)'
                      }}
                      _active={{
                        transform: 'scale(0.95)',
                        boxShadow: 'none'
                      }}
                      onClick={() => {
                        if (!isDepositOpen && !isWithdrawOpen) {
                          onDepositOpen();
                        }
                      }}
                    />
                    <IconButton
                      aria-label="Subtract"
                      icon={<MinusIcon w={2.5} h={2.5} />}
                      bg="#0098EA"
                      color="white"
                      borderRadius="full"
                      size="sm"
                      isDisabled={!walletAddress || isDepositOpen || balance <= 0}
                      onClick={() => {
                        if (!isDepositOpen && !isWithdrawOpen) {
                          onWithdrawOpen();
                        }
                      }}
                      _hover={{ bg: "#0088D1" }}
                    />
                  </HStack>
                  {walletAddress ? (
                    <Text color="white" fontSize="md" fontWeight="medium">
                      {truncateAddress(walletAddress)}
                    </Text>
                  ) : (
                    <Button
                      bg="linear-gradient(135deg, #0098EA 0%, #0088D1 100%)"
                      color="white"
                      borderRadius="full"
                      size="md"
                      px={4}
                      leftIcon={<StarIcon />}
                      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                      _hover={{ 
                        bg: "linear-gradient(135deg, #0088D1 0%, #0078C1 100%)",
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 15px rgba(0, 152, 234, 0.3)'
                      }}
                      _active={{
                        transform: 'translateY(0)',
                        boxShadow: 'none'
                      }}
                      onClick={connectWallet}
                    >
                      Connect Wallet
                    </Button>
                  )}
                </HStack>
              </Box>

              {/* Панель выбора модели и стиля (скрыта для вкладки My Gifts) */}
              {activeTab !== 'gifts' && (
                <Box 
                  py={3} 
                  px={4}
                  borderBottom="1px solid"
                  borderColor="#1A1A1A"
                  position="relative"
                >
                  <HStack justify="space-between" align="center">
                    <HStack spacing={4} ml="-12px">
                      <Button
                        variant="ghost"
                        color="white"
                        fontSize="16px"
                        fontWeight="500"
                        p={0}
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        gap={0}
                        _hover={{ bg: 'transparent', opacity: 0.8 }}
                        border="1px solid"
                        borderColor="#1A1A1A"
                        borderRadius="md"
                        width="130px"
                        height="40px"
                        px={3}
                        position="relative"
                        onClick={onNFTSelectOpen}
                      >
                        <Text color="whiteAlpha.700" fontSize="xs" position="absolute" left={2} top={1}>NFT's</Text>
                        <Text 
                          color="white" 
                          fontSize="md" 
                          position="absolute" 
                          left={2} 
                          top="70%" 
                          transform="translateY(-50%)"
                          isTruncated
                          maxW="85px"
                        >
                          {getSelectedNFTsDisplayText(selectedNFTs)}
                        </Text>
                        <Box position="absolute" right={2} top="50%" transform="translateY(-50%)">
                          <BsChevronRight size={12} />
                        </Box>
                      </Button>
                      <Button
                        variant="ghost"
                        color="white"
                        fontSize="16px"
                        fontWeight="500"
                        p={0}
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        gap={0}
                        _hover={{ bg: 'transparent', opacity: 0.8 }}
                        border="1px solid"
                        borderColor="#1A1A1A"
                        borderRadius="md"
                        width="130px"
                        height="40px"
                        px={3}
                        position="relative"
                      >
                        <Text color="whiteAlpha.700" fontSize="xs" position="absolute" left={2} top={1}>Модель</Text>
                        <Text color="white" fontSize="md" position="absolute" left={2} top="70%" transform="translateY(-50%)">All</Text>
                        <Box position="absolute" right={2} top="50%" transform="translateY(-50%)">
                          <BsChevronRight size={12} />
                        </Box>
                      </Button>
                    </HStack>
                    <HStack spacing={2} position="absolute" right={4}>
                      <IconButton
                        aria-label="Delete"
                        icon={<BsTrash size={16} />}
                        variant="ghost"
                        color="white"
                        size="md"
                        _hover={{ bg: 'transparent', opacity: 0.8 }}
                        border="1px solid"
                        borderColor="#1A1A1A"
                        borderRadius="20px"
                        width="38px"
                        height="38px"
                      />
                      <IconButton
                        aria-label="Sort"
                        icon={
                          <Box
                            transform={isSortOpen ? 'rotate(180deg)' : 'rotate(0)'}
                            transition="transform 0.2s ease"
                          >
                            <BsChevronDown size={16} />
                          </Box>
                        }
                        variant="ghost"
                        color="white"
                        size="md"
                        _hover={{ bg: 'transparent', opacity: 0.8 }}
                        border="1px solid"
                        borderColor="#1A1A1A"
                        borderRadius="20px"
                        width="38px"
                        height="38px"
                        onClick={() => setIsSortOpen(!isSortOpen)}
                      />
                    </HStack>
                  </HStack>

                  {/* Выпадающая панель сортировки */}
                  <Collapse in={isSortOpen} animateOpacity>
                    <Box
                      position="absolute"
                      right={4}
                      top="calc(100% + 8px)"
                      width="280px"
                      bg="#1A1A1A"
                      borderRadius="12px"
                      border="1px solid"
                      borderColor="#1A1A1A"
                      p={2}
                      zIndex={1}
                    >
                      <VStack spacing={2} align="stretch">
                        <Box>
                          <Button
                            variant="ghost"
                            color="white"
                            width="100%"
                            height="48px"
                            justifyContent="space-between"
                            _hover={{ bg: 'whiteAlpha.50' }}
                            borderRadius="8px"
                            px={3}
                            position="relative"
                            onClick={() => setIsBackgroundOpen(!isBackgroundOpen)}
                          >
                            <Box>
                              <Text color="whiteAlpha.700" fontSize="xs" position="absolute" left={3} top={2}>Background</Text>
                              <Text color="white" fontSize="md" position="absolute" left={3} top="65%" transform="translateY(-50%)">
                                {selectedBackground || "All"}
                              </Text>
                            </Box>
                            <Box 
                              transform={isBackgroundOpen ? "rotate(180deg)" : "rotate(0deg)"}
                              transition="transform 0.2s"
                            >
                              <BsChevronDown size={16} color="white" opacity={0.7} />
                            </Box>
                          </Button>

                          <Collapse in={isBackgroundOpen} animateOpacity>
                            <VStack 
                              spacing={0} 
                              align="stretch" 
                              bg="#000000" 
                              borderRadius="md" 
                              border="1px solid" 
                              borderColor="#1A1A1A"
                              maxH="300px"
                              overflowY="auto"
                              mt={2}
                              sx={{
                                '&::-webkit-scrollbar': {
                                  width: '4px',
                                },
                                '&::-webkit-scrollbar-track': {
                                  background: 'transparent',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                  background: '#1A1A1A',
                                  borderRadius: '2px',
                                },
                              }}
                            >
                              {backgroundList.map((bg, index) => (
                                <HStack
                                  key={index}
                                  p={3}
                                  spacing={3}
                                  _hover={{ bg: 'whiteAlpha.50' }}
                                  cursor="pointer"
                                  onClick={() => setSelectedBackground(bg.name === selectedBackground ? '' : bg.name)}
                                >
                                  <Box
                                    w="24px"
                                    h="24px"
                                    borderWidth="2px"
                                    borderColor="whiteAlpha.300"
                                    borderRadius="sm"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    bg={selectedBackground === bg.name ? "#0098EA" : "transparent"}
                                  >
                                    {selectedBackground === bg.name && (
                                      <CheckIcon color="white" w={3} h={3} />
                                    )}
                                  </Box>
                                  <Box
                                    w="24px"
                                    h="24px"
                                    borderRadius="full"
                                    bg={bg.color}
                                  />
                                  <Text color="white">{bg.name}</Text>
                                </HStack>
                              ))}
                            </VStack>
                          </Collapse>
                        </Box>

                        <Box>
                          <Button
                            variant="ghost"
                            color="white"
                            width="100%"
                            height="48px"
                            justifyContent="space-between"
                            _hover={{ bg: 'whiteAlpha.50' }}
                            borderRadius="8px"
                            px={3}
                            position="relative"
                            onClick={() => setIsNumberOpen(!isNumberOpen)}
                          >
                            <Box>
                              <Text color="whiteAlpha.700" fontSize="xs" position="absolute" left={3} top={2}>Number</Text>
                              <Text color="white" fontSize="md" position="absolute" left={3} top="65%" transform="translateY(-50%)">
                                {selectedNumber || "#"}
                              </Text>
                            </Box>
                            <Box 
                              transform={isNumberOpen ? "rotate(180deg)" : "rotate(0deg)"}
                              transition="transform 0.2s"
                            >
                              <BsChevronDown size={16} color="white" opacity={0.7} />
                            </Box>
                          </Button>

                          <Collapse in={isNumberOpen} animateOpacity>
                            <VStack 
                              spacing={3} 
                              align="stretch" 
                              bg="#000000" 
                              borderRadius="md" 
                              border="1px solid" 
                              borderColor="#1A1A1A"
                              p={3}
                              mt={2}
                            >
                              <Box>
                                <Text color="whiteAlpha.700" fontSize="xs" mb={2}>Enter NFT number (1-99999)</Text>
                                <Input
                                  placeholder="Enter number..."
                                  bg="#1A1A1A"
                                  border="none"
                                  size="md"
                                  value={numberSearchQuery}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const num = Number(value);
                                    // Проверяем, что введены только цифры и число в диапазоне 1-99999
                                    if (/^\d*$/.test(value) && (num <= 99999 || value === '')) {
                                      setNumberSearchQuery(value);
                                    }
                                  }}
                                  type="number"
                                  min="1"
                                  max="99999"
                                  _placeholder={{ color: 'whiteAlpha.500' }}
                                  _focus={{ boxShadow: 'none' }}
                                />
                              </Box>
                              <Button
                                colorScheme="blue"
                                bg="#0098EA"
                                _hover={{ bg: '#0088D1' }}
                                isDisabled={!numberSearchQuery || Number(numberSearchQuery) < 1 || Number(numberSearchQuery) > 99999}
                                onClick={() => {
                                  if (Number(numberSearchQuery) >= 1 && Number(numberSearchQuery) <= 99999) {
                                    setSelectedNumber(numberSearchQuery);
                                    setIsNumberOpen(false);
                                  }
                                }}
                              >
                                Confirm
                              </Button>
                            </VStack>
                          </Collapse>
                        </Box>

                        <Box>
                          <Button
                            variant="ghost"
                            color="white"
                            width="100%"
                            height="48px"
                            justifyContent="space-between"
                            _hover={{ bg: 'whiteAlpha.50' }}
                            borderRadius="8px"
                            px={3}
                            position="relative"
                            onClick={() => setIsSymbolOpen(!isSymbolOpen)}
                          >
                            <Box>
                              <Text color="whiteAlpha.700" fontSize="xs" position="absolute" left={3} top={2}>Symbol</Text>
                              <Text color="white" fontSize="md" position="absolute" left={3} top="65%" transform="translateY(-50%)">
                                {selectedSymbol || "All"}
                              </Text>
                            </Box>
                            <Box 
                              transform={isSymbolOpen ? "rotate(180deg)" : "rotate(0deg)"}
                              transition="transform 0.2s"
                            >
                              <BsChevronDown size={16} color="white" opacity={0.7} />
                            </Box>
                          </Button>

                          <Collapse in={isSymbolOpen} animateOpacity>
                            <VStack 
                              spacing={2} 
                              align="stretch" 
                              bg="#000000" 
                              borderRadius="md" 
                              border="1px solid" 
                              borderColor="#1A1A1A"
                              p={3}
                              mt={2}
                            >
                              <Input
                                placeholder="Search symbol..."
                                bg="#1A1A1A"
                                border="none"
                                size="md"
                                value={symbolSearchQuery}
                                onChange={(e) => setSymbolSearchQuery(e.target.value)}
                                _placeholder={{ color: 'whiteAlpha.500' }}
                                _focus={{ boxShadow: 'none' }}
                              />
                              <Box 
                                maxH="200px" 
                                overflowY="auto"
                                sx={{
                                  '&::-webkit-scrollbar': {
                                    width: '4px',
                                  },
                                  '&::-webkit-scrollbar-track': {
                                    background: 'transparent',
                                  },
                                  '&::-webkit-scrollbar-thumb': {
                                    background: '#1A1A1A',
                                    borderRadius: '2px',
                                  },
                                }}
                              >
                                {filteredSymbols.map((symbol, index) => (
                                  <HStack
                                    key={index}
                                    p={2}
                                    spacing={3}
                                    _hover={{ bg: 'whiteAlpha.50' }}
                                    cursor="pointer"
                                    onClick={() => {
                                      setSelectedSymbol(symbol === selectedSymbol ? '' : symbol);
                                      setIsSymbolOpen(false);
                                    }}
                                  >
                                    <Box
                                      w="24px"
                                      h="24px"
                                      borderWidth="2px"
                                      borderColor="whiteAlpha.300"
                                      borderRadius="sm"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                      bg={selectedSymbol === symbol ? "#0098EA" : "transparent"}
                                    >
                                      {selectedSymbol === symbol && (
                                        <CheckIcon color="white" w={3} h={3} />
                                      )}
                                    </Box>
                                    <Text color="white">{symbol}</Text>
                                  </HStack>
                                ))}
                              </Box>
                            </VStack>
                          </Collapse>
                        </Box>

                        <Box p={2}>
                          <Text color="whiteAlpha.700" fontSize="xs" mb={2}>Price</Text>
                          <HStack spacing={2}>
                            <Box
                              bg="#000000"
                              borderRadius="8px"
                              border="1px solid"
                              borderColor="#1A1A1A"
                              flex={1}
                              p={2}
                            >
                              <Text color="whiteAlpha.700" fontSize="xs">From</Text>
                              <Input
                                variant="unstyled"
                                placeholder="0"
                                color="white"
                                fontSize="md"
                                height="24px"
                                p={0}
                                value={priceFrom}
                                onChange={handlePriceFromChange}
                                _placeholder={{ color: "whiteAlpha.500" }}
                              />
                            </Box>
                            <Box
                              bg="#000000"
                              borderRadius="8px"
                              border="1px solid"
                              borderColor="#1A1A1A"
                              flex={1}
                              p={2}
                            >
                              <Text color="whiteAlpha.700" fontSize="xs">To</Text>
                              <Input
                                variant="unstyled"
                                placeholder="10000"
                                color="white"
                                fontSize="md"
                                height="24px"
                                p={0}
                                value={priceTo}
                                onChange={handlePriceToChange}
                                _placeholder={{ color: "whiteAlpha.500" }}
                              />
                            </Box>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>
                  </Collapse>
                </Box>
              )}
            </Box>

            {/* Прокручиваемый контент */}
            <Box 
              flex="1"
              overflowY="auto"
              pt={activeTab === 'gifts' ? "70px" : "140px"}
              pb="80px"
              sx={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#1A1A1A',
                  borderRadius: '2px',
                },
              }}
            >
              <SlideFade in={activeTab === 'market'} offsetY="20px">
                {activeTab === 'market' && (
                  <Box p={4}>
                    {filteredMarketNFTs.length > 0 ? (
                      <Box
                        display="grid"
                        gridTemplateColumns="repeat(2, 1fr)"
                        gap={3}
                      >
                        {filteredMarketNFTs.map((nft) => (
                          <Box
                            key={nft.id}
                            role="group"
                            bg="linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(36,36,36,0.95) 100%)"
                            backdropFilter="blur(10px)"
                            borderRadius="xl"
                            overflow="hidden"
                            border="1px solid rgba(255,255,255,0.1)"
                            cursor="pointer"
                            onClick={onNFTDetailOpen}
                            position="relative"
                            transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                            _hover={{
                              transform: 'translateY(-4px)',
                              boxShadow: '0 8px 20px rgba(0, 152, 234, 0.2)',
                              borderColor: '#0098EA'
                            }}
                            _active={{
                              transform: 'scale(0.98)'
                            }}
                          >
                            <Box
                              height="160px"
                              bg="linear-gradient(135deg, rgba(0, 152, 234, 0.05) 0%, rgba(23, 33, 43, 0.1) 100%)"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              position="relative"
                              overflow="hidden"
                              transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                            >
                              <StarIcon 
                                color="white" 
                                boxSize={8} 
                                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                                _groupHover={{
                                  transform: 'scale(1.2) rotate(180deg)',
                                  color: '#0098EA'
                                }}
                              />
                            </Box>
                            <Box p={3}>
                              <HStack justify="space-between" mb={2}>
                                <Text 
                                  color="white" 
                                  fontSize="sm" 
                                  fontWeight="medium"
                                  transition="all 0.3s ease"
                                  _groupHover={{
                                    color: '#0098EA'
                                  }}
                                >
                                  {nft.name}
                                </Text>
                                <Text color="whiteAlpha.800" fontSize="sm">{nft.number}</Text>
                              </HStack>
                              <Button
                                width="100%"
                                bg="linear-gradient(135deg, #0098EA 0%, #0088D1 100%)"
                                color="white"
                                size="sm"
                                height="32px"
                                fontSize="sm"
                                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                                _hover={{ 
                                  bg: "linear-gradient(135deg, #0088D1 0%, #0078C1 100%)",
                                  transform: 'translateY(-2px)'
                                }}
                                _active={{
                                  transform: 'translateY(0)'
                                }}
                              >
                                <HStack spacing={1} justify="center" width="100%">
                                  <Text 
                                    color="white" 
                                    fontSize="sm"
                                    transition="all 0.3s ease"
                                    _groupHover={{
                                      transform: 'translateY(-1px)'
                                    }}
                                  >
                                    {nft.price}
                                  </Text>
                                  <Box
                                    transition="all 0.3s ease"
                                    _groupHover={{
                                      transform: 'scale(1.1) rotate(10deg)'
                                    }}
                                  >
                                    <TonLogo size="14px" />
                                  </Box>
                                </HStack>
                              </Button>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Text color="white" fontSize="2xl" fontWeight="bold" textAlign="center">No NFTs found</Text>
                    )}
                  </Box>
                )}
              </SlideFade>

              <SlideFade in={activeTab === 'gifts'} offsetY="20px">
                {activeTab === 'gifts' && (
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
                      <>
                        <HStack spacing={4} mb={6}>
                          <Box
                            flex={1}
                            p={3}
                            bg={activeGiftsTab === 'listed' ? '#0A84FF' : 'transparent'}
                            color="white"
                            borderRadius="xl"
                            cursor="pointer"
                            textAlign="center"
                            onClick={() => setActiveGiftsTab('listed')}
                            transition="all 0.3s"
                            _hover={{
                              bg: activeGiftsTab === 'listed' ? '#0A84FF' : 'rgba(255,255,255,0.1)'
                            }}
                          >
                            <Text>Listed Gifts</Text>
                          </Box>
                          <Box
                            flex={1}
                            p={3}
                            bg={activeGiftsTab === 'unlisted' ? '#0A84FF' : 'transparent'}
                            color="white"
                            borderRadius="xl"
                            cursor="pointer"
                            textAlign="center"
                            onClick={() => setActiveGiftsTab('unlisted')}
                            transition="all 0.3s"
                            _hover={{
                              bg: activeGiftsTab === 'unlisted' ? '#0A84FF' : 'rgba(255,255,255,0.1)'
                            }}
                          >
                            <Text>Unlisted Gifts</Text>
                          </Box>
                        </HStack>
                        {filteredGifts.length > 0 ? (
                          <Box
                            display="grid"
                            gridTemplateColumns="repeat(2, 1fr)"
                            gap={3}
                          >
                            {filteredGifts.map((gift) => (
                              <Box
                                key={gift.id}
                                bg="linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(36,36,36,0.95) 100%)"
                                backdropFilter="blur(10px)"
                                borderRadius="xl"
                                overflow="hidden"
                                border="1px solid rgba(255,255,255,0.1)"
                                cursor="pointer"
                                onClick={(e: React.MouseEvent<HTMLDivElement>) => handleListGift(gift, e)}
                                position="relative"
                                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                                _hover={{
                                  transform: 'translateY(-4px) scale(1.02)',
                                  boxShadow: '0 8px 20px rgba(0, 152, 234, 0.2)',
                                  borderColor: '#0098EA'
                                }}
                                _active={{
                                  transform: 'translateY(0) scale(0.98)'
                                }}
                              >
                                <Box
                                  height="160px"
                                  bg="linear-gradient(135deg, rgba(0, 152, 234, 0.05) 0%, rgba(23, 33, 43, 0.1) 100%)"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  position="relative"
                                  overflow="hidden"
                                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                                >
                                  <Text 
                                    color="white" 
                                    fontSize="2xl" 
                                    fontWeight="bold"
                                    transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                                    _groupHover={{
                                      transform: 'scale(1.1)',
                                      textShadow: '0 0 20px rgba(0, 152, 234, 0.5)'
                                    }}
                                  >
                                    {gift.name}
                                  </Text>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        ) : (
                          <Text color="white" fontSize="2xl" fontWeight="bold" textAlign="center">No gifts found</Text>
                        )}
                      </>
                    )}
                  </Box>
                )}
              </SlideFade>

              <SlideFade in={activeTab === 'activity'} offsetY="20px">
                {activeTab === 'activity' && (
                  <Box p={4}>
                    {activityItems.length > 0 ? (
                      <ActivityList />
                    ) : (
                      <Text color="white" fontSize="2xl" fontWeight="bold" textAlign="center">No activity items found</Text>
                    )}
                  </Box>
                )}
              </SlideFade>
            </Box>

            {/* Добавляем модальное окно для установки цены листинга */}
            <Modal 
              isOpen={isListingModalOpen} 
              onClose={onListingModalClose}
              isCentered
            >
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent
                bg="linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(26,26,26,0.95) 100%)"
                color="white"
                borderRadius="xl"
                mx={4}
                maxW="400px"
                boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
                border="1px solid rgba(255,255,255,0.1)"
                backdropFilter="blur(10px)"
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                transform="scale(0.95)"
                _hover={{
                  transform: 'scale(1)',
                  boxShadow: '0 12px 40px rgba(0, 152, 234, 0.2)'
                }}
              >
                <ModalHeader textAlign="center">List Gift for Sale</ModalHeader>
                <ModalCloseButton color="#6D7883" />
                <ModalBody pb={6}>
                  <VStack spacing={4}>
                    <Text color="#6D7883" fontSize="sm" textAlign="center">
                      Enter the price for your gift
                    </Text>
                    <Box
                      bg="#1A1A1A"
                      p={2}
                      borderRadius="xl"
                      width="100%"
                      border="1px solid"
                      borderColor="#1A1A1A"
                    >
                      <HStack>
                        <TonLogo size="32px" />
                        <Input
                          variant="unstyled"
                          placeholder="Price"
                          color="white"
                          fontSize="md"
                          value={listingPrice}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*\.?\d*$/.test(value)) {
                              setListingPrice(value);
                            }
                          }}
                          _placeholder={{ color: "#6D7883" }}
                        />
                      </HStack>
                    </Box>
                    <Button
                      width="100%"
                      bg="#0098EA"
                      color="white"
                      size="lg"
                      borderRadius="xl"
                      _hover={{ opacity: 0.8 }}
                      fontSize="md"
                      onClick={confirmListing}
                      isDisabled={!listingPrice || Number(listingPrice) <= 0}
                    >
                      Confirm Listing
                    </Button>
                  </VStack>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        </>
      )}
    </Box>
  );
} 