import {
  Box,
  Flex,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Button from "./Button";
import RestaurantRegister from "./RestaurantRegister";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./ui/menu";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  console.log({ isMobile });
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

  const NavItems = () => (
    <>
      <Button customVariant="linkLight" onClick={onRestaurantRegisterOpen}>
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
    </>
  );

  return (
    <>
      <Box
        bg="teal"
        px={4}
        py={1}
        color="white"
        borderRadius={isMobile ? 0 : 8}
      >
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

          {isMobile ? (
            <MenuRoot>
              <MenuTrigger>
                <IconButton
                  aria-label="Options"
                  as={Menu}
                  variant="ghost"
                  color="white"
                />
              </MenuTrigger>
              <MenuContent>
                <MenuItem
                  value="register-restaurant"
                  onClick={onRestaurantRegisterOpen}
                >
                  Registrar restaurante
                </MenuItem>
                {isAuthenticated ? (
                  <>
                    <MenuItem
                      value="profile"
                      onClick={() => navigate("/dashboard")}
                    >
                      Perfíl
                    </MenuItem>
                    <MenuItem value="logout" onClick={logout}>
                      Cerrar Sesión
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem value="login" onClick={onLoginOpen}>
                      Iniciar sesión
                    </MenuItem>
                    <MenuItem value="signup" onClick={onSignupOpen}>
                      Registrarse
                    </MenuItem>
                  </>
                )}
              </MenuContent>
            </MenuRoot>
          ) : (
            <Flex gap={4}>
              <NavItems />
            </Flex>
          )}
        </Flex>
      </Box>

      <Login isOpen={isLoginOpen} onClose={onLoginClose} />
      <Signup isOpen={isSignupOpen} onClose={onSignupClose} onSignupSuccess={onLoginOpen} />
      <RestaurantRegister
        isOpen={isRestaurantRegisterOpen}
        onClose={onRestaurantRegisterClose}
      />
    </>
  );
}

export default Navbar;
