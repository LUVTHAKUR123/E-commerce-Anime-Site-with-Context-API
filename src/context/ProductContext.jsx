import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();
function ProductProvider({ children }) {
  const [data, setData] = React.useState();
  const [loading, setLoading] = useState(true);

  //cart counter state
  const [cart, setCart] = useState([]);
  const handleAddToCart = (newItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.mal_id === newItem.mal_id
      );

      if (existingIndex !== -1) {
        // if exists → update quantity
        return prevCart.map((item, i) =>
          i === existingIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });
  };

  //counter state
  // const [count,setCount]  = React.useState(0);
  const handleDecrease = (index) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const handleIncrease = (index) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  //removing the item
  const handleDelete = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <ProductContext.Provider
        value={{
          data,
          cart,
          setData,
          loading,
          setLoading,
          handleIncrease,
          handleDecrease,
          handleAddToCart,
          handleDelete,
        }}
      >
        {children}
      </ProductContext.Provider>
    </>
  );
}

export default ProductProvider;
