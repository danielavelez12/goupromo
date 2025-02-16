import { Box, Link as ChakraLink, Flex } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  const navigate = useNavigate();

  return (
    <Box bg="teal" px={4} py={1} color="white" borderRadius={8}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <ChakraLink
          as={RouterLink}
          onClick={() => navigate("/")}
          fontWeight="extrabold"
          fontSize="xl"
          color="white"
        >
          Goupromo
        </ChakraLink>

        <Flex gap={4}>
          <Button
            onClick={() => navigate("/restaurant/login")}
            customVariant="link"
            fontWeight={600}
          >
            Restaurantes
          </Button>
          <Button
            onClick={() => navigate("/customer/login")}
            customVariant="link"
            fontWeight={600}
          >
            Clientes
          </Button>
          <Button onClick={() => navigate("/explore")}>Registrarse</Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
