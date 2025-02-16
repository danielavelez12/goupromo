import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
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
          </Routes>
        </AppContainer>
      </AuthProvider>
    </Router>
  );
};

export default App;
