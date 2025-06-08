import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box, Button } from '@mui/material';
import theme from './theme';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

// Home/Landing Page Component
const HomePage = () => {
    return(
        <div className="App">
            <header className="App-header">
                <Typography variant="h1" component="h1" gutterBottom>
                    MailFokus
                </Typography>
                <Typography variant="h4" component="p" sx={{mb: 4, opacity: 0.9}}>
                    AI-powered Email Insights
                </Typography>
                <Button
                    component={Link}
                    to="/login"
                    variant="contained"
                    size="large"
                    sx={{
                        backgroundColor: 'white',
                        color: 'primary.main',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.9)'
                        }
                    }}
                    >
                    Get Started
                </Button>
            </header>
        </div>
    );
};

function App() {
    const [showLogin, setShowLogin] = useState(false);

    // if showLogin true --> show Login page
    if(showLogin){
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Login />
            </ThemeProvider>
        );
    }

    // else return start page
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Redirect any unknown routes to home*/}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;
