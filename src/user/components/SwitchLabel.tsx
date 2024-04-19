import React, { useState, ReactNode } from 'react';
import { Grid, InputLabel, FormControl, IconButton, Tooltip, Modal, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Switch, Divider } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface DropdownProps {
  label: string;
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  help?: ReactNode;
  right?: boolean;
  marginTop?: number;
}

const SwitchLabel: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  help,
  right = false,
  marginTop = 1
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLabelClick = () => {
    const event = {
      target: {
        checked: !value,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <Grid container spacing={2} alignItems="center" direction="row" marginTop={marginTop} marginBottom={1}>
      <Grid item xs={12} sm={7}>
        <Grid container alignItems="center">
          <InputLabel id={`${label}-label`}
          onClick={handleLabelClick}
          >{label}</InputLabel>
          {help && (
            <Tooltip title="Help">
              <IconButton size="small" onClick={handleOpen}>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={5}>
      <Grid container justifyContent={right ? "flex-end" : "flex-start"}>
          <FormControl>
            <Switch
              checked={value}
              onChange={onChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>도움말</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {help}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>알았어요!</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default SwitchLabel;