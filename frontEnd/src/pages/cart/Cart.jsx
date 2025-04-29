import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import checkAuth from "../../Auth";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, item.size, item.type, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4 p-4">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded flex items-center justify-center mr-4 mb-4 sm:mb-0">
          {item.id.includes('dog') ? (
            <i className="fas fa-bone text-gray-400 text-2xl"></i>
          ) : item.id.includes('cat') ? (
            <i className="fas fa-fish text-gray-400 text-2xl"></i>
          ) : (
            <i className="fas fa-paw text-gray-400 text-2xl"></i>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between">
            <h3 className="font-bold text-gray-800">{item.name}</h3>
            <button 
              className="text-gray-400 hover:text-red-500"
              onClick={() => onRemove(item.id, item.size, item.type)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {item.size}, {item.type === 'subscription' ? `Subscription (${item.frequency})` : 'Single Purchase'}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button 
                className="px-2 py-1 border border-gray-300 rounded-l-md text-gray-500"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <input 
                type="text" 
                value={item.quantity} 
                className="w-10 py-1 px-2 text-center border-t border-b border-gray-300" 
                readOnly 
              />
              <button 
                className="px-2 py-1 border border-gray-300 rounded-r-md text-gray-500"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
            <div>
              <p className="font-bold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              {item.type === 'subscription' && (
                <p className="text-xs text-green-600">Save 10% with subscription</p>
              )}
            </div>
          </div>
          {item.type === 'single' && (
            <div className="mt-2">
              <a href="#" className="text-indigo-600 text-sm hover:underline">
                <i className="fas fa-sync-alt mr-1"></i> Convert to subscription
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, calculateTotals } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [cartTotals, setCartTotals] = useState({ 
    subtotal: 0, 
    subscriptionSavings: 0, 
    tax: 0, 
    shipping: 0, 
    total: 0,
    itemCount: 0 
  });

  // Recalculate totals when cart changes
  useEffect(() => {
    setCartTotals(calculateTotals());
  }, [cart, calculateTotals]);

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

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Your Cart ({cartTotals.itemCount} {cartTotals.itemCount === 1 ? 'item' : 'items'})
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <i className="fas fa-shopping-cart text-gray-400 text-3xl"></i>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-3">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/dashboard" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            {cart.map((item, index) => (
              <CartItem 
                key={`${item.id}-${item.size}-${item.type}-${index}`}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}

            {/* Actions */}
            <div className="flex justify-between items-center mb-6">
              <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800">
                <i className="fas fa-arrow-left mr-1"></i> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({cartTotals.itemCount} {cartTotals.itemCount === 1 ? 'item' : 'items'})
                  </span>
                  <span className="text-gray-800">${cartTotals.subtotal.toFixed(2)}</span>
                </div>
                {cartTotals.subscriptionSavings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscription Savings</span>
                    <span className="text-green-600">-${cartTotals.subscriptionSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800">
                    {cartTotals.shipping === 0 ? 'Free' : `$${cartTotals.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800">${cartTotals.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-gray-800">${cartTotals.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Promo Code</label>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300">
                    Apply
                  </button>
                </div>
              </div>

              <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-200 mb-3">
                Proceed to Checkout
              </button>

              <div className="text-xs text-gray-500 text-center">
                By checking out, you agree to our{" "}
                <a href="#" className="text-indigo-600 hover:underline">Terms</a> and acknowledge our{" "}
                <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;