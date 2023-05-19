import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import * as dotenv from 'dotenv'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

dotenv.config()

const app = fastify()
app.register(cors, {
  origin: true,
})
app.register(jwt, {
  secret: 'supersecret',
})
app.get('/', async (req, res) => {
  return 'Hello World'
})
app.register(memoriesRoutes)
app.register(authRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running on port 3333 🚀')
  })
