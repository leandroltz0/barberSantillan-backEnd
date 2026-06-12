import { config } from 'dotenv'
config()

import express, { Application } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import opinionesRouter from './routes/opiniones'

const app: Application = express()

app.use(cors({ 
  origin: (origin, callback) => {
    const allowed = process.env.FRONTEND_URL;
    if (!origin || origin === allowed || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('CORS no permitido'));
    }
  }
}))
app.use(express.json())

app.use('/api/opiniones', opinionesRouter)

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || ''

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB')
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err)
    process.exit(1)
  })
