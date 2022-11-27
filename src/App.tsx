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
import Lottie from 'react-lottie';
import animationData from './lotties/50186-task-complete-tick.json';
import incorrectAnimationData from './lotties/91878-bouncy-fail.json'

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
  const [cidade, setCidade] = useState<String>('Guarapuava');
  const [bairro, setBairro] = useState<String>('Centro');
  const [unidadeConsumidora, setUnidadeConsumidora] = useState<Number>(1);
  const [transformador, setTransformador] = useState<String>();
  const [isCidadeModalOpen, setIsCidadeModalOpen] = useState<boolean>(false);
  const [isBairroModalOpen, setIsBairroModalOpen] = useState(false);
  const [isUnidadeTransformadoraOpen, setIsUnidadeTransformadoraOpen] = useState<boolean>(false);
  const [isAnalisarDrawerOpen, setIsAnalisarDrawerOpen] = useState<boolean>(false);
  const [isTransformadorModalOpen, setIsTransformadorModalOpen] = useState(false);
  const [isGato, setIsGato] = useState<boolean>(true);
  const [latLong, setLatLong] = useState<[number, number]>([-25.3935, -51.4562]);
  function FlyMapTo() {

    const map = useMap()

    useEffect(() => {
      map.flyTo(latLong)
    }, [latLong])

    return null
  }


  const guarapuava = [
    {
      latitude: -25.3935,
      longitude: -51.4562
    },
    {
      latitude: -25.395270,
      longitude: -51.489320
    },
    {
      latitude: -25.386590,
      longitude: -51.505720
    },
    {
      latitude: -25.38007,
      longitude: -51.47676
    },
    {
      latitude: -25.4001,
      longitude: -51.4559
    },

  ]

  const curitiba = [
    {
      latitude: -25.44572,
      longitude: -49.2642
    },
    {
      latitude: -25.44153,
      longitude: -49.2669
    },
    {
      latitude: -25.411205,
      longitude: -49.291823
    },
    {
      latitude: -25.491363,
      longitude: -49.14466
    },
    {
      latitude: -25.404733,
      longitude: -49.187162
    },

  ]
  const handleCoordinateChange = (latitude: number, longitude: number, city: string) => {
    const temp: [number, number] = [latitude, longitude]
    console.log('setei latlong' + temp);
    setLatLong(temp);
  }
  const handleCidade = () => {
    if (cidade === 'Guarapuava') {
      handleCoordinateChange(guarapuava[Number(unidadeConsumidora) - 1].latitude, guarapuava[Number(unidadeConsumidora) - 1].longitude, 'Guarapuava')
    } if (cidade === 'Curitiba') {
      handleCoordinateChange(curitiba[Number(unidadeConsumidora) - 1].latitude, curitiba[Number(unidadeConsumidora) - 1].longitude, 'Curitiba')
    }
    setIsCidadeModalOpen(true);
    setIsAnalisarDrawerOpen(false);
  }
  const handleCidadeClose = () => {
    setIsCidadeModalOpen(false);
    setIsAnalisarDrawerOpen(false);
  }
  const handleBairro = () => {
    if (cidade === 'Guarapuava') {
      handleCoordinateChange(guarapuava[Number(unidadeConsumidora) - 1].latitude, guarapuava[Number(unidadeConsumidora) - 1].longitude, 'Guarapuava')
    } else if (cidade === 'Curitiba') {
      handleCoordinateChange(curitiba[Number(unidadeConsumidora) - 1].latitude, curitiba[Number(unidadeConsumidora) - 1].longitude, 'Curitiba')
    }
    setIsBairroModalOpen(true);
    setIsAnalisarDrawerOpen(false);
  }
  const handleBairroClose = () => {
    setIsBairroModalOpen(false);
  }
  const handleUnidadeConsumidora = () => {
    if (cidade === 'Guarapuava') {
      handleCoordinateChange(guarapuava[Number(unidadeConsumidora) - 1].latitude, guarapuava[Number(unidadeConsumidora) - 1].longitude, 'Guarapuava')
    } else if (cidade === 'Curitiba') {
      handleCoordinateChange(curitiba[Number(unidadeConsumidora) - 1].latitude, curitiba[Number(unidadeConsumidora) - 1].longitude, 'Curitiba')
    }
    setIsUnidadeTransformadoraOpen(true);
    setIsAnalisarDrawerOpen(false);
  }
  const handleUnidadeConsumidoraClose = () => {
    setIsUnidadeTransformadoraOpen(false);
  }

  const handleAnalisar = () => {
    setIsAnalisarDrawerOpen(true);
    if (cidade === 'Guarapuava') {
      handleCoordinateChange(guarapuava[Number(unidadeConsumidora) - 1].latitude, guarapuava[Number(unidadeConsumidora) - 1].longitude, 'Guarapuava')
    } else if (cidade === 'Curitiba') {
      handleCoordinateChange(curitiba[Number(unidadeConsumidora) - 1].latitude, curitiba[Number(unidadeConsumidora) - 1].longitude, 'Curitiba')
    }

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
  const defaultOptions = {
    keepLastFrame: true,
    autoplay: false,
    loop: false,
    speed: 0.5,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const IncorrectdefaultOptions = {
    keepLastFrame: true,
    autoplay: false,
    loop: false,
    speed: 0.5,
    animationData: incorrectAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
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
          <Grid item justifySelf={'center'} style={{ textAlign: "center" }} justifyContent={'center'}>
            <Typography align={'center'} variant="h6" style={{ fontWeight: 'bold', color: '#FFFFFF' }}>CIDADE</Typography>
            <Typography variant="h6" style={{ color: '#FFFFFF' }}>{cidade}</Typography>
            <Typography align={'center'} variant="h6" style={{ fontWeight: 'bold', color: '#FFFFFF' }}>BAIRRO</Typography>
            <Typography variant="h6" style={{ color: '#FFFFFF' }}>{bairro}</Typography>
            <Typography align={'center'} variant="h6" style={{ fontWeight: 'bold', color: '#FFFFFF' }}>UNIDADE CONSUMIDORA</Typography>
            <Typography variant="h6" style={{ color: '#FFFFFF' }}>{unidadeConsumidora.toString().padStart(8, '0')}</Typography>
            <Divider />
          </Grid>
          <br />
          <Grid item>
            {!isGato && <Lottie

              options={defaultOptions}
              height={120}
              width={120}
            />}
            {!isGato && <Typography variant="h6" style={{ color: '#FFFFFF' }}>Unidade consumidora segura</Typography>}
            <Divider />
            {isGato && <Lottie

              options={IncorrectdefaultOptions}
              height={120}
              width={120}
            />}
            {isGato && <Typography variant="h6" style={{ color: '#FFFFFF' }}>Possível fraude de energia!</Typography>}
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
            <MenuItem value={'Guarapuava'}>Guarapuava</MenuItem>
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
            onChange={(e) => setUnidadeConsumidora(Number(e.target.value))}
          >
            <MenuItem value={1}>000000001</MenuItem>
            <MenuItem value={2}>000000002</MenuItem>
            <MenuItem value={3}>000000003</MenuItem>
            <MenuItem value={4}>000000004</MenuItem>
            <MenuItem value={5}>000000005</MenuItem>
          </Select>
          <Button onClick={handleUnidadeConsumidoraClose}>Fechar</Button>
        </Box>
      </Modal>
      <MapContainer center={latLong} zoom={13} style={{ height: '100vh', width: '100wh' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={myIcon} position={latLong}>
          <Popup>
            Localização da unidade consumidora analisada
          </Popup>
        </Marker>
        <FlyMapTo />
      </MapContainer>

    </div >
  );
}
export default App; 