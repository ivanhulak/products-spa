import { TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type FilterFormPropsType = {
  onReset: () => void,
  changeFilter: (value: string | number) => void,
  filter: string | number
}
export const FilterForm: React.FC<FilterFormPropsType> = ({ onReset, changeFilter, filter }) => {
  const [value, setValue] = useState<number | string>(filter)
  const navigate = useNavigate()

  // useEffect(() => {
  //   navigate(`/products?id=${filter}`)
  // }, [filter])

  return (
    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
      <TextField
        id="outlined-number"
        placeholder='Enter id'
        label="Number"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(parseInt(e.target.value))}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          style: { padding: '8px 14px' },
          min: 1
        }}
      />
      <Button
        variant="contained"
        sx={{ ml: '10px', width: '100px' }}
        onClick={() => {
          (value !== '' && value >= 1) ? changeFilter(value) : alert('Value should be defined and more than zero')
        }}
      >Filter</Button>
      <Button
        variant="contained"
        sx={{ ml: '10px', width: '150px' }}
        onClick={() => {
          changeFilter('')
          setValue('')
          onReset()
        }}
      >Reset filter</Button>
    </div>
  );
}