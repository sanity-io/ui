import {readFile} from 'fs/promises'
import path from 'path'
import express from 'express'
import {createServer as createViteServer} from 'vite'
import {WorkshopConfigOptions} from '../../core/cli'
import {createViteConfig} from '../viteConfig'

export async function createDevServer(options: {
  config?: WorkshopConfigOptions
  cwd: string
  outDir: string
}): Promise<express.Application> {
  const {config, cwd, outDir} = options

  const app = express()

  const vite = await createViteServer({
    ...createViteConfig({config, cwd, outDir}),
    appType: 'custom', // don't include HTML middlewares
    configFile: false,
    logLevel: 'info',
    server: {middlewareMode: true},
  })

  app.use(vite.middlewares)

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    let htmlPath = 'index.html'

    if (req.path === '/frame/') {
      htmlPath = 'frame/index.html'
    }

    try {
      let template = await readFile(path.resolve(outDir, htmlPath), 'utf-8')

      template = await vite.transformIndexHtml(url, template)

      const html = template

      res.status(200).set({'Content-Type': 'text/html'}).end(html)
    } catch (e) {
      if (e instanceof Error) {
        // Let Vite fix the stack trace
        vite.ssrFixStacktrace(e)
      }

      next(e)
    }
  })

  return app
}
