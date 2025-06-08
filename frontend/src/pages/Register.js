import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Container,
    Alert,
    Checkbox,
    FormControlLabel
} from '@mui/material';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        acceptTerms: false
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault();

        // validation
        if (!formData.username || !formData.email || !formData.password) {
            setError('Fill out all fields');
            return;
        }

        if (!formData.acceptTerms) {
            setError('Accept terms of use');
            return;
        }

        console.log('Register attempt:', formData);
        alert('!!!!!!!!!Registrierung wird später implementiert!!!!!!!!!');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #7B68EE 0%, #0F52BA 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Container maxWidth="sm">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    {/* Left side - Info */}
                    <Box sx={{ color: 'white', mr: 4, flex: 1 }}>
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

                    {/* Right side - Register Form */}
                    <Card sx={{ minWidth: 400, borderRadius: 3 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h4" component="h2" gutterBottom align="center">
                                Create an Account
                            </Typography>

                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            )}

                            <Box component="form" onSubmit={handleRegister}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    margin="normal"
                                    variant="outlined"
                                />

                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    margin="normal"
                                    variant="outlined"
                                />

                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    margin="normal"
                                    variant="outlined"
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="acceptTerms"
                                            checked={formData.acceptTerms}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    }
                                    label="I accept the terms & conditions"
                                    sx={{ mt: 2 }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        py: 1.5,
                                        borderRadius: 25,
                                        backgroundColor: '#7B68EE',
                                        '&:hover': {
                                            backgroundColor: '#6A57DD'
                                        }
                                    }}
                                >
                                    SIGN UP
                                </Button>

                                <Typography align="center" sx={{ mt: 2 }}>
                                    Own an Account?{' '}
                                    <Button
                                        component={Link}
                                        to="/login"
                                        variant="text"
                                        sx={{ textTransform: 'none', fontWeight: 600 }}
                                    >
                                        JUMP RIGHT IN
                                    </Button>
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Box>
    );
};

export default Register;