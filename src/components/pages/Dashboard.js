import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Button, Typography, TextField, Grid, Paper } from "@mui/material";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [wishlists, setWishlists] = useState([]);
  const [newWishlist, setNewWishlist] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!user) return navigate("/");
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    const res = await axios.get(`${apiUrl}/api/wishlists/${user.email}`);
    setWishlists(res.data);
  };

  const handleCreate = async () => {
    if (!newWishlist.trim()) return;
    try {
      await axios.post(`${apiUrl}/api/wishlists`, {
        name: newWishlist,
        owner: user.email,
        sharedWith: [],
        products: [],
      });
      setNewWishlist("");
      fetchWishlists();
    } catch (err) {
      console.error(
        "Error creating wishlist:",
        err.response?.data || err.message
      );
      alert("Failed to create wishlist");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#1e0014",
        p: 3,
      }}
    >
      <Paper elevation={4} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ color: "#9c0067", mb: 2 }}>
          Welcome, {user.username}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            fullWidth
            label="New Wishlist Name"
            value={newWishlist}
            onChange={(e) => setNewWishlist(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#Ea9ab2",
                borderRadius: 2,
              },
            }}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              onClick={handleCreate}
              sx={{
                bgcolor: "#7e0053",
                color: "#ffff",
                fontWeight: "bold",
                px: 4,
                borderRadius: 2,
                height: "100%",
                "&:hover": {
                  bgcolor: "#9c0067",
                },
              }}
            >
              Create
            </Button>
          </motion.div>
        </Box>
      </Paper>

      <Grid container spacing={2}>
        {wishlists.map((w) => (
          <Grid item xs={12} sm={6} md={4} key={w._id}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/wishlist/${w._id}`)}
              style={{ cursor: "pointer" }}
            >
              <Box
                sx={{
                  bgcolor: "#3c0",
                  p: 3,
                  borderRadius: 2,
                  height: "100%",
                  boxShadow: 3,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "#7D99A" }}>
                  {w.name}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
