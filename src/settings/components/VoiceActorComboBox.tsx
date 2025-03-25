import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Hangul from 'hangul-js';
import setUserFuncApi from '../../api/setUserFuncApi';

// ThemeProvider 
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import { useActor } from '../../contexts/User/Actors/ActorContext';
import { Actor } from '../../contexts/User/Actors/FetchActors';

interface VoiceActorComboBoxProps {
  value: Actor;
  setValue: (value: Actor) => void;
}

export default function VoiceActorComboBox({ value, setValue }: VoiceActorComboBoxProps) {
  const [inputValue, setInputValue] = React.useState<string>('');
  const { actorList, isActorLoaded } = useActor();
  const theme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            '& label': {
              fontFamily: 'Noto Color Emoji',
            },
          },
          input: {
            fontFamily: 'Noto Color Emoji',
          },
          listbox: {
            fontFamily: 'Noto Color Emoji',
          },
        },
      },
    },
  });

  let channelArray: Actor[] = actorList
    .sort((a: Actor, b: Actor) => a.displayName.localeCompare(b.displayName)) // 먼저 displayName으로 정렬
    .sort((a: Actor, b: Actor) => a.categoryName.localeCompare(b.categoryName)); // 그 다음 categoryName으로 정렬

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        isOptionEqualToValue={(option: Actor, value: Actor) => option.id === value.id}
        value={value}
        onChange={(event: React.SyntheticEvent, newValue: Actor | null) => {
          if (newValue != null) {
            setValue(newValue);
            (document.activeElement as HTMLElement)?.blur();
            if (newValue?.id !== undefined)
              setUserFuncApi('tts_actor', newValue.id, '보이스 설정을 변경했어요!');
          }
        }}
        inputValue={inputValue}
        onInputChange={(event: any, newInputValue: string) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={channelArray}
        groupBy={(option: Actor) => option.categoryName}
        getOptionLabel={(option: Actor) => option?.displayName}
        getOptionDisabled={(option: Actor) => option?.disabled}
        disabled={!isActorLoaded}
        renderInput={(params) => {
          return <TextField {...params} label="보이스" />
        }}
        fullWidth={true}
        filterOptions={(options: Actor[], params: any) => {
          const inputValue = params.inputValue.toLowerCase();
          const filtered = options.filter((option: Actor) =>
            Hangul.search(option?.displayName?.toLowerCase(), inputValue) !== -1
          );
          return filtered;
        }}
      />
    </ThemeProvider>
  );
}


