import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import {
  AccountCircle,
  Dashboard,
  People,
  Work,
  Settings,
  PostAdd,
  Message,
  Payment
} from "@mui/icons-material";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";
const SidebarClient = () => {
  const path = useLocation().pathname.split("/");
  const activeRoute = path[path.length - 1];
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          position: "relative",
          height: "100vh",
          paddingTop: "3em",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <NavLink
          to="."
          className={`${activeRoute === "profile" ? "isactive" : ""}`}
        >
          <ListItem button>
            <ListItemIcon>
              <AccountCircle className="icon" />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
        </NavLink>

        <NavLink
          to="dashboard"
          className={({ isActive }) => (isActive ? "isactive" : "")}
        >
          <ListItem button>
            <ListItemIcon>
              <Dashboard className="icon" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>

        <NavLink
          to="applications"
          className={({ isActive }) => (isActive ? "isactive" : "")}
        >
          <ListItem button>
            <ListItemIcon>
              <People className="icon" />
            </ListItemIcon>
            {/* Todo: */}
            <ListItemText primary="Applicants" />
          </ListItem>
        </NavLink>

        <NavLink
          to="posted-jobs"
          className={({ isActive }) => (isActive ? "isactive" : "")}
        >
          <ListItem button>
            <ListItemIcon>
              <Work className="icon" />
            </ListItemIcon>
            <ListItemText primary="Posted Jobs" />
          </ListItem>
        </NavLink>

        <NavLink
          to="messages"
          className={({ isActive }) => (isActive ? "isactive" : "")}
        >
          <ListItem button>
            <ListItemIcon>
              <Message className="icon" />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
        <List>
          <NavLink
            to="payments"
            className={({ isActive }) => (isActive ? "isactive" : "")}
          >
            <ListItem button>
              <ListItemIcon>
                <Payment className="icon" />
              </ListItemIcon>
              <ListItemText primary="Payments" />
            </ListItem>
          </NavLink>
        </List>
        <List>
          <NavLink
            to="settings"
            className={({ isActive }) => (isActive ? "isactive" : "")}
          >
            <ListItem button>
              <ListItemIcon>
                <Settings className="icon" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </NavLink>
        </List>
      <Divider />
      <Button
        variant="contained"
        sx={{
          margin: 3,
          backgroundColor: "#4cae9b",
          "&:hover": { backgroundColor: "#4cae9b" },
        }}
      >
        <Link to="/forms/newJob">
        Post a Job
        </Link>
      </Button>
    </Drawer>
  );
};

export default SidebarClient;
