import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import * as z from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (req, res) => {
    await req.jwtVerify()
  })

  app.get('/memories', async (req, res) => {
    const { sub } = req.user

    const memories = await prisma.memory.findMany({
      where: {
        userId: sub,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    const result = memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 110).concat('...'),
      }
    })

    return result
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

    if (!memory) {
      return res.status(404).send()
    }

    if (!memory.isPublic && memory.userId !== req.user.sub) {
      return res.status(401).send()
    }
    return memory
  })

  app.post('/memories', async (req, res) => {
    const { sub } = req.user
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string().url(),
      isPublic: z.coerce.boolean().default(false),
    })
    const { isPublic, content, coverUrl } = bodySchema.parse(req.body)
    const memory = await prisma.memory.create({
      data: {
        userId: sub,
        isPublic,
        content,
        coverUrl,
      },
    })
    return memory
  })

  app.put('/memories/:id', async (req, res) => {
    const { sub } = req.user
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

    let memory = await prisma.memory.findUnique({
      where: {
        id,
      },
    })

    if (!memory) {
      return res.status(404).send()
    }

    if (memory.userId !== sub) {
      return res.status(401).send()
    }

    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        isPublic,
        content,
        coverUrl,
        userId: sub,
      },
    })
    return memory
  })

  app.delete('/memories/:id', async (req, res) => {
    const { sub } = req.user
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)

    let memory = await prisma.memory.findUnique({
      where: {
        id,
      },
    })

    if (!memory) {
      return res.status(404).send()
    }

    if (memory.userId !== sub) {
      return res.status(401).send()
    }

    memory = await prisma.memory.delete({
      where: {
        id,
      },
    })
    return memory
  })
}
