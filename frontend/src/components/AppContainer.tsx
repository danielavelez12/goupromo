import React from "react";
import styled from "styled-components";
import Footer from "./Footer";

const Container = styled.div`
  padding: 1rem;
  margin: 0 auto;
  background-color: white;
`;

const AppContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}) => {
  return (
    <>
      <Container {...props}>{children}</Container>
      <Footer />
    </>
  );
};

export default AppContainer;
