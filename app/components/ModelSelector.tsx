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
  HStack,
  Badge,
} from '@chakra-ui/react';

interface Model {
  id: string;
  name: string;
  image: string;
  isNew?: boolean;
}

const models: Model[] = [
  { id: '1', name: 'Record Player', image: '/models/record-player.png', isNew: true },
  { id: '2', name: 'Sleigh Bell', image: '/models/sleigh-bell.png', isNew: true },
  { id: '3', name: 'Sakura Flower', image: '/models/sakura-flower.png', isNew: true },
  { id: '4', name: 'Top Hat', image: '/models/top-hat.png', isNew: true },
  { id: '5', name: 'Diamond Ring', image: '/models/diamond-ring.png', isNew: true },
  { id: '6', name: 'Love Potion', image: '/models/love-potion.png', isNew: true },
  { id: '7', name: 'Toy Bear', image: '/models/toy-bear.png', isNew: true },
  { id: '8', name: 'Loot Bag', image: '/models/loot-bag.png', isNew: true },
  { id: '9', name: 'Astral Shard', image: '/models/astral-shard.png' },
  { id: '10', name: 'B-Day Candle', image: '/models/b-day-candle.png' },
  { id: '11', name: 'Berry Box', image: '/models/berry-box.png' },
  { id: '12', name: 'Bunny Muffin', image: '/models/bunny-muffin.png' },
  { id: '13', name: 'Cookie Heart', image: '/models/cookie-heart.png' },
  { id: '14', name: 'Crystal Ball', image: '/models/crystal-ball.png' },
  { id: '15', name: 'Desk Calendar', image: '/models/desk-calendar.png' },
  { id: '16', name: "Dunce's Cap", image: '/models/dunces-cap.png' },
  { id: '17', name: 'Eternal Candle', image: '/models/eternal-candle.png' },
  { id: '18', name: 'Eternal Rose', image: '/models/eternal-rose.png' },
  { id: '19', name: 'Evil Eye', image: '/models/evil-eye.png' },
  { id: '20', name: 'Flying Broom', image: '/models/flying-broom.png' },
  { id: '21', name: 'Genie Lamp', image: '/models/genie-lamp.png' },
  { id: '22', name: 'Ginger Cookie', image: '/models/ginger-cookie.png' },
  { id: '23', name: 'Hanging Star', image: '/models/hanging-star.png' },
  { id: '24', name: 'Hex Pot', image: '/models/hex-pot.png' },
  { id: '25', name: 'Homemade Cake', image: '/models/homemade-cake.png' },
  { id: '26', name: 'Hypno Lollipop', image: '/models/hypno-lollipop.png' },
  { id: '27', name: 'Ion Gem', image: '/models/ion-gem.png' },
  { id: '28', name: 'Jelly Bunny', image: '/models/jelly-bunny.png' },
  { id: '29', name: 'Jester Hat', image: '/models/jester-hat.png' },
  { id: '30', name: 'Jingle Bells', image: '/models/jingle-bells.png' },
  { id: '31', name: 'Precious Peach', image: '/models/precious-peach.png' },
  { id: '32', name: 'Santa Hat', image: '/models/santa-hat.png' },
  { id: '33', name: 'Scared Cat', image: '/models/scared-cat.png' },
  { id: '34', name: 'Sharp Tongue', image: '/models/sharp-tongue.png' },
  { id: '35', name: 'Signet Ring', image: '/models/signet-ring.png' },
  { id: '36', name: 'Skull Flower', image: '/models/skull-flower.png' },
  { id: '37', name: 'Snow Mittens', image: '/models/snow-mittens.png' },
  { id: '38', name: 'Spiced Wine', image: '/models/spiced-wine.png' },
  { id: '39', name: 'Star Notepad', image: '/models/star-notepad.png' },
  { id: '40', name: 'Kissed Frog', image: '/models/kissed-frog.png' },
  { id: '41', name: 'Lol Pop', image: '/models/lol-pop.png' },
  { id: '42', name: 'Love Candle', image: '/models/love-candle.png' },
  { id: '43', name: 'Lunar Snake', image: '/models/lunar-snake.png' },
  { id: '44', name: 'Mad Pumpkin', image: '/models/mad-pumpkin.png' },
  { id: '45', name: 'Magic Potion', image: '/models/magic-potion.png' },
  { id: '46', name: 'Mini Oscar', image: '/models/mini-oscar.png' },
  { id: '47', name: 'Party Sparkler', image: '/models/party-sparkler.png' },
  { id: '48', name: 'Perfume Bottle', image: '/models/perfume-bottle.png' },
  { id: '49', name: 'Plush Pepe', image: '/models/plush-pepe.png' },
  { id: '50', name: 'Swiss Watch', image: '/models/swiss-watch.png' },
  { id: '51', name: 'Trapped Heart', image: '/models/trapped-heart.png' },
  { id: '52', name: 'Vintage Cigar', image: '/models/vintage-cigar.png' },
  { id: '53', name: 'Voodoo Doll', image: '/models/voodoo-doll.png' },
  { id: '54', name: 'Witch Hat', image: '/models/witch-hat.png' },
];

interface ModelSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (model: Model) => void;
}

export const ModelSelector = ({ isOpen, onClose, onSelect }: ModelSelectorProps) => {
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
          Select Model
        </ModalHeader>
        <ModalCloseButton color={colors.muted} />
        <ModalBody p={6}>
          <SimpleGrid columns={6} spacing={4}>
            {models.map((model) => (
              <Box
                key={model.id}
                bg={colors.buttonBg}
                borderRadius="xl"
                overflow="hidden"
                cursor="pointer"
                onClick={() => {
                  onSelect(model);
                  onClose();
                }}
                transition="all 0.2s"
                _hover={{
                  transform: 'scale(1.05)',
                  bg: colors.hover,
                }}
              >
                <Box position="relative" pb="100%">
                  <Image
                    src={model.image}
                    alt={model.name}
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/100"
                  />
                  {model.isNew && (
                    <Badge
                      position="absolute"
                      top={2}
                      right={2}
                      colorScheme="blue"
                      fontSize="xs"
                      borderRadius="full"
                      px={2}
                    >
                      NEW!
                    </Badge>
                  )}
                </Box>
                <Box p={3}>
                  <Text 
                    fontSize="sm" 
                    fontWeight="500"
                    textAlign="center"
                    isTruncated
                  >
                    {model.name}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}; 