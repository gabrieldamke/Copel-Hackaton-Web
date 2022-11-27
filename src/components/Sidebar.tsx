import React, { useRef, useState } from 'react';
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
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HouseIcon from '@mui/icons-material/House';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MenuItem, Modal, Select } from '@mui/material';

let map: google.maps.Map;
const center: google.maps.LatLngLiteral = { lat: 30, lng: -110 };
function initMap(): void {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center,
        zoom: 8
    });
}
const drawerWidth = 240;

function Sidebar() {
    const [isCidadeModalOpen, setIsCidadeModalOpen] = useState<boolean>(false);
    const handleCidadeClose = () => {
        setIsCidadeModalOpen(false);
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

    const handleCidade = () => {
        setIsCidadeModalOpen(true);
    }
    return (
        <React.Fragment>
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
                anchor="left"
            >
                <Toolbar />
                <img src='/lowResBackground.png' />
                <Divider />
                <List>
                    {['Cidade', 'Bairro', 'Transformador'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index === 0 ? <LocationCityIcon /> : 1 == 1}
                                    {index === 1 ? <HouseIcon /> : 1 == 1}
                                    {index === 2 ? <ElectricBoltIcon /> : 1 == 1}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItemButton onClick={handleCidade}>
                        Cidade
                        <ListItemIcon ><LocationCityIcon /></ListItemIcon>
                    </ListItemButton>
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
                </Box>
            </Modal>

        </React.Fragment>
    );
}

export default Sidebar;