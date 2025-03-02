import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Box,
  Text,
  Image,
  Badge,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FaGem } from 'react-icons/fa';

interface NFT {
  id: string;
  name: string;
  image: string;
  isNew?: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
}

const nfts: NFT[] = [
  { id: '1', name: 'Record Player', image: 'https://via.placeholder.com/200/17212B/FFFFFF?text=Record+Player', isNew: true, rarity: 'legendary', price: 1.25 },
  { id: '2', name: 'Sleigh Bell', image: 'https://via.placeholder.com/200/17212B/FFFFFF?text=Sleigh+Bell', isNew: true, rarity: 'epic', price: 0.85 },
  { id: '3', name: 'Sakura Flower', image: 'https://via.placeholder.com/200/17212B/FFFFFF?text=Sakura+Flower', isNew: true, rarity: 'rare', price: 0.45 },
  { id: '4', name: 'Top Hat', image: 'https://via.placeholder.com/200/17212B/FFFFFF?text=Top+Hat', isNew: true, rarity: 'epic', price: 0.95 },
  { id: '5', name: 'Diamond Ring', image: 'https://via.placeholder.com/200/17212B/FFFFFF?text=Diamond+Ring', isNew: true, rarity: 'legendary', price: 1.5 },
  { id: '6', name: 'Love Potion', image: 'https://via.placeholder.com/200/17212B/FFFFFF?text=Love+Potion', isNew: true, rarity: 'rare', price: 0.35 },
  { id: '7', name: 'Toy Bear', image: 'https://via.placeholder.com/200/17212B/FFFFFF?text=Toy+Bear', isNew: true, rarity: 'common', price: 0.15 },
  { id: '8', name: 'Loot Bag', image: 'https://via.placeholder.com/200/17212B/FFFFFF?text=Loot+Bag', isNew: true, rarity: 'rare', price: 0.55 },
  { id: '9', name: 'Astral Shard', image: 'https://via.placeholder.com/200/17212B/FFFFFF?text=Astral+Shard', rarity: 'legendary', price: 1.75 },
  { id: '10', name: 'B-Day Candle', image: 'https://via.placeholder.com/200/17212B/FFFFFF?text=B-Day+Candle', rarity: 'common', price: 0.25 },
];

interface NFTSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (nft: NFT) => void;
}

const getRarityColor = (rarity: NFT['rarity']) => {
  switch (rarity) {
    case 'legendary':
      return '#FFD700'; // золотой
    case 'epic':
      return '#FF00FF'; // пурпурный
    case 'rare':
      return '#0098EA'; // синий
    default:
      return '#808080'; // серый
  }
};

export const NFTSelector = ({ isOpen, onClose, onSelect }: NFTSelectorProps) => {
  const colors = {
    bg: '#0E1621',
    panel: '#17212B',
    accent: '#0098EA',
    text: '#FFFFFF',
    border: '#253340',
    muted: '#6D7883',
    hover: '#253340',
    buttonBg: '#242F3D',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg={colors.panel} color={colors.text}>
        <ModalHeader borderBottom="1px solid" borderColor={colors.border}>
          Select NFT
        </ModalHeader>
        <ModalCloseButton color={colors.muted} />
        <ModalBody p={6}>
          <SimpleGrid columns={4} spacing={4}>
            {nfts.map((nft) => (
              <Box
                key={nft.id}
                bg={colors.buttonBg}
                borderRadius="xl"
                overflow="hidden"
                cursor="pointer"
                onClick={() => {
                  onSelect(nft);
                  onClose();
                }}
                transition="all 0.2s"
                _hover={{
                  transform: 'scale(1.05)',
                  bg: colors.hover,
                }}
                position="relative"
                border="1px solid"
                borderColor={colors.border}
              >
                <Box position="relative" pb="100%">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/200"
                  />
                  <HStack
                    position="absolute"
                    top={2}
                    right={2}
                    spacing={1}
                  >
                    {nft.isNew && (
                      <Badge
                        colorScheme="blue"
                        fontSize="xs"
                        borderRadius="full"
                        px={2}
                      >
                        NEW!
                      </Badge>
                    )}
                    <Badge
                      bg={getRarityColor(nft.rarity)}
                      color="white"
                      fontSize="xs"
                      borderRadius="full"
                      px={2}
                      textTransform="capitalize"
                    >
                      {nft.rarity}
                    </Badge>
                  </HStack>
                </Box>
                <Box p={4}>
                  <Text 
                    fontSize="md" 
                    fontWeight="600"
                    mb={2}
                    isTruncated
                  >
                    {nft.name}
                  </Text>
                  <HStack justify="space-between" align="center">
                    <HStack spacing={1}>
                      <Icon as={FaGem} color={colors.accent} boxSize={4} />
                      <Text color={colors.accent} fontSize="sm" fontWeight="600">
                        {nft.price} TON
                      </Text>
                    </HStack>
                  </HStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}; 