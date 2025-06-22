import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

import { Outlet, Link, Navigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Box,
  styled,
} from "@mui/material";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(0, 0, 0, 0.03)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
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
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const Layout = () => {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          {/* <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search emails…"
              inputProps={{ "aria-label": "search" }}
            />
          </SearchContainer> */}

          {/* <nav>
            <SignedIn>
              <UserButton></UserButton>
            </SignedIn>
          </nav> */}
        </div>
      </header>

      <main className="app-main">
        <SignedOut>
          <Navigate to="/sign-in" replace></Navigate>
        </SignedOut>
        <SignedIn>
          <Outlet></Outlet>
        </SignedIn>
      </main>
    </div>
  );
};

export default Layout;
