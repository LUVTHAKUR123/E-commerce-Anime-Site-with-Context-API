// Importing React and necessary hooks
import React, { useContext, useEffect, useState } from "react";
// React Router hook to access route parameters
import { useParams } from "react-router-dom";
// MUI components for UI structure and styling
import {
  CircularProgress,
  Typography,
  Card,
  Box,
  Button,
} from "@mui/material";
// Axios for API requests
import axios from "axios";
// Importing ProductContext to handle cart operations
import { ProductContext } from "../context/ProductContext";

// Main functional component
const ProductDetails = () => {
  // Destructure the `id` param from the URL
  const { id } = useParams();

  // State to hold the anime (product) details
  const [product, setProduct] = useState(null);

  // Loading state to show spinner while fetching data
  const [loading, setLoading] = useState(true);

  // Access add-to-cart handler from context
  const { handleAddToCart } = useContext(ProductContext);

  // Fetch anime details when component mounts or `id` changes
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        // Make GET request to Jikan API for anime by ID
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}`
        );
        // Store fetched product data
        setProduct(response.data.data);
        // Turn off loading
        setLoading(false);
      } catch (error) {
        console.log("error fetching anime :", error);
        setLoading(false); // Still stop loading on error
      }
    };
    fetchAnime(); // Invoke fetch
  }, [id]);

  // Reusable style for info fields
  const infoStyle = {
    fontSize: 20,
    fontFamily: "cursive",
    display: "flex",
    justifyContent: "space-between",
    gap: 1,
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return <CircularProgress color="neutral" />;
  }

  // Show fallback message if no product is found
  if (!product) {
    return <Typography variant="h6">No product found :(</Typography>;
  }

  // Render product details
  return (
    <>
      {/* Title */}
      <Typography variant="h3" sx={{ fontFamily: "cursive", padding: 2 }}>
        Card Details:
      </Typography>

      {/* Main Card Container */}
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: 4,
          p: 3,
          alignItems: "flex-start",
          width: "50%",
          margin: "0 auto",
          boxShadow: "0px 0px 16px 0px #6683d2ab", 
        }}
      >
        {/* Anime Poster Image */}
        <Box
          component="img"
          src={product.images?.jpg?.image_url} 
          alt={product.title}
          sx={{
            width: 300,
            height: 500,
            borderRadius: 2,
            objectFit: "cover", 
          }}
        />

        {/* Content Area */}
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
            {product?.title}
          </Typography>

          {/* Score */}
          <Typography
            sx={{ fontSize: 30, marginTop: 2.5, fontFamily: "cursive" }}
          >
            Score: {product.score}
          </Typography>

          {/* Rank */}
          <Typography sx={infoStyle}>
            Rank# <span>{product.rank}</span>
          </Typography>

          {/* Popularity */}
          <Typography sx={infoStyle}>
            Popularity# <span>{product.popularity}</span>
          </Typography>

          {/* Members */}
          <Typography sx={infoStyle}>
            Members: <span>{product.members}</span>
          </Typography>

          {/* Airing Status */}
          <Typography sx={infoStyle}>
            Airing: <span>{product.airing ? "Yes" : "No"}</span>
          </Typography>

          {/* Studio (handles missing studios array gracefully) */}
          <Typography sx={infoStyle}>
            Studio: <span>{product.studios?.[0]?.name || "N/A"}</span>
          </Typography>

          {/* Episode Count */}
          <Typography sx={infoStyle}>
            Episodes: <span>{product.episodes}</span>
          </Typography>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            sx={{
              mt: 1,
              fontFamily: "cursive",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
            onClick={() => handleAddToCart(product)} // Add product to cart
          >
            ADD TO CART
          </Button>
        </Box>
      </Card>
    </>
  );
};


export default ProductDetails;
