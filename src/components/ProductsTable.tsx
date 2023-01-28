import {
  TableContainer,
  SxProps, Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination
} from '@mui/material';
import { BasicModel } from './BasicModel';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export type ProductType = {
  name: string,
  id: number,
  year: number,
  color: string,
  pantone_value: string
}
const tableContainerSx: SxProps = {
  border: "1px solid rgba(128,128,128,0.4)",
  width: "max-content",
  margin: '0 auto',
  borderRadius: 4,
  maxHeight: 600
};
export const ProductsTable: React.FC<{ reseted: boolean, filter: number | null }> = ({ reseted, filter }) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<ProductType[]>([])
  const [controller, setController] = useState({ page: 1, rowsPerPage: 5 })
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(null);
  const navigate = useNavigate()
  const handleOpen = (product: ProductType | null) => {
    setOpen(true)
    setCurrentProduct(product)
  }
  const handleClose = () => {
    setOpen(false)
    setCurrentProduct(null)
  }

  useEffect(() => {
    const controller = JSON.parse(localStorage.getItem('controller') || "")
    if (controller) {
      setController(controller)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('controller', JSON.stringify(controller));
  }, [controller]);

  useEffect(() => {
    navigate(`/products?page=${controller.page}&per_page=${controller.rowsPerPage}`)
  }, [controller.page])

  useEffect(() => {
    const loadProducts = () => {
      axios.get(`https://reqres.in/api/products?page=${controller.page}&per_page=${controller.rowsPerPage}`)
        .then(response => {
          setProducts(response.data.data)
          setTotalProducts(response.data.total)
        })
        .catch(e => {
          alert(e.message)
          setError(e.message)
        })
    }
    loadProducts()
  }, [controller, reseted])

  useEffect(() => {
    if (filter !== null) {
      axios.get(`https://reqres.in/api/products?id=${filter}`)
        .then(response => {
          setProducts([response.data.data])
          setTotalProducts(1)
        })
        .catch(e => {
          alert(e.message)
          setError(e.message)
        })
    }
  }, [filter])

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setController({
      ...controller,
      page: newPage + 1
    });
  };

  if (error) {
    return <div>
      <p>{error}</p>
      <p>Please, try again</p>
    </div>
  } else {
    return (
      <TableContainer component={Paper} sx={tableContainerSx}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ background: '#eee' }}>
              <TableCell>Products</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: ProductType) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: `${product.color}` }}
                onClick={() => handleOpen(product)}
              >
                <TableCell component="th" scope="row">{product.name}</TableCell>
                <TableCell align="right">{product.id}</TableCell>
                <TableCell align="right">{product.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5]}
          component='div'
          count={totalProducts}
          rowsPerPage={controller.rowsPerPage}
          page={controller.page - 1}
          onPageChange={handleChangePage}
        />
        <BasicModel open={open} handleClose={handleClose} product={currentProduct}/>
      </TableContainer>
    );
  }
}