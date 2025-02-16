import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";

import { FormControl, FormLabel } from "@chakra-ui/form-control";

function RestaurantSignup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading>Registro de Restaurante</Heading>
        <Box as="form" w="100%" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>NIT</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Dirección</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Persona de Contacto</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Teléfono</FormLabel>
              <Input type="tel" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Correo</FormLabel>
              <Input type="email" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Ciudad</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Plan</FormLabel>
              <Select>
                <option value="goupromo">Goupromo</option>
                <option value="goupromo_estrella">Goupromo Estrella</option>
                <option value="goupromo_opcional">Goupromo Opcional</option>
              </Select>
            </FormControl>

            <Button type="submit" colorScheme="brand" size="lg" w="100%">
              Registrar
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default RestaurantSignup;
