import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

// Middleware function for parsing JSON bodies
app.use(express.json())
app.use(cors())
// Application Routes
// app.use("/api/v1/students");

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

export default app
