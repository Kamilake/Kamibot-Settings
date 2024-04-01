import * as React from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BadgeAvatars from './BadgeAvatars';

interface HeaderProps {
  title: string;
  userAvatarUrl: string;
  icon?: React.ReactElement;
  onIconClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, userAvatarUrl, icon = <MenuIcon />, onIconClick = () => {} }) => {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={onIconClick}>
            {icon}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          자동 로그인됨&nbsp;&nbsp;
          <BadgeAvatars userName="" avatarUrl={userAvatarUrl} />
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* To prevent the content from going under the header */}
      <br />
    </div>
  );
}

export default Header;