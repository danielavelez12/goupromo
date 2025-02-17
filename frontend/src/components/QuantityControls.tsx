import { Flex, IconButton, Text, useBreakpointValue } from "@chakra-ui/react";
import { Minus, Plus } from "lucide-react";

interface QuantityControlsProps {
  quantity: number;
  onUpdateQuantity: (newQuantity: number) => void;
}

function QuantityControls({
  quantity,
  onUpdateQuantity,
}: QuantityControlsProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  console.log("quantity in quantity controls", quantity);

  return (
    <Flex
      align="center"
      gap={isMobile ? 10 : 2}
      bg="extraLightGreen"
      borderRadius="4xl"
      p={isMobile ? 3 : 2}
    >
      <IconButton
        aria-label="Decrease quantity"
        as={Minus}
        size={isMobile ? "xs" : "2xs"}
        disabled={quantity <= 0}
        onClick={(e) => {
          console.log("CLICK");
          onUpdateQuantity(quantity - 1);
        }}
        color="darkGreen"
      />
      <Text fontWeight="medium" minW="32px" textAlign="center" color="black">
        {quantity}
      </Text>
      <IconButton
        aria-label="Increase quantity"
        as={Plus}
        size={isMobile ? "xs" : "2xs"}
        onClick={(e) => {
          console.log("CLICK");
          onUpdateQuantity(quantity + 1);
        }}
        color="darkGreen"
      />
    </Flex>
  );
}

export default QuantityControls;
