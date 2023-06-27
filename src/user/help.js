import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProTip from './ProTip';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';



import axios from "axios";
import Molu from './Molu';
import Header from './Header';
export default function help() {
  const navigate = useNavigate();
  const location = useLocation();
  // const [data, setData] = useState(null);
  function gohome() {
    navigate('/user/settings' + location.search);
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 1 }}>
        <Header title="도움말" />
        <div className="home">
          <Typography variant="h4" gutterBottom component="div">
            도움말
          </Typography>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemText primary="일반" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="프로필" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="알림" />
            </ListItem>
          </List>
          <Button variant="contained" color="primary" onClick={gohome}>설정으로 이동 </Button>
          {/*  */}
        </div>
        <ProTip />
        <Molu />
      </Box>
    </Container>
  );
}