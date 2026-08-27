import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv'



// error middleware
import { errorMiddleware } from './middlewars/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';



dotenv.config()


const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())


app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);





app.use(errorMiddleware)


app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'AI Financial Coach is running!',
    })

})


export default app