import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Typography, Box, Button } from "@mui/material";
import theme from "./theme";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";
import Security from "./pages/Security";
import Settings from "./pages/Settings";
import ClerkProviderWithRoutes from "./auth/ClerkProvider";
import AuthenticationPage from "./auth/AuthenticationPage";
import "./App.css";
import { Home } from "@mui/icons-material";
import Layout from "./pages/Layout";

// Home/Landing Page Component
const HomePage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1" component="h1" gutterBottom>
          MailFokus
        </Typography>
        <Typography variant="h4" component="p" sx={{ mb: 4, opacity: 0.9 }}>
          AI-powered Email Insights
        </Typography>
        <Button
          component={Link}
          to="/sign-in/*"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "white",
            color: "primary.main",
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.9)",
            },
          }}
        >
          Get Started
        </Button>
      </header>
    </div>
  );
};

function App() {
  return (
    <ClerkProviderWithRoutes>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in/*" element={<AuthenticationPage />} />
        <Route path="/sign-up" element={<AuthenticationPage />} />

        {/* Protected Routes with Layout */}
        <Route element={<Layout/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/models" element={<Models/>}/>
          <Route path="/security" element={<Security/>}/>
          <Route path="/settings" element={<Settings/>}/>
        </Route>

      </Routes>
    </ClerkProviderWithRoutes>
  );
}

export default App;