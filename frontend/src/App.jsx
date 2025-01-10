import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/Resetpassword";

const RouterHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const authenticateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.post(
        "https://auth-14ri.onrender.com/authenticate",
        {
          token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.data.success) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setUserName(res.data.user.username);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  useEffect(() => {
    const isResetPasswordPath = location.pathname.startsWith("/reset-password");
    if (location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/forgot-password" && !isResetPasswordPath) {
      authenticateUser();
    }
  }, [location.pathname, navigate]);
  return (
    <Routes>
      <Route path="/" element={<Dashboard userName={userName} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
};
const App = () => {
  return (
    <>
      <Router>
        <RouterHandler />
      </Router>
    </>
  );
};

export default App;
