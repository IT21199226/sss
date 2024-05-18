import React, { useState } from 'react';
import { Box, Button, Paper, Typography, TextField, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Header from '../components/header';

function CodeEditor() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3001/code/api/add',
        { title, code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Code saved successfully', response.data);
      setAlert({ open: true, message: 'Code saved successfully!', severity: 'success' });
      // Reset the form
      setTitle('');
      setCode('');
    } catch (error) {
      console.error('Failed to save code', error);
      setAlert({ open: true, message: 'Failed to save code!', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // padding: 4,
      }}
    >
      <Header />
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginTop: '20px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold',
          color: '#1d5257',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          padding: '10px 20px',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        Add New Code
      </Typography>
      <Paper elevation={6} sx={{ padding: 5, width: '80%', marginBottom: 10, borderRadius: 5}} className='main-paper-content'>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: 2, borderRadius: 15 }}
        />
        <TextField
          label="Code"
          variant="outlined"
          fullWidth
          multiline
          minRows={10}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          sx={{ marginBottom: 2, borderRadius: 15 }}
        />
      </Paper>
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ backgroundColor: '#1d5257'}}>
        Save Code
      </Button>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CodeEditor;
