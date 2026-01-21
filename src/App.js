import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useScrollToTop from './Hooks/useScrollToTop'; 
import HomeScreen from "./Screens/HomeScreen";
import RoomsScreen from "./Screens/RoomsScreen";
import ServicesScreen from "./Screens/ServicesScreen";
import GalleryScreen from "./Screens/GalleryScreen";
import AboutScreen from "./Screens/AboutScreen";
import ContactScreen from "./Screens/ContactScreen";
import BookingScreen from "./Screens/BookingScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import AdminLoginScreen from "./Screens/AdminLoginScreen";
import AdminDashboardScreen from "./Screens/AdminDashboardScreen";

function App() {
  useScrollToTop();
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/rooms" element={<RoomsScreen />} />
        <Route path="/services" element={<ServicesScreen />} />
        <Route path="/gallery" element={<GalleryScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/booking" element={<BookingScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/admin/login" element={<AdminLoginScreen />} />
        <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}