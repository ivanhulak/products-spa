import { Container, Typography } from '@mui/material';
import { useState, useReducer } from 'react';
import { ContextApp, initialState, productsReducer } from "./products-reducer";
import { FilterForm } from './FilterForm';
import { ProductsTable } from './ProductsTable';

const App = () => {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const [reseted, setReseted] = useState(false)

  const onReset = () => {
    setReseted(prev => !prev)
  }

  return (
    <ContextApp.Provider value={{ dispatch, state }}>
      <div style={{ padding: '20px 10px' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" component="h3" align='center' mb='20px'>
            Products Test App
          </Typography>
          <FilterForm onReset={onReset}/>
          <ProductsTable reseted={reseted} />
        </Container>
      </div>
    </ContextApp.Provider>
  );
}

export default App;
