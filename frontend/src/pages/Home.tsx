import {
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import hero from "../assets/hero.svg";
import Button from "../components/Button";

const HeroHeader = () => {
  const navigate = useNavigate();
  return (
    <Flex
      minHeight="50vh"
      w="full"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Image
        src={hero}
        position="absolute"
        top={0}
        left={0}
        objectFit="cover"
        width="100vw"
      />
      <VStack
        alignItems="flex-start"
        gap={4}
        zIndex={1}
        maxWidth={{ base: "80%", md: "65%", lg: "50%" }}
        ml={{ base: 4, md: 6, lg: 10 }}
        mt={{ base: 10, md: 16, lg: 20 }}
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
  return (
    <Container py={20} mt={4}>
      <HeroHeader />
    </Container>
  );
}

export default Home;
