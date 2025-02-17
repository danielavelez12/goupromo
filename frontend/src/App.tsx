import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import theme from "./theme";

const App: React.FC = () => {
  return (
    <ChakraProvider value={theme}>
      <BrowserRouter>
        <CartProvider>
          <AuthProvider>
            <AppContainer>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </AppContainer>
          </AuthProvider>
        </CartProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
