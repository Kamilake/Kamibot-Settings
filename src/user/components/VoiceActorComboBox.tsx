import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import fetchActorListApi from '../../api/fetchActorListApi';
// import actorList from './ActorLists';
import Hangul from 'hangul-js';
import setUserFuncApi from '../../api/setUserFuncApi';


// ThemeProvider 
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';


import { enqueueSnackbar } from 'notistack'

// React.useState switchStates

// function findActorByName(displayName) {
//   return actorList.find(actor => actor.displayName === displayName);
// }

function setTtsActor(value) {
  if (value === "로드 중...") return;
  console.log("setTtsActor: ", value);
  // const actor = findActorByName(value);
  const actor = value;
  setUserFuncApi('tts_actor', actor, '보이스 설정을 변경했어요!');
}

export default function VoiceActorComboBox({ value, setValue }) {


  const [inputValue, setInputValue] = React.useState('');
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


  const channelArray = data
    .sort((a, b) => a.displayName.localeCompare(b.displayName)) // 먼저 displayName으로 정렬
    .sort((a, b) => a.categoryName.localeCompare(b.categoryName)); // 그 다음 categoryName으로 정렬



  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          document.activeElement.blur();
          console.log("newValue: ", newValue);
          if (newValue?.id === undefined)
            return;
          setTtsActor(newValue.id);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={channelArray}
        groupBy={(option) => option.categoryName}
        getOptionLabel={(option) => option?.displayName}
        getOptionDisabled={(option) => option?.disabled}
        // sx={{ width: 300 }}
        renderInput={(params) => {
          // params.inputProps.style = { fontFamily: 'Noto Color Emoji' };
          params.InputProps.style = { fontFamily: 'Noto Color Emoji' };
          return <TextField {...params} label="보이스" />
        }}
        fullWidth={true}
        filterOptions={(options, params) => {
          const inputValue = params.inputValue.toLowerCase();
          const filtered = options.filter((option) =>
            Hangul.search(option?.displayName?.toLowerCase(), inputValue) !== -1
          );
          return filtered;
        }}
      />
    </ThemeProvider>
  );
}


