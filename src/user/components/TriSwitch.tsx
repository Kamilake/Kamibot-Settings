import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Check, DoNotDisturb, HorizontalRule } from '@mui/icons-material';

interface TriSwitchProps {
  checked: boolean;
  onClick: () => void;
  disabled: boolean;
}

export default function TriSwitch({ checked, onClick, disabled }: TriSwitchProps) {
  const [alignment, setAlignment] = React.useState<string>(checked ? 'enabled' : 'disabled');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      onClick();
    }
  };

  return (
    <ToggleButtonGroup
      value={disabled ? null : alignment} //
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      disabled={disabled}
      sx={{ fontSize: '0.75rem', height: '40px' }} // 크기 조정
    >
      <ToggleButton
        value="disabled"
        aria-label="비활성화"
        color='error'
        sx={{
          height: '40px',
          // backgroundColor: disabled ? 'grey' : 'inherit',
          // color: disabled ? 'grey' : 'inherit'
        }}>
        <DoNotDisturb
          color={disabled ? 'inherit' : 'error'}
          sx={{ fontSize: '1rem' }} />
      </ToggleButton>
      <ToggleButton
        value="default"
        aria-label="기본값"
        sx={{
          height: '40px',
          // backgroundColor: disabled ? 'grey' : 'inherit',
          // color: disabled ? 'grey' : 'inherit'
        }}>
        <HorizontalRule
          sx={{ fontSize: '1rem' }} />
      </ToggleButton>
      <ToggleButton
        value="enabled"
        aria-label="활성화"
        color='success'
        sx={{
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