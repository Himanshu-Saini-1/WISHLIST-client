import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const SignupPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSignup = async () => {
    const emailInput = document.getElementById("emailInput");
    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/users/signup`, form);
      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      alert("Signup failed.");
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
          Signup
        </Typography>

        <TextField
          label="Username"
          required
          fullWidth
          margin="normal"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#3c0027",
            },
          }}
        />

        <TextField
          id="emailInput"
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#3c0027",
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          required
          fullWidth
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#3c0027",
            },
          }}
        />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSignup}
            sx={{
              mt: 2,
              bgcolor: "#7e0053",
              color: "#000",
              fontWeight: "bold",
              borderRadius: 2,
              py: 1.5,
              fontSize: "1rem",
              "&:hover": {
                bgcolor: "#9c0067",
              },
            }}
          >
            Signup
          </Button>
        </motion.div>

        <Typography
          variant="body2"
          sx={{ mt: 3, textAlign: "center", color: "#9c0067" }}
        >
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#66C4F",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignupPage;
