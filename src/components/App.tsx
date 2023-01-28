import { Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { FilterForm } from './FilterForm';
import { ProductsTable } from './ProductsTable';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate()
  const [reseted, setReseted] = useState(false)
  const [filter, setFilter] = useState<string | number>(() => {
    const filter = localStorage.getItem('filter');
    if (filter) {
      return JSON.parse(localStorage.getItem('filter') || '');
    } else {
      return '';
    }
  })


  useEffect(() => {
    console.log('nav filter')
    localStorage.setItem('filter', JSON.stringify(filter));
  }, [filter]);

  // useEffect(() => {
  //   navigate(`/products?id=${filter}`)
  // }, [isFilterChanged])


  const onReset = () => {
    setReseted(prev => !prev)
  }
  const changeFilter = (value: number | string) => {
    setFilter(value)
    navigate(`/products?id=${filter}`)
  }

  return (
    <div style={{ padding: '20px 10px' }}>
      <Container maxWidth="xl">
        <Typography variant="h3" component="h3" align='center' mb='20px'>
          Products Test App
        </Typography>
        <FilterForm onReset={onReset} filter={filter} changeFilter={changeFilter} />
        <ProductsTable reseted={reseted} filter={filter} />
      </Container>
    </div>
  );
}

export default App;
