import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

interface HairlineProps extends BoxProps {
  color?: string;
}

const Hairline: React.FC<HairlineProps> = ({ color = "gray", ...props }) => {
  return <Box as="hr" borderColor={color} {...props} />;
};

export default Hairline;
