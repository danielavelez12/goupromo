import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Button from "./Button";
import RestaurantRegister from "./RestaurantRegister";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const {
    open: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    open: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();
  const {
    open: isRestaurantRegisterOpen,
    onOpen: onRestaurantRegisterOpen,
    onClose: onRestaurantRegisterClose,
  } = useDisclosure();

  return (
    <>
      <Box bg="teal" px={4} py={1} color="white" borderRadius={8}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Button
            customVariant="linkLight"
            onClick={() => navigate("/")}
            fontWeight="extrabold"
            fontSize="xl"
            color="white"
          >
            Goupromo
          </Button>

          <Flex gap={4}>
            <Button
              customVariant="linkLight"
              onClick={onRestaurantRegisterOpen}
            >
              Registrar restaurante
            </Button>
            {isAuthenticated ? (
              <>
                <Button
                  onClick={() => navigate("/dashboard")}
                  customVariant="linkLight"
                >
                  Perfíl
                </Button>
                <Button onClick={logout} customVariant="linkLight">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onLoginOpen} customVariant="linkLight">
                  Iniciar sesión
                </Button>
                <Button onClick={onSignupOpen}>Registrarse</Button>
              </>
            )}
          </Flex>
        </Flex>
      </Box>

      <Login isOpen={isLoginOpen} onClose={onLoginClose} />
      <Signup isOpen={isSignupOpen} onClose={onSignupClose} />
      <RestaurantRegister
        isOpen={isRestaurantRegisterOpen}
        onClose={onRestaurantRegisterClose}
      />
    </>
  );
}

export default Navbar;
