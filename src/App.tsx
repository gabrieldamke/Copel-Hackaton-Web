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
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Button, Grid, IconButton, MenuItem, Modal, Select } from '@mui/material';
import "leaflet/dist/leaflet.css";
import Lottie from 'react-lottie';
import animationData from './lotties/50186-task-complete-tick.json';
import incorrectAnimationData from './lotties/91878-bouncy-fail.json'
import { Icon } from 'leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
  {
    name: '0:00',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '3:00',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '6:00',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '9:00',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '12:00',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '15:00',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '18:00',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '18:00',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
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
  const [isModalGraficoOpen, setIsModalGraficoOpen] = useState<boolean>(false);
  const [isAnalisarDrawerOpen, setIsAnalisarDrawerOpen] = useState<boolean>(false);
  const [isTransformadorModalOpen, setIsTransformadorModalOpen] = useState(false);
  const [isGato, setIsGato] = useState<boolean>(false);
  const [latLong, setLatLong] = useState<[number, number]>([-25.3935, -51.4562]);
  function FlyMapTo() {

    const map = useMap()

    useEffect(() => {
      map.flyTo(latLong)
      document.title = "Hackaton Copel 2022"
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
  const handleIsModalGraficoOpen = () => {
    setIsModalGraficoOpen(false);
  }


  const handleAnalisar = () => {
    setIsAnalisarDrawerOpen(true);
    if (cidade === 'Guarapuava') {
      handleCoordinateChange(guarapuava[Number(unidadeConsumidora) - 1].latitude, guarapuava[Number(unidadeConsumidora) - 1].longitude, 'Guarapuava')
    } else if (cidade === 'Curitiba') {
      handleCoordinateChange(curitiba[Number(unidadeConsumidora) - 1].latitude, curitiba[Number(unidadeConsumidora) - 1].longitude, 'Curitiba')
    }
    setIsModalGraficoOpen(true);

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
    autoplay: false,
    loop: false,
    speed: 0.5,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const IncorrectdefaultOptions = {
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
          </Grid>
          <br />
          <Grid item>
            {!isGato && <Lottie

              options={defaultOptions}
              height={120}
              width={120}
            />}
            {!isGato && <Typography variant="h6" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Unidade consumidora segura</Typography>}
            <Divider />
            {isGato && <Lottie

              options={IncorrectdefaultOptions}
              height={120}
              width={120}
            />}
            {isGato && <Typography variant="h6" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Possível fraude de energia!</Typography>}
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
          <IconButton onClick={handleCidadeClose} sx={{ position: "fixed", top: 0, right: 0, zIndex: 2000 }} ><CloseIcon /></IconButton>
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
              <IconButton onClick={handleBairroClose} sx={{ position: "fixed", top: 0, right: 0, zIndex: 2000 }} ><CloseIcon /></IconButton>
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
          <IconButton onClick={handleUnidadeConsumidoraClose} sx={{ position: "fixed", top: 0, right: 0, zIndex: 2000 }} ><CloseIcon /></IconButton>
        </Box>
      </Modal>
      <Modal
        open={isModalGraficoOpen}
        onClose={handleIsModalGraficoOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Boxstyle}>
          <IconButton onClick={handleIsModalGraficoOpen} sx={{ position: "fixed", top: 0, right: 0, zIndex: 2000 }} ><CloseIcon /></IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Detalhamento da análise
          </Typography>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>

        </Box>
      </Modal>
      <MapContainer center={latLong} zoom={14} style={{ height: '100vh', width: '100wh' }} scrollWheelZoom={false}>
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