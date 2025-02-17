import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface InfoCardProps {
  title?: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => {
  return (
    <Box>
      {title && (
        <Box bg="extraLightGreen" p={4} borderTopRadius={8}>
          <Heading size="md" color="black">
            {title}
          </Heading>
        </Box>
      )}
      <Box
        color="black"
        p={6}
        borderWidth={1}
        borderColor="extraLightGreen"
        borderBottomRadius={8}
      >
        {children}
      </Box>
    </Box>
  );
};

export default InfoCard;
