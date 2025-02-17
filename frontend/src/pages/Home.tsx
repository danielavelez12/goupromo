import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { ChevronLeft, ChevronRight, ShoppingCartIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.svg";
import Button from "../components/Button";
import ItemCard from "../components/ItemCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../context/CartContext";
import { useItems } from "../hooks/useItems";

const AnimatedBox = animated(Box);

const HeroHeader = () => {
  const { data: items, isLoading, error } = useItems();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products-section");
    productsSection?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  console.log("Items data:", items);
  console.log("Loading state:", isLoading);
  console.log("Error state:", error);

  return (
    <Flex
      w="full"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      bg="teal"
      borderRadius={isMobile ? 0 : 8}
      py={8}
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
        zIndex={0}
        opacity={isMobile ? 0 : 1}
      />
      <VStack
        alignItems={isMobile ? "center" : "flex-start"}
        textAlign={isMobile ? "center" : "left"}
        gap={4}
        maxWidth={{ base: "90%", md: "65%", lg: "50%" }}
        mx={{ base: 4, md: 6, lg: 10 }}
        my={{ base: 6, md: 10, lg: 14 }}
        zIndex={1}
      >
        <Heading
          color="white"
          size={{ base: "4xl", md: "4xl", lg: "6xl" }}
          fontWeight={700}
          lineHeight={1.2}
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
          as="button"
          onClick={scrollToProducts}
          size={{ base: "xl", lg: "lg" }}
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [{ x, opacity }, api] = useSpring(() => ({
    x: 0,
    opacity: 1,
  }));
  const isMobile = useBreakpointValue({ base: true, md: false });

  const navigate = useNavigate();

  const duplicatedItems = useMemo(
    () =>
      items
        ? [...Array(10)].flatMap(() => items).sort(() => Math.random() - 0.5)
        : [],
    [items]
  );

  const bind = useDrag(({ movement: [mx], down, target }) => {
    // Check if the click is on a quantity control button
    const isQuantityControl = (target as HTMLElement).closest(
      '[aria-label*="quantity"]'
    );
    if (isQuantityControl) {
      console.log("isQuantityControl");
      return;
    }

    if (!down) {
      if (mx < -50 && currentIndex < (duplicatedItems?.length || 0) - 1) {
        setCurrentIndex((i) => i + 1);
        api.start({ opacity: 1, x: 0 });
      } else if (mx > 50 && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
        api.start({ opacity: 1, x: 0 });
      } else {
        api.start({ x: 0, opacity: 1 });
      }
    } else {
      const progress = Math.abs(mx / window.innerWidth);
      api.start({
        x: mx,
        opacity: 1 - progress,
        immediate: down,
      });
    }
  });

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil((duplicatedItems?.length || 0) / itemsPerPage);
  const currentItems = duplicatedItems?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Add new spring animation
  const [springProps, springApi] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      tension: 280,
      friction: 50,
    },
  }));

  useEffect(() => {
    // Trigger animation on mount
    springApi.start({ opacity: 1 });
  }, [springApi]);

  // Modified page change handler
  const handlePageChange = (newPage: number) => {
    console.log("newPage", newPage);
    springApi.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      reset: true,
      config: {
        tension: 280,
        friction: 50,
      },
      onStart: () => {
        setCurrentPage(newPage);
      },
    });
  };

  const { total, updateQuantity, addItem, items: cartItems } = useCart();

  console.log("cartItems", cartItems);

  const handleUpdateQuantity = (item: any, newQuantity: number) => {
    console.log("handleUpdateQuantity", item, newQuantity);
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.item_number === item.item_number
    );

    if (!existingCartItem && newQuantity > 0) {
      // If item doesn't exist in cart and quantity is being increased, add it
      addItem({
        item_number: item.item_number,
        name: item.description,
        offer_price: item.offer_price,
        quantity: newQuantity,
        restaurant_name: item.restaurant_name,
        image_url: item.image_url,
      });
    } else {
      // If item exists or quantity is being decreased, update quantity
      updateQuantity(item.item_number, newQuantity);
    }
  };

  const handleNavigateToCheckout = () => {
    window.scrollTo(0, 0);
    navigate("/checkout");
  };

  return (
    <Flex mt={{ base: 0, md: 4 }} flexDirection="column">
      <HeroHeader />

      <Flex
        flexDirection="column"
        pt={12}
        mx={{ base: 8, md: 12 }}
        id="products-section"
        position="relative"
      >
        <Flex
          justify="space-between"
          align="center"
          mb={4}
          direction={isMobile ? "column" : "row"}
        >
          <Box>
            <Heading size="xl" fontWeight={600} color="black">
              Los productos de hoy
            </Heading>
            <Text color="black">
              Platos y bolsas de sorpresa a los mejores precios
            </Text>
          </Box>
          {!isMobile && total > 0 && (
            <Button onClick={handleNavigateToCheckout} colorScheme="brand">
              <ShoppingCartIcon />
              Pagar (${total.toFixed(2)})
            </Button>
          )}
        </Flex>

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <Text color="red">Error al cargar los productos</Text>
        ) : items && items.length > 0 ? (
          <>
            {/* Mobile View */}
            <Box
              display={{ base: "block", md: "none" }}
              overflow="hidden"
              position="relative"
              my={10}
              width="100%"
            >
              <AnimatedBox
                {...bind()}
                style={{
                  x,
                  opacity,
                  display: "flex",
                  width: "100%",
                  touchAction: "none",
                  willChange: "transform, opacity",
                }}
                onTouchStart={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest('[aria-label*="quantity"]')) {
                    console.log("stopping prop");
                    e.stopPropagation();
                  }
                }}
              >
                {duplicatedItems && (
                  <Box width="100%" flexShrink={0} px={2}>
                    <ItemCard
                      {...duplicatedItems[currentIndex]}
                      shoppingCartQuantity={
                        cartItems.find(
                          (cartItem) =>
                            cartItem.item_number ===
                            duplicatedItems[currentIndex].item_number
                        )?.quantity || 0
                      }
                      onUpdateQuantity={(newQuantity) =>
                        handleUpdateQuantity(
                          duplicatedItems[currentIndex],
                          newQuantity
                        )
                      }
                    />
                  </Box>
                )}
              </AnimatedBox>
              {isMobile && cartItems.length > 0 && (
                <Flex justify="center" mt={4}>
                  <Button
                    onClick={handleNavigateToCheckout}
                    colorScheme="brand"
                    size="xl"
                    width="100%"
                    mt={4}
                  >
                    <ShoppingCartIcon />
                    Pagar (${total.toFixed(2)})
                  </Button>
                </Flex>
              )}
            </Box>

            {/* Desktop View */}
            <Box
              position="relative"
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                aria-label="Previous page"
                as={ChevronLeft}
                size="xl"
                position="absolute"
                left="-14"
                top="50%"
                transform="translateY(-50%)"
                color="black"
                bg="transparent"
                _hover={{ color: "darkGray" }}
                onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                display={{ base: "none", md: "block" }}
              />

              <AnimatedBox style={{ ...springProps }}>
                <SimpleGrid
                  display={{ base: "none", md: "grid" }}
                  columns={{ md: 2, lg: 3 }}
                  gap={4}
                  my={10}
                  width="100%"
                >
                  {currentItems?.map((item, index) => (
                    <ItemCard
                      key={`${item.item_number}-${index}`}
                      {...item}
                      shoppingCartQuantity={
                        cartItems.find(
                          (cartItem) =>
                            cartItem.item_number === item.item_number
                        )?.quantity || 0
                      }
                      onUpdateQuantity={(newQuantity) =>
                        handleUpdateQuantity(item, newQuantity)
                      }
                    />
                  ))}
                </SimpleGrid>
              </AnimatedBox>

              <IconButton
                aria-label="Next page"
                as={ChevronRight}
                size="xl"
                position="absolute"
                right="-14"
                top="50%"
                transform="translateY(-50%)"
                color="black"
                bg="transparent"
                _hover={{ color: "darkGray" }}
                onClick={() =>
                  handlePageChange(Math.min(totalPages - 1, currentPage + 1))
                }
                disabled={currentPage === totalPages - 1}
                display={{ base: "none", md: "block" }}
              />
            </Box>
          </>
        ) : (
          <Text color="gray.500" textAlign="center" py={10}>
            No hay productos disponibles en este momento
          </Text>
        )}
      </Flex>
    </Flex>
  );
}

export default Home;
