import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (req, res) => {
    try {
      const bodySchema = z.object({
        code: z.string(),
      })

      const { code } = bodySchema.parse(req.body)

      const response = await axios
        .post('https://github.com/login/oauth/access_token', null, {
          params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
          },
          headers: {
            Accept: 'application/json',
          },
        })
        .catch((err) => {
          const status = err.response.status
          const message = err.response.data.message
          console.log(status, message)
          console.log('Erro ao pegar o token de acesso')
          return res.status(status).send({
            message,
          })
        })
      const { access_token } = response.data

      const userResponse = await axios
        .get('https://api.github.com/user', {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
        .catch((err) => {
          const status = err.response.status
          const message = err.response.data.message
          console.log('Erro ao pegar os dados do usuário')
          return res.status(status).send({
            message,
          })
        })

      const userSchema = z.object({
        id: z.number(),
        login: z.string(),
        name: z.string(),
        avatar_url: z.string().url(),
      })

      const { id, login, name, avatar_url } = userSchema.parse(
        userResponse.data,
      )

      let user = await prisma.user.findUnique({
        where: {
          githubId: id.toString(),
        },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            githubId: id.toString(),
            login,
            name,
            avatarUrl: avatar_url,
          },
        })
      }

      const token = app.jwt.sign(
        {
          name: user.name,
          avatarUrl: user.avatarUrl,
        },
        {
          sub: user.id,
          expiresIn: '30 days',
        },
      )

      return {
        token,
      }
    } catch (err) {
      return res.status(500).send({
        message: 'Internal server error',
      })
    }
  })
}
