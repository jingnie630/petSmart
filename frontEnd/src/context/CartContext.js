import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the cart context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Cart provider component
export const CartProvider = ({ children }) => {
  // Initialize cart state from localStorage if available
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('smartPetCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('smartPetCart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (item) => {
    setCart(currentCart => {
      // Check if item already exists in cart
      const existingItemIndex = currentCart.findIndex(
        cartItem => cartItem.id === item.id && 
                   cartItem.size === item.size && 
                   cartItem.type === item.type
      );
      
      if (existingItemIndex >= 0) {
        // If item exists, update quantity
        const updatedCart = [...currentCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + (item.quantity || 1)
        };
        return updatedCart;
      } else {
        // If item doesn't exist, add it
        return [...currentCart, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId, size, type) => {
    setCart(currentCart => 
      currentCart.filter(item => 
        !(item.id === itemId && item.size === size && item.type === type)
      )
    );
  };

  // Update item quantity
  const updateQuantity = (itemId, size, type, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(currentCart => 
      currentCart.map(item => 
        (item.id === itemId && item.size === size && item.type === type)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart totals
  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Calculate subscription savings
    const subscriptionSavings = cart.reduce((sum, item) => {
      if (item.type === 'subscription') {
        return sum + (item.price * item.quantity * 0.1); // 10% discount on subscriptions
      }
      return sum;
    }, 0);
    
    // Assuming tax rate of 8.5%
    const tax = (subtotal - subscriptionSavings) * 0.085;
    
    // Free shipping
    const shipping = 0;
    
    const total = subtotal - subscriptionSavings + tax + shipping;
    
    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      subscriptionSavings: parseFloat(subscriptionSavings.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      shipping,
      total: parseFloat(total.toFixed(2)),
      itemCount: cart.reduce((count, item) => count + item.quantity, 0)
    };
  };

  // Value to be provided by the context
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotals
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;