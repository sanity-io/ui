import path from 'path'
import {createServer, preview as vitePreview} from 'vite'
import {_loadRuntimeConfig} from './config/_loadRuntime'
import {createViteConfig} from './viteConfig'

/** @alpha */
export async function preview(options?: {cwd?: string; port?: number}): Promise<void> {
  const {cwd = process.cwd(), port = 1337} = options ?? {}

  // Create runtime loader Vite server for SSR module loading
  const runtimeLoaderServer = await createServer({
    root: cwd,
    logLevel: 'error',
    server: {
      middlewareMode: true,
      ws: false, // Disable WebSocket server entirely
      hmr: false, // Disable HMR
    },
    appType: 'custom',
    clearScreen: false,
  })

  const runtimeConfig = await _loadRuntimeConfig({
    packagePath: cwd,
    viteServer: runtimeLoaderServer,
  })
  const runtimeDir = path.resolve(cwd, '.workshop')

  const outDir = runtimeConfig?.build?.outDir ?? path.resolve(cwd, '.workshop/dist')

  const baseViteConfig = createViteConfig({
    cwd,
    mode: 'production',
    outDir,
    runtimeDir,
  })

  let viteConfig = runtimeConfig?.vite?.(baseViteConfig) ?? baseViteConfig

  // check if viteConfig is a promise
  if (typeof viteConfig === 'object' && 'then' in viteConfig) {
    viteConfig = await viteConfig
  }

  const previewServer = await vitePreview({
    ...viteConfig,
    preview: {port},
  })

  previewServer.printUrls()
  previewServer.bindCLIShortcuts({print: true})

  // Handle graceful shutdown on SIGINT (Ctrl+C) and SIGTERM
  const cleanup = async () => {
    await runtimeLoaderServer.close()
    process.exit(0)
  }

  process.on('SIGINT', async () => {
    // eslint-disable-next-line no-console
    console.log('\nReceived SIGINT, shutting down gracefully...')
    await cleanup()
  })

  process.on('SIGTERM', async () => {
    // eslint-disable-next-line no-console
    console.log('\nReceived SIGTERM, shutting down gracefully...')
    await cleanup()
  })
}
