import * as React from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header({title}) {
  return (
    <div>
    <AppBar position="fixed">
    <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
  <Toolbar />
  <br />
  </div>
  );
}
