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
  IconButton,
  Divider,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Reply as ReplyIcon,
  Forward as ForwardIcon,
  Delete as DeleteIcon,
  AutoAwesome as SummaryIcon,
  Psychology as NERIcon,
  Person as PersonIcon,
  Business as OrganizationIcon,
  LocationOn as LocationIcon,
  CalendarToday as DateIcon,
  AttachMoney as MoneyIcon,
  Label as EntityIcon
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import SearchbarHeader from '../components/SearchbarHeader';

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

// Mock email data with summaries and entities
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
    attachments: ['Q4_Budget_Review.pdf', 'Performance_Metrics.xlsx'],
    summary: {
      title: 'Quarterly Planning Meeting Request',
      keyPoints: [
        'Quarterly planning meeting scheduled for next week',
        'Topics: Q4 budget review, next quarter objectives, team allocation',
        'Documents attached for review: performance metrics and budget draft'
      ],
      action: 'Review attached documents before meeting',
      priority: 'High',
      sentiment: 'Professional'
    },
    entities: {
      persons: ['Samantha Lee'],
      organizations: ['Q4'],
      locations: [],
      dates: ['next week', 'last quarter'],
      money: [],
      misc: ['quarterly planning meeting', 'budget review', 'performance metrics', 'budget draft']
    }
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
    attachments: [],
    summary: {
      title: 'Meeting Reschedule Request',
      keyPoints: [
        'Project status meeting moved from tomorrow 2 PM to Thursday 2 PM',
        'Reason: urgent client call conflict',
        'Same agenda: timeline review, budget update, risk assessment'
      ],
      action: 'Confirm Thursday availability',
      priority: 'Medium',
      sentiment: 'Apologetic'
    },
    entities: {
      persons: ['John Smith'],
      organizations: [],
      locations: [],
      dates: ['tomorrow', 'Thursday', '2 PM'],
      money: [],
      misc: ['project status meeting', 'client call', 'timeline review', 'budget status', 'risk assessment']
    }
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
    attachments: [],
    summary: {
      title: 'Design Newsletter - Weekly Highlights',
      keyPoints: [
        'Design trends: minimalist UI, bold typography, color psychology',
        'New tools: Figma plugins, CSS Grid best practices',
        'Case studies: Spotify and Netflix interface design'
      ],
      action: 'Review design resources and trends',
      priority: 'Low',
      sentiment: 'Informative'
    },
    entities: {
      persons: [],
      organizations: ['Spotify', 'Netflix', 'Design Review Team'],
      locations: [],
      dates: ['This week'],
      money: [],
      misc: ['Figma plugins', 'CSS Grid', 'UI patterns', 'typography', 'color psychology']
    }
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
    attachments: ['Q4_Budget_Report.pdf', 'Cost_Analysis.xlsx'],
    summary: {
      title: 'Q4 Budget Report Analysis',
      keyPoints: [
        'Budget performance: 95% of target achieved',
        'Operational costs up 12%, marketing ROI up 8%',
        'Software licensing costs down 15%'
      ],
      action: 'Review report and provide feedback by Friday',
      priority: 'High',
      sentiment: 'Professional'
    },
    entities: {
      persons: ['Rachel Turner'],
      organizations: ['Q4', 'Q1'],
      locations: [],
      dates: ['Friday'],
      money: ['12%', '8%', '15%', '95%'],
      misc: ['budget report', 'operational costs', 'Marketing ROI', 'software licensing', 'departmental allocations']
    }
  }
];

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [selectedNER, setSelectedNER] = useState(null);
  const [emails, setEmails] = useState(mockEmails);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingNER, setIsGeneratingNER] = useState(false);
  const [generateStatus, setGenerateStatus] = useState('');
  const [nerStatus, setNerStatus] = useState('');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedEmail(null);
    setSelectedSummary(null);
    setSelectedNER(null);
  };

  const handleEmailClick = (email) => {
    setEmails(prev => prev.map(e =>
        e.id === email.id ? { ...e, read: true } : e
    ));
    setSelectedEmail(email);
  };

  const handleSummaryClick = (email) => {
    setSelectedSummary(email);
  };

  const handleNERClick = (email) => {
    setSelectedNER(email);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
    setSelectedSummary(null);
    setSelectedNER(null);
  };

  const handleStarToggle = (emailId) => {
    setEmails(prev => prev.map(e =>
        e.id === emailId ? { ...e, starred: !e.starred } : e
    ));
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail(prev => ({ ...prev, starred: !prev.starred }));
    }
  };

  const generateSummary = async () => {
    setIsGenerating(true);
    setGenerateStatus('');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setGenerateStatus('success');
    setTimeout(() => setGenerateStatus(''), 3000);
  };

  const generateNER = async () => {
    setIsGeneratingNER(true);
    setNerStatus('');
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsGeneratingNER(false);
    setNerStatus('success');
    setTimeout(() => setNerStatus(''), 3000);
  };

  const loadEmails = async () => {
    console.log('Loading emails...');
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

  const getPriorityColor = (priority) => {
    const colors = {
      'High': '#F44336',
      'Medium': '#FF9800',
      'Low': '#4CAF50'
    };
    return colors[priority] || '#757575';
  };

  const getEntityIcon = (type) => {
    const icons = {
      persons: <PersonIcon />,
      organizations: <OrganizationIcon />,
      locations: <LocationIcon />,
      dates: <DateIcon />,
      money: <MoneyIcon />,
      misc: <EntityIcon />
    };
    return icons[type] || <EntityIcon />;
  };

  const getEntityColor = (type) => {
    const colors = {
      persons: '#2196F3',
      organizations: '#FF9800',
      locations: '#4CAF50',
      dates: '#9C27B0',
      money: '#F44336',
      misc: '#757575'
    };
    return colors[type] || '#757575';
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

  // Summary list view
  const SummaryList = () => (
      <Paper elevation={1}>
        <List>
          {emails.filter(email => email.summary).map((email) => (
              <ListItem
                  key={email.id}
                  sx={{
                    borderBottom: '1px solid #eee',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                    cursor: 'pointer'
                  }}
                  onClick={() => handleSummaryClick(email)}
              >
                <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SummaryIcon sx={{ color: 'primary.main', fontSize: 18 }} />
                        <Typography variant="body1" fontWeight={600}>
                          {email.summary.title}
                        </Typography>
                        <Chip
                            label={email.summary.priority}
                            size="small"
                            sx={{
                              backgroundColor: getPriorityColor(email.summary.priority),
                              color: 'white',
                              fontSize: '0.75rem'
                            }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          From: {email.from} • {email.date}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          Action: {email.summary.action}
                        </Typography>
                      </Box>
                    }
                />
              </ListItem>
          ))}
        </List>
      </Paper>
  );

  // NER list view
  const NERList = () => (
      <Paper elevation={1}>
        <List>
          {emails.filter(email => email.entities).map((email) => (
              <ListItem
                  key={email.id}
                  sx={{
                    borderBottom: '1px solid #eee',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                    cursor: 'pointer'
                  }}
                  onClick={() => handleNERClick(email)}
              >
                <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <NERIcon sx={{ color: 'secondary.main', fontSize: 18 }} />
                        <Typography variant="body1" fontWeight={600}>
                          {email.subject}
                        </Typography>
                        <Chip
                            label={`${Object.values(email.entities).flat().length} entities`}
                            size="small"
                            sx={{
                              backgroundColor: '#9C27B0',
                              color: 'white',
                              fontSize: '0.75rem'
                            }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          From: {email.from} • {email.date}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                          {Object.entries(email.entities).map(([type, entities]) =>
                                  entities.length > 0 && (
                                      <Chip
                                          key={type}
                                          label={`${entities.length} ${type}`}
                                          size="small"
                                          variant="outlined"
                                          sx={{ fontSize: '0.7rem' }}
                                      />
                                  )
                          )}
                        </Box>
                      </Box>
                    }
                />
              </ListItem>
          ))}
        </List>
      </Paper>
  );

  // Entities component for Summarization tab
  const EntitiesSection = () => (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Entities
        </Typography>
        <Grid container spacing={2}>
          {emails.filter(email => email.entities).map((email) => (
              <Grid item xs={12} sm={6} md={4} key={email.id}>
                <Card
                    variant="outlined"
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#f5f5f5' }
                    }}
                    onClick={() => handleNERClick(email)}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="subtitle2" gutterBottom>
                      {email.subject}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                      From: {email.from}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {Object.entries(email.entities).map(([type, entities]) =>
                          entities.slice(0, 2).map((entity, index) => (
                              <Chip
                                  key={`${type}-${index}`}
                                  label={entity}
                                  size="small"
                                  sx={{
                                    backgroundColor: getEntityColor(type),
                                    color: 'white',
                                    fontSize: '0.7rem'
                                  }}
                              />
                          ))
                      )}
                      {Object.values(email.entities).flat().length > 6 && (
                          <Chip
                              label={`+${Object.values(email.entities).flat().length - 6} more`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.7rem' }}
                          />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
          ))}
        </Grid>
      </Box>
  );

  // Email detail view
  const EmailDetail = ({ email }) => (
      <Paper elevation={1} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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

  // Summary detail view
  const SummaryDetail = ({ email }) => (
      <Paper elevation={1} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={handleBackToList} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <SummaryIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {email.summary.title}
            </Typography>
            <Chip
                label={email.summary.priority}
                size="small"
                sx={{
                  backgroundColor: getPriorityColor(email.summary.priority),
                  color: 'white'
                }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="body1" fontWeight={600}>
                Original Email: {email.subject}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                From: {email.from} • {email.date}
              </Typography>
            </Box>
            <Chip
                label={email.summary.sentiment}
                variant="outlined"
                size="small"
            />
          </Box>
        </Box>

        <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            Key Points
          </Typography>
          <Box sx={{ mb: 3 }}>
            {email.summary.keyPoints.map((point, index) => (
                <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                  • {point}
                </Typography>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Required Action
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            {email.summary.action}
          </Typography>

          <Button
              variant="outlined"
              onClick={() => handleEmailClick(email)}
              sx={{ mt: 2 }}
          >
            View Original Email
          </Button>
        </Box>
      </Paper>
  );

  // NER detail view
  const NERDetail = ({ email }) => (
      <Paper elevation={1} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={handleBackToList} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <NERIcon sx={{ mr: 1, color: 'secondary.main' }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Named Entities
            </Typography>
            <Chip
                label={`${Object.values(email.entities).flat().length} entities`}
                size="small"
                sx={{
                  backgroundColor: '#9C27B0',
                  color: 'white'
                }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="body1" fontWeight={600}>
                Email: {email.subject}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                From: {email.from} • {email.date}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
          {Object.entries(email.entities).map(([type, entities]) =>
                  entities.length > 0 && (
                      <Box key={type} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          {getEntityIcon(type)}
                          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                            {type} ({entities.length})
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {entities.map((entity, index) => (
                              <Chip
                                  key={index}
                                  label={entity}
                                  sx={{
                                    backgroundColor: getEntityColor(type),
                                    color: 'white'
                                  }}
                              />
                          ))}
                        </Box>
                      </Box>
                  )
          )}

          <Button
              variant="outlined"
              onClick={() => handleEmailClick(email)}
              sx={{ mt: 2 }}
          >
            View Original Email
          </Button>
        </Box>
      </Paper>
  );

  return (
      <DashboardContainer>
        <Sidebar />

        <MainContent>
          <SearchbarHeader />

          <ContentArea>
            {!selectedEmail && !selectedSummary && !selectedNER ? (
                <>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Tabs value={selectedTab} onChange={handleTabChange}>
                      <Tab label="Inbox" />
                      <Tab label="Summarized" />
                      <Tab label="NER" />
                    </Tabs>
                  </Box>

                  <TabPanel value={selectedTab} index={0}>
                    <EmailList />
                  </TabPanel>

                  <TabPanel value={selectedTab} index={1}>
                    <Box sx={{ mb: 2 }}>
                      {generateStatus === 'success' && (
                          <Alert severity="success" sx={{ mb: 2 }}>
                            Summaries generated successfully!
                          </Alert>
                      )}

                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Email Summaries</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={isGenerating ? <CircularProgress size={16} /> : <SummaryIcon />}
                            onClick={async () => {
                              await generateSummary();
                              await loadEmails();
                            }}
                            disabled={isGenerating}
                        >
                          {isGenerating ? 'Generating...' : 'Generate Summaries'}
                        </Button>
                      </Box>
                    </Box>
                    <SummaryList />
                    <EntitiesSection />
                  </TabPanel>

                  <TabPanel value={selectedTab} index={2}>
                    <Box sx={{ mb: 2 }}>
                      {nerStatus === 'success' && (
                          <Alert severity="success" sx={{ mb: 2 }}>
                            Named entities extracted successfully!
                          </Alert>
                      )}

                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Named Entity Recognition</Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={isGeneratingNER ? <CircularProgress size={16} /> : <NERIcon />}
                            onClick={async () => {
                              await generateNER();
                              await loadEmails();
                            }}
                            disabled={isGeneratingNER}
                        >
                          {isGeneratingNER ? 'Extracting...' : 'Extract Entities'}
                        </Button>
                      </Box>
                    </Box>
                    <NERList />
                  </TabPanel>
                </>
            ) : selectedEmail ? (
                <EmailDetail email={selectedEmail} />
            ) : selectedSummary ? (
                <SummaryDetail email={selectedSummary} />
            ) : (
                <NERDetail email={selectedNER} />
            )}
          </ContentArea>
        </MainContent>
      </DashboardContainer>
  );
};

export default Dashboard;