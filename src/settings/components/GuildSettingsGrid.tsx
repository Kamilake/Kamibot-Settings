import React, { JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Downloading as DownloadingIcon, SendToMobileOutlined as SendToMobileOutlinedIcon } from '@mui/icons-material';

export interface FunctionInterface {
  icon: JSX.Element;
  title: string;
  description: string;
  url: string;
  data: JSX.Element;
  disabled?: boolean;
}

import settingsFunctions from '../functions';

const GridButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToGuildSubSettingsPage = (page: string): void => {
    navigate('/settings/guild/' + page + location.search);
  }

  return (
    <Grid container spacing={2}>
      {settingsFunctions.map((item, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Button fullWidth variant="outlined" sx={{
            borderRadius: '12px',
            borderWidth: '2px',
            boxShadow: '0 0 10px #9ecaed',
            '&:hover, &:active': { borderWidth: '3px', boxShadow: '0 0 20px #9ecaed', },
            opacity: item.disabled ? 0.6 : 1, // 비활성화된 요소의 투명도를 조정합니다.
          }} onClick={() => !item.disabled && navigateToGuildSubSettingsPage(item.url)} disabled={item.disabled}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '300px' }} >
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Box sx={{ marginRight: '7px' }}>
                  {React.cloneElement(item.icon, { fontSize: "large" })}
                </Box>
                <Typography variant="h6" sx={{ marginTop: '-7px' }}>{item.title}</Typography>
              </Box>
              {/* <Typography align="left">{item.description}</Typography> */}
              <Typography align="left" sx={{ minHeight: '3em' }}>{item.description}</Typography>
            </Box>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridButton;