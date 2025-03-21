import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Molu: React.FC = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Kamilake
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Molu;