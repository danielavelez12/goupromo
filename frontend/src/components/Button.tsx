import { ButtonProps, Button as ChakraButton } from "@chakra-ui/react";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  customVariant?: "primary" | "secondary" | "link";
}

const styleMap = {
  primary: {
    bg: "green",
    color: "darkTeal",
    hoverBg: "tealHover",
  },
  secondary: {
    bg: "white",
    color: "black",
    hoverBg: "hoverWhite",
  },
  link: {
    bg: "transparent",
    color: "white",
    hoverBg: "transparent",
  },
};

const Button: React.FC<CustomButtonProps> = ({
  children,
  customVariant = "primary",
  ...props
}) => {
  return (
    <ChakraButton
      bg={styleMap[customVariant].bg}
      color={styleMap[customVariant].color}
      borderRadius="8px"
      w="50"
      _hover={{
        color: styleMap[customVariant].color,
        bg: styleMap[customVariant].hoverBg,
      }}
      transition="ease-in 0.2s"
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
