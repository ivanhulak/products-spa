import { TextField, Button } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { ContextApp } from './products-reducer';
import { useNavigate } from 'react-router-dom';

export const FilterForm: React.FC<{onReset: () => void}> = ({onReset}) => {
  const { state, dispatch }: any = useContext(ContextApp);
  const [value, setValue] = useState<null | number>(state.filter)
  const navigate = useNavigate()
  
  const changeFilter = (value: number | null) => {
    dispatch({type: 'SET_FILTER', filter: value})
  }
  
  useEffect(() => {
    navigate(`/products?id=${state.filter}`)
  }, [state.filter])

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