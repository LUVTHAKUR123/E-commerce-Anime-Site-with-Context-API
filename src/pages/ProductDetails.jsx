import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Card, Box, Button } from "@mui/material";
import axios from "axios";
import { ProductContext } from "../context/ProductContext";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { handleAddToCart } = useContext(ProductContext);
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}`
        );
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("error fetching anime :", error);
        setLoading(false);
      }
    };
    fetchAnime();
  }, [id]);

  const infoStyle = {
    fontSize: 20,
    fontFamily: "cursive",
    display: "flex",
    justifyContent: "space-between",
    gap: 1,
  };

  if (loading) {
    return <CircularProgress color="neutral"/>;
  }
  if (!product) {
    return <Typography variant="h6"> no product found :</Typography>;
  }
  return (
    <>
      <Typography variant="h3" sx={{ fontFamily: "cursive", padding: 2 }}>
        Card Details:
      </Typography>
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
        {/* Image */}
        <Box
          component="img"
          src={product.images?.jpg?.image_url}
          alt={product.title}
          sx={{ width: 300, height: 500, borderRadius: 2, objectFit: "cover" }}
        />

        {/* Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            fontWeight: "600",
          }}
        >
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

          <Typography
            sx={{ fontSize: 30, marginTop: 2.5, fontFamily: "cursive" }}
          >
            Score: {product.score}
          </Typography>
          <Typography sx={infoStyle}>
            Rank# <span> {product.rank}</span>
          </Typography>
          <Typography sx={infoStyle}>
            Popularity# <span>{product.popularity}</span>
          </Typography>
          <Typography sx={infoStyle}>
            Members:<span>{product.members}</span>{" "}
          </Typography>
          <Typography sx={infoStyle}>
            Airing:<span> {product.airing ? "Yes" : "No"}</span>
          </Typography>
          <Typography sx={infoStyle}>
            Studio: <span>{product.studios?.[0]?.name || "N/A"}</span>
          </Typography>

          <Typography sx={infoStyle}>
            Episodes: <span>{product.episodes}</span>
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 1,
              fontFamily: "cursive",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
            onClick={() => handleAddToCart(product)}
          >
            ADD TO CART
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default ProductDetails;
