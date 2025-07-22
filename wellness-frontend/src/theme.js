import { createTheme } from '@mui/material/styles';

const theme = (darkMode = false) => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: darkMode ? '#5f72bd' : '#5f72bd', // blue-purple gradient base
      contrastText: '#fff',
    },
    secondary: {
      main: darkMode ? '#00c6fb' : '#00c6fb', // cyan/teal
      contrastText: '#fff',
    },
    background: {
      default: darkMode ? '#232a3b' : '#f5f7fa', // lighter, modern dark
      paper: darkMode ? '#2d3652' : '#fff',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme; 