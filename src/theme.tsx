import { red } from '@mui/material/colors';
import { createTheme, Theme } from '@mui/material/styles';

// A custom theme for this app
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;