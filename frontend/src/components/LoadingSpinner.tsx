import { Center, Spinner, VStack } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Center h="100%" minH="200px">
      <VStack spaceY={4}>
        <Spinner color="teal" size="xl" />
      </VStack>
    </Center>
  );
};

export default LoadingSpinner;
