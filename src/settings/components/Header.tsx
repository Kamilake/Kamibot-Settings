import * as React from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BadgeAvatars from './BadgeAvatars';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import { Inbox, Mail } from '@mui/icons-material';
import { useUser } from '../../contexts/User/UserContext';
import { useHeader } from '../../contexts/HeaderContext';

// Discord OAuth2 설정
const DISCORD_CLIENT_ID = "1019061779357245521";
// 현재 브라우저 URL을 사용하는 함수로 변경
export const getRedirectUri = () => {
  return `${window.location.origin}/callback/discord`;
};
const SCOPES = "identify email guilds guilds.join guilds.members.read";

interface HeaderProps {
  icon?: React.ReactElement;
  onIconClick?: () => void;
}
const Header: React.FC<HeaderProps> = ({ icon = <MenuIcon />, onIconClick = () => { } }) => {
  const { user } = useUser();
  const { title, userAvatarUrl } = useHeader();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  // 로그인 함수 - 동적 리다이렉트 URL 사용
  const handleLogin = () => {
    const redirectUri = getRedirectUri();
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(SCOPES)}`;
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

  const isLogin = user.userInfo !== undefined;

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

          {isLogin ? (
            <>{user.userInfo?.global_name}&nbsp;&nbsp;</>
          ) : (
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLogin}
              sx={{ mr: 2 }}
            >
              로그인
            </Button>
          )}

          <BadgeAvatars userName="" avatarUrl={user.userAvatarUrl} />
        </Toolbar>
        {/* <Drawer
          open={openDrawer} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer> */}
      </AppBar>
      {/* <Toolbar />    */}
      {/* To prevent the content from going under the header */}
      <Box sx={{ height: '28px' }} />  {/* 기본 Toolbar 높이와 동일하게 설정 */}

      <br />
    </div>
  );
}

export default Header;