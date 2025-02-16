import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

function CustomerLogin() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading>Iniciar Sesión - Cliente</Heading>
        <Box as="form" w="100%" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Usuario</FormLabel>
              <Input type="email" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" />
            </FormControl>

            <Button type="submit" colorScheme="brand" size="lg" w="100%">
              Ingresar
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CustomerLogin;
