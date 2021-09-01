import { Router } from "express";
import productoRouter from './productos';
// import carritoRouter from './carrito';
const router = Router();

router.use('/productos',productoRouter);
// router.use('/carrito',carritoRouter);

export default router;