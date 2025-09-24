// Import necessary components and hooks
import {
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

// CartContextDetails component - displays items added to the cart
function CartContextDetails() {
  // Destructure cart state and action handlers from ProductContext
  const { cart, handleDecrease, handleIncrease, handleDelete } =
    useContext(ProductContext);

  return (
    <>
      {/* Heading for the page */}
      <Typography variant="h4" mt={3} mb={2} sx={{ fontFamily: "cursive" }}>
        Selected Carts :-
      </Typography>

      {/* Container for the table */}
      <TableContainer component={Paper}>
        {/* If cart is empty, show message */}
        {cart.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            sx={{
              py: 5,
              fontStyle: "italic",
              color: "gray",
              padding: 20,
            }}
          >
            ⚠️ No items selected. You haven’t added any items to your cart yet.
            Please select at least one item before proceeding to the Selected
            Card section.
            {/* Simple link to go back to home page */}
            <a href="./" target="_blank" style={{ display: "block", marginTop: 10 }}>
              Visit Our Site
            </a>
          </Typography>
        ) : (
          // If cart has items, display the table
          <Table>
            {/* Table Header */}
            <TableHead>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Image</b></TableCell>
                <TableCell><b>Title</b></TableCell>
                <TableCell><b>Quantity</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body - Mapping through cart items */}
            <TableBody>
              {cart.map((item, index) => (
                <TableRow key={index}>
                  {/* Item Index (serial number) */}
                  <TableCell>{index + 1}</TableCell>

                  {/* Anime Thumbnail */}
                  <TableCell>
                    <img
                      src={item.images?.jpg?.image_url}
                      alt="anime"
                      style={{
                        width: "50px",
                        height: "70px",
                        borderRadius: "5px",
                      }}
                    />
                  </TableCell>

                  {/* Anime Title */}
                  <TableCell>{item.title}</TableCell>

                  {/* Quantity control with increment/decrement buttons */}
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleDecrease(index)}
                      sx={{ mx: 1 }}
                    >
                      -
                    </Button>
                    {item.quantity || 1}
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleIncrease(index)}
                      sx={{ mx: 1 }}
                    >
                      +
                    </Button>
                  </TableCell>

                  {/* Delete button to remove item from cart */}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}


export default CartContextDetails;
