import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [location.pathname]);

  const logout = async () => {
    try {
      alert("Signing out...");
      await Auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white px-6 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Link to="/dashboard" className="flex items-center gap-2">
            <i className="fas fa-paw"></i> Smart Pet
          </Link>
        </h1>
          <nav className="space-x-4">
            <a href="/dashboard" className="hover:text-white text-indigo-200">
              Dashboard
            </a>
            <a href="/profile" className="hover:text-white text-indigo-200">
              Profile
            </a>
            <a href="/cart" className="hover:text-white text-indigo-200">
              Cart
            </a>
            <button
              onClick={logout}
              className="text-red-200 hover:text-white font-medium"
            >
              Sign Out
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500">
  <div className="container mx-auto px-4">
    <p className="mb-2 font-semibold text-gray-700 text-lg">Smart Pet</p>
    <p className="mb-2 text-sm">
      Pet Food Delivery and Subscription Service – Prototype UI
    </p>
    <div className="space-x-4 text-sm mb-2">
      <a href="/login" className="text-indigo-600 hover:underline">Login</a>
      <a href="/dashboard" className="text-indigo-600 hover:underline">Dashboard</a>
      <a href="/cart" className="text-indigo-600 hover:underline">Cart</a>
      <a href="/profile" className="text-indigo-600 hover:underline">Profile</a>
    </div>
    <p className="text-xs">Designed with HTML and Tailwind CSS</p>
  </div>
</footer>
    </div>
  );
};

export default Layout;
