import {
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Hairline from "./Hairline";
const Footer = () => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Hairline />
      <Flex flexDirection="column" mt={12} mx={isMobile ? 0 : 12} mb={8}>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spaceX={isMobile ? 0 : 8}
          spaceY={isMobile ? 8 : 0}
          mx={isMobile ? 8 : 0}
        >
          <VStack align="flex-start">
            <Heading size="md" mb={4}>
              GouPromo
            </Heading>
            <Text color="gray">
              Conectando restaurantes y consumidores para reducir el desperdicio
              de alimentos.
            </Text>
          </VStack>
          <VStack align="flex-start">
            <Heading size="md" mb={4}>
              Enlaces
            </Heading>
            <Link onClick={() => navigate("/about")}>Sobre Nosotros</Link>
            <Link onClick={() => navigate("/contact")}>Contacto</Link>
            <Link onClick={() => navigate("/terms")}>
              Términos y Condiciones
            </Link>
          </VStack>
          <VStack align="flex-start">
            <Heading size="md" mb={4}>
              Contacto
            </Heading>
            <Text color="gray">Email: info@goupromo.com</Text>
            <Text color="gray">Tel: +34 900 123 456</Text>
          </VStack>
        </SimpleGrid>
        <Text color="gray" fontSize="sm" textAlign="center" mt={8}>
          © {new Date().getFullYear()} Goupromo. Todos los derechos reservados.
        </Text>
      </Flex>
    </>
  );
};

export default Footer;
