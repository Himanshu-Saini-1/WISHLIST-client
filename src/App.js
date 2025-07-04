import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import Dashboard from "./components/pages/Dashboard";
import WishlistPage from "./components/pages/WishlistPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wishlist/:id" element={<WishlistPage />} />
      </Routes>
    </Router>
  );
}

export default App;
