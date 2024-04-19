import React, { useState, ReactNode } from 'react';
import { Grid, InputLabel, FormControl, Select, MenuItem, SelectChangeEvent, IconButton, Tooltip, Modal, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface DropdownProps {
  label: string;
  value: string | number;
  onChange: (event: SelectChangeEvent<any>) => void;
  items: { value: string | number; text: string; disabled?: boolean }[];
  help?: ReactNode;
}

const DropdownLabel: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  items,
  help
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid container spacing={2} direction="row" marginTop={1} marginBottom={1}>
      <Grid item xs={12} sm={7}>
        <Grid container alignItems="center">
          <InputLabel id={`${label}-label`}>{label}</InputLabel>
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
        <FormControl fullWidth>
          <Select
            labelId={`${label}-label`}
            value={value}
            onChange={onChange}
          >
            {items.map((item) => (
              <MenuItem key={item.value} value={item.value} disabled={item.disabled}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default DropdownLabel;