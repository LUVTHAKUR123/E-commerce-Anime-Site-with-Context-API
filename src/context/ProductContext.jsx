// Import necessary hooks from React
import React, { createContext, useEffect, useState } from "react";

// Create a context to manage and share product/cart state across components
export const ProductContext = createContext();

// Main provider component that wraps around the app
function ProductProvider({ children }) {
  // ====================
  // Global App States
  // ====================

  // Anime data fetched from API (used on home page)
  const [data, setData] = React.useState();

  // Loading state to indicate if data is being fetched
  const [loading, setLoading] = useState(true);

  // Cart state to store selected anime items
  const [cart, setCart] = useState([]);

  // =========================
  // Cart Functionality
  // =========================

  /**
   * Add item to cart
   * - If item already exists, increment quantity
   * - If new, add with quantity = 1
   */
  const handleAddToCart = (newItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.mal_id === newItem.mal_id // match by unique anime ID
      );

      if (existingIndex !== -1) {
        // If item exists, increase quantity
        return prevCart.map((item, i) =>
          i === existingIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // If not in cart, add item with quantity = 1
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });
  };

  /**
   * Decrease quantity of item in cart
   * - Prevents quantity from going below 1
   */
  const handleDecrease = (index) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  /**
   * Increase quantity of item in cart
   */
  const handleIncrease = (index) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  /**
   * Remove item from cart based on index
   */
  const handleDelete = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // =========================
  // Provide Context to App
  // =========================
  return (
    <>
      <ProductContext.Provider
        value={{
          data,    
          cart,         
          setCart,        
          setData,    
          loading,       
          setLoading,     
          handleIncrease, 
          handleDecrease, 
          handleAddToCart,
          handleDelete,   
        }}
      >
        {children} {/* Wrap the entire app or component tree */}
      </ProductContext.Provider>
    </>
  );
}

// Export the provider to be used in App.jsx or index.js
export default ProductProvider;
