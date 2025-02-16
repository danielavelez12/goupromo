import { Text, TextProps } from "@chakra-ui/react";
import React from "react";

interface LinkProps extends TextProps {
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Text
      as="span"
      color="black"
      cursor="pointer"
      _hover={{
        textDecoration: "underline",
        color: "black",
      }}
      transition="ease-in 0.2s"
      {...props}
    >
      {children}
    </Text>
  );
};

export default Link;
