// Importing React and necessary hooks
import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext"; // Importing global context to manage data and cart
import axios from "axios"; // Axios for API calls
import { Button, Grid, Typography,Card,CardMedia,CardContent,CardActions } from "@mui/material"; // MUI components for layout, UI, and typography
import { useNavigate } from "react-router-dom"; // React Router hook for navigation

// API URL from environment
const API_URL = import.meta.env.VITE_API_URL;

// Functional component: Home page
function Home() {
  // Destructuring data, loading state, and handlers from context
  const { data, setData, loading, setLoading, handleAddToCart } =
    useContext(ProductContext);

  // Hook for navigation
  const navigate = useNavigate();

  // Fetch anime data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`${API_URL}?q=`); // Fetch anime list
        setData(response.data.data); // Store data in context
        console.log("data", response.data); // Log for debugging
      } catch (err) {
        console.log(err); // Log any errors
      } finally {
        setLoading(false); // Stop loading regardless of success/failure
      }
    };

    fetchData(); // Run fetch function
  }, [setData, setLoading]); // Only re-run if these functions change (usually stable)

  // Handle clicking on an anime card - navigate to cardDetails route
  const handleOpenCard = (item) => {
    navigate("/cardDetails", { state: item }); // Passing item in navigation state
  };

  return (
    <>
      {/* Page Title */}
        <Typography
        variant="h4"
        align="left"
        sx={{
          fontFamily: "cursive",
          fontWeight: "bold",
          paddingY: 3,
          color: "#000000ff",
        }}
      >
        Anime Lists :
      </Typography>

      {/* Main grid container for displaying anime cards */}
           <Grid container spacing={2} sx={{ px: 3, pb: 5 }}>
        {/* Conditional rendering: show loading text if still fetching */}
        {loading ? (
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography> Loading anime...</Typography>
          </Grid>
        ) : (
          // Render anime data if available
          data &&
          data.map((item) => (
            // Each anime card inside a responsive grid item
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.mal_id}>
              <Card
                    sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.6s",
                  "&:hover": { transform: "scale(1.05)",background:"#000000ff", color:"white" },
                }}
              >
                {/* Anime image (clickable) */}
                <CardMedia
                    component="img"
                  height="300"
                  image={item.images.jpg.image_url}
                  alt={item.title}
                  sx={{ cursor: "pointer", objectFit: "cover" }}
                  onClick={() => handleOpenCard(item)}// Open detail card on click
                />

                {/* Anime title */}
                 {/* Card Content */}
                 <CardContent>

                <Typography
                  style={{
                    fontFamily: "cursive",
                    fontWeight: "bold",
                    fontSize: "17px",
                    marginTop: 8,
                  }}
                  >
                  {item.title}
                </Typography>

                {/* Additional anime details */}
                <Typography>Score: {item.score}</Typography>
                <Typography>Episodes: {item.episodes}</Typography>
                <Typography>Type: {item.type}</Typography>
                  </CardContent>

                 {/* Card Actions */}
                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "10px",
                    fontFamily: "cursive",
                    bgcolor: "#1c278ee6",
                    "&:hover": { bgcolor: "#1c278e" },
                  }}
                  onClick={() => handleAddToCart(item)} // Add item to cart
                >
                  ADD TO CART
                </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}

export default Home;
