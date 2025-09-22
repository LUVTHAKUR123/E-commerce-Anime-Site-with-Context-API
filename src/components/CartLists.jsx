// import { Button, Paper, Typography } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useState, useEffect, useContext } from "react";
// // import { CartCountContext } from "../context/CartCountContext";
// // import { CounterContext } from "../context/CounterContext";
// // import { CounterContext } from "../context/CounterContext";
// import { ProductContext } from "../context/ProductContext";
// function CartContextDetails() {
//   // const { cart } = useContext(CartCountContext);
//   const  {cart ,count,handleDecrease,handleIncrease} = useContext(ProductContext)

//   console.log("Cart", cart);
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     const formattedRows = cart.map((item, index) => ({
//       ...item,
//       id: index + 1,
//       image: item.images?.jpg?.image_url,
//     }));
//     setRows(formattedRows);
//   }, [cart]);

//   const columns = [
//     { field: "id", headerName: "ID", width: 100 },
//     {
//       field: "image",
//       headerName: "Image",
//       width: 400,

//       renderCell: (params) => {
//         console.log("params", params);
//         return (
//           <img
//             src={params.formattedValue}
//             alt="anime"
//             style={{ width: "50px", height: "70px", borderRadius: "5px" }}
//           />
//         );
//       },
//     },
//     { field: "title", headerName: "Title", width: 300 },
//     {
//       field: "quantity",
//       headerName: "Quantity",
//       width: 300,
//       renderCell: (params) => (
//         <>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => handleDecrease(params.row.index)}
//             style={{ marginLeft: "10px" }}
//           >
//             -
//           </Button>
//           {params.count}

//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => handleIncrease(params.row.index)}
//           >
//             +
//           </Button>
//         </>
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 300,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           onClick={() => {
//             const id = params.row.id;
//             setRows((prevRows) => prevRows.filter((row) => row.id !== id));
//           }}
//         >
//           DELETE
//         </Button>
//       ),
//     },
//   ];
//   return (
//     <>
//       <div>
//         <Typography
//           variant="h3"
//           align="left"
//           mt={5}
//           sx={{ fontFamily: "cursive" }}
//         >
//           Cart Details Page :
//         </Typography>
//       </div>
//       <div>
//         <Paper>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={5}
//             rowsPerPageOptions={[5]}
//             checkboxSelection
//           />
//         </Paper>
//       </div>
//     </>
//   );
// }

// export default CartContextDetails;

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

function CartContextDetails() {
  const { cart, handleDecrease, handleIncrease, handleDelete } =
    useContext(ProductContext);

  return (
    <>
      <Typography variant="h4" mt={3} mb={2} sx={{ fontFamily: "cursive" }}>
        Cart Details Page :
      </Typography>

      <TableContainer component={Paper}>
        {cart.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            sx={{ py: 5, fontStyle: "italic", color: "gray" }}
          >
            {" "}
            No Product selected
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>
                <TableCell>
                  <b>Image</b>
                </TableCell>
                <TableCell>
                  <b>Title</b>
                </TableCell>
                <TableCell>
                  <b>Quantity</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
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
                  <TableCell>{item.title}</TableCell>
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
