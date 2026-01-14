import {readFile} from 'fs/promises'
import path from 'path'
import {
  createServer as createViteServer,
  type InlineConfig,
  type Plugin,
  type UserConfig,
  type ViteDevServer,
} from 'vite'
import type {WorkshopRuntimeOptions} from '../types'
import {createViteConfig} from '../viteConfig'

export async function createDevServer(options: {
  cwd: string
  outDir: string
  runtime?: WorkshopRuntimeOptions
  runtimeDir: string
  port?: number
  /** @internal - For testing only: override vite config */
  _viteConfigOverride?: (baseConfig: UserConfig) => UserConfig
}): Promise<ViteDevServer> {
  const {cwd, outDir, runtime, runtimeDir, port, _viteConfigOverride} = options

  // Create a plugin to handle HTML routing
  const workshopHtmlPlugin: Plugin = {
    name: 'workshop-html',
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          const url = req.originalUrl ?? req.url ?? '/'

          // Let Vite handle static assets
          if (url.match(/\.(js|css|json|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
            return next()
          }

          let htmlPath = 'index.html'

          if (url.startsWith('/frame/')) {
            htmlPath = 'frame/index.html'
          }

          try {
            const template = await readFile(path.resolve(runtimeDir, htmlPath), 'utf-8')
            const html = await server.transformIndexHtml(url, template)

            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(html)
          } catch (e) {
            if (e instanceof Error) {
              // Let Vite fix the stack trace
              server.ssrFixStacktrace(e)
              // eslint-disable-next-line no-console
              console.log(e.stack)
              res.statusCode = 500
              res.end(e.stack)
            } else {
              res.statusCode = 500
              res.end(String(e))
            }
          }
        })
      }
    },
  }

  const baseViteConfig: InlineConfig = {
    ...createViteConfig({
      cwd,
      mode: 'development',
      outDir,
      runtimeDir,
    }),
    configFile: false,
    logLevel: 'info',
    server: {
      port,
    },
  }

  // Add the HTML plugin after base plugins
  const basePlugins = baseViteConfig.plugins || []
  baseViteConfig.plugins = [...basePlugins, workshopHtmlPlugin]

  let viteConfig = runtime?.vite?.(baseViteConfig) ?? baseViteConfig

  // check if viteConfig is a promise
  if (typeof viteConfig === 'object' && 'then' in viteConfig) {
    viteConfig = await viteConfig
  }

  // Apply test override if provided
  if (_viteConfigOverride) {
    viteConfig = _viteConfigOverride(viteConfig)
  }

  const vite = await createViteServer(viteConfig)

  return vite
}
