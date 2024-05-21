import express, { Application, Request, Response } from 'express'
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

export default app
