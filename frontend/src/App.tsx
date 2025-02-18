import { ChakraProvider } from "@chakra-ui/react";
import * as Sentry from "@sentry/react";
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

Sentry.init({
  dsn: "https://90e1e9018e569479e44b4811fcc80c54@o4508838399639552.ingest.us.sentry.io/4508838436732928",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    "localhost",
    "https://goupromo-frontend.onrender.com",
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const App: React.FC = () => {
  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
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
    </Sentry.ErrorBoundary>
  );
};

export default App;
