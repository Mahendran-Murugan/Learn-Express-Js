import { Router } from 'express'
import userRouter from './users.mjs'
import productRouter from './products.mjs'
import authRouter from './auth.mjs'

const router = Router();

router.use('/users', userRouter);

router.use('/products', productRouter);

router.use('/auth', authRouter);

export default router;