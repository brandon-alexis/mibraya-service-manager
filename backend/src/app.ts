import express, { Request, Response } from 'express'
import logger from 'morgan'

import { router } from './config/load-routes'

export const app = express()

// Middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: 'Werlcome to the api rest named [practice-prisma-api]' })
})

app.use(router)
