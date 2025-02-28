import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import fetchChannelListApi from '../../api/fetchChannelListApi';
import { Channel } from '../../api/fetchChannelListApi';

interface ControllableStatesProps {
  value: Channel;
  setValue: (value: Channel) => void;
  disabled?: boolean;
}

export default function ControllableStates({ value, setValue, disabled = false }: ControllableStatesProps) {
  const [inputValue, setInputValue] = React.useState<string>('');
  const { data, loading, error } = fetchChannelListApi();
  const channelArray = data;

  return channelArray ? (
    <Autocomplete
      isOptionEqualToValue={(option: Channel, value: Channel) => option.channelId === value.channelId}
      value={value}
      onChange={(event: any, newValue: Channel | null) => {
        if (newValue) {
          setValue(newValue);
          (document.activeElement as HTMLElement)?.blur();
        }
      }}
      inputValue={inputValue}
      onInputChange={(event: any, newInputValue: string) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={channelArray}
      groupBy={(option: Channel) => option.categoryName}
      getOptionLabel={(option: Channel) => option.channelName}
      renderOption={(props, option) => (
        <li {...props} key={option.channelId}>
          {option.channelName}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="채널" />}
      fullWidth={true}
      disabled={disabled}
    />
  ) : (
    <></>
  );
}