import React, { useState, useContext } from "react";
import axios from "axios";
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
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate, Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState([]);
  const { cart } = useContext(ProductContext);
  const navigate = useNavigate();

  const searchProductHandler = async (value) => {
    if (!value.trim()) {
      setUserData([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${value}&order_by=title&sort=asc&limit=10`
      );
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchProductHandler(value);
  };

  const handleResultClick = () => {
    setSearchTerm("");
    setUserData([]); 
  };

  const openCartDetails = () => {
    navigate("/cartContextDetails");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#14395fff" }}>
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "cursive", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            ANIME
          </Typography>

          <div
            style={{
              position: "relative",
              width: "250px",
              paddingRight: 20,
              margin: 10,
            }}
          >

            <SearchIcon
              sx={{
                position: "absolute",
                left:15,
                top: "54%",
                transform: "translateY(-50%)",
                color: "grey",
                zIndex:1,
               pointerEvents: "none", 
              }}
            />

            {/* Search Input */}
            <TextField
              variant="outlined"
              type="text"
              placeholder="Search…"
              value={searchTerm}
              onChange={handleChange}
              fullWidth
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": {
                  paddingLeft: "40px",
                  backgroundColor :"white"
                },
              }}
            />

            {/* Dropdown */}
            {searchTerm && userData.length > 0 && (
              <List
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  bgcolor: "background.paper",

                  boxShadow: 3,
                  borderRadius: 1,
                  width: "100%",
                  zIndex: 10,
                  mt: 1, 
                }}
              >
                {userData.map((value, index) => (
                  <ListItem
                    key={index}
                    onClick={handleResultClick}
                    component={Link}
                    to={`/products/${value.mal_id}`}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { bgcolor: "action.hover" }, 
                    }}
                  >
                    <ListItemText primary={value.title} />
                  </ListItem>
                ))}
              </List>
            )}
          </div>

          {/* Cart */}
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show cart items"
              color="inherit"
              onClick={openCartDetails}
            >
              <Badge
                badgeContent={cart.reduce(
                  (sum, item) => sum + (item.quantity || 1),
                  0
                )}
                color="error"
              >
                <ShoppingCartIcon sx={{fontSize:35}} />
              </Badge>
            </IconButton>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
