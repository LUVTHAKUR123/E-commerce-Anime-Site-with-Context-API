import React, { use } from "react";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";

// import { CartCountContext } from '../context/CartCountContext'; //cart context
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
function Navbar() {
  // cart item count
  const { cart } = useContext(ProductContext);
  const navigate = useNavigate();
  const openCartDetails = () => {
    navigate("/cartContextDetails");
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#14395fff" }}>
          <Toolbar>
            <img src="https://i.pinimg.com/736x/8c/f9/90/8cf9902426510fed3ba3b6d5cb11971f.jpg" style={{height:"40px",width:"40px",borderRadius:"50%" ,marginRight:"13px"}}/>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block", fontFamily:"cursive" } }}
              onClick={() => navigate("/")}
            >
              ANIME
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => openCartDetails()}
              >
                <Badge
                  badgeContent={cart.reduce(
                    (sum, item) => sum + (item.quantity || 1),
                    0
                  )}
                  color="error"
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </MenuItem>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
