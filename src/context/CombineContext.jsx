import React from "react";
import ProductProvider from "./ProductContext";

//  * This component acts as a wrapper to combine and provide multiple context providers.
function CombineContext({ children }) {
  return (
    <>
      <ProductProvider>{children}</ProductProvider>
    </>
  );
}

export default CombineContext;
//  Re-export the context itself for use in components
export { ProductContext } from "./ProductContext";
