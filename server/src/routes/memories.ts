import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import * as z from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async (req, res) => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })
    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 110).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)
    const memory = await prisma.memory.findUnique({
      where: {
        id,
      },
    })
    return memory
  })

  app.post('/memories', async (req, res) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string().url(),
      isPublic: z.coerce.boolean().default(false),
    })
    const { isPublic, content, coverUrl } = bodySchema.parse(req.body)
    const memory = await prisma.memory.create({
      data: {
        isPublic,
        content,
        coverUrl,
        userId: '5c5068ca-ee4e-4813-bb3c-2d4021279365',
      },
    })
    return memory
  })

  app.put('/memories/:id', async (req, res) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string().url(),
      isPublic: z.coerce.boolean().default(false),
    })
    const { isPublic, content, coverUrl } = bodySchema.parse(req.body)

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)

    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        isPublic,
        content,
        coverUrl,
        userId: '5c5068ca-ee4e-4813-bb3c-2d4021279365',
      },
    })
    return memory
  })

  app.delete('/memories/:id', async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)
    const memory = await prisma.memory.delete({
      where: {
        id,
      },
    })
    return memory
  })
}
