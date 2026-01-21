import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useScrollToTop from './Hooks/useScrollToTop'; 
import HomeScreen from "./Screens/HomeScreen";

function App() {
  useScrollToTop();
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={<Navigate to="/HomeScreen" />} />
        {/* Add this route for HomeScreen */}
        <Route path="/HomeScreen" element={<HomeScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
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