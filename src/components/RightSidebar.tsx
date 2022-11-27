import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

let map: google.maps.Map;
const center: google.maps.LatLngLiteral = { lat: 30, lng: -110 };

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center,
    zoom: 8
  });
}
const drawerWidth = 240;

function RightSideBar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="right"
    >
      
    </Drawer>
  );
}

export default RightSideBar;