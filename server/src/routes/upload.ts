import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { createWriteStream } from 'fs'
import { extname, resolve } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (req, res) => {
    try {
      const upload = await req.file({
        limits: {
          fileSize: 1024 * 1024 * 5, // 5mb
        },
      })

      if (!upload) {
        return res.status(400).send({
          message: 'Erro ao fazer upload do arquivo',
        })
      }

      const mimeTypeRegex = /^(image|video)\/[a-zA-z]+/
      const isValidMimeType = mimeTypeRegex.test(upload.mimetype)
      if (!isValidMimeType) {
        return res.status(400).send({
          message: 'Tipo de arquivo inválido',
        })
      }

      const fileId = randomUUID()
      const extFile = extname(upload.filename)

      const fileName = `${fileId}${extFile}`

      const writeStream = createWriteStream(
        resolve(__dirname, '../../uploads', fileName),
      )

      await pump(upload.file, writeStream)

      const fullUrl = `${req.protocol}://${req.hostname}/uploads/${fileName}`

      return {
        url: fullUrl,
      }
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        message: 'Erro ao fazer upload do arquivo',
      })
    }
  })
}
