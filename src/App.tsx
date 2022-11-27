import React, { ReactElement, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HouseIcon from '@mui/icons-material/House';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Sidebar from '../src/components/Sidebar'
import RightSideBar from '../src/components/RightSidebar'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Button, makeStyles, MenuItem, Modal, Select } from '@mui/material';
import "leaflet/dist/leaflet.css";
function initMap(): void {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 4,
      center: uluru,
    }
  );

  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
const useStyles = makeStyles({
  SidebarStyle: {
    background: "blue"
  }
});
const drawerWidth = 240;
function App() {
  const [cidade, setCidade] = useState<String>('Curitiba');
  const [bairro, setBairro] = useState<String>('Centro');
  const [transformador, setTransformador] = useState<String>();
  const [isCidadeModalOpen, setIsCidadeModalOpen] = useState<boolean>(false);
  const [isBairroModalOpen, setIsBairroModalOpen] = useState(false);
  const [isTransformadorModalOpen, setIsTransformadorModalOpen] = useState(false);
  const handleCidade = () => {
    setIsCidadeModalOpen(true);
  }
  const handleCidadeClose = () => {
    setIsCidadeModalOpen(false);
  }
  const handleBairro = () => {
    setIsBairroModalOpen(true);
  }
  const handleBairroClose = () => {
    setIsBairroModalOpen(false);
  }
  const Boxstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const position = [51.505, -0.09]
  return (

    <div /*style={{ backgroundImage: `url(/lowResBackground.png)` }} */ >
      <Drawer
      classes={{ }}
        sx={{
          width: drawerWidth,
          color: 'yellow',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img src='/copel.png' height={'80px'} width={'200px'} />

        <Divider />
        <List>
          <ListItem>
            <ListItemButton onClick={handleCidade}>
              <ListItemIcon ><LocationCityIcon /></ListItemIcon>
              <ListItemText primary={"Cidade"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleBairro}>
              <ListItemIcon ><HouseIcon /></ListItemIcon>
              <ListItemText primary={"Bairro"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Modal
        open={isCidadeModalOpen}
        onClose={handleCidadeClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Boxstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Selecione a cidade
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cidade}
            label="Age"
            onChange={(e) => setCidade(e.target.value as string)}
          >
            <MenuItem value={'Curitiba'}>Curitiba</MenuItem>
          </Select>
          <Button onClick={handleCidadeClose}>Fechar</Button>
        </Box>
      </Modal>
      <Modal
        open={isBairroModalOpen}
        onClose={handleBairroClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Boxstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Selecione a o bairro
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bairro}
            label="Age"
            onChange={(e) => setBairro(e.target.value as string)}
          >
            <MenuItem value={'Centro'}>Centro</MenuItem>
          </Select>
          <Button onClick={handleBairroClose}>Fechar</Button>
        </Box>
      </Modal>
      <RightSideBar />

      <MapContainer center={[35.755229, 51.304470]} zoom={13} style={{ height: '100vh', width: '100wh' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[35.755229, 51.304470]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>,

    </div>
  );
}

export default App; 