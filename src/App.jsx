import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CombineContext from "./context/CombineContext";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import CardDetails from "./pages/CardDetails";
import CartLists from "./components/CartLists";
import ProductDetails from "./pages/ProductDetails";
function App() {
  return (
    <>
      <BrowserRouter>
        <CombineContext>
          <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
            {" "}
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cardDetails" element={<CardDetails />} />
            <Route
              path="/cartContextDetails"
              element={<CartLists />}
            />
            <Route path="/products/:id" element={<ProductDetails />} />

          </Routes>
        </CombineContext>
      </BrowserRouter>
    </>
  );
}

export default App;
