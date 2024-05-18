import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, Snackbar, Alert, Link as MuiLink } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: false, password: false };

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = true;
      valid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = true;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3001/user_api/user_login', formData);
        console.log('Login successful', response.data);
        // Assuming the API response includes a token or similar identifier
        const token = response.data.token; // Assuming the token is in the response
        localStorage.setItem('token', token); // Store the token in local storage
        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
        navigate('/editor'); // Change '/dashboard' to the path you need
      } catch (error) {
        console.error('Login failed', error);
        setSnackbar({ open: true, message: 'Login failed!', severity: 'error' });
        navigate('/login');
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: 'purple',
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundImage: 'url("images/bg.gif")',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          SECUEDITOR
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px',
        }}
      >
        <Paper elevation={6} sx={{ padding: 4, width: '100%', maxWidth: '500px', backgroundColor: 'white', borderRadius: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  helperText={errors.email ? "Valid email is required" : ""}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  helperText={errors.password ? "Password must be at least 6 characters" : ""}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" fullWidth type="submit">
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Not registered yet?{' '}
                  <MuiLink component={Link} to="/" color="secondary">
                    Sign up here
                  </MuiLink>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default LoginForm;
