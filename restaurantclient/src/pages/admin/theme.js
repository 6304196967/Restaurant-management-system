import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff9800' }, 
    background: { default: 'BLACK', paper: '#242424' }, 
    text: { primary: '#fff', secondary: '#ff9800' },
    secondary: { main: '#242424' },
  },

});

export default theme;