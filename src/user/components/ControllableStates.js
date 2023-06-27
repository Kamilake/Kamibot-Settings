import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import fetchChannelListApi from '../../api/fetchChannelListApi';




export default function ControllableStates({ value, setValue }) {


  // let options = top100Films.map((option) => {
  // const firstLetter = option.channelName[0].toUpperCase();
  // return {
  //   firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //   ...option,
  // }; // 글자 순서대로 정렬하는 코드, 나중에 필요할지도 모르니 남겨두기
  // });
  // const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  const { data, loading, error } = fetchChannelListApi();




    const channelArray = data;

//   if (!loading) {
// console.log("options2 : ", data);
//   }



  return (
    <>
      {/* // <div> */}
      {/* <div>{`value: ${value !== null ? `'${JSON.stringify(value)}'` : 'null'}`}</div> */}
      {/* <div>{`inputValue: '${inputValue}'`}</div> */}
      {/* <br /> */}
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.channelId === value.channelId}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={channelArray}
        // options={options.sort((a, b) => -b.categoryName.localeCompare(a.categoryName))} // 카테고리별 ABC순 정렬하는 코드, 나중에 필요할지도 모르니 남겨두기
        groupBy={(option) => option.categoryName}
        getOptionLabel={(option) => option.channelName}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="채널" />}
        fullWidth={true}
      />
    </>
  );
}


