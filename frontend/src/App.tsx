import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import CustomerExplore from "./pages/customers/Explore";
import CustomerSignup from "./pages/customers/Signup";
import RestaurantDashboard from "./pages/restaurants/Dashboard";
import RestaurantSignup from "./pages/restaurants/Signup";

const App: React.FC = () => {
  return (
    <AppContainer>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/signup" element={<RestaurantSignup />} />
          <Route path="/customer/signup" element={<CustomerSignup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/restaurant/dashboard"
            element={<RestaurantDashboard />}
          />
          <Route path="/explore" element={<CustomerExplore />} />
        </Routes>
      </Router>
    </AppContainer>
  );
};

export default App;
