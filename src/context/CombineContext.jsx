import React from "react";
import ProductProvider from "./ProductContext";


function CombineContext({ children }) {
  return (
    <>
      <ProductProvider>{children}</ProductProvider>
    </>
  );
}

export default CombineContext;
export { ProductContext } from "./ProductContext";
