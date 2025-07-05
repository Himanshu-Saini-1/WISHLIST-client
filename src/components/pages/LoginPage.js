import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogin = async () => {
    const emailInput = document.getElementById("emailInput");
    if (!emailInput.checkValidity()) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      const res = await axios.post(`${apiUrl}/api/users/login`, {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        minHeight: "100vh",
        bgcolor: "#1e0014",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          bgcolor: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#0F9EF9", textAlign: "center" }}
        >
          Login
        </Typography>

        <TextField
          id="emailInput"
          label="Email"
          type="email"
          fullWidth
          required
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#Ea9ab2",
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#Ea9ab2",
            },
          }}
        />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{
              mt: 2,
              bgcolor: "#7e0053",
              color: "#ffff",
              fontWeight: "bold",
              borderRadius: 2,
              py: 1.5,
              fontSize: "1rem",
              "&:hover": {
                bgcolor: "#9c0067",
              },
            }}
          >
            Login
          </Button>
        </motion.div>

        <Typography
          variant="body2"
          sx={{ mt: 3, textAlign: "center", color: "#9c0067" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#66C4F",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
