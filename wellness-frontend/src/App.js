import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from './theme';
import ClientsPage from './ClientsPage';
import AppointmentsPage from './AppointmentsPage';

function App() {
  const [tab, setTab] = React.useState(0);
  const [darkMode, setDarkMode] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const appliedTheme = React.useMemo(() => theme(darkMode), [darkMode]);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleTabChange = (_, v) => setTab(v);
  const handleDrawerTab = (v) => {
    setTab(v);
    setDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: darkMode ? 'linear-gradient(135deg, #232526 0%, #414345 100%)' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <AppBar position="static" color="primary" elevation={4} sx={{ borderRadius: 2, mx: 2, mt: 2 }}>
          <Toolbar>
            {isMobile && (
              <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 2 }}>
              Wellness Platform
            </Typography>
            {!isMobile && (
              <Tabs value={tab} onChange={handleTabChange} textColor="inherit" indicatorColor="secondary" sx={{ mr: 2 }}>
                <Tab label="Clients" />
                <Tab label="Appointments" />
              </Tabs>
            )}
            <IconButton color="inherit" onClick={() => setDarkMode((d) => !d)}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List sx={{ width: 220 }}>
            <ListItem disablePadding>
              <ListItemButton selected={tab === 0} onClick={() => handleDrawerTab(0)}>
                <ListItemText primary="Clients" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton selected={tab === 1} onClick={() => handleDrawerTab(1)}>
                <ListItemText primary="Appointments" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box sx={{ p: { xs: 1, sm: 3 }, pt: 4 }}>
          {tab === 0 && <ClientsPage />}
          {tab === 1 && <AppointmentsPage />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
