import React, { useState, useEffect, ReactNode } from 'react';
import { Grid, InputLabel, FormControl, TextField, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface TextboxLabelProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  defaultValue?: string;
  help?: ReactNode;
}

const TextboxLabel: React.FC<TextboxLabelProps> = ({
  label,
  value,
  onChange,
  placeholder,
  defaultValue,
  help
}) => {
  const [open, setOpen] = useState(false);
  const [showApplyButton, setShowApplyButton] = useState(false);
  const [localChangeEvent, setLocalChangeEvent] = useState<React.ChangeEvent<HTMLInputElement>>(); // TextField의 로컬 상태를 관리합니다.
  const [localValue, setLocalValue] = useState<string>(value); // 로컬 상태를 value로 초기화합니다.

  useEffect(() => {
    setLocalValue(value); // 서버로부터 받은 value를 로컬 상태로 설정합니다.
  }, [value]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalChangeEvent(event);
    setLocalValue(event.target.value);
    setShowApplyButton(true); // TextField의 내용이 변경될 때 적용 버튼을 표시합니다.
  };

  const handleApply = () => {
    if (!localChangeEvent) return; // localValue가 없으면 함수를 종료합니다.
    onChange(localChangeEvent); // 상위 컴포넌트의 onChange 함수에 현재 value를 전달합니다.
    setShowApplyButton(false); // 적용 버튼을 숨깁니다.
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleApply();
    }
  };

  return (
    <Grid container spacing={2} direction="row" marginTop={1} marginBottom={1} alignItems="center">
      <Grid item xs={12} sm={7}>
        <Grid container alignItems="center">
          <InputLabel id={`${label}-label`} style={{ lineHeight: 'normal' }}>{label}</InputLabel>
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
          <TextField
            id={`${label}-label`}
            label={label}
            value={localValue}
            onChange={handleTextFieldChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            defaultValue={defaultValue}
            fullWidth
          />
        </FormControl>
      </Grid>
      {showApplyButton && (
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleApply}>{label} 저장</Button>
        </Grid>
      )}
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

export default TextboxLabel;