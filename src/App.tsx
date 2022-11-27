import React, { ReactElement, useEffect, useRef, useState } from 'react';
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
import SendIcon from '@mui/icons-material/Send';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Button, Grid, MenuItem, Modal, Select } from '@mui/material';
import "leaflet/dist/leaflet.css";


//L.Marker.prototype.options.icon = DefaultIcon TODO
const L = require('leaflet');

const myIcon = L.icon({
  iconUrl: require('./shadowicon.png'),
  iconSize: [64, 64],
  iconAnchor: [32, 64],
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null
});
const drawerWidth = 240;
function App() {
  const [cidade, setCidade] = useState<String>('Curitiba');
  const [bairro, setBairro] = useState<String>('Centro');
  const [unidadeConsumidora, setUnidadeConsumidora] = useState<String>('000000001');
  const [transformador, setTransformador] = useState<String>();
  const [isCidadeModalOpen, setIsCidadeModalOpen] = useState<boolean>(false);
  const [isBairroModalOpen, setIsBairroModalOpen] = useState(false);
  const [isUnidadeTransformadoraOpen, setIsUnidadeTransformadoraOpen] = useState<boolean>(false);
  const [isAnalisarDrawerOpen, setIsAnalisarDrawerOpen] = useState<boolean>(false);
  const [isTransformadorModalOpen, setIsTransformadorModalOpen] = useState(false);
  const [isGato, setIsGato] = useState<boolean>(false);
  const handleCidade = () => {
    setIsCidadeModalOpen(true);
    setIsAnalisarDrawerOpen(false);
  }
  const handleCidadeClose = () => {
    setIsCidadeModalOpen(false);
    setIsAnalisarDrawerOpen(false);
  }
  const handleBairro = () => {
    setIsBairroModalOpen(true);
    setIsAnalisarDrawerOpen(false);
  }
  const handleBairroClose = () => {
    setIsBairroModalOpen(false);
  }
  const handleUnidadeConsumidora = () => {
    setIsUnidadeTransformadoraOpen(true);
  }
  const handleUnidadeConsumidoraClose = () => {
    setIsUnidadeTransformadoraOpen(false);
  }

  const handleAnalisar = () => {
    setIsAnalisarDrawerOpen(true);

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
        PaperProps={{
          sx: {
            backgroundColor: "DarkOrange",
            color: "red",
          }
        }}
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
              <ListItemText disableTypography
                primary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>Cidade</Typography>} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleBairro}>
              <ListItemIcon ><HouseIcon /></ListItemIcon>
              <ListItemText primary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>Bairro</Typography>} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleUnidadeConsumidora}>
              <ListItemIcon ><ElectricBoltIcon /></ListItemIcon>
              <ListItemText primary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>Unidade Consumidora</Typography>} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <ListItem>
          <ListItemButton onClick={handleAnalisar}>
            <ListItemIcon ><SendIcon /></ListItemIcon>
            <ListItemText primary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>Analisar</Typography>} />
          </ListItemButton>
        </ListItem>
        <Divider />
      </Drawer>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "DarkOrange",
            color: "red",
          }
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        open={isAnalisarDrawerOpen}
        variant="persistent"
        anchor="right"
      >
        <Grid container margin={2}>
          <Grid item>
            <Divider />
            <List>
              <ListItem>
                <ListItemButton onClick={handleCidade}>
                  <ListItemIcon ><LocationCityIcon /></ListItemIcon>
                  <ListItemText disableTypography
                    primary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>{cidade}</Typography>} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={handleBairro}>
                  <ListItemIcon ><HouseIcon /></ListItemIcon>
                  <ListItemText primary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>{bairro}</Typography>} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={handleUnidadeConsumidora}>
                  <ListItemIcon ><ElectricBoltIcon /></ListItemIcon>
                  <ListItemText primary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>{unidadeConsumidora}</Typography>} />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider />
          </Grid>
          <br />
          <Grid item>
            {!isGato && <img src={"/correct.png"} width={'200px'}></img>}
            <Divider />
            <Typography variant="h6" style={{ color: '#FFFFFF' }}>Unidade consumidora segura</Typography>
            <Divider />
          </Grid>
        </Grid>

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
            label="Cidade"
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
          <Grid container>
            <Grid item xs={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Selecione o bairro
              </Typography>
            </Grid>
            <Grid item >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bairro}
                label="bairro"
                onChange={(e) => setBairro(e.target.value as string)}
              >
                <MenuItem value={'Centro'}>Centro</MenuItem>
              </Select>
              <Button onClick={handleBairroClose}>Fechar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={isUnidadeTransformadoraOpen}
        onClose={handleUnidadeConsumidoraClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Boxstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Selecione a unidade consumidora
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={unidadeConsumidora}
            label="Unidade Consumidora"
            onChange={(e) => setUnidadeConsumidora(e.target.value as string)}
          >
            <MenuItem value={'000000001'}>000000001</MenuItem>
            <MenuItem value={'000000002'}>000000002</MenuItem>
            <MenuItem value={'000000003'}>000000003</MenuItem>
            <MenuItem value={'000000004'}>000000004</MenuItem>
            <MenuItem value={'000000005'}>000000005</MenuItem>
          </Select>
          <Button onClick={handleUnidadeConsumidoraClose}>Fechar</Button>
        </Box>
      </Modal>
      <MapContainer center={[-25.441105, -49.276855]} zoom={13} style={{ height: '100vh', width: '100wh' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={myIcon} position={[-25.441105, -49.276855]}>
          <Popup>
            Localização da unidade consumidora analisada
          </Popup>
        </Marker>
      </MapContainer>

    </div >
  );
}

export default App; 