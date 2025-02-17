import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import Footer from "./Footer";

const Container = styled.div<{ isMobile: boolean }>`
  margin: 0 auto;
  background-color: white;
  padding: ${({ isMobile }) => (isMobile ? "0" : "1rem")};
`;

const AppContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Container isMobile={!!isMobile} {...props}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default AppContainer;
