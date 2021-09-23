import  {Router} from 'express';
import { productoController } from '../controllers/productoController';
const router = Router();

router.get('/listar', productoController.getProducto);
router.get('/listar/:id', productoController.getProductoById);
router.post('/agregar',productoController.addProducto);
router.put('/actualizar/:id',productoController.updateProducto);
router.delete('/borrar/:id',productoController.deleteProducto);

router.get('/vista-test',productoController.getProductoFaker);

export default router;