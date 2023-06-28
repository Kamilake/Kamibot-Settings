import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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

export default function BadgeAvatars({ userName = "Kamilake", avatarUrl = "" }) {
  return (
    <>
      <Stack direction="row" spacing={userName == "" ? 0 : 1}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar src={avatarUrl}  alt={userName}/>
        </StyledBadge>
        {/* 상하 가운데 정렬, 닉네임 출력, 굵게, 크게 */}
        {userName == "" ? null :
          <div style={{ textAlign: "center", marginTop: "2px", fontWeight: "bold", fontSize: "25px", whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}>{userName}</div>}
      </Stack>

    </>
  );
}