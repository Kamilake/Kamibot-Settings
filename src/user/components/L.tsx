import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

interface LProps {
  to: string;
  children: React.ReactNode;
}

const L: React.FC<LProps> = ({ to, children }) => {
  return (
    <Link component={RouterLink} to={to}>
      {children}
    </Link>
  );
};

export default L;