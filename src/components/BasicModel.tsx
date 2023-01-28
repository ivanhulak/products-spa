import {
   TableContainer,
   SxProps,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   Paper,
   Modal,
   Box,
   Typography
} from '@mui/material';
import { ProductType } from './ProductsTable';

const style = {
   position: 'absolute' as 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 500,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};
const tableContainerSx: SxProps = {
   border: "1px solid rgba(128,128,128,0.4)",
   width: "max-content",
   margin: '0 auto',
   borderRadius: 4,
   maxHeight: 200
};

type BasicModelPropsType = {
   open: boolean,
   handleClose: () => void,
   product: ProductType | null
}
export const BasicModel: React.FC<BasicModelPropsType> = ({ open, handleClose, product }) => {
   if (product === null) return <div>Product not chosen</div>
   else {
      return (
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
         >
            <Box sx={style}>
               <Typography id="modal-modal-title" variant="h6" component="h2" align='center' mb='10px'>
                  Product Info
               </Typography>
               <TableContainer component={Paper} sx={tableContainerSx}>
                  <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                     <TableHead>
                        <TableRow sx={{ background: '#eee' }}>
                           <TableCell>Product Name</TableCell>
                           <TableCell align="left">Id</TableCell>
                           <TableCell align="left">Year</TableCell>
                           <TableCell align="left">color</TableCell>
                           <TableCell align="left">Pantone Value</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        <TableRow>
                           <TableCell align="left">{product.name}</TableCell>
                           <TableCell align="left">{product.id}</TableCell>
                           <TableCell align="left">{product.year}</TableCell>
                           <TableCell align="left">{product.color}</TableCell>
                           <TableCell align="left">{product.pantone_value}</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </TableContainer>
            </Box>
         </Modal>
      );
   }


}