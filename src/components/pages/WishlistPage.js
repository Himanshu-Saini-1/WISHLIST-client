import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Slider from "react-slick";

const WishlistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [wishlist, setWishlist] = useState(null);
  const [product, setProduct] = useState({ name: "", imageUrl: "", price: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchWishlist = async () => {
    const res = await axios.get(`${apiUrl}/api/wishlists/${user.email}`);
    const matched = res.data.find((w) => w._id === id);
    setWishlist(matched);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleAddOrUpdate = async () => {
    const updated = { ...wishlist };
    const newProduct = { ...product, addedBy: user.email };

    if (editIndex !== null) {
      updated.products[editIndex] = newProduct;
    } else {
      updated.products.push(newProduct);
    }

    await axios.put(`${apiUrl}/api/wishlists/${wishlist._id}`, updated);
    setProduct({ name: "", imageUrl: "", price: "" });
    setEditIndex(null);
    fetchWishlist();
  };

  const handleEdit = (index) => {
    const prod = wishlist.products[index];
    setProduct({ name: prod.name, imageUrl: prod.imageUrl, price: prod.price });
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const updated = { ...wishlist };
    updated.products.splice(index, 1);
    await axios.put(`${apiUrl}/api/wishlists/${wishlist._id}`, updated);
    fetchWishlist();
  };

  const handleInvite = async () => {
    if (!inviteEmail) return;
    const updated = { ...wishlist };
    if (!updated.sharedWith.includes(inviteEmail)) {
      updated.sharedWith.push(inviteEmail);
      await axios.put(`${apiUrl}/api/wishlists/${wishlist._id}`, updated);
      setInviteEmail("");
      fetchWishlist();
    } else {
      alert("User already invited!");
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(3, wishlist?.products.length || 1),
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#9966CC", p: 3 }}>
      {/* Navigation Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: "#fff" }}>
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>{" "}
          /{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </span>{" "}
          / {wishlist?.name}
        </Typography>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/dashboard")}
          sx={{
            bgcolor: "#FFC067",
            color: "#000",
            fontWeight: "bold",
            borderRadius: 2,
            px: 2,
            "&:hover": {
              bgcolor: "#e6a44f",
            },
          }}
        >
          Dashboard
        </Button>
      </Box>

      <Paper elevation={4} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Typography variant="h4" sx={{ color: "#7D99AA", mb: 2 }}>
          {wishlist?.name}
        </Typography>

        {/* Product Form */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Product Name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#66C4FF",
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Image URL"
              value={product.imageUrl}
              onChange={(e) =>
                setProduct({ ...product, imageUrl: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#66C4FF",
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: parseFloat(e.target.value) })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#66C4FF",
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleAddOrUpdate}
                sx={{
                  bgcolor: "#FFC067",
                  color: "#000",
                  fontWeight: "bold",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                {editIndex !== null ? "Update" : "Add"}
              </Button>
            </motion.div>
          </Grid>
        </Grid>

        {/* Invite Section */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={10}>
            <TextField
              fullWidth
              label="Friend's Email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#66C4FF",
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleInvite}
                sx={{
                  bgcolor: "#FFC067",
                  color: "#000",
                  fontWeight: "bold",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                Invite
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </Paper>

      {/* Product Carousel */}
      {wishlist?.products.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Slider {...sliderSettings}>
            {wishlist.products.map((p, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: "5px" }}
              >
                <Card
                  sx={{
                    bgcolor: "#c0c0c0",
                    borderRadius: 4,
                    boxShadow: 4,
                    width: "95%",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={p.imageUrl}
                    alt={p.name}
                    sx={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ color: "#7D99AA" }}>
                      {p.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#444" }}>
                      ₹{p.price}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#fff" }}>
                      Added by: {p.addedBy}
                    </Typography>
                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEdit(idx)}
                        sx={{ borderColor: "#FFC067", color: "#000" }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleDelete(idx)}
                        sx={{ borderColor: "#FFC067", color: "#000" }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Slider>
        </Box>
      )}
    </Box>
  );
};

export default WishlistPage;
