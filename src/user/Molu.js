import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
export default function Molu() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        몰?루
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
