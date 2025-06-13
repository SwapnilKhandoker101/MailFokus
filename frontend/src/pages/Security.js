import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Button,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';
import {
  Security as SecurityIcon,
  Shield as ShieldIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Security = () => {
  const [settings, setSettings] = useState({
    dataProcessing: false,
    emailAnalytics: false,
    cloudStorage: false,
    thirdPartySharing: false,
    anonymousUsage: true
  });

  const [saveStatus, setSaveStatus] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');

  const handleSettingChange = (setting) => (event) => {
    setSettings(prev => ({
      ...prev,
      [setting]: event.target.checked
    }));
    setSaveStatus('');
  };

  const handleSaveSettings = () => {
    // Here we would save to backend later
    console.log('Saving security settings:', settings);
    setSaveStatus('success');

    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType('');
  };

  const handleDeleteData = () => {
    console.log('Delete all data requested');
    setSaveStatus('deleted');
    setOpenDialog(false);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const securityFeatures = [
    {
      icon: <LockIcon />,
      title: 'End-to-End Encryption',
      description: 'All your emails are encrypted during processing'
    },
    {
      icon: <ShieldIcon />,
      title: 'Data Protection',
      description: 'Your data is processed according to GDPR standards'
    },
    {
      icon: <VisibilityIcon />,
      title: 'Transparency',
      description: 'You can see exactly what data is being processed'
    }
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />

        <Box sx={{ flex: 1, p: 3, backgroundColor: '#F8F9FA', overflow: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SecurityIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h4">
              Security & Privacy
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Manage your privacy settings and data consent preferences.
            Your security and privacy are our top priorities.
          </Typography>

          {/* Status Messages */}
          {saveStatus === 'success' && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Security settings saved successfully!
            </Alert>
          )}

          {saveStatus === 'deleted' && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Data deletion request has been processed.
            </Alert>
          )}

          {/* Security Features */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Security Features
              </Typography>
              <List>
                {securityFeatures.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ color: 'primary.main' }}>
                      {feature.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={feature.title}
                      secondary={feature.description}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Privacy Consent Settings */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Data Processing Consent
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Control how your email data is processed and used by MailFokus.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.dataProcessing}
                      onChange={handleSettingChange('dataProcessing')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1">Email Data Processing</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Allow AI analysis of email content for insights and summaries
                      </Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailAnalytics}
                      onChange={handleSettingChange('emailAnalytics')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1">Email Analytics</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Generate analytics and patterns from your email data
                      </Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.cloudStorage}
                      onChange={handleSettingChange('cloudStorage')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1">Cloud Storage</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Store processed data in secure cloud storage for faster access
                      </Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.thirdPartySharing}
                      onChange={handleSettingChange('thirdPartySharing')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1">Third-Party Integrations</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Allow integration with external services for enhanced features
                      </Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.anonymousUsage}
                      onChange={handleSettingChange('anonymousUsage')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1">Anonymous Usage Statistics</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Help improve MailFokus by sharing anonymous usage data
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSaveSettings}
                >
                  Save Settings
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => handleOpenDialog('privacy')}
                  startIcon={<InfoIcon />}
                >
                  Privacy Policy
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Data Management
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Manage your stored data and exercise your data rights.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  onClick={() => handleOpenDialog('export')}
                >
                  Export My Data
                </Button>

                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => handleOpenDialog('delete')}
                  startIcon={<DeleteIcon />}
                >
                  Delete All Data
                </Button>

                <Chip
                  label="GDPR Compliant"
                  color="success"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Dialogs */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'delete' && 'Delete All Data'}
          {dialogType === 'export' && 'Export Data'}
          {dialogType === 'privacy' && 'Privacy Policy'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'delete' && (
            <Typography>
              Are you sure you want to delete all your data? This action cannot be undone.
              All your emails, settings, and processed data will be permanently removed.
            </Typography>
          )}
          {dialogType === 'export' && (
            <Typography>
              Your data export will be prepared and sent to your registered email address
              within 24 hours. The export will include all your processed emails,
              settings, and analytics data in a secure format.
            </Typography>
          )}
          {dialogType === 'privacy' && (
            <Box>
              <Typography sx={{ mb: 2 }}>
                <strong>MailFokus Privacy Policy</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                We are committed to protecting your privacy and ensuring the security of your data.
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • We only process data that you explicitly consent to
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • All data is encrypted in transit and at rest
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • We never sell or share your personal data with third parties
              </Typography>
              <Typography variant="body2">
                • You can request data deletion or export at any time
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          {dialogType === 'delete' && (
            <Button onClick={handleDeleteData} color="error">
              Delete Data
            </Button>
          )}
          {dialogType === 'export' && (
            <Button onClick={handleCloseDialog} variant="contained">
              Request Export
            </Button>
          )}
          {dialogType === 'privacy' && (
            <Button onClick={handleCloseDialog} variant="contained">
              I Understand
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Security;