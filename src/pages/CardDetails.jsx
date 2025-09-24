// Importing necessary components and hooks
import { Button, Card, Box, Typography } from "@mui/material"; // MUI UI components
import React, { useContext } from "react"; // React core and context hook
import { useLocation } from "react-router-dom"; // Hook to access route state
import { ProductContext } from "../context/ProductContext"; // Cart and data context

// Main component definition
function CardDetails() {
  // Get passed state (anime item) from the navigation
  const location = useLocation();
  const item = location.state; // This should be the anime object passed via navigation

  // Access add-to-cart handler from context
  const { handleAddToCart } = useContext(ProductContext);

  // If item isn't passed or is missing, show fallback UI
  if (!item) {
    return <Typography>No data found!</Typography>;
  }

  // Log item to console for debugging
  console.log("items", item);

  // Common style object for typography rows
  const infoStyle = {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
    paddingBottom: 1,
    paddingTop: 0.5,
    fontWeight: 600,
    fontFamily: "cursive",
    fontSize: 18,
    color: "#333",
  };

  // JSX rendering of the detailed card
  return (
    <div>
      {/* Page Title */}
      <Typography variant="h3" sx={{ fontFamily: "cursive", padding: 2 }}>
        Card Details:
      </Typography>

      {/* Main Card container */}
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: 4,
          padding: 3,
          alignItems: "flex-start",
          width: "50%",
          margin: "0 auto",
          boxShadow: "0px 0px 16px 0px #6683d2ab", // Box shadow effect
        }}
      >
        {/* Anime Image */}
        <Box
          component="img"
          src={item.images?.jpg?.image_url} 
          alt={item.title}
          sx={{
            width: 300,
            height: 500,
            borderRadius: 2,
            objectFit: "cover", 
          }}
        />

        {/* Right section with details */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            fontWeight: "600",
          }}
        >
          {/* Title */}
          <Typography
            sx={{
              fontSize: 40,
              fontWeight: 600,
              fontFamily: "cursive",
              lineHeight: 1.2,
            }}
          >
            {item?.title}
          </Typography>

          {/* Score */}
          <Typography
            sx={{ fontSize: 30, marginTop: 2.5, fontFamily: "cursive" }}
          >
            Score: {item.score}
          </Typography>

          {/* Rank */}
          <Typography sx={infoStyle}>
            Rank# <span>{item.rank}</span>
          </Typography>

          {/* Popularity */}
          <Typography sx={infoStyle}>
            Popularity# <span>{item.popularity}</span>
          </Typography>

          {/* Members count */}
          <Typography sx={infoStyle}>
            Members: <span>{item.members}</span>
          </Typography>

          {/* Airing status */}
          <Typography sx={infoStyle}>
            Airing: <span>{item.airing ? "Yes" : "No"}</span>
          </Typography>

          {/* Studio name (note: might be undefined if passed from `Home` component) */}
          <Typography sx={infoStyle}>
            Studio: <span>{item.studio}</span>
          </Typography>

          {/* Episodes */}
          <Typography sx={infoStyle}>
            Episodes: <span>{item.episodes}</span>
          </Typography>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            sx={{
              marginTop: 1,
              fontFamily: "cursive",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
            onClick={() => handleAddToCart(item)} // Trigger add to cart function
          >
            ADD TO CART
          </Button>
        </Box>
      </Card>
    </div>
  );
}


export default CardDetails;
