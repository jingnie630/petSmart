import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import checkAuth from "../../Auth";
import { useCart } from "../../context/CartContext";

const Product = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Product state
  const [selectedSize, setSelectedSize] = useState("15 lb");
  const [quantity, setQuantity] = useState(1);
  const [subscriptionFrequency, setSubscriptionFrequency] = useState("4 weeks");
  const [addingToCart, setAddingToCart] = useState(false);
  const [notification, setNotification] = useState(null);

  // Current product info (in a real app, this would come from an API)
  const product = {
    id: "premium-dog-food",
    name: "Premium Dog Food - Natural Recipe",
    description: "Our premium dog food is made with all-natural ingredients and formulated to support your dog's overall health and well-being. Perfect for adult dogs of all breeds.",
    price: 24.99,
    image: "dog-food"  // This would be a real image path in production
  };

  // Calculate price based on size
  const getPriceForSize = (size) => {
    switch (size) {
      case "5 lb": return 14.99;
      case "15 lb": return 24.99;
      case "30 lb": return 39.99;
      default: return 24.99;
    }
  };

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

  // Handle quantity change
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart (single purchase)
  const handleAddToCart = () => {
    setAddingToCart(true);
    
    // Create cart item
    const cartItem = {
      id: product.id,
      name: product.name,
      price: getPriceForSize(selectedSize),
      size: selectedSize,
      quantity: quantity,
      type: "single",
      image: product.image
    };
    
    // Add to cart
    addToCart(cartItem);
    
    // Show notification
    setNotification("Product added to cart!");
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
      setAddingToCart(false);
    }, 3000);
  };

  // Handle subscribe & save
  const handleSubscribe = () => {
    setAddingToCart(true);
    
    // Create subscription item
    const subscriptionItem = {
      id: product.id,
      name: product.name,
      price: getPriceForSize(selectedSize),
      size: selectedSize,
      quantity: quantity,
      type: "subscription",
      frequency: subscriptionFrequency,
      image: product.image
    };
    
    // Add to cart
    addToCart(subscriptionItem);
    
    // Show notification
    setNotification("Subscription added to cart!");
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
      setAddingToCart(false);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4">
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {notification}
        </div>
      )}
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <a href="#" className="hover:text-indigo-600">Products</a>
        <span className="mx-2">/</span>
        <a href="#" className="hover:text-indigo-600">Dog Food</a>
        <span className="mx-2">/</span>
        <span className="text-gray-700">Premium Dog Food - Natural Recipe</span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left: Product Image & Thumbs */}
        <div className="w-full md:w-2/5 mb-6 md:mb-0">
          <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center">
            <i className="fas fa-bone text-gray-300 text-7xl"></i>
          </div>
          <div className="flex mt-4 space-x-2">
            <div className="w-16 h-16 bg-gray-100 rounded border border-gray-300 flex items-center justify-center">
              <i className="fas fa-bone text-gray-400 text-xl"></i>
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded border border-gray-300 flex items-center justify-center">
              <i className="fas fa-box text-gray-400 text-xl"></i>
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded border border-gray-300 flex items-center justify-center">
              <i className="fas fa-tag text-gray-400 text-xl"></i>
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-3/5 md:pl-8">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-800">
              {product.name}
            </h2>
            <div className="flex items-center">
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star-half-alt text-yellow-400"></i>
              <span className="ml-1 text-sm text-gray-600">(128)</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-800">${getPriceForSize(selectedSize)}</p>
            <p className="text-sm text-green-600 mt-1">
              Free shipping on all subscription orders
            </p>
          </div>

          <div className="mt-6 text-gray-600">
            {product.description}
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">Key Benefits:</h3>
            <ul className="space-y-1">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span className="text-gray-600">High-quality protein for muscle development</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span className="text-gray-600">Essential vitamins and minerals</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span className="text-gray-600">No artificial colors, flavors, or preservatives</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span className="text-gray-600">Promotes healthy skin and coat</span>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">Select Size:</h3>
            <div className="flex space-x-3">
              <button 
                className={`px-4 py-2 border ${selectedSize === "5 lb" ? 'border-2 border-indigo-600 bg-indigo-50 text-indigo-700 font-medium' : 'border-gray-300 text-gray-700'} rounded-md text-sm`}
                onClick={() => setSelectedSize("5 lb")}
              >
                5 lb
              </button>
              <button 
                className={`px-4 py-2 border ${selectedSize === "15 lb" ? 'border-2 border-indigo-600 bg-indigo-50 text-indigo-700 font-medium' : 'border-gray-300 text-gray-700'} rounded-md text-sm`}
                onClick={() => setSelectedSize("15 lb")}
              >
                15 lb
              </button>
              <button 
                className={`px-4 py-2 border ${selectedSize === "30 lb" ? 'border-2 border-indigo-600 bg-indigo-50 text-indigo-700 font-medium' : 'border-gray-300 text-gray-700'} rounded-md text-sm`}
                onClick={() => setSelectedSize("30 lb")}
              >
                30 lb
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">Quantity:</h3>
            <div className="flex items-center">
              <button 
                className="px-3 py-1 border border-gray-300 rounded-l-md"
                onClick={() => handleQuantityChange(-1)}
              >
                <i className="fas fa-minus text-gray-500"></i>
              </button>
              <input 
                type="text" 
                value={quantity} 
                className="w-12 py-1 text-center border-t border-b border-gray-300" 
                readOnly 
              />
              <button 
                className="px-3 py-1 border border-gray-300 rounded-r-md"
                onClick={() => handleQuantityChange(1)}
              >
                <i className="fas fa-plus text-gray-500"></i>
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button 
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center"
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              {addingToCart ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              ) : (
                <i className="fas fa-cart-plus mr-2"></i>
              )}
              Add to Cart
            </button>
            <button 
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 flex items-center justify-center"
              onClick={handleSubscribe}
              disabled={addingToCart}
            >
              {addingToCart ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              ) : (
                <i className="fas fa-sync mr-2"></i>
              )}
              Subscribe & Save 10%
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Subscription Details:</h4>
            <p className="text-sm text-gray-600">
              Subscribe and get this product delivered automatically on your schedule.
              You can pause, skip, or cancel anytime.
            </p>
            <div className="mt-3">
              <select 
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                value={subscriptionFrequency}
                onChange={(e) => setSubscriptionFrequency(e.target.value)}
              >
                <option value="2 weeks">Deliver every 2 weeks</option>
                <option value="4 weeks">Deliver every 4 weeks</option>
                <option value="6 weeks">Deliver every 6 weeks</option>
                <option value="8 weeks">Deliver every 8 weeks</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;