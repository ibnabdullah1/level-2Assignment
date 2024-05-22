import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/products.route'
import { OrderRoutes } from './app/modules/order.route'
const app: Application = express()

// Middleware function for parsing JSON bodies
app.use(express.json())
app.use(cors())

// Application Routes
app.use('/api/products', StudentRoutes)
app.use('/api/orders', OrderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

// Route not found handler

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: `${req.path} Route is not found`,
  })
})

// Global error handler
app.use((error: unknown, req: Request, res: Response) => {
  const err = error as Error
  if (err) {
    res.status(400).json({ success: false, message: 'Something went wrong' })
  }
})
export default app
