import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Typography,
} from "@mui/material";
import useLocalStorageState from "use-local-storage-state";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
const Cart = () => {
  // Get & set cart from local storage
  const [cart = [], setCart] = useLocalStorageState("cart");
  // Increase item quantity
  const handleIncrement = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].count += 1;
    setCart(updatedCart);
  };
  // Decrease item quantity (min 1)
  const handleDecrement = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].count > 1) {
      updatedCart[index].count -= 1;
      setCart(updatedCart);
    }
  };
  // Remove an item from the cart
  const handleDelete = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };
  return (
    <>
      {cart?.length !== 0 ? (
        <Container maxWidth="lg">
          {/* Cart title */}
          <Typography variant="h4" className="text-3xl font-bold mb-8">
            Cart
          </Typography>
          {/* Table with cart items */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={`${row.images.jpg.image_url}`}
                        width="50px"
                        height="50px"
                        alt={row.title}
                      />
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDecrement(index)}>-</Button>
                      {row.count}
                      <Button onClick={() => handleIncrement(index)}>+</Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelete(index)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      ) : (
        // If cart is empty
        <div maxWidth="lg" style={{ textAlign: "center", padding: "40px" }}>
          <div className="flex items-center justify-center min-h-[70vh] text-center">
            <div className="flex justify-center mb-6">
              <ShoppingCartIcon style={{ fontSize: 80, color: "#555" }} />
            </div>
            <Typography variant="h5" className="font-semibold mb-4">
              Your cart is empty
            </Typography>
            {/* Link back to home */}
            <Link to="/">
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ marginTop: "20px" }}
              >
                Continue shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export default Cart;