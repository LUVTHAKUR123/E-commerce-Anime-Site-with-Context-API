import React, {  createContext, useEffect } from "react";

export const ProductContext = createContext();
function ProductProvider({ children }) {
  const [data, setData] = React.useState();

  return (
    <>
      <ProductContext.Provider value={{data ,setData}}>{children}</ProductContext.Provider>
    </>
  );
}

export default ProductProvider;
