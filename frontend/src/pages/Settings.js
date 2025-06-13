import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  ColorLens as ColorIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Settings = () => {
  const [tags, setTags] = useState([
    { id: 1, name: 'Meeting', color: '#2196F3', description: 'Meeting related emails' },
    { id: 2, name: 'Follow-Up', color: '#FF9800', description: 'Emails that need follow-up' },
    { id: 3, name: 'Work', color: '#4CAF50', description: 'Work related emails' },
    { id: 4, name: 'Personal', color: '#9C27B0', description: 'Personal emails' }
  ]);

  const [openTagDialog, setOpenTagDialog] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [tagForm, setTagForm] = useState({
    name: '',
    color: '#2196F3',
    description: ''
  });
  const [saveStatus, setSaveStatus] = useState('');

  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    emailNotifications: true,
    autoClassification: true,
    darkMode: false,
    language: 'en',
    timezone: 'UTC'
  });

  const predefinedColors = [
    '#2196F3', '#FF9800', '#4CAF50', '#9C27B0',
    '#F44336', '#00BCD4', '#FF5722', '#795548',
    '#607D8B', '#E91E63', '#CDDC39', '#FFC107'
  ];

  const handleOpenTagDialog = (tag = null) => {
    if (tag) {
      setEditingTag(tag);
      setTagForm({
        name: tag.name,
        color: tag.color,
        description: tag.description
      });
    } else {
      setEditingTag(null);
      setTagForm({
        name: '',
        color: '#2196F3',
        description: ''
      });
    }
    setOpenTagDialog(true);
  };

  const handleCloseTagDialog = () => {
    setOpenTagDialog(false);
    setEditingTag(null);
    setTagForm({
      name: '',
      color: '#2196F3',
      description: ''
    });
  };

  const handleSaveTag = () => {
    if (!tagForm.name.trim()) {
      setSaveStatus('error');
      return;
    }

    if (editingTag) {
      // Edit existing tag
      setTags(prev => prev.map(tag =>
        tag.id === editingTag.id
          ? { ...tag, ...tagForm }
          : tag
      ));
    } else {
      // Add new tag
      const newTag = {
        id: Math.max(...tags.map(t => t.id)) + 1,
        ...tagForm
      };
      setTags(prev => [...prev, newTag]);
    }

    setSaveStatus('success');
    handleCloseTagDialog();
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleDeleteTag = (tagId) => {
    setTags(prev => prev.filter(tag => tag.id !== tagId));
    setSaveStatus('deleted');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleGeneralSettingChange = (setting) => (event) => {
    setGeneralSettings(prev => ({
      ...prev,
      [setting]: event.target.checked !== undefined ? event.target.checked : event.target.value
    }));
  };

  const handleSaveGeneralSettings = () => {
    console.log('Saving general settings:', generalSettings);
    setSaveStatus('general-saved');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />

        <Box sx={{ flex: 1, p: 3, backgroundColor: '#F8F9FA', overflow: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SettingsIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h4">
              Settings
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Manage your email tags, preferences, and account settings.
          </Typography>

          {/* Status Messages */}
          {saveStatus === 'success' && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Tag saved successfully!
            </Alert>
          )}

          {saveStatus === 'deleted' && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Tag deleted successfully!
            </Alert>
          )}

          {saveStatus === 'general-saved' && (
            <Alert severity="success" sx={{ mb: 3 }}>
              General settings saved successfully!
            </Alert>
          )}

          {saveStatus === 'error' && (
            <Alert severity="error" sx={{ mb: 3 }}>
              Please enter a tag name!
            </Alert>
          )}

          {/* Tag Management Section */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Email Tags
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenTagDialog()}
                >
                  Add Tag
                </Button>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Create and manage custom tags to organize your emails. Tags help with automatic classification and filtering.
              </Typography>

              <Grid container spacing={2}>
                {tags.map((tag) => (
                  <Grid item xs={12} sm={6} md={4} key={tag.id}>
                    <Card variant="outlined" sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Chip
                          label={tag.name}
                          sx={{
                            backgroundColor: tag.color,
                            color: 'white',
                            fontWeight: 600,
                            mr: 1
                          }}
                        />
                        <Box sx={{ ml: 'auto' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenTagDialog(tag)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteTag(tag.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {tag.description}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* General Settings Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                General Settings
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Notifications & Processing
                  </Typography>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={generalSettings.emailNotifications}
                        onChange={handleGeneralSettingChange('emailNotifications')}
                      />
                    }
                    label="Email Notifications"
                    sx={{ mb: 2, display: 'block' }}
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={generalSettings.autoClassification}
                        onChange={handleGeneralSettingChange('autoClassification')}
                      />
                    }
                    label="Automatic Email Classification"
                    sx={{ mb: 2, display: 'block' }}
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={generalSettings.darkMode}
                        onChange={handleGeneralSettingChange('darkMode')}
                      />
                    }
                    label="Dark Mode"
                    sx={{ mb: 2, display: 'block' }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Preferences
                  </Typography>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={generalSettings.language}
                      onChange={handleGeneralSettingChange('language')}
                      label="Language"
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="de">Deutsch</MenuItem>
                      <MenuItem value="fr">Français</MenuItem>
                      <MenuItem value="es">Español</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      value={generalSettings.timezone}
                      onChange={handleGeneralSettingChange('timezone')}
                      label="Timezone"
                    >
                      <MenuItem value="UTC">UTC</MenuItem>
                      <MenuItem value="Europe/Vienna">Europe/Vienna</MenuItem>
                      <MenuItem value="America/New_York">America/New_York</MenuItem>
                      <MenuItem value="Asia/Tokyo">Asia/Tokyo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveGeneralSettings}
              >
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Tag Dialog */}
      <Dialog open={openTagDialog} onClose={handleCloseTagDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingTag ? 'Edit Tag' : 'Create New Tag'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Tag Name"
            value={tagForm.name}
            onChange={(e) => setTagForm(prev => ({ ...prev, name: e.target.value }))}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            value={tagForm.description}
            onChange={(e) => setTagForm(prev => ({ ...prev, description: e.target.value }))}
            margin="normal"
            multiline
            rows={2}
          />

          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Tag Color
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {predefinedColors.map((color) => (
              <Box
                key={color}
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: color,
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: tagForm.color === color ? '3px solid #000' : '1px solid #ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => setTagForm(prev => ({ ...prev, color }))}
              >
                {tagForm.color === color && <ColorIcon sx={{ color: 'white' }} />}
              </Box>
            ))}
          </Box>

          {/* Preview */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Preview:
            </Typography>
            <Chip
              label={tagForm.name || 'Tag Name'}
              sx={{
                backgroundColor: tagForm.color,
                color: 'white',
                fontWeight: 600
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTagDialog}>
            Cancel
          </Button>
          <Button onClick={handleSaveTag} variant="contained">
            {editingTag ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;