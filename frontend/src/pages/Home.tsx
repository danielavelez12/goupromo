import {
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import hero from "../assets/hero.svg";
import Button from "../components/Button";
import ItemCard from "../components/ItemCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useItems } from "../hooks/useItems";
const HeroHeader = () => {
  const navigate = useNavigate();
  const { data: items, isLoading, error } = useItems();

  console.log("Items data:", items);
  console.log("Loading state:", isLoading);
  console.log("Error state:", error);

  return (
    <Flex
      w="full"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
    >
      <Image
        src={hero}
        position="absolute"
        top={0}
        left={0}
        objectFit={"cover"}
        width="100vw"
        height="100%"
        borderRadius={8}
      />
      <VStack
        position="relative"
        alignItems="flex-start"
        gap={4}
        zIndex={1}
        maxWidth={{ base: "80%", md: "65%", lg: "50%" }}
        ml={{ base: 4, md: 6, lg: 10 }}
        mt={{ base: 10, md: 16, lg: 20 }}
        pb={{ base: 10, md: 16, lg: 20 }}
      >
        <Heading
          color="white"
          size={{ base: "2xl", md: "4xl", lg: "6xl" }}
          fontWeight={700}
        >
          Las mejores promociones para la comida del día.
        </Heading>
        <Text
          color="white"
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight={400}
        >
          Bolsas de sorpresa y más de los locales alrededor de ti.
        </Text>
        <Button
          as={RouterLink}
          onClick={() => navigate("/restaurant/signup")}
          size={{ base: "md", lg: "lg" }}
          colorScheme="brand"
          fontWeight={500}
        >
          Comprar hoy
        </Button>
      </VStack>
    </Flex>
  );
};

function Home() {
  const { data: items, isLoading, error } = useItems();
  return (
    <Flex mt={4} flexDirection="column">
      <HeroHeader />

      {isLoading && <LoadingSpinner />}
      {error && <Text color="red.500">Error al cargar los productos</Text>}
      <Flex flexDirection="column" mt={12} mx={12}>
        <Heading size="xl" fontWeight={600}>
          Los productos de hoy
        </Heading>
        <Text>Platos y bolsas de sorpresa a los mejores precios</Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={4}
          my={10}
          width="100%"
        >
          {items?.map((item) => (
            <ItemCard
              key={item.item_number}
              name={item.item_type}
              description={item.description}
              original_price={item.original_price}
              offer_price={item.offer_price}
              image_url={item.image_url}
              restaurant_name={item.restaurant_name}
              city={item.city}
              logo_url={item.logo_url}
              website_url={item.website_url}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export default Home;
