import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import checkAuth from "../../Auth";
import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, calculateTotals, clearCart } = useCart();
  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    subscriptionSavings: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    itemCount: 0
  });
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    paymentMethod: "creditCard",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: ""
  });
  
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review, 4: Confirmation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // If cart is empty, redirect to cart page
  useEffect(() => {
    if (cart.length === 0 && step !== 4) {
      navigate("/cart");
    }
  }, [cart, navigate, step]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Go to next step
  const nextStep = () => {
    window.scrollTo(0, 0);
    setStep(prevStep => prevStep + 1);
  };

  // Go to previous step
  const prevStep = () => {
    window.scrollTo(0, 0);
    setStep(prevStep => prevStep - 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Simulate API call for order processing
    setTimeout(() => {
      setLoading(false);
      // Move to confirmation step
      setStep(4);
      // Clear the cart
      clearCart();
    }, 2000);
  };

  // Shipping Information Form (Step 1)
  const renderShippingForm = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="USA">United States</option>
              <option value="CAN">Canada</option>
              <option value="MEX">Mexico</option>
            </select>
          </div>
          <div className="pt-4 flex justify-between">
            <Link to="/cart" className="text-indigo-600 hover:text-indigo-800">
              <i className="fas fa-arrow-left mr-1"></i> Back to Cart
            </Link>
            <button
              type="button"
              onClick={nextStep}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Payment Information Form (Step 2)
  const renderPaymentForm = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Payment Information</h2>
        <form className="space-y-4">
          <div>
            <p className="font-medium mb-2">Payment Method</p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={formData.paymentMethod === "creditCard"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <i className="far fa-credit-card mr-2"></i> Credit Card
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <i className="fab fa-paypal mr-2"></i> PayPal
              </label>
            </div>
          </div>

          {formData.paymentMethod === "creditCard" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    name="cardCVV"
                    value={formData.cardCVV}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {formData.paymentMethod === "paypal" && (
            <div className="p-4 bg-blue-50 rounded-md">
              <p className="text-center">
                You will be redirected to PayPal to complete your payment after reviewing your order.
              </p>
            </div>
          )}

          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <i className="fas fa-arrow-left mr-1"></i> Back to Shipping
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            >
              Review Order
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Order Review (Step 3)
  const renderOrderReview = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Review Your Order</h2>
        
        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="font-medium text-lg mb-3">Items in Order</h3>
          <div className="space-y-3">
            {cart.map((item, index) => (
              <div key={`${item.id}-${item.size}-${item.type}-${index}`} className="flex justify-between pb-2 border-b border-gray-200">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.size}, {item.type === 'subscription' ? `Subscription (${item.frequency})` : 'Single Purchase'}
                  </p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Shipping Information */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-lg">Shipping Information</h3>
            <button 
              onClick={() => setStep(1)} 
              className="text-indigo-600 text-sm hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="text-sm">
            <p>
              {formData.firstName} {formData.lastName}
            </p>
            <p>{formData.address}</p>
            <p>
              {formData.city}, {formData.state} {formData.zipCode}
            </p>
            <p>{formData.country}</p>
            <p>{formData.email}</p>
          </div>
        </div>
        
        {/* Payment Information */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-lg">Payment Information</h3>
            <button 
              onClick={() => setStep(2)} 
              className="text-indigo-600 text-sm hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="text-sm">
            {formData.paymentMethod === "creditCard" ? (
              <p>
                Credit Card ending in {formData.cardNumber.slice(-4)} 
                {formData.cardExpiry && ` (Expires: ${formData.cardExpiry})`}
              </p>
            ) : (
              <p>PayPal</p>
            )}
          </div>
        </div>
        
        {/* Order Total */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Subtotal ({cartTotals.itemCount} items):</span>
            <span>${cartTotals.subtotal.toFixed(2)}</span>
          </div>
          {cartTotals.subscriptionSavings > 0 && (
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Subscription Savings:</span>
              <span className="text-green-600">-${cartTotals.subscriptionSavings.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Shipping:</span>
            <span>{cartTotals.shipping === 0 ? 'Free' : `$${cartTotals.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Tax:</span>
            <span>${cartTotals.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total:</span>
            <span>${cartTotals.total.toFixed(2)}</span>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <i className="fas fa-arrow-left mr-1"></i> Back to Payment
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </div>
    );
  };

  // Order Confirmation (Step 4)
  const renderConfirmation = () => {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <i className="fas fa-check text-green-600 text-2xl"></i>
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We've received your order and will begin processing it right away.
        </p>
        <p className="font-medium mb-2">Order Number: #{Math.floor(Math.random() * 10000).toString().padStart(5, '0')}</p>
        <p className="text-gray-600 mb-8">
          A confirmation email has been sent to {formData.email}
        </p>
        
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 mx-auto max-w-xs"
          >
            Return to Dashboard
          </Link>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-indigo-600 hover:underline"
          >
            View Order Status
          </button>
        </div>
      </div>
    );
  };

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return renderShippingForm();
      case 2:
        return renderPaymentForm();
      case 3:
        return renderOrderReview();
      case 4:
        return renderConfirmation();
      default:
        return renderShippingForm();
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 px-4 mb-16">
      {/* Progress Bar (only show for steps 1-3) */}
      {step < 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className={`flex-1 text-center font-medium ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              Shipping
            </div>
            <div className={`flex-1 text-center font-medium ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
              Payment
            </div>
            <div className={`flex-1 text-center font-medium ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
              Review
            </div>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-indigo-600 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {renderStep()}
      </div>
    </div>
  );
};

export default Checkout;