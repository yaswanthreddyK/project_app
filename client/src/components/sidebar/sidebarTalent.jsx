import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import { AccountCircle, Dashboard, People, Settings, Mail, Message, Payment } from '@mui/icons-material';
import {  NavLink, useLocation } from 'react-router-dom';
import "./Sidebar.css"
const SidebarTalent = () => {
  const location = useLocation()
  const path = location.pathname.split("/");
  const activeRoute = path[path.length - 1];

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
          paddingTop: "3em"
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>

        <NavLink to="."  className={`${activeRoute === "profile" ? "isactive" : ""}`}>
        <ListItem button>
          <ListItemIcon>
            <AccountCircle className='icon'/>
          </ListItemIcon>
          <ListItemText primary="My Profile"/>
        </ListItem>
        </NavLink>

          <NavLink to="dashboard" className={`${activeRoute === "dashboard" ? "isactive" : ""}`}>
        <ListItem button>
          <ListItemIcon>
            <Dashboard className='icon'/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
          </NavLink>
          <NavLink to="proposals" className={`${activeRoute === "proposals" ? "isactive" : ""}`}>
        <ListItem button>
          <ListItemIcon>
            <People className='icon'/>
          </ListItemIcon>
          {/* Todo: */}
          <ListItemText primary="Proposals" />
        </ListItem>
          </NavLink>

          <NavLink to="invites" className={`${activeRoute === "invites" ? "isactive" : ""}`}>
        <ListItem button>
          <ListItemIcon>
            <Mail className='icon'/>
          </ListItemIcon>
          <ListItemText primary="Invites" />
        </ListItem>
          </NavLink>
          <NavLink to="messages" className={`${activeRoute === "messages" ? "isactive" : ""}`}>
        <ListItem button>
          <ListItemIcon>
            <Message className='icon'/>
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
        
        <NavLink to="settings" className={`${activeRoute === "settings" ? "isactive" : ""}`}>
        <ListItem button>
          <ListItemIcon>
            <Settings className='icon'/>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        </NavLink>
        
      </List>
      <Divider />
    </Drawer>
  );
}

export default SidebarTalent;
