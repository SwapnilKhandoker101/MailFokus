import React, { useEffect, useState } from "react";
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
  Divider,
  IconButton,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

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
  Label as EntityIcon,
} from "@mui/icons-material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Layout from "./Layout";
import { useApi } from "../utils/api";
import { Button } from "@mui/material";
import { startTransition } from "react";
import SearchbarHeader from "../components/SearchbarHeader";

// Styled components
const DashboardContainer = styled(Box)({
  display: "flex",
  height: "100vh",
});

const MainContent = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const ContentArea = styled(Box)({
  flex: 1,
  padding: "20px",
  backgroundColor: "#F8F9FA",
  overflow: "auto",
});

const TabPanel = ({ children, value, index }) => {
  return <div hidden={value !== index}>{value === index && children}</div>;
};

// Mock email data
// const mockEmails = [
//   {
//     id: 1,
//     from: "Samantha Lee",
//     subject: "Quarterly Planning Meeting",
//     preview: "Let's discuss our quarterly planning...",
//     time: "10:41 PM",
//     category: "Meeting",
//     read: false,
//   },
//   {
//     id: 2,
//     from: "John Smith",
//     subject: "Meeting Reschedule",
//     preview: "The project status meeting previously...",
//     time: "12:01 PM",
//     category: "Follow-Up",
//     read: false,
//   },
//   {
//     id: 3,
//     from: "Newsletter",
//     subject: "Design Review",
//     preview: "Weekly design newsletter with...",
//     time: "11:59 AM",
//     category: "Work",
//     read: true,
//   },
//   {
//     id: 4,
//     from: "Rachel Turner",
//     subject: "Budget Report",
//     preview: "Here is the latest budget report...",
//     time: "5:49 AM",
//     category: "Work",
//     read: false,
//   },
// ];

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabsLoaded, setTabsLoaded] = useState({
    summary: false,
    classification: false,
  });
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [selectedNER, setSelectedNER] = useState(null);

  const [emails, setEmails] = useState([]);

  // const [summarizedEmails, setSummarizedEmails] = useState([]);

  // const [categorizedEmails, setCategorizedEmails] = useState([]);

  // const [nerEmails, setNerEmails] = useState([]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generateStatus, setGenerateStatus] = useState("");

  const [isGeneratingCategory, setIsGeneratingCategory] = useState(false);
  const [generateStatusCategory, setGenerateStatusCategory] = useState("");

  const [isGeneratingNer, setIsGeneratingNer] = useState(false);
  const [generateStatusNer, setGenerateStatusNer] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { makeRequest } = useApi();

  useEffect(() => {
    const savedEmails = localStorage.getItem("emails");
    if (savedEmails) {
      setEmails(JSON.parse(savedEmails));
    } else {
      loadEmails();
    }
  }, []);

  useEffect(() => {
    if (emails.length > 0) {
      localStorage.setItem("emails", JSON.stringify(emails));
    }
  }, [emails]);

  const handleTabChange = async (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedEmail(null);
    setSelectedSummary(null);
    setSelectedNER(null);
    // if (newValue === 0) {
    //   // When switching to Inbox tab, reload emails
    //   await loadEmails();
    // }
    // if (newValue===1 && !tabsLoaded.summary){
    //   setIsGenerating(true)
    //   await loadSummarizedEmails()
    //   setTabsLoaded((prev)=>({...prev,summary:true}))
    //   setIsGenerating(false)
    // }
    // if (newValue===2 && !tabsLoaded.ner){
    //   setIsGeneratingNer(true);
    //   await generateNer();
    //   setTabsLoaded((prev) => ({ ...prev, ner: true }));
    //   setIsGeneratingNer(false);
    // }
  };

  const handleEmailClick = (email) => {
    // Mark email as read
    setEmails((prev) =>
      prev.map((e) => (e.id === email.id ? { ...e, read: true } : e))
    );
    setSelectedEmail(email);
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
    setEmails((prev) =>
      prev.map((e) => (e.id === emailId ? { ...e, starred: !e.starred } : e))
    );
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail((prev) => ({ ...prev, starred: !prev.starred }));
    }
  };

  const handleSummaryClick = (email) => {
    setSelectedSummary(email);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Meeting: "#2196F3",
      "Follow-Up": "#FF9800",
      Work: "#4CAF50",
      Updates: "#9C27B0",
    };
    return colors[category] || "#757575";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      High: "#F44336",
      Medium: "#FF9800",
      Low: "#4CAF50",
    };
    return colors[priority] || "#757575";
  };

  const getEntityIcon = (type) => {
    const icons = {
      persons: <PersonIcon />,
      organizations: <OrganizationIcon />,
      locations: <LocationIcon />,
      dates: <DateIcon />,
      money: <MoneyIcon />,
      misc: <EntityIcon />,
    };
    return icons[type] || <EntityIcon />;
  };

  const getEntityColor = (type) => {
    const colors = {
      persons: "#2196F3",
      organizations: "#FF9800",
      locations: "#4CAF50",
      dates: "#9C27B0",
      money: "#F44336",
      misc: "#757575",
    };
    return colors[type] || "#757575";
  };

  // const [summarizedEmails,setSummarizedEmails]=useState([])

  // useEffect(() => {
  //   extractAndLoadEmails();
  // }, []);

  // const extractAndLoadEmails = async () => {
  //   try {
  //     await makeRequest("extract-original-emails");
  //     await loadEmails(); // this calls get-emails
  //   } catch (err) {
  //     console.error("❌ Failed to extract or load emails:", err.message);
  //   }
  // };

  // useEffect(() => {
  //   const debounceTimer = setTimeout(() => {
  //     startTransition(() => {
  //       loadEmails();
  //     });
  //   }, 500);

  //   return () => clearTimeout(debounceTimer);
  // }, []);

  // useEffect(() => {
  //   loadEmails();
  // }, []);


  const filteredEmails = emails.filter((email) => {
    const term = searchTerm.toLowerCase();

    return (
      email.email_subject?.toLowerCase().includes(term) ||
      email.original_email?.toLowerCase().includes(term) ||
      email.summary?.toLowerCase().includes(term) ||
      email.category?.toLowerCase().includes(term) ||
      email.sender?.toLowerCase().includes(term)
    );
  });

  const loadEmails = async () => {
    try {
      const data = await makeRequest("get-emails");
      setEmails(data);

      // Repeat loading every 3 seconds for 15 seconds
      // let attempts = 0;
      // const interval = setInterval(async () => {
      //   const refreshed = await makeRequest("get-emails");
      //   setEmails(refreshed);
      //   attempts++;
      //   if (attempts >= 5) clearInterval(interval); // 5 tries ~ 15 sec
      // }, 3000);
      console.log("successfully loaded emails");
    } catch (err) {
      console.error("Failed to load emails", err.message);
    }
  };

  // const loadSummarizedEmails = async () => {
  //   try {

  //     for (const email of emails) {
  //       if (!email.summary) {
  //         console.log("Inside load Sumamry");
  //         const summary = await makeRequest(`generate-summary/${email.id}`, {
  //           method: "POST",
  //         });
  //         console.log("Summary: ", summary);
  //         console.log("Summary generated successfully!");
  //         return {...email,summary:Response.summary}
  //       }
  //       return email;
  //     }
  //     setIsGenerating(false);
  //     setGenerateStatus("success");
  //     setTimeout(() => setGenerateStatus(""), 3000);
  //   } catch (err) {
  //     console.error("Failed to load emails with summary", err.message);
  //   }
  // };

  const loadSummarizedEmails = async () => {
    try {
      const updatedEmails = await Promise.all(
        emails.map(async (email) => {
          if (!email.summary) {
            const response = await makeRequest(`generate-summary/${email.id}`, {
              method: "POST",
            });
            return { ...email, summary: response.summary };
          }
          return email;
        })
      );

      setEmails(updatedEmails); // ✅ update main email state
      setIsGenerating(false);
      setGenerateStatus("success");
      setTimeout(() => setGenerateStatus(""), 3000);
    } catch (err) {
      console.error("Failed to load summaries", err.message);
    }
  };

  // const generateSummary = async () => {
  //   try {
  //     for (const email of emails) {
  //       if (!email.summary) {
  //         console.log("Inside generate summary: ", email.id);
  //         const summary = await makeRequest(`generate-summary/${email.id}`, {
  //           method: "POST",
  //         });

  //         console.log("Summary: ", summary);
  //         console.log("Summary generated successfully!");
  //       }
  //     }
  //     setIsGenerating(false);
  //     setGenerateStatus("success");
  //     setTimeout(() => setGenerateStatus(""), 3000);
  //   } catch (err) {
  //     console.error("Failed to load emails", err.message);
  //   }
  // };

  // const loadCategory = async () => {
  //   try {
  //     for (const email of emails) {
  //       if (!email.category) {
  //         console.log("Inside generate category", email.id);
  //         const category = await makeRequest(`generate-category/${email.id}`, {
  //           method: "POST",
  //         });

  //         console.log("Category: ", category);
  //         console.log("Category generated successfully!");
  //         setCategorizedEmails(category);
  //       }
  //     }
  //     setIsGeneratingCategory(false);
  //     setGenerateStatusCategory("success");
  //     setTimeout(() => setGenerateStatusCategory(""), 3000);
  //   } catch (error) {
  //     console.error("Failed to load category", error.message);
  //   }
  // };

  const loadCategory = async () => {
    try {
      const updatedEmails = await Promise.all(
        emails.map(async (email) => {
          if (!email.category) {
            const response = await makeRequest(
              `generate-category/${email.id}`,
              {
                method: "POST",
              }
            );
            return { ...email, category: response.category };
          }
          return email;
        })
      );

      setEmails(updatedEmails);
      setIsGeneratingCategory(false);
      setGenerateStatusCategory("success");
      setTimeout(() => setGenerateStatusCategory(""), 3000);
    } catch (error) {
      console.error("Failed to load categories", error.message);
    }
  };

  const generateNer = async () => {
    try {
      const updatedEmails = await Promise.all(
        emails.map(async (email) => {
          if (!email.named_entities) {
            const response = await makeRequest(
              `generate-named-entities/${email.id}`,
              {
                method: "POST",
              }
            );

            const grouped = {};
            response.named_entities.forEach(([name, type]) => {
              const key = type.toLowerCase() + "s"; // ORG → organizations, LOC → locations
              if (!grouped[key]) grouped[key] = [];
              grouped[key].push(name);
            });
            console.log(grouped);
            return { ...email, named_entities: grouped };
          }
          return email;
        })
      );

      setEmails(updatedEmails);
      setIsGeneratingNer(false);
      setGenerateStatusNer("success");
      setTimeout(() => setGenerateStatusNer(""), 3000);
    } catch (error) {
      console.error("❌ Failed to load NER", error.message);
    }
  };

  // const generateNer = async () => {
  //   try {
  //     for (const email of emails) {
  //       if (!email.category) {
  //         console.log("Inside generate Ner", email.id);
  //         const Ner = await makeRequest(`generate-named-entities/${email.id}`, {
  //           method: "POST",
  //         });

  //         console.log("Ner: ", Ner);
  //         console.log("Ner generated successfully!");
  //         setNerEmails(Ner);
  //       }
  //     }
  //     setIsGeneratingNer(false);
  //     setGenerateStatusNer("success");
  //     setTimeout(() => setGenerateStatusNer(""), 3000);
  //   } catch (error) {
  //     console.error("Failed to load Ner", error.message);
  //   }
  // };

  // const generateSummary = async () => {
  //   try {
  //     setIsGenerating(true);

  //     const tasks = emails
  //       .filter((email) => !email.summary)
  //       .map(async (email) => {
  //         const [summaryData, categoryData] = await Promise.all([
  //           makeRequest(`generate-summary/${email.id}`, { method: "POST" }),
  //           makeRequest(`generate-category/${email.id}`, { method: "POST" }),
  //         ]);

  //         return {
  //           id: email.id,
  //           summary: summaryData.summary,
  //           category: categoryData.category,
  //         };
  //       });

  //     const results = await Promise.all(tasks);

  //     setEmails((prevEmails) =>
  //       prevEmails.map((e) => {
  //         const updated = results.find((r) => r.id === e.id);
  //         return updated ? { ...e, ...updated } : e;
  //       })
  //     );

  //     setIsGenerating(false);
  //     setGenerateStatus("success");
  //     setTimeout(() => setGenerateStatus(""), 3000);
  //   } catch (err) {
  //     console.error("Failed to generate summaries", err.message);
  //     setIsGenerating(false);
  //   }
  // };

  // const generateSummary = async () => {
  //   try {
  //     for (const email of emails) {
  //       if (!email.summary) {
  //         console.log("Inside generate summary: ", email.id);
  //         const summary = await makeRequest(`generate-summary/${email.id}`, {
  //           method: "POST",
  //         });
  //       }
  //     }
  //     console.log(emails)
  //     setIsGenerating(false);
  //     setGenerateStatus("success");
  //     setTimeout(() => setGenerateStatus(""), 3000);
  //   } catch (err) {
  //     console.error("Failed to load emails", err.message);
  //     setIsGenerating(false);
  //   }
  // };

  // const generateCategory=async()=>{
  //   try{
  //     for (const email of emails){
  //       if(!email.category){
  //         console.log('Inside generating categories')
  //       }
  //     }

  //   }catch(err){
  //     console.error("Failed to load emails and generate category",err.message)
  //   }
  // }

  // const generateSummaryforEmails = async () => {
  //   try {

  //     for (const email of emails){
  //       if (!email.summary){
  //         const summarizedemailrecords = await makeRequest(
  //           `generate-summary/${email.id}`,
  //           {
  //             method: "POST",
  //           }
  //         );

  //       }

  //     }

  //   } catch (err) {
  //     console.error("Failed to load summaries", err.message);
  //   }
  // };

  // const fetchSummarizedEmail=async()=>{
  //   try{
  //     const data = await makeRequest("/get-summarized-emails");
  //     setSummarizedEmails(data);

  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  // Email list view
  const EmailList = () => (
    <Paper elevation={1}>
      <List>
        {filteredEmails.map((email) => (
          <ListItem
            key={email.id}
            sx={{
              borderBottom: "1px solid #eee",
              "&:hover": { backgroundColor: "#f5f5f5" },
              cursor: "pointer",
            }}
            onClick={() => handleEmailClick(email)}
          >
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: email.read ? 400 : 600 }}
                  >
                    {email.sender}
                  </Typography>
                  <Chip
                    label={email.original_email_label || "Uncategorized"}
                    size="small"
                    sx={{
                      backgroundColor: getCategoryColor(email.category),
                      color: "white",
                      fontSize: "0.75rem",
                    }}
                  />
                  {email.starred && (
                    <StarIcon sx={{ color: "#FFD700", fontSize: 16 }} />
                  )}
                </Box>
              }
              secondary={
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: email.read ? 400 : 600 }}
                  >
                    {email.email_subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {email.original_email?.slice(0, 100) + "..."}
                  </Typography>
                </Box>
              }
            />
            {/* <Typography variant="caption" color="text.secondary">
              {email.time}
            </Typography> */}
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  // Email detail view
  const EmailDetail = ({ email }) => (
    <Paper
      elevation={1}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* Email Header */}
      <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={handleBackToList} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {email.subject}
          </Typography>
          <IconButton onClick={() => handleStarToggle(email.id)}>
            {email.starred ? (
              <StarIcon sx={{ color: "#FFD700" }} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="body1" fontWeight={600}>
              {email.sender}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {email.sender}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            {/* <Typography variant="body2" color="text.secondary">
              {email.date}
            </Typography> */}
            {/* <Typography variant="body2" color="text.secondary">
              {email.time}
            </Typography> */}
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip
            label={email.category || "Uncategorized"}
            size="small"
            sx={{
              backgroundColor: getCategoryColor(email.category),
              color: "white",
            }}
          />
          {/* {email.attachments.length > 0 && (
            <Chip
              label={`${email.attachments.length} Attachment${
                email.attachments.length > 1 ? "s" : ""
              }`}
              size="small"
              variant="outlined"
            />
          )} */}
        </Box>
      </Box>

      {/* Email Content */}
      <Box sx={{ flex: 1, p: 2, overflow: "auto" }}>
        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-line", lineHeight: 1.6 }}
        >
          {email.original_email}
        </Typography>

        {/* {email.attachments.length > 0 && (
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
        )} */}
      </Box>

      {/* Email Actions */}
      <Box sx={{ p: 2, borderTop: "1px solid #eee", display: "flex", gap: 1 }}>
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

  const getEntityCount = (entities) => {
    if (!entities) return 0;

    let parsed = entities;

    if (typeof parsed === "string") {
      try {
        parsed = JSON.parse(parsed);
      } catch {
        return 0;
      }
    }

    if (typeof parsed !== "object") return 0;

    return Object.values(parsed)
      .filter((v) => Array.isArray(v))
      .reduce((acc, arr) => acc + arr.length, 0);
  };

  // NER list view
  const NERList = () => (
    <Paper elevation={1}>
      <List>
        {filteredEmails
          .filter((email) => email.named_entities)
          .map((email) => (
            <ListItem
              key={email.id}
              sx={{
                borderBottom: "1px solid #eee",
                "&:hover": { backgroundColor: "#f5f5f5" },
                cursor: "pointer",
              }}
              onClick={() => handleNERClick(email)}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <NERIcon sx={{ color: "secondary.main", fontSize: 18 }} />
                    <Typography variant="body1" fontWeight={600}>
                      {email.email_subject}
                    </Typography>
                    <Chip
                      label={`${getEntityCount(email.named_entities)} entities`}
                      size="small"
                      sx={{
                        backgroundColor: "#9C27B0",
                        color: "white",
                        fontSize: "0.75rem",
                      }}
                    />
                  </Box>
                }
                // secondary={
                //   <Box sx={{ mt: 1 }}>
                //     {/* <Typography variant="body2" color="text.secondary">
                //       From: {email.from} • {email.date}
                //     </Typography> */}
                //     <Box
                //       sx={{
                //         display: "flex",
                //         gap: 0.5,
                //         mt: 0.5,
                //         flexWrap: "wrap",
                //       }}
                //     >
                //       {Object.entries(email.named_entities).map(
                //         ([type, entities]) =>{
                //           if(!Array.isArray(entities)) return null;
                //           return entities.slice(0,2).map((entity,index)=>(
                //             <Chip
                //               key={`${type}-${index}`}
                //               label={entity}
                //               size="small"
                //               variant="outlined"
                //               sx={{ fontSize: "0.7rem" }}
                //             />
                //           ))
                //         }

                //       )}
                //     </Box>
                //   </Box>
                // }
                secondary={(() => {
                  let parsed = email.named_entities;

                  // Defensive check: parse if it's string
                  if (typeof parsed === "string") {
                    try {
                      parsed = JSON.parse(parsed);
                    } catch (e) {
                      console.warn("⚠️ Couldn't parse named_entities", parsed);
                      parsed = {};
                    }
                  }

                  if (!parsed || typeof parsed !== "object") return null;

                  return (
                    <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
                      {Object.entries(parsed).map(([type, entities]) => {
                        if (!Array.isArray(entities)) return null;
                        return entities
                          .slice(0, 2)
                          .map((entity, index) => (
                            <Chip
                              key={`${type}-${index}`}
                              label={entity}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: "0.7rem" }}
                            />
                          ));
                      })}
                    </Box>
                  );
                })()}
              />
            </ListItem>
          ))}
      </List>
    </Paper>
  );

  // const NERList = () => {

  // <Paper elevation={1}>
  //   <List>
  //     {emails
  //       .filter((email) => email.named_entities)
  //       .map((email, index) => {
  //         let parsedEntities = [];

  //         parsedEntities = JSON.parse(email.named_entities);

  //         return (
  //           <ListItem
  //             key={email.id}
  //             sx={{
  //               borderBottom: "1px solid #eee",
  //               "&:hover": { backgroundColor: "#f5f5f5" },
  //               cursor: "pointer",
  //             }}
  //             onClick={() => handleNERClick(email)}
  //           >
  //             <ListItemText
  //               primary={
  //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  //                   <NERIcon sx={{ color: "secondary.main", fontSize: 18 }} />
  //                   <Typography variant="body1" fontWeight={600}>
  //                     {email.email_subject}
  //                   </Typography>
  //                   <Chip
  //                     label={`${
  //                       Object.values(email.named_entities).flat().length
  //                     } entities`}
  //                     size="small"
  //                     sx={{
  //                       backgroundColor: "#9C27B0",
  //                       color: "white",
  //                       fontSize: "0.75rem",
  //                     }}
  //                   />
  //                 </Box>
  //               }
  //               secondary={
  //                 <Box sx={{ mt: 1 }}>
  //                   {/* <Typography variant="body2" color="text.secondary">
  //               From: {email.from} • {email.date}
  //             </Typography> */}
  //                   <Box
  //                     sx={{
  //                       display: "flex",
  //                       gap: 0.5,
  //                       mt: 0.5,
  //                       flexWrap: "wrap",
  //                     }}
  //                   >
  //                     {Object.entries(parsedEntities).map(
  //                       ([word, type], idx) =>
  //                         parsedEntities.length > 0 && (
  //                           <Chip
  //                             key={idx}
  //                             label={`${word} (${type})`}
  //                             size="small"
  //                             variant="outlined"
  //                             sx={{ fontSize: "0.7rem" }}
  //                           />
  //                         )
  //                     )}
  //                   </Box>
  //                 </Box>
  //               }
  //             ></ListItemText>
  //           </ListItem>
  //         );

  //         //end
  //       })}
  //   </List>
  // </Paper>;
  // };

  // Entities component for Summarization tab
  const EntitiesSection = () => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Entities
      </Typography>
      <Grid container spacing={2}>
        {emails
          .filter((email) => email.named_entities)
          .map((email) => (
            <Grid item xs={12} sm={6} md={4} key={email.id}>
              <Card
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
                onClick={() => handleNERClick(email)}
              >
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {email.email_subject}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ mb: 1 }}
                  >
                    From: {email.sender}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {/* {Object.entries(email.named_entities).map(
                      ([type, entities]) =>
                        entities.slice(0, 2).map((entity, index) => (
                          <Chip
                            key={`${type}-${index}`}
                            label={entity}
                            size="small"
                            sx={{
                              backgroundColor: getEntityColor(type),
                              color: "white",
                              fontSize: "0.7rem",
                            }}
                          />
                        ))
                    )} */}
                    {/* {Object.entries(email.named_entities).map(
                      ([type, entities]) => {
                        if (!Array.isArray(entities)) return null; // 🛡️ safeguard

                        return entities.slice(0, 2).map((entity, index) => (
                          <Chip
                            key={`${type}-${index}`}
                            label={entity}
                            size="small"
                            sx={{
                              backgroundColor: getEntityColor(type),
                              color: "white",
                              fontSize: "0.7rem",
                            }}
                          />
                        ));
                      }
                    )} */}
                    {email.named_entities &&
                      typeof email.named_entities === "object" &&
                      Object.entries(email.named_entities).map(
                        ([type, entities]) => {
                          if (!Array.isArray(entities)) return null;

                          return entities.slice(0, 2).map((entity, index) => (
                            <Chip
                              key={`${type}-${index}`}
                              label={entity}
                              size="small"
                              sx={{
                                backgroundColor: getEntityColor(type),
                                color: "white",
                                fontSize: "0.7rem",
                              }}
                            />
                          ));
                        }
                      )}
                    {Object.values(email.named_entities).flat().length > 6 && (
                      <Chip
                        label={`${getEntityCount(
                          email.named_entities
                        )} `}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.7rem" }}
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

  // NER detail view
  // const NERDetail = ({ email }) => (
  //   <Paper
  //     elevation={1}
  //     sx={{ height: "100%", display: "flex", flexDirection: "column" }}
  //   >
  //     <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
  //       <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
  //         <IconButton onClick={handleBackToList} sx={{ mr: 1 }}>
  //           <ArrowBackIcon />
  //         </IconButton>
  //         <NERIcon sx={{ mr: 1, color: "secondary.main" }} />
  //         <Typography variant="h6" sx={{ flexGrow: 1 }}>
  //           Named Entities
  //         </Typography>
  //         <Chip
  //           label={`${
  //             Object.values(email.named_entities).flat().length
  //           } entities`}
  //           size="small"
  //           sx={{
  //             backgroundColor: "#9C27B0",
  //             color: "white",
  //           }}
  //         />
  //       </Box>

  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //           mb: 2,
  //         }}
  //       >
  //         <Box>
  //           <Typography variant="body1" fontWeight={600}>
  //             Email: {email.email_subject}
  //           </Typography>
  //           {/* <Typography variant="body2" color="text.secondary">
  //             From: {email.from} • {email.date}
  //           </Typography> */}
  //         </Box>
  //       </Box>
  //     </Box>

  //     <Box sx={{ flex: 1, p: 2, overflow: "auto" }}>
  //       {Object.entries(email.named_entities).map(
  //         ([type, entities]) =>
  //           entities.length > 0 && (
  //             <Box key={type} sx={{ mb: 3 }}>
  //               <Box
  //                 sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
  //               >
  //                 {getEntityIcon(type)}
  //                 <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
  //                   {type} ({entities.length})
  //                 </Typography>
  //               </Box>
  //               <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
  //                 {entities.map(([word, type], index) => (
  //                   <Chip
  //                     key={index}
  //                     label={`${word} (${type})`}
  //                     sx={{
  //                       backgroundColor: getEntityColor(type),
  //                       color: "white",
  //                     }}
  //                   />
  //                 ))}
  //               </Box>
  //             </Box>
  //           )
  //       )}

  //       <Button
  //         variant="outlined"
  //         onClick={() => handleEmailClick(email)}
  //         sx={{ mt: 2 }}
  //       >
  //         View Original Email
  //       </Button>
  //     </Box>
  //   </Paper>
  // );

  const NERDetail = ({ email }) => {
    let entities = email.named_entities;
    let parsedEntities = [];

    try {
      if (typeof entities === "string") {
        parsedEntities = JSON.parse(entities);
      } else {
        parsedEntities = entities || [];
      }
    } catch (err) {
      console.error("Invalid entity format", entities);
      parsedEntities = [];
    }

    return (
      // <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
      //   {parsedEntities.slice(0, 50).map(([word, type], idx) => (
      //     <Chip key={idx} label={`${word} (${type})`} />
      //   ))}
      // </div>

      <Paper
        elevation={1}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton onClick={handleBackToList} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {email.subject}
            </Typography>
            <Chip
              label={email.category}
              size="small"
              sx={{
                backgroundColor: getPriorityColor(email.category),
                color: "white",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="body1" fontWeight={600}>
                <Typography variant="body1" fontWeight={800}>
                  Named Entities
                </Typography>
                <br></br>
                Email Subject: {email.email_subject}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                From: {email.sender}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1, p: 2, overflow: "auto" }}>
          <Box>
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-line", lineHeight: 1.6 }}
            >
              {parsedEntities.slice(0, 50).map(([word, type], idx) => (
                <Chip key={idx} label={`${type} : ${word} `} />
              ))}
            </Typography>

            <Button
              variant="outlined"
              onClick={() => {
                const originalEmail = emails.find((e) => e.id === email.id);
                if (originalEmail) handleEmailClick(originalEmail);
              }}
              sx={{ mt: 2 }}
            >
              View Original Email
            </Button>
          </Box>
        </Box>
      </Paper>
    );
  };

  // Summarylist view
  const SummaryList = () => (
    <Paper elevation={1}>
      <List>
        {filteredEmails
          .filter((email) => email.summary)
          .map((email) => (
            <ListItem
              key={email.id}
              sx={{
                borderBottom: "1px solid #eee",
                "&:hover": { backgroundColor: "#f5f5f5" },
                cursor: "pointer",
              }}
              onClick={() => handleSummaryClick(email)}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <SummaryIcon sx={{ color: "primary.main", fontSize: 18 }} />
                    <Typography variant="body1" fontWeight={600}>
                      {email.email_subject}
                    </Typography>
                    {/* <Chip
                      label={email.summary.priority}
                      size="small"
                      sx={{
                        backgroundColor: getPriorityColor(
                          email.summary.priority
                        ),
                        color: "white",
                        fontSize: "0.75rem",
                      }}
                    /> */}
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      From: {email.sender}
                    </Typography>
                    {/* <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Action: {email.summary.action}
                    </Typography> */}
                  </Box>
                }
              />
            </ListItem>
          ))}
      </List>
    </Paper>
  );

  const SummaryDetail = ({ email }) => {
    // const category = summarizedEmail.category || "Uncategorized";
    // const category = categorized
    //   ? categorized.category
    //   : summarizedEmail.category || "Uncategorized";
    return (
      <Paper
        elevation={1}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton onClick={handleBackToList} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <SummaryIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {email.subject}
            </Typography>
            <Chip
              label={email.category}
              size="small"
              sx={{
                backgroundColor: getPriorityColor(email.category),
                color: "white",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="body1" fontWeight={600}>
                Subject: {email.email_subject}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                From: {email.sender}
              </Typography>
            </Box>
            {/* <Chip
            label={email.summary.sentiment}
            variant="outlined"
            size="small"
          /> */}
          </Box>
        </Box>

        <Box sx={{ flex: 1, p: 2, overflow: "auto" }}>
          {/* <Typography variant="h6" gutterBottom>
          Key Points
        </Typography> */}
          {/* <Box sx={{ mb: 3 }}>
          {email.summary.keyPoints.map((point, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 1 }}>
              • {point}
            </Typography>
          ))}
        </Box> */}

          {/* Email Content */}
          <Box sx={{ flex: 1, p: 2, overflow: "auto" }}>
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-line", lineHeight: 1.6 }}
            >
              {email.summary}
            </Typography>

            {/* {email.attachments.length > 0 && (
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
        )} */}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* <Typography variant="h6" gutterBottom>
          Required Action
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}
        >
          {email.summary.action}
        </Typography> */}

          <Button
            variant="outlined"
            onClick={() => {
              const originalEmail = emails.find((e) => e.id === email.id);
              if (originalEmail) handleEmailClick(originalEmail);
            }}
            sx={{ mt: 2 }}
          >
            View Original Email
          </Button>
        </Box>
      </Paper>
    );
  };

  return (
    <DashboardContainer>
      <Sidebar />

      <MainContent>
        <SearchbarHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <ContentArea>
          {!selectedEmail && !selectedSummary && !selectedNER ? (
            <>
              <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                <Tabs value={selectedTab} onChange={handleTabChange}>
                  <Tab label="Inbox" />
                  <Tab label="Summarized" />
                  <Tab label="NER" />
                </Tabs>
              </Box>

              <TabPanel value={selectedTab} index={0}>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Inbox</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={
                      isLoading ? (
                        <CircularProgress size={16} />
                      ) : (
                        <SummaryIcon />
                      )
                    }
                    onClick={async () => {
                      setisLoading(true);
                      await loadEmails(); // triggers backend generation
                      setisLoading(false);
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Load"}
                  </Button>
                </Box>

                <EmailList />
              </TabPanel>

              <TabPanel value={selectedTab} index={1}>
                <Box sx={{ mb: 2 }}>
                  {generateStatus === "success" && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Summaries generated successfully!
                    </Alert>
                  )}

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="h6">Email Summaries</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={
                        isGenerating ? (
                          <CircularProgress size={16} />
                        ) : (
                          <SummaryIcon />
                        )
                      }
                      onClick={async () => {
                        setIsGenerating(true);
                        await Promise.all([loadSummarizedEmails()]);
                        await loadEmails();
                        setIsGenerating(false);
                      }}
                      disabled={isGenerating}
                    >
                      {isGenerating ? "Generating..." : "Generate Summaries"}
                    </Button>
                    categories generating:
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={
                        isGeneratingCategory ? (
                          <CircularProgress size={16} />
                        ) : (
                          <SummaryIcon />
                        )
                      }
                      onClick={async () => {
                        setIsGeneratingCategory(true);
                        await Promise.all([loadCategory()]);
                        await loadEmails();
                        setIsGeneratingCategory(false);
                      }}
                      disabled={isGeneratingCategory}
                    >
                      {isGeneratingCategory
                        ? "Generating..."
                        : "Generate Categories"}
                    </Button>
                  </Box>
                </Box>
                <SummaryList />
                <EntitiesSection />
              </TabPanel>

              <TabPanel value={selectedTab} index={2}>
                <Box sx={{ mb: 2 }}>
                  {generateStatusNer === "success" && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Named entities extracted successfully!
                    </Alert>
                  )}

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="h6">
                      Named Entity Recognition
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={
                        isGeneratingNer ? (
                          <CircularProgress size={16} />
                        ) : (
                          <NERIcon />
                        )
                      }
                      onClick={async () => {
                        await generateNer();
                        await loadEmails();
                      }}
                      disabled={isGeneratingNer}
                    >
                      {isGeneratingNer ? "Extracting..." : "Extract Entities"}
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
