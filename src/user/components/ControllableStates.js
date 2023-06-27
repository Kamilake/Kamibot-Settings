import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';





export default function ControllableStates({ value, setValue }) {


  // let options = ['Option 1', 'Option 2'];
  let options = top100Films.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  // const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  return (
    <>
      {/* // <div> */}
      {/* <div>{`value: ${value !== null ? `'${JSON.stringify(value)}'` : 'null'}`}</div> */}
      {/* <div>{`inputValue: '${inputValue}'`}</div> */}
      {/* <br /> */}
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        // options={options}
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="채널" />}
      />
      {/* // </div> */}
    </>
  );
}


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { name: 'The Shawshank Redemption', id: 1994 },
  { name: 'The Godfather', id: 1972 },
  { name: 'The Godfather: Part II', id: 1974 },
  { name: 'The Dark Knight', id: 2008 },
  { name: '12 Angry Men', id: 1957 },
];