import { Button, Card, Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

function CardDetails() {
  const location = useLocation();
  const item = location.state;
  const { handleAddToCart } = useContext(ProductContext);
  if (!item) {
    return <Typography>No data found!</Typography>;
  }
  console.log("items", item);

  //styling for typography
  const infoStyle = {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
    pb: 1,
    pt: 0.5,
    fontWeight: 600,
    fontFamily: "cursive",
    fontSize: 18,
    color: "#333",
  };
  return (
    <div>
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
          src={item.images?.jpg?.image_url}
          alt={item.title}
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
            {item?.title}
          </Typography>

          <Typography
            sx={{ fontSize: 30, marginTop: 2.5, fontFamily: "cursive" }}
          >
            Score: {item.score}
          </Typography>
          <Typography sx={infoStyle}>
            Rank# <span> {item.rank}</span>
          </Typography>
          <Typography sx={infoStyle}>
            Popularity# <span>{item.popularity}</span>
          </Typography>
          <Typography sx={infoStyle}>
            Members:<span>{item.members}</span>{" "}
          </Typography>
          <Typography sx={infoStyle}>
            Airing:<span> {item.airing ? "Yes" : "No"}</span>
          </Typography>
          <Typography sx={infoStyle}>
            Studio: <span>{item.studio}</span>
          </Typography>
          <Typography sx={infoStyle}>
            Episodes: <span>{item.episodes}</span>
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 1,
              fontFamily: "cursive",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
            onClick={() => handleAddToCart(item)}
          >
            ADD TO CART
          </Button>
        </Box>
      </Card>
    </div>
  );
}

export default CardDetails;
