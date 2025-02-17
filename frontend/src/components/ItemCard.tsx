import {
  Badge,
  Flex,
  Image,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import QuantityControls from "./QuantityControls";

interface ItemCardProps {
  description: string;
  original_price: number;
  offer_price: number;
  image_url: string;
  restaurant_name: string;
  city: string;
  logo_url: string;
  website_url: string;
  shoppingCartQuantity?: number;
  onUpdateQuantity: (newQuantity: number) => void;
}

const ItemCard = ({
  description,
  original_price,
  offer_price,
  image_url,
  restaurant_name,
  city,
  logo_url,
  website_url,
  shoppingCartQuantity = 0,
  onUpdateQuantity,
}: ItemCardProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  console.log("cart items in itemcard ", shoppingCartQuantity);
  return (
    <Flex
      borderWidth={1}
      borderRadius={8}
      overflow="hidden"
      borderColor="gray"
      flexDirection="column"
      justify="space-between"
    >
      <Image
        src={image_url}
        alt={name}
        height="200px"
        width="100%"
        objectFit="cover"
      />
      <VStack p={4} align="start" spaceY={2}>
        <Flex justify="space-between" width="100%">
          <Text fontSize="xl" fontWeight="semibold" color="black">
            {restaurant_name}
          </Text>
          <Flex align="center" gap={2}>
            <Badge
              colorScheme="red"
              textDecoration="line-through"
              fontSize="md"
            >
              ${original_price}
            </Badge>
            <Badge colorScheme="green" fontSize="md">
              ${offer_price}
            </Badge>
          </Flex>
        </Flex>
        <Text color="black">{description}</Text>
        <Flex align="center" gap={2}>
          {logo_url && (
            <Image
              src={logo_url}
              alt={restaurant_name}
              boxSize="24px"
              borderRadius="full"
            />
          )}
          <Text fontSize="sm" color="black">
            {restaurant_name} • {city}
          </Text>
        </Flex>
      </VStack>
      <Flex width="100%" justify={isMobile ? "center" : "flex-end"} p={4}>
        <QuantityControls
          quantity={shoppingCartQuantity}
          onUpdateQuantity={onUpdateQuantity}
        />
      </Flex>
    </Flex>
  );
};

export default ItemCard;
