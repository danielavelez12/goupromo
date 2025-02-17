import { ButtonProps, Button as ChakraButton } from "@chakra-ui/react";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  customVariant?: "primary" | "secondary" | "linkLight" | "linkDark";
}

const styleMap = {
  primary: {
    bg: "green",
    color: "darkTeal",
    hoverBg: "lightGreen",
  },
  secondary: {
    bg: "lightGray",
    color: "black",
    hoverBg: "hoverWhite",
  },
  linkLight: {
    bg: "transparent",
    color: "white",
    hoverBg: "transparent",
  },
  linkDark: {
    bg: "transparent",
    color: "black",
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
      cursor="pointer"
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
