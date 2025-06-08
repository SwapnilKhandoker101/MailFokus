import React, { useState } from 'react';
import {
    Box,
    Typography,
    Tab,
    Tabs,
    List,
    ListItem,
    ListItemText,
    Chip,
    Paper,
    styled
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Styled components
const DashboardContainer = styled(Box)({
    display: 'flex',
    height: '100vh',
});

const MainContent = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
});

const ContentArea = styled(Box)({
    flex: 1,
    padding: '20px',
    backgroundColor: '#F8F9FA',
    overflow: 'auto',
});

const TabPanel = ({ children, value, index }) => {
    return (
        <div hidden={value !== index}>
            {value === index && children}
        </div>
    );
};

// Mock email data
const mockEmails = [
    {
        id: 1,
        from: 'Samantha Lee',
        subject: 'Quarterly Planning Meeting',
        preview: 'Let\'s discuss our quarterly planning...',
        time: '10:41 PM',
        category: 'Meeting',
        read: false
    },
    {
        id: 2,
        from: 'John Smith',
        subject: 'Meeting Reschedule',
        preview: 'The project status meeting previously...',
        time: '12:01 PM',
        category: 'Follow-Up',
        read: false
    },
    {
        id: 3,
        from: 'Newsletter',
        subject: 'Design Review',
        preview: 'Weekly design newsletter with...',
        time: '11:59 AM',
        category: 'Work',
        read: true
    },
    {
        id: 4,
        from: 'Rachel Turner',
        subject: 'Budget Report',
        preview: 'Here is the latest budget report...',
        time: '5:49 AM',
        category: 'Work',
        read: false
    }
];

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Meeting': '#2196F3',
            'Follow-Up': '#FF9800',
            'Work': '#4CAF50',
            'Updates': '#9C27B0'
        };
        return colors[category] || '#757575';
    };

    return (
        <DashboardContainer>
            <Sidebar />

            <MainContent>
                <Header />

                <ContentArea>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                        <Tabs value={selectedTab} onChange={handleTabChange}>
                            <Tab label="Inbox" />
                            <Tab label="Summarized" />
                            <Tab label="Classification" />
                            <Tab label="Updates" />
                        </Tabs>
                    </Box>

                    <TabPanel value={selectedTab} index={0}>
                        {/* Inbox Tab */}
                        <Paper elevation={1}>
                            <List>
                                {mockEmails.map((email) => (
                                    <ListItem
                                        key={email.id}
                                        sx={{
                                            borderBottom: '1px solid #eee',
                                            '&:hover': { backgroundColor: '#f5f5f5' },
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ fontWeight: email.read ? 400 : 600 }}
                                                    >
                                                        {email.from}
                                                    </Typography>
                                                    <Chip
                                                        label={email.category}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: getCategoryColor(email.category),
                                                            color: 'white',
                                                            fontSize: '0.75rem'
                                                        }}
                                                    />
                                                </Box>
                                            }
                                            secondary={
                                                <Box>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ fontWeight: email.read ? 400 : 600 }}
                                                    >
                                                        {email.subject}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {email.preview}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            {email.time}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </TabPanel>

                    <TabPanel value={selectedTab} index={1}>
                        {/* Summarized Tab */}
                        <Paper elevation={1} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Email Summaries
                            </Typography>
                            <Typography color="text.secondary">
                                AI-generated summaries will appear here when emails are processed.
                            </Typography>
                        </Paper>
                    </TabPanel>

                    <TabPanel value={selectedTab} index={2}>
                        {/* Classification Tab */}
                        <Paper elevation={1} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Email Classification
                            </Typography>
                            <Typography color="text.secondary">
                                Email categories and classification settings will be shown here.
                            </Typography>
                        </Paper>
                    </TabPanel>

                    <TabPanel value={selectedTab} index={3}>
                        {/* Updates Tab */}
                        <Paper elevation={1} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                System Updates
                            </Typography>
                            <Typography color="text.secondary">
                                Recent system updates and notifications will appear here.
                            </Typography>
                        </Paper>
                    </TabPanel>
                </ContentArea>
            </MainContent>
        </DashboardContainer>
    );
};

export default Dashboard;