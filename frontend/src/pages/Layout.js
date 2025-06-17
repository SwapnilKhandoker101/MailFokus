import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Box, CircularProgress } from '@mui/material';

const Layout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading spinner while Clerk is initializing
  if (!isLoaded) {
    return (
        <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'
            }}
        >
          <CircularProgress />
        </Box>
    );
  }

  // If user is not signed in, redirect will be handled by Clerk
  if (!isSignedIn) {
    return null;
  }

  // User is signed in, show the protected content
  // Wichtig: Box Container for right Layout
  return (
      <Box sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden'
      }}>
        <Outlet />
      </Box>
  );
};


export default Layout;