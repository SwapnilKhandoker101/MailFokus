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
  styled,
  Card,
  CardContent,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Reply as ReplyIcon,
  Forward as ForwardIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
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

// Mock email data with full content
const mockEmails = [
  {
    id: 1,
    from: 'Samantha Lee',
    fromEmail: 'samantha.lee@company.com',
    to: 'you@company.com',
    subject: 'Quarterly Planning Meeting',
    preview: 'Let\'s discuss our quarterly planning...',
    content: `Hi there,

I hope this email finds you well. I wanted to reach out regarding our upcoming quarterly planning meeting scheduled for next week.

We need to cover several important topics:
- Q4 budget review
- Next quarter's objectives
- Team resource allocation
- New project initiatives

Could you please review the attached documents before the meeting? I've included last quarter's performance metrics and the preliminary budget draft.

Looking forward to a productive discussion.

Best regards,
Samantha Lee
Project Manager`,
    time: '10:41 PM',
    date: 'Dec 15, 2024',
    category: 'Meeting',
    read: false,
    starred: false,
    attachments: ['Q4_Budget_Review.pdf', 'Performance_Metrics.xlsx']
  },
  {
    id: 2,
    from: 'John Smith',
    fromEmail: 'john.smith@company.com',
    to: 'you@company.com',
    subject: 'Meeting Reschedule',
    preview: 'The project status meeting previously...',
    content: `Hello,

I need to reschedule our project status meeting that was planned for tomorrow at 2 PM.

Due to an urgent client call that came up, I'll need to move our meeting to Thursday at the same time. I apologize for the short notice.

The agenda remains the same:
- Project timeline review
- Budget status update
- Risk assessment
- Next milestones

Please let me know if Thursday works for you.

Thanks for your understanding.

John Smith
Senior Developer`,
    time: '12:01 PM',
    date: 'Dec 15, 2024',
    category: 'Follow-Up',
    read: false,
    starred: true,
    attachments: []
  },
  {
    id: 3,
    from: 'Newsletter',
    fromEmail: 'newsletter@designweek.com',
    to: 'you@company.com',
    subject: 'Design Review Weekly',
    preview: 'Weekly design newsletter with...',
    content: `Design Review Weekly - Issue #47

This week's highlights:

🎨 Featured Design Trends
- Minimalist UI patterns are making a comeback
- Bold typography in modern web design
- Color psychology in user interfaces

📱 Tools & Resources
- New Figma plugins for designers
- CSS Grid layout best practices
- Accessibility design guidelines

💡 Case Studies
- How Spotify redesigned their mobile app
- The psychology behind Netflix's interface

Stay inspired and keep designing!

The Design Review Team`,
    time: '11:59 AM',
    date: 'Dec 14, 2024',
    category: 'Work',
    read: true,
    starred: false,
    attachments: []
  },
  {
    id: 4,
    from: 'Rachel Turner',
    fromEmail: 'rachel.turner@finance.com',
    to: 'you@company.com',
    subject: 'Budget Report Q4',
    preview: 'Here is the latest budget report...',
    content: `Dear Team,

Attached is the comprehensive Q4 budget report for your review.

Key findings:
- 12% increase in operational costs
- Marketing ROI improved by 8%
- Software licensing costs decreased by 15%
- Overall budget performance: 95% of target

Action items:
1. Review departmental allocations
2. Plan for Q1 budget adjustments
3. Identify cost optimization opportunities

Please review and provide feedback by Friday.

Best regards,
Rachel Turner
Finance Director`,
    time: '5:49 AM',
    date: 'Dec 14, 2024',
    category: 'Work',
    read: false,
    starred: false,
    attachments: ['Q4_Budget_Report.pdf', 'Cost_Analysis.xlsx']
  }
];

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emails, setEmails] = useState(mockEmails);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedEmail(null); // Close email details when switching tabs
  };

  const handleEmailClick = (email) => {
    // Mark email as read
    setEmails(prev => prev.map(e =>
      e.id === email.id ? { ...e, read: true } : e
    ));
    setSelectedEmail(email);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  const handleStarToggle = (emailId) => {
    setEmails(prev => prev.map(e =>
      e.id === emailId ? { ...e, starred: !e.starred } : e
    ));
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail(prev => ({ ...prev, starred: !prev.starred }));
    }
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

  // Email list view
  const EmailList = () => (
    <Paper elevation={1}>
      <List>
        {emails.map((email) => (
          <ListItem
            key={email.id}
            sx={{
              borderBottom: '1px solid #eee',
              '&:hover': { backgroundColor: '#f5f5f5' },
              cursor: 'pointer'
            }}
            onClick={() => handleEmailClick(email)}
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
                  {email.starred && (
                    <StarIcon sx={{ color: '#FFD700', fontSize: 16 }} />
                  )}
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
  );

  // Email detail view
  const EmailDetail = ({ email }) => (
    <Paper elevation={1} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Email Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleBackToList} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {email.subject}
          </Typography>
          <IconButton onClick={() => handleStarToggle(email.id)}>
            {email.starred ? <StarIcon sx={{ color: '#FFD700' }} /> : <StarBorderIcon />}
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="body1" fontWeight={600}>
              {email.from}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {email.fromEmail}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary">
              {email.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {email.time}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label={email.category}
            size="small"
            sx={{
              backgroundColor: getCategoryColor(email.category),
              color: 'white'
            }}
          />
          {email.attachments.length > 0 && (
            <Chip
              label={`${email.attachments.length} Attachment${email.attachments.length > 1 ? 's' : ''}`}
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      </Box>

      {/* Email Content */}
      <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
          {email.content}
        </Typography>

        {email.attachments.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Attachments:
            </Typography>
            {email.attachments.map((attachment, index) => (
              <Chip
                key={index}
                label={attachment}
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
                clickable
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Email Actions */}
      <Box sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex', gap: 1 }}>
        <Button variant="contained" startIcon={<ReplyIcon />}>
          Reply
        </Button>
        <Button variant="outlined" startIcon={<ForwardIcon />}>
          Forward
        </Button>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </Box>
    </Paper>
  );

  return (
    <DashboardContainer>
      <Sidebar />

      <MainContent>
        <Header />

        <ContentArea>
          {!selectedEmail ? (
            <>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={selectedTab} onChange={handleTabChange}>
                  <Tab label="Inbox" />
                  <Tab label="Summarized" />
                  <Tab label="Classification" />
                  <Tab label="Updates" />
                </Tabs>
              </Box>

              <TabPanel value={selectedTab} index={0}>
                <EmailList />
              </TabPanel>

              <TabPanel value={selectedTab} index={1}>
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
                <Paper elevation={1} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    System Updates
                  </Typography>
                  <Typography color="text.secondary">
                    Recent system updates and notifications will appear here.
                  </Typography>
                </Paper>
              </TabPanel>
            </>
          ) : (
            <EmailDetail email={selectedEmail} />
          )}
        </ContentArea>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;