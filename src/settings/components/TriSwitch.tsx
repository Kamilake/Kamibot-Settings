import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Check, DoNotDisturb, HorizontalRule } from '@mui/icons-material';

interface TriSwitchProps {
  status: 'on' | 'off' | 'unset';
  onClick: (newStatus: 'on' | 'off' | 'unset') => void;
  disabled: boolean;
}

export default function TriSwitch({ status, onClick, disabled }: TriSwitchProps) {
  const [alignment, setAlignment] = React.useState<string>(status);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: 'on' | 'off' | 'unset'
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      onClick(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      disabled={disabled}
      sx={{ fontSize: '0.75rem', height: '40px' }} // 크기 조정
    >
      <ToggleButton
        value="off"
        aria-label="비활성화"
        // color={disabled ? 'default' : 'error'}
        sx={{
          fontSize: '0.75rem',
          height: '40px',
          // backgroundColor: disabled ? 'grey' : 'inherit',
          // color: disabled ? 'grey' : 'inherit'
        }}>
        <DoNotDisturb
          color={disabled ? 'inherit' : 'error'}
          sx={{ fontSize: '1rem' }} />
      </ToggleButton>
      <ToggleButton
        value="unset"
        aria-label="기본값"
        sx={{
          fontSize: '0.75rem',
          height: '40px',
          // backgroundColor: disabled ? 'grey' : 'inherit',
          // color: disabled ? 'grey' : 'inherit'
        }}>
        <HorizontalRule
          sx={{ fontSize: '1rem' }} />
      </ToggleButton>
      <ToggleButton
        value="on"
        aria-label="활성화"
        // color={disabled ? 'default' : 'success'}
        sx={{
          fontSize: '0.75rem',
          height: '40px',
          // backgroundColor: disabled ? 'grey' : 'inherit',
          // color: disabled ? 'grey' : 'inherit'
        }}>
        <Check
          color={disabled ? 'inherit' : 'success'}
          sx={{ fontSize: '1rem' }} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}