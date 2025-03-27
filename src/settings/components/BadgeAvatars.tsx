import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import TwemojiText from '../../../utils/twemojiUtil/TwemojiText';
import { useUser } from '../../contexts/User/UserContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

interface BadgeAvatarsProps {
  userName?: string;
  avatarUrl?: string;
}

const BadgeAvatars: React.FC<BadgeAvatarsProps> = ({ userName = "Kamilake", avatarUrl = "" }) => {
  const { user } = useUser();
  const isLogin = user.userInfo !== undefined;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isLogin) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    window.location.href = `/api/logout?redirect=${encodeURIComponent(window.location.href)}`;
  };

  return (
    <>
      <Stack direction="row" spacing={userName == "" ? 0 : 1}>
        <div
          style={{ height: '40px', position: 'relative', cursor: isLogin ? 'pointer' : 'default' }}
          onClick={handleClick}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar src={avatarUrl} alt={userName} />
          </StyledBadge>
        </div>
        {userName == "" ? null :
          <TwemojiText>
            <div style={{ textAlign: "center", marginTop: "2px", fontWeight: "bold", fontSize: "25px", whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}>{userName}</div>
          </TwemojiText>
        }
      </Stack>

      {isLogin && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'profile-button',
          }}
        >
          <MenuItem component={Link} to="/settings/personal" onClick={handleClose}>
            계정 설정
          </MenuItem>
          <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
        </Menu>
      )}
    </>
  );
}

export default BadgeAvatars;