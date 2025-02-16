import { Container, Grid, Heading } from "@chakra-ui/react";

const RestaurantDashboard: React.FC = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Heading mb={6}>Panel de Control</Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8}>
        <div bg="white" p={4} borderRadius="lg" shadow="md"></div>
        <div bg="white" p={4} borderRadius="lg" shadow="md"></div>
        <div bg="white" p={4} borderRadius="lg" shadow="md"></div>
      </Grid>
    </Container>
  );
};

export default RestaurantDashboard;
