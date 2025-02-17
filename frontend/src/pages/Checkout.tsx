import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Hairline from "../components/Hairline";
import QuantityControls from "../components/QuantityControls";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { items, total, updateQuantity } = useCart();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  console.log("checkout", { items });

  return (
    <Box py={8} px={4}>
      <VStack spaceY={6} align="stretch">
        <Heading color="black" size="xl">
          Carrito de compras
        </Heading>

        {items.map((item) => (
          <Box key={item.item_number} p={4} borderWidth={1} borderRadius="md">
            <Flex
              justify="space-between"
              align="center"
              direction={{ base: "column", md: "row" }}
              gap={4}
            >
              <Flex gap={4} width="100%">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  boxSize="80px"
                  objectFit="cover"
                  borderRadius="md"
                />
                <Box>
                  <Text fontWeight="bold" color="black">
                    {item.name}
                  </Text>
                  <Text color="black">{item.restaurant_name}</Text>
                </Box>
              </Flex>
              <Flex
                align="center"
                gap={4}
                width={{ base: "100%", md: "auto" }}
                justify={{ base: "space-between", md: "flex-end" }}
              >
                <Text color="black">
                  ${(item.offer_price * item.quantity).toFixed(2)}
                </Text>
                <QuantityControls
                  quantity={item.quantity}
                  onUpdateQuantity={(newQuantity) =>
                    updateQuantity(item.item_number, newQuantity)
                  }
                />
              </Flex>
            </Flex>
          </Box>
        ))}

        <Hairline />

        <Flex justify="space-between" fontWeight="bold">
          <Text color="black">Total</Text>
          <Text color="black">${total.toFixed(2)}</Text>
        </Flex>

        <Flex justify="space-between" direction="column" gap={2} align="end">
          <Button width={isMobile ? "100%" : 60} disabled={items.length === 0}>
            Continuar al pago
          </Button>

          <Button
            width={isMobile ? "100%" : 60}
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                const productsSection =
                  document.getElementById("products-section");
                productsSection?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }, 100);
            }}
            customVariant="secondary"
          >
            Volver a la página principal
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}

export default Checkout;
