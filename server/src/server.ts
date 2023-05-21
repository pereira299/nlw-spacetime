import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import staticFiles from '@fastify/static'
import * as dotenv from 'dotenv'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'

dotenv.config()

const app = fastify()
app.register(cors, {
  origin: true,
})
app.register(multipart)
app.register(staticFiles, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads/',
})
app.register(jwt, {
  secret: 'supersecret',
})
app.get('/', async (req, res) => {
  return 'Hello World'
})
app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running on port 3333 🚀')
  })
