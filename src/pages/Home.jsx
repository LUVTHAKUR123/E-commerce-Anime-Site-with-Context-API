import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";
import {Container, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { CartCountContext } from "../context/CartCountContext";
// import CircularProgress from "@mui/material/CircularProgress";
function Home() {
  const { data, setData, loading, setLoading, handleAddToCart } =
    React.useContext(ProductContext);
  //cart item
  // const { handleAddToCart } = useContext(CartCountContext); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://api.jikan.moe/v4/anime?q=");
        setData(response.data.data);
        console.log("data", response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setData, setLoading]);

  //handle open card
  const handleOpenCard = (item) => {
    navigate("/cardDetails", { state: item });
  };
  return (
    <>


      <Typography
        variant="h4"
        style={{
          fontFamily: "cursive",
          fontWeight: "bold",
          // marginBottom: "20px",
          padding:"20px"
        }}
        >
        Anime Lists :
      </Typography>

      <Grid container spacing={4} style={{ padding: 20 }}>
        {/* loading  */}
        {loading ? (
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "50px" }}>
            {/* <CircularProgress /> */}
            <Typography> Loading anime...</Typography>
          </Grid>
        ) : (
          // data mapping
          data &&
          data.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.mal_id}>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  padding: 16,
                }}
                >
                <img
                  src={item.images.jpg.image_url}
                  alt={item.title}
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    height: 300,
                    objectFit: "cover",
                  }}
                  onClick={() => handleOpenCard(item)}
                  />
                <Typography
                  style={{
                    fontFamily: "cursive",
                    fontWeight: "bold",
                    fontSize: "17px",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography>Score: {item.score}</Typography>
                <Typography>Episodes: {item.episodes}</Typography>
                <Typography>Type: {item.type}</Typography>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "10px",
                    fontFamily: "cursive",
                    bgcolor: "#1c278ee6",
                  }}
                  type="submit"
                  onClick={() => handleAddToCart(item)}
                  >
                  ADD TO CART
                </Button>
              </div>
            </Grid>
          ))
        )}
      </Grid>
      
    </>
  );
}

export default Home;
