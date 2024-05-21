import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/products.route'
const app: Application = express()

// Middleware function for parsing JSON bodies
app.use(express.json())
app.use(cors())

// Application Routes
app.use('/api/products', StudentRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

// Global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error)
  if (error) {
    res.status(400).json({ success: false, message: 'Something went wrong' })
  }
})
export default app
