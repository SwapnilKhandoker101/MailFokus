import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  InputBase,
  Badge,
} from "@mui/material";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { UserButton, useUser } from "@clerk/clerk-react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchbarHeader = ({searchTerm,setSearchTerm}) => {
  const { user, isLoaded } = useUser();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        borderBottom: "1px solid #e0e0e0",
        zIndex: (theme) => theme.zIndex.drawer - 1, // ← Wichtig: Unter der Sidebar
      }}
    >
      <Toolbar>
        {/* Mobile Menu Button (optional) */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo/Title - nur auf kleinen Bildschirmen */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            display: { xs: "block", md: "none" },
            flexGrow: 1,
          }}
        >
          MailFokus
        </Typography>

        {/* Search Bar */}
        <Search sx={{ display: { xs: "none", md: "block" } }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* User Info & Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Welcome Message */}
          {isLoaded && user && (
            <Typography
              variant="body2"
              sx={{
                mr: 2,
                display: { xs: "none", sm: "block" },
                color: "text.secondary",
              }}
            >
              Welcome, {user.firstName || user.emailAddresses[0].emailAddress}
            </Typography>
          )}

          {/* Notifications */}
          <IconButton size="large" color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Clerk User Button - richtig integriert */}
          <Box
            sx={{
              "& .cl-userButtonBox": {
                flexDirection: "row-reverse", // User info rechts vom Avatar
              },
              "& .cl-userButtonTrigger": {
                height: "40px",
                width: "40px",
              },
            }}
          >
            <UserButton
              signOutCallback={() => {
                console.log("✅ Clerk is triggering signOutCallback");
                localStorage.removeItem("emails");
              }}
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10", // Größe des Avatars
                  userButtonPopoverCard: "shadow-lg",
                  userButtonPopoverActionButton: "text-sm",
                },
              }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SearchbarHeader;
