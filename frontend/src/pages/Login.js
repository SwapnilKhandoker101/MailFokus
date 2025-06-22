import React from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { useUser } from "@clerk/clerk-react";

import { useNavigate } from "react-router-dom";
import { useApi } from "../utils/api";



const Login = () => {
  const { user } = useUser();
  const navigate = useNavigate();
//   const { makeRequest } = useApi();
  const handleConnectGmail = () => {
    if (!user) {
      alert("You must be signed in with Clerk first.");
      return;
    }

    const userId = user.id;
    
  const popup = window.open(
    `http://localhost:8000/api/auth-gmail?user_id=${userId}`,
    "_blank",
    "width=500,height=600"
  );
  

  const poll = setInterval(() => {
    if (popup?.closed) {
      clearInterval(poll);
      // After Gmail is connected and popup is closed
    //   await makeRequest("extract-original-emails");
      navigate("/dashboard");
    }
  }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #7B68EE 0%, #0F52BA 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          {/* left side - Info */}
          <Box sx={{ color: "white", mr: 4, flex: 1 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              MailFokus
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              AI-powered Email Insights
            </Typography>
            <Typography sx={{ mt: 2, opacity: 0.8 }}>
              Making it easy to manage, record and summarize your emails
            </Typography>
          </Box>

          {/* right side - Connect Gmail */}
          <Card sx={{ minWidth: 400, borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                align="center"
              >
                Connect Gmail
              </Typography>

              <Button
                fullWidth
                variant="contained"
                onClick={handleConnectGmail}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 25,
                  backgroundColor: "#7B68EE",
                  "&:hover": {
                    backgroundColor: "#6A57DD",
                  },
                }}
              >
                CONNECT TO GMAIL
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;









// import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
// import {
//     Box,
//     Card,
//     CardContent,
//     TextField,
//     Button,
//     Typography,
//     Container,
//     Alert
// } from '@mui/material';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleLogin = (e) => {
//         e.preventDefault();

//         // simple validation
//         if(!email || !password){
//         setError('Fill out all fields!');
//         return;
//     }
//     // Here the real login logic that gets implemented later
//     console.log('Login attempt: ',{email, password});

//     // For now we only show a message
//     alert('Login function gets implemented later');
// };

// return (
//     <Box
//         sx={{
//             minHeight: '100vh',
//             background: 'linear-gradient(135deg, #7B68EE 0%, #0F52BA 100%)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//         }}
//     >
//         <Container maxWidth="sm">
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//                 {/* left side - Info */}
//                 <Box sx={{ color: 'white', mr: 4, flex: 1 }}>
//                     <Typography variant="h3" component="h1" gutterBottom>
//                         MailFokus
//                     </Typography>
//                     <Typography variant="h6" sx={{ opacity: 0.9 }}>
//                         AI-powered Email Insights
//                     </Typography>
//                     <Typography sx={{ mt: 2, opacity: 0.8 }}>
//                         Making it easy to manage, record and summarize your emails
//                     </Typography>
//                 </Box>

//                 {/* right side - Login Form */}
//                 <Card sx={{ minWidth: 400, borderRadius: 3 }}>
//                     <CardContent sx={{ p: 4 }}>
//                         <Typography variant="h4" component="h2" gutterBottom align="center">
//                             Login
//                         </Typography>

//                         {error && (
//                             <Alert severity="error" sx={{ mb: 2 }}>
//                                 {error}
//                             </Alert>
//                         )}

//                         <Box component="form" onSubmit={handleLogin}>
//                             <TextField
//                                 fullWidth
//                                 label="Email or Username"
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 margin="normal"
//                                 variant="outlined"
//                             />

//                             <TextField
//                                 fullWidth
//                                 label="Password"
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 margin="normal"
//                                 variant="outlined"
//                             />

//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 sx={{
//                                     mt: 3,
//                                     mb: 2,
//                                     py: 1.5,
//                                     borderRadius: 25,
//                                     backgroundColor: '#7B68EE',
//                                     '&:hover': {
//                                         backgroundColor: '#6A57DD'
//                                     }
//                                 }}
//                             >
//                                 LOG IN
//                             </Button>

//                             <Typography align="center" sx={{ mt: 2 }}>
//                                 No Account yet?{' '}
//                                 <Button
//                                     component={Link}
//                                     to="/register"
//                                     variant="text"
//                                     sx={{ textTransform: 'none', fontWeight: 600 }}
//                                 >
//                                     SIGN UP
//                                 </Button>
//                             </Typography>
//                         </Box>
//                     </CardContent>
//                 </Card>
//             </Box>
//         </Container>
//     </Box>
// );
// };

// export default Login;