import * as React from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BadgeAvatars from './components/BadgeAvatars';
export default function Header({ title, userAvatarUrl }) {
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
          <BadgeAvatars userName="" avatarUrl={userAvatarUrl} />
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* To prevent the content from going under the header */}
      <br />
    </div>
  );
}
