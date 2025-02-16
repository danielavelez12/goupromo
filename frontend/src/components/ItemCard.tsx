import { Badge, Box, Flex, Image, Text, VStack } from "@chakra-ui/react";

interface ItemCardProps {
  name: string;
  description: string;
  original_price: number;
  offer_price: number;
  image_url: string;
  restaurant_name: string;
  city: string;
  logo_url: string;
  website_url: string;
}

const ItemCard = ({
  name,
  description,
  original_price,
  offer_price,
  image_url,
  restaurant_name,
  city,
  logo_url,
  website_url,
}: ItemCardProps) => {
  return (
    <Box
      maxW="sm"
      borderWidth={1}
      borderRadius={8}
      overflow="hidden"
      borderColor="gray"
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
          <Text fontSize="xl" fontWeight="semibold">
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
        <Text color="gray.600">{description}</Text>
        <Flex align="center" gap={2}>
          {logo_url && (
            <Image
              src={logo_url}
              alt={restaurant_name}
              boxSize="24px"
              borderRadius="full"
            />
          )}
          <Text fontSize="sm" color="gray.500">
            {restaurant_name} • {city}
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ItemCard;
