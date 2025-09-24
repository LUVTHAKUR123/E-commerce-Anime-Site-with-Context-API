// Importing React and necessary hooks
import React, { useState, useContext } from "react";

// Axios for making HTTP requests
import axios from "axios";

// MUI (Material UI) components for building the UI
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";

// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// React Router hooks and components
import { useNavigate, Link } from "react-router-dom";

// Importing ProductContext to access the cart
import { ProductContext } from "../context/ProductContext";

const JIKAN_API_URL = import.meta.env.VITE_JIKAN_API_URL;

// Functional component for the Navbar
function Navbar() {
  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // State for storing search results from API
  const [userData, setUserData] = useState([]);

  // Accessing the cart array from ProductContext
  const { cart } = useContext(ProductContext);

  // useNavigate hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Function to search products (anime) via API when user types
  const searchProductHandler = async (value) => {
    // If input is empty or whitespace, clear the results
    if (!value.trim()) {
      setUserData([]);
      return;
    }

    try {
      // Make GET request to Jikan API with search query
      const response = await axios.get(
        `${JIKAN_API_URL}?q=${value}&order_by=title&sort=asc&limit=10`
      );
      // Store search results in state
      setUserData(response.data.data);
    } catch (error) {
      // Log error if request fails
      console.error("Error fetching products:", error);
    }
  };

  // Handle input change in the search bar
  const handleChange = (e) => {
    const value = e.target.value;   // Get current input value
    setSearchTerm(value);           // Update local state
    searchProductHandler(value);    // Call function to fetch results
  };

  // Clear search results and input field when a search result is clicked
  const handleResultClick = () => {
    setSearchTerm("");     // Clear input
    setUserData([]);       // Clear results
  };

  // Navigate to the cart details page
  const openCartDetails = () => {
    navigate("/cartContextDetails");
  };


  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static" sx={{ bgcolor: "#14395fff" }}>
        <Toolbar>

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,            
              fontFamily: "cursive", 
              cursor: "pointer",     
            }}
            onClick={() => navigate("/")} // Navigate to homepage on click
          >
            ANIME
          </Typography>

          {/* Container for Search Input */}
          <Box sx={{ position: "relative", width: 250, pr: 2, m: 1 }}>
          
            <SearchIcon
              sx={{
                position: "absolute",
                left: 15,
                top: "50%",
                transform: "translateY(-50%)",
                color: "grey",
                zIndex: 1,
                pointerEvents: "none", // Prevents user interaction
              }}
            />

            {/* Search TextField input */}
            <TextField
              variant="outlined"
              placeholder="Search…"
              value={searchTerm}           // Controlled component
              onChange={handleChange}      // Updates on typing
              fullWidth
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": {
                  paddingLeft: "40px",     // Space for icon
                  bgcolor: "white",        // White background
                },
              }}
            />

            {/* Dropdown list of search results (shown only when searchTerm exists and userData has items) */}
            {searchTerm && userData.length > 0 && (
              <List
                sx={{
                  position: "absolute",      
                  top: "100%",
                  left: 0,
                  width: "100%",
                  mt: 1,
                  bgcolor: "background.paper",
                  background: "#000000b5", 
                  boxShadow: 3,
                  borderRadius: 1,
                  zIndex: 10,             
                }}
              >
                {/* Map through search results and display each as a list item */}
                {userData.map((value) => (
                  <ListItem
                    key={value.mal_id}               // Unique key
                    component={Link}                // Make list item a link
                    to={`/products/${value.mal_id}`} // Route to product details
                    onClick={handleResultClick}      // Clear search on click
                    sx={{
                      cursor: "pointer",
                      color: "white",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <ListItemText primary={value.title} /> 
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Shopping Cart Icon with Badge showing total quantity */}
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show cart items"
              color="inherit"
              onClick={openCartDetails} // Go to cart page on click
            >
              {/* Badge shows total quantity of items in cart */}
              <Badge
                badgeContent={cart.reduce(
                  (sum, item) => sum + (item.quantity || 1), // Sum quantities
                  0
                )}
                color="error" W
              >
                <ShoppingCartIcon sx={{ fontSize: 35 }} /> 
              </Badge>
            </IconButton>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default Navbar;
