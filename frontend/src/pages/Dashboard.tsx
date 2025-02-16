import {
  Avatar,
  Box,
  Container,
  Grid,
  Heading,
  Stat,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

interface UserStats {
  label: string;
  value: string | number;
}

const UserStatCard = ({ label, value }: UserStats) => {
  const formatValue = (value: string | number) => {
    if (typeof value === "number") {
      return new Intl.NumberFormat().format(value);
    }
    if (value.startsWith("$")) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(parseFloat(value.substring(1).replace(",", "")));
    }
    return value;
  };

  return (
    <Box p={6} borderRadius="lg" shadow="md">
      <Stat.Root>
        <Stat.Label fontSize="sm" color="gray.500">
          {label}
        </Stat.Label>
        <Stat.ValueText fontSize="2xl" fontWeight="bold">
          {formatValue(value)}
        </Stat.ValueText>
      </Stat.Root>
    </Box>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchRestaurantData = async () => {
      if (user) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/restaurant/user/${user.id}`
          );
          if (response.ok) {
            const data = await response.json();
            setRestaurant(data);
          }
        } catch (error) {
          console.error("Error fetching restaurant data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRestaurantData();
  }, [user]);

  if (!user || isLoading) {
    return (
      <Container maxW="container.xl" py={10}>
        <LoadingSpinner />
      </Container>
    );
  }

  const stats: UserStats[] = [
    { label: "Total Orders", value: 150 },
    { label: "Active Items", value: 12 },
    { label: "Revenue (Monthly)", value: "$3,500" },
    { label: "Customer Rating", value: "4.8" },
    { label: "Food Saved (kg)", value: "45" },
    { label: "CO2 Reduced (kg)", value: "89" },
  ];

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spaceY={6} align="stretch">
        {/* User Profile Section */}
        <InfoCard title="Perfíl">
          <Grid templateColumns={{ base: "1fr", md: "auto 1fr" }} gap={6}>
            <Avatar.Root size="xl">
              <Avatar.Fallback name={`${user.first_name} ${user.last_name}`} />
            </Avatar.Root>
            <VStack align="start" spaceY={2}>
              <Heading size="lg">
                {user.first_name} {user.last_name}
              </Heading>
              <Text color="gray.600">{user.email}</Text>
              <Text color="gray.600">{user.phone_number}</Text>
              <Text color="gray.600">{user.city}</Text>
            </VStack>
          </Grid>
        </InfoCard>

        {/* Restaurant Information Card */}
        {restaurant && (
          <InfoCard title="Perfíl de restaurante">
            <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={4}>
              <VStack align="start" spacing={3}>
                <Text>
                  <strong>Nombre:</strong> {restaurant.name}
                </Text>
                <Text>
                  <strong>Dirección:</strong>{" "}
                  {restaurant.primary_address.address}
                </Text>
                <Text>
                  <strong>Persona de contacto:</strong>{" "}
                  {restaurant.primary_contact.name}
                </Text>
                <Text>
                  <strong>Teléfono:</strong> {restaurant.phone_number}
                </Text>
                <Text>
                  <strong>Email:</strong> {restaurant.email}
                </Text>
                <Text>
                  <strong>Ciudad:</strong> {restaurant.city}
                </Text>
              </VStack>
            </Grid>
          </InfoCard>
        )}

        {/* Statistics Grid - Only shown for restaurants */}
        {restaurant && (
          <InfoCard title="Estadísticas">
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={6}
            >
              {stats.map((stat, index) => (
                <UserStatCard
                  key={index}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </Grid>
          </InfoCard>
        )}
      </VStack>
    </Container>
  );
};

export default Dashboard;
