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

  const app = express()

  app.use(vite.middlewares)

  app.use('*all', async (req, res) => {
    const url = req.originalUrl
    let htmlPath = 'index.html'

    if (url.includes('/frame/')) {
      htmlPath = 'frame/index.html'
    }

    try {
      const template = await readFile(path.resolve(runtimeDir, htmlPath), 'utf-8')
      const html = await vite.transformIndexHtml(url, template)

      res.status(200).set({'Content-Type': 'text/html'}).send(html)
    } catch (e) {
      if (e instanceof Error) {
        // Let Vite fix the stack trace
        vite.ssrFixStacktrace(e)
        // eslint-disable-next-line no-console
        console.log(e.stack)
        res.status(500).end(e.stack)
      } else {
        res.status(500).end(String(e))
      }
    }
  })

  return app
}
