import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv'

// import connectDB from './config/db.js'
import connectDB from './config/db.js'

 

dotenv.config()


const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())


app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'AI Financial Coach is running!',
    })
      
 })


export default app