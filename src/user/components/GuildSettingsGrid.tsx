import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Downloading as DownloadingIcon, SendToMobileOutlined as SendToMobileOutlinedIcon } from '@mui/icons-material';

export interface FunctionInfo {
  icon: JSX.Element;
  title: string;
  description: string;
  url: string;
  data: JSX.Element;
}

import Func1 from '../functions/Func1';
import Func2 from '../functions/Func2';

export const settingsFunctions = [
  Func1, Func2
];

const GridButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToGuildSubSettingsPage = (page: string): void => {
    navigate('/user/guild/' + page + location.search);
  }



  return (
    <Grid container spacing={2}>
      {settingsFunctions.map((item, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Button fullWidth variant="outlined" sx={{ borderRadius: '12px', borderWidth: '2px', '&:hover, &:active': { borderWidth: '3px' } }} onClick={() => navigateToGuildSubSettingsPage(item.url)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {React.cloneElement(item.icon, { fontSize: "large" })}
              <Typography variant="h6">{item.title}</Typography>
              <Typography>{item.description}</Typography>
            </Box>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridButton;