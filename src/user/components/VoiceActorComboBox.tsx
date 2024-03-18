import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import fetchActorListApi from '../../api/fetchActorListApi';
import Hangul from 'hangul-js';
import setUserFuncApi from '../../api/setUserFuncApi';

// ThemeProvider 
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import { Actor } from '../../api/fetchActorListApi';

interface VoiceActorComboBoxProps {
  value: Actor;
  setValue: (value: Actor) => void;
}

export default function VoiceActorComboBox({ value, setValue }: VoiceActorComboBoxProps) {
  const [inputValue, setInputValue] = React.useState<string>('');
  const { data, loading, error } = fetchActorListApi();

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


  // let data = actorList;
  // const channelArray = data;

  // let options = top100Films.map((option) => {
  // const firstLetter = option.channelName[0].toUpperCase();
  // return {
  //   firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //   ...option,
  // }; // 글자 순서대로 정렬하는 코드, 나중에 필요할지도 모르니 남겨두기
  // });
  // const [value, setValue] = React.useState(options[0]);

  // options={options.sort((a, b) => -b.categoryName.localeCompare(a.categoryName))} // 카테고리별 ABC순 정렬하는 코드, 나중에 필요할지도 모르니 남겨두기

  //channelArray {
  //   "displayName": "Google 어시스턴트 Standard-C", "id": "ko-KR-Standard-C", "gender": "f",
  //   "language": "ko-KR", "categoryName": "여성-청년", "disabled": true
  // },
  console.log("datatype: " + (Array.isArray(data) ? 'array' : typeof data), "data: ", data);
  let channelArray: Actor[] = [];
  if (Array.isArray(data)) {
    channelArray = data
      .sort((a: Actor, b: Actor) => a.displayName.localeCompare(b.displayName)) // 먼저 displayName으로 정렬
      .sort((a: Actor, b: Actor) => a.categoryName.localeCompare(b.categoryName)); // 그 다음 categoryName으로 정렬
  }


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


