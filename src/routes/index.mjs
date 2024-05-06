import { Router } from 'express'
import userRouter from './users.mjs'
import productRouter from './products.mjs'

const router = Router();

router.use('/users', userRouter);

router.use('/products', productRouter);

export default router;