import * as React from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BadgeAvatars from './BadgeAvatars';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer } from '@mui/material';
import { Inbox, Mail } from '@mui/icons-material';

interface HeaderProps {
  title: string;
  userAvatarUrl: string;
  icon?: React.ReactElement;
  onIconClick?: () => void;
}
const Header: React.FC<HeaderProps> = ({ title, userAvatarUrl, icon = <MenuIcon />, onIconClick = () => { } }) => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={onIconClick}> {/* toggleDrawer(true)}> */}
            {icon}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          자동 로그인됨&nbsp;&nbsp;
          <BadgeAvatars userName="" avatarUrl={userAvatarUrl} />
        </Toolbar>
        {/* <Drawer
          open={openDrawer} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer> */}
      </AppBar>
      <Toolbar /> {/* To prevent the content from going under the header */}
      <br />
    </div>
  );
}

export default Header;