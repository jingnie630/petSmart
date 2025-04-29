import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import checkAuth from "../../Auth";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);
    
    // Reset button state after 1 second
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <Link to="/product">
        <div className="h-40 bg-gray-100 flex items-center justify-center">
          {product.icon === "bone" && <i className="fas fa-bone text-gray-400 text-3xl"></i>}
          {product.icon === "fish" && <i className="fas fa-fish text-gray-400 text-3xl"></i>}
          {product.icon === "cat" && <i className="fas fa-cat text-gray-400 text-3xl"></i>}
        </div>
      </Link>
      <div className="p-4">
        <h4 className="font-bold text-gray-800">{product.name}</h4>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-800">${product.price.toFixed(2)}</span>
          <button 
            className={`${
              isAdding ? 'bg-green-600' : 'bg-indigo-600'
            } text-white px-3 py-1 text-sm rounded hover:bg-indigo-700 flex items-center justify-center min-w-[90px]`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <i className="fas fa-check mr-1"></i> Added
              </>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [notification, setNotification] = useState(null);
  
  // Sample product data (in a real app, this would come from an API)
  const recommendedProducts = [
    {
      id: "premium-dog-food",
      name: "Premium Dog Food",
      description: "Natural ingredients",
      price: 24.99,
      icon: "bone"
    },
    {
      id: "tuna-cat-bites",
      name: "Tuna Cat Bites",
      description: "Omega-rich treats",
      price: 8.49,
      icon: "fish"
    },
    {
      id: "dental-chews",
      name: "Dental Chews",
      description: "Cleans teeth naturally",
      price: 12.00,
      icon: "bone"
    },
    {
      id: "catnip-play-pack",
      name: "Catnip Play Pack",
      description: "Stimulating toy set",
      price: 10.99,
      icon: "cat"
    }
  ];

  // Authentication check
  useEffect(() => {
    const authCheck = async () => {
      const email = await checkAuth((err) => {
        console.error("❌ Not authenticated:", err);
        navigate("/");
      });
      if (!email) return;
    };

    authCheck();
  }, [navigate]);

  // Handle add to cart from dashboard
  const handleAddToCart = (product) => {
    // Create cart item
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: product.id.includes('cat') ? "Standard" : "15 lb", // Default size
      quantity: 1,
      type: "single",
      image: product.icon
    };
    
    // Add to cart
    addToCart(cartItem);
    
    // Show notification
    setNotification(`${product.name} added to cart!`);
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {notification}
        </div>
      )}
      
      {/* Welcome Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome back, Alex!</h2>
          <p className="text-gray-600">Here's what's happening with your pet food deliveries.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          <i className="fas fa-plus mr-2"></i> New Order
        </button>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Next Delivery */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-5">
          <div className="flex items-center mb-3">
            <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
              <i className="fas fa-truck"></i>
            </div>
            <h3 className="font-semibold text-gray-800">Next Delivery</h3>
          </div>
          <p className="text-2xl font-bold mb-1">Oct 12, 2023</p>
          <p className="text-gray-600 text-sm mb-2">Premium Dog Food (Large Bag)</p>
          <a href="#" className="text-sm text-blue-600 hover:underline">Modify Order</a>
        </div>

        {/* Subscriptions */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-5">
          <div className="flex items-center mb-3">
            <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
              <i className="fas fa-sync"></i>
            </div>
            <h3 className="font-semibold text-gray-800">Active Subscriptions</h3>
          </div>
          <p className="text-2xl font-bold mb-1">2 Active</p>
          <p className="text-gray-600 text-sm mb-2">Dog Food (monthly), Cat Treats (bi-weekly)</p>
          <a href="#" className="text-sm text-blue-600 hover:underline">Manage Subscriptions</a>
        </div>

        {/* Pet Profiles */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-5">
          <div className="flex items-center mb-3">
            <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-3">
              <i className="fas fa-dog"></i>
            </div>
            <h3 className="font-semibold text-gray-800">Pet Profiles</h3>
          </div>
          <p className="text-2xl font-bold mb-1">2 Pets</p>
          <p className="text-gray-600 text-sm mb-2">Max (Dog), Whiskers (Cat)</p>
          <a href="#" className="text-sm text-blue-600 hover:underline">Update Pet Info</a>
        </div>
      </div>

      {/* Recommended For Your Pets */}
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-4">Recommended For Your Pets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-700 text-left">
              <tr>
                <th className="px-6 py-3 font-semibold">Order ID</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Product</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-gray-800">#10023</td>
                <td className="px-6 py-4 text-gray-500">Sep 28, 2023</td>
                <td className="px-6 py-4 text-gray-800">Premium Dog Food</td>
                <td className="px-6 py-4 text-green-600 font-semibold">Delivered</td>
                <td className="px-6 py-4 text-gray-800">$24.99</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-800">#10022</td>
                <td className="px-6 py-4 text-gray-500">Sep 14, 2023</td>
                <td className="px-6 py-4 text-gray-800">Organic Cat Treats</td>
                <td className="px-6 py-4 text-yellow-600 font-semibold">In Transit</td>
                <td className="px-6 py-4 text-gray-800">$9.99</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-800">#10021</td>
                <td className="px-6 py-4 text-gray-500">Sep 01, 2023</td>
                <td className="px-6 py-4 text-gray-800">Dog Chew Bones</td>
                <td className="px-6 py-4 text-red-600 font-semibold">Cancelled</td>
                <td className="px-6 py-4 text-gray-800">$15.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;