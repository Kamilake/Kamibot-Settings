import React from 'react';
import { Grid, InputLabel, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface DropdownProps {
  label: string;
  value: string | number;
  onChange: (event: SelectChangeEvent<any>) => void;
  items: { value: string | number; text: string; disabled?: boolean }[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, onChange, items }) => (
  <Grid container spacing={2} alignItems="center" direction="row" marginTop={1} marginBottom={1}>
    <Grid item xs={12} sm={5}>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
    </Grid>
    <Grid item xs={12} sm={6}>
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
  </Grid>
);

export default Dropdown;