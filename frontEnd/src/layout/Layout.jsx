import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useCart } from "../context/CartContext";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, calculateTotals } = useCart();
  
  // Get item count for cart badge
  const itemCount = calculateTotals().itemCount;

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
      <header className="bg-indigo-600 text-white px-6 py-4 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Link to="/dashboard" className="flex items-center gap-2">
              <i className="fas fa-paw"></i> Smart Pet
            </Link>
          </h1>
          <nav className="flex items-center space-x-4">
            <Link 
              to="/dashboard" 
              className={`hover:text-white ${
                location.pathname === '/dashboard' ? 'text-white' : 'text-indigo-200'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/profile" 
              className={`hover:text-white ${
                location.pathname === '/profile' ? 'text-white' : 'text-indigo-200'
              }`}
            >
              Profile
            </Link>
            <Link 
              to="/cart" 
              className={`hover:text-white ${
                location.pathname === '/cart' ? 'text-white' : 'text-indigo-200'
              } relative`}
            >
              <span className="flex items-center">
                <i className="fas fa-shopping-cart mr-1"></i> Cart
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </span>
            </Link>
            <button
              onClick={logout}
              className="text-red-200 hover:text-white font-medium ml-2"
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
            <Link to="/" className="text-indigo-600 hover:underline">Login</Link>
            <Link to="/dashboard" className="text-indigo-600 hover:underline">Dashboard</Link>
            <Link to="/cart" className="text-indigo-600 hover:underline">Cart</Link>
            <Link to="/profile" className="text-indigo-600 hover:underline">Profile</Link>
          </div>
          <p className="text-xs">Designed with HTML and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;