import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import { AccountCircle, Dashboard, People, Work, Settings, PostAdd } from '@mui/icons-material';
import {  NavLink, useLocation } from 'react-router-dom';
const Sidebar = () => {
  const location = useLocation()
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          position: 'relative',
          height: "100vh",
          paddingTop: "3em",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List sx={{backgroundColor: "#f3f5f2"}}>
        <NavLink to=".">
        <ListItem button>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="My Profile"/>
        </ListItem>
        </NavLink>

          <NavLink to="dashboard">
        <ListItem button>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
          </NavLink>

          <NavLink to="applications">
        <ListItem button>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          {/* Todo: */}
          <ListItemText primary="Applicants" />
        </ListItem>
          </NavLink>

          <NavLink to="posted-jobs">
        <ListItem button>
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText primary="Posted Jobs" />
        </ListItem>
          </NavLink>
      </List>
      <Divider />
      <List>
        
        <NavLink to="settings">
        <ListItem button>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        </NavLink>
      </List>
      <Divider />
      <Button variant="contained"  sx={{ margin: 3, backgroundColor: "#25ae81" }}>
        Post a Job
      </Button>
    </Drawer>
  );
}

export default Sidebar;
