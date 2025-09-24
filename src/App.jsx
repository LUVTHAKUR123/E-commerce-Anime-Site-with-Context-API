// Import core modules
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// Import combined context and pages/components
import CombineContext from "./context/CombineContext";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import CardDetails from "./pages/CardDetails";
import CartLists from "./components/CartLists";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <>
      {/* Set up React Router for client-side routing */}
      <BrowserRouter>
        {/* CombineContext wraps the app in necessary context providers */}
        <CombineContext>
          {/* Sticky Navbar at the top */}
          <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <Navbar />
          </div>

          {/* Define all available routes in the application */}
          <Routes>
            {/* Home Route → Anime listing page */}
            <Route path="/" element={<Home />} />

            {/* Card Details Route → Detailed view from state passed via navigation */}
            <Route path="/cardDetails" element={<CardDetails />} />

            {/* Cart Context Details Route → Items added to cart */}
            <Route path="/cartContextDetails" element={<CartLists />} />

            {/* Product Details by ID Route → Fetched via API using dynamic param */}
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </CombineContext>
      </BrowserRouter>
    </>
  );
}

export default App;
