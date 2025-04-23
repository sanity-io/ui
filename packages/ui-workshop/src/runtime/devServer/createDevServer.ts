import type {WorkshopRuntimeOptions} from '@sanity/ui-workshop'
import express from 'express'
import {readFile} from 'fs/promises'
import path from 'path'
import {createServer as createViteServer, InlineConfig} from 'vite'

import {createViteConfig} from '../viteConfig'

export async function createDevServer(options: {
  cwd: string
  outDir: string
  runtime?: WorkshopRuntimeOptions
  runtimeDir: string
}): Promise<express.Application> {
  const {cwd, outDir, runtime, runtimeDir} = options

  const app = express()

  const baseViteConfig: InlineConfig = {
    ...createViteConfig({cwd, outDir, runtimeDir}),
    appType: 'custom', // don't include HTML middlewares
    configFile: false,
    logLevel: 'info',
    server: {middlewareMode: true},
  }

  let viteConfig = runtime?.vite?.(baseViteConfig) || baseViteConfig

  // check if viteConfig is a promise
  if (typeof viteConfig === 'object' && 'then' in viteConfig) {
    viteConfig = await viteConfig
  }

  const vite = await createViteServer(viteConfig)

  app.use(vite.middlewares)

  app.get(/(.*)/, async (req, res, next) => {
    const url = req.originalUrl

    let htmlPath = 'index.html'

    if (req.path === '/frame/') {
      htmlPath = 'frame/index.html'
    }

    try {
      let template = await readFile(path.resolve(runtimeDir, htmlPath), 'utf-8')

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
