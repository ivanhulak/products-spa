import { TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type FilterFormPropsType = {
  onReset: () => void,
  changeFilter: (value: null | number) => void,
  filter: null | number
}
export const FilterForm: React.FC<FilterFormPropsType> = ({onReset, changeFilter, filter}) => {
  const [value, setValue] = useState<null | number>(1)
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate(`/products?id=${filter}`)
  }, [filter])

  return (
    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
      <TextField
        id="outlined-number"
        placeholder='Enter id'
        label="Number"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
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
          (value !== null && value >= 1) ? changeFilter(value) : alert('Value should be defined and more than zero')
        }}
      >Filter</Button>
      <Button
        variant="contained"
        sx={{ ml: '10px', width: '150px' }}
        onClick={() => {
          changeFilter(null)
          setValue(1)
          onReset()
        }}
      >Reset filter</Button>
    </div>
  );
}