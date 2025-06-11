import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    Button,
    Alert,
    Chip,
    Grid
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Models = () => {
    const [selectedModel, setSelectedModel] = useState('');
    const [saveStatus, setSaveStatus] = useState('');

    // Available AI models
    const availableModels = [
        {
            id: 'gpt-4',
            name: 'GPT-4',
            description: 'Most capable model for complex reasoning and analysis',
            provider: 'OpenAI',
            capabilities: ['Text Analysis', 'Summarization', 'Classification'],
            recommended: true
        },
        {
            id: 'gpt-3.5-turbo',
            name: 'GPT-3.5 Turbo',
            description: 'Fast and efficient model for basic email processing',
            provider: 'OpenAI',
            capabilities: ['Text Analysis', 'Summarization']
        },
        {
            id: 'claude-3',
            name: 'Claude 3',
            description: 'Advanced model with strong analytical capabilities',
            provider: 'Anthropic',
            capabilities: ['Text Analysis', 'Summarization', 'Classification', 'Privacy-focused']
        },
        {
            id: 'llama-2',
            name: 'Llama 2',
            description: 'Open-source model that runs locally for privacy',
            provider: 'Meta',
            capabilities: ['Text Analysis', 'Local Processing']
        }
    ];

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
        setSaveStatus('');
    };

    const handleSaveModel = () => {
        if (!selectedModel) {
            setSaveStatus('error');
            return;
        }

        // Here we would save to backend later
        console.log('Saving model:', selectedModel);
        setSaveStatus('success');

        // Clear status after 3 seconds
        setTimeout(() => setSaveStatus(''), 3000);
    };

    const selectedModelInfo = availableModels.find(model => model.id === selectedModel);

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Sidebar />

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Header />

                <Box sx={{ flex: 1, p: 3, backgroundColor: '#F8F9FA', overflow: 'auto' }}>
                    <Typography variant="h4" gutterBottom>
                        AI Model Selection
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Choose the AI model that will process and analyze your emails.
                        Different models offer various capabilities and performance characteristics.
                    </Typography>

                    {/* Status Messages */}
                    {saveStatus === 'success' && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            Model settings saved successfully!
                        </Alert>
                    )}

                    {saveStatus === 'error' && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            Please select a model before saving.
                        </Alert>
                    )}

                    {/* Model Selection */}
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Select AI Model
                            </Typography>

                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Choose Model</InputLabel>
                                <Select
                                    value={selectedModel}
                                    onChange={handleModelChange}
                                    label="Choose Model"
                                >
                                    {availableModels.map((model) => (
                                        <MenuItem key={model.id} value={model.id}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {model.name}
                                                {model.recommended && (
                                                    <Chip
                                                        label="Recommended"
                                                        size="small"
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                )}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                variant="contained"
                                onClick={handleSaveModel}
                                disabled={!selectedModel}
                                sx={{ mr: 2 }}
                            >
                                Save Settings
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={() => setSelectedModel('')}
                            >
                                Reset
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Model Information */}
                    {selectedModelInfo && (
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Model Information
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            <strong>{selectedModelInfo.name}</strong>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {selectedModelInfo.description}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Provider:</strong> {selectedModelInfo.provider}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Capabilities:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {selectedModelInfo.capabilities.map((capability) => (
                                                <Chip
                                                    key={capability}
                                                    label={capability}
                                                    size="small"
                                                    variant="outlined"
                                                    color="secondary"
                                                />
                                            ))}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Models;