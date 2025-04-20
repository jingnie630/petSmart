import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkAuth from "../../Auth";

const Cart = () => {

    const navigate = useNavigate();

    useEffect(() => {
  
      const authCheck = async () => {
        const email = await checkAuth((err) => {
          console.error("❌ Not authenticated:", err);
          navigate("/");
        });
        if (!email) return;
      };
  
      authCheck();
    }, []);

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart (3 items)</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          {/* Cart Item 1 */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4 p-4">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-24 h-24 bg-gray-100 rounded flex items-center justify-center mr-4 mb-4 sm:mb-0">
                <i className="fas fa-bone text-gray-400 text-2xl"></i>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">Premium Dog Food - Natural Recipe</h3>
                  <button className="text-gray-400 hover:text-red-500">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">15 lb bag, Single Purchase</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <button className="px-2 py-1 border border-gray-300 rounded-l-md text-gray-500">-</button>
                    <input type="text" value="1" className="w-10 py-1 px-2 text-center border-t border-b border-gray-300" readOnly />
                    <button className="px-2 py-1 border border-gray-300 rounded-r-md text-gray-500">+</button>
                  </div>
                  <p className="font-bold text-gray-800">$24.99</p>
                </div>
                <div className="mt-2">
                  <a href="#" className="text-indigo-600 text-sm hover:underline">
                    <i className="fas fa-sync-alt mr-1"></i> Convert to subscription
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Repeat Cart Items */}
          {/* Example: Item 2 - Cat Food */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4 p-4">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-24 h-24 bg-gray-100 rounded flex items-center justify-center mr-4 mb-4 sm:mb-0">
                <i className="fas fa-fish text-gray-400 text-2xl"></i>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">Cat Food - Salmon Recipe</h3>
                  <button className="text-gray-400 hover:text-red-500">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">7 lb bag, Monthly Subscription</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <button className="px-2 py-1 border border-gray-300 rounded-l-md text-gray-500">-</button>
                    <input type="text" value="1" className="w-10 py-1 px-2 text-center border-t border-b border-gray-300" readOnly />
                    <button className="px-2 py-1 border border-gray-300 rounded-r-md text-gray-500">+</button>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">$17.99</p>
                    <p className="text-xs text-green-600">Save 10% with subscription</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Example: Item 3 - Cat Dental Treats */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6 p-4">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-24 h-24 bg-gray-100 rounded flex items-center justify-center mr-4 mb-4 sm:mb-0">
                <i className="fas fa-paw text-gray-400 text-2xl"></i>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">Cat Dental Treats</h3>
                  <button className="text-gray-400 hover:text-red-500">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">2-pack, Single Purchase</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <button className="px-2 py-1 border border-gray-300 rounded-l-md text-gray-500">-</button>
                    <input type="text" value="2" className="w-10 py-1 px-2 text-center border-t border-b border-gray-300" readOnly />
                    <button className="px-2 py-1 border border-gray-300 rounded-r-md text-gray-500">+</button>
                  </div>
                  <p className="font-bold text-gray-800">$9.99 × 2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <a href="#" className="text-indigo-600 hover:text-indigo-800">
              <i className="fas fa-arrow-left mr-1"></i> Continue Shopping
            </a>
            <button className="text-gray-600 hover:text-gray-800">
              <i className="fas fa-sync-alt mr-1"></i> Update Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal (3 items)</span>
                <span className="text-gray-800">$62.96</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subscription Savings</span>
                <span className="text-green-600">-$2.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-800">$5.10</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-gray-800">$66.06</span>
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
    </div>
  );
};

export default Cart;
