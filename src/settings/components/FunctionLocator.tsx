import settingsFunctions from '../functions';

import React from 'react';

import { Box, Container } from '@mui/material';
import Header from './Header';
import ProTip from './ProTip';
import { SnackbarProvider } from 'notistack';
import { ArrowBack } from '@mui/icons-material';

interface FunctionLocatorProps {
  url: string;
}

const FunctionLocator: React.FC<FunctionLocatorProps> = ({ url }) => {
  const functionInfo = settingsFunctions.find(func => func.url === url);
  if (!functionInfo) {
    return <div>Function not found</div>;
  }

  let functionComponent =
    <Container maxWidth="md">
      <Box>
        <Header
          title={functionInfo.title}
          icon={<ArrowBack />}
          onIconClick={() => window.history.back()}
        />
        {functionInfo.data}
        <ProTip />
      </Box>
      <SnackbarProvider
        maxSnack={5}
        autoHideDuration={1000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }} />
    </Container >;
  return functionComponent;
};

export default FunctionLocator;