import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import fetchChannelListApi from '../../api/fetchChannelListApi';

interface Channel {
  channelId: string;
  channelName: string;
  categoryName: string;
}

interface ControllableStatesProps {
  value: Channel;
  setValue: (value: Channel) => void;
}

export default function ControllableStates({ value, setValue }: ControllableStatesProps) {
  // let options = top100Films.map((option) => {
  // const firstLetter = option.channelName[0].toUpperCase();
  // return {
  //   firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //   ...option,
  // }; // 글자 순서대로 정렬하는 코드, 나중에 필요할지도 모르니 남겨두기
  // });
  // const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState<string>('');

  const { data, loading, error } = fetchChannelListApi();

  const channelArray = data;

  return (
    <>
      {/* // <div> */}
      {/* <div>{`value: ${value !== null ? `'${JSON.stringify(value)}'` : 'null'}`}</div> */}
      {/* <div>{`inputValue: '${inputValue}'`}</div> */}
      {/* <br /> */}
      <Autocomplete
        isOptionEqualToValue={(option: Channel, value: Channel) => option.channelId === value.channelId}
        value={value}
        onChange={(event: any, newValue: Channel | null) => {
          if (newValue) {
            setValue(newValue);
            document.activeElement.blur();
          }
        }}
        inputValue={inputValue}
        onInputChange={(event: any, newInputValue: string) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        // options={options.sort((a, b) => -b.categoryName.localeCompare(a.categoryName))} // 카테고리별 ABC순 정렬하는 코드, 나중에 필요할지도 모르니 남겨두기
        options={channelArray}
        groupBy={(option: Channel) => option.categoryName}
        getOptionLabel={(option: Channel) => option.channelName}
        renderInput={(params) => <TextField {...params} label="채널" />}
        fullWidth={true}
      />
    </>
  );
}


