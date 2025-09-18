import React, { useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";

function Home() {
  const { data, setData } = React.useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/anime?q=");
        setData(response.data.data);

        console.log("data", response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [setData]);
  return (
    <Grid container spacing={4} style={{ padding: 20 }}>
      {data &&
        data.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.mal_id}>
            <div
              style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16 }}
            >
              <img
                src={item.images.jpg.image_url}
                alt={item.title}
                style={{ width: "100%", borderRadius: 8 , height: 300, objectFit: "cover"}}
              />
              <Typography style={{ fontFamily:"cursive",fontWeight:"bold",fontSize:"17px"}}>{item.title}</Typography>
              <Typography>Score: {item.score}</Typography>
              <Typography>Episodes: {item.episodes}</Typography>
              <Typography>Type: {item.type}</Typography>
              <Button   variant="contained"  sx={{marginTop:"10px"}} type="submit">ADD TO CART</Button>
            </div>
          </Grid>
        ))}
    </Grid>
  );
}

export default Home;
