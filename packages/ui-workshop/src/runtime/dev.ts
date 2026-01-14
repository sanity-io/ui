import fs from 'fs'
import path from 'path'
import {createServer, type UserConfig, type ViteDevServer} from 'vite'
import {_watchScopes} from './_watchScopes'
import {_findRuntimeFile} from './config/_findRuntimeFile'
import {_loadRuntimeConfig} from './config/_loadRuntime'
import {DEFAULT_PATTERN} from './constants'
import {createDevServer} from './devServer/createDevServer'
import {logger} from './logger'
import {_compileModule} from './runtime/_compileModule'
import {buildStaticFiles} from './runtime/buildStaticFiles'

interface DevServerInstance {
  vite: ViteDevServer
  scopesSub: {unsubscribe: () => void}
  runtimeLoaderServer: ViteDevServer
  watcherCleanup?: () => void
}

/** @alpha */
export async function dev(options?: {
  cwd?: string
  /** @internal - For testing only: override vite config */
  _viteConfigOverride?: (baseConfig: UserConfig) => UserConfig
}): Promise<() => Promise<void>> {
  const {cwd = process.cwd(), _viteConfigOverride} = options ?? {}
  const runtimeDir = path.resolve(cwd, '.workshop')
  const outDir = path.resolve(cwd, '.workshop/dist')

  await buildStaticFiles({runtimeDir})

  let currentServer: DevServerInstance | null = null
  let isRestarting = false

  async function startServer(): Promise<DevServerInstance> {
    // Create runtime loader Vite server for SSR module loading
    let runtimeLoaderConfig: UserConfig = {
      root: cwd,
      logLevel: 'error',
      server: {
        middlewareMode: true,
        ws: false, // Disable WebSocket server entirely
        hmr: false, // Disable HMR
      },
      appType: 'custom',
      clearScreen: false,
    }

    // Apply test override if provided
    if (_viteConfigOverride) {
      runtimeLoaderConfig = _viteConfigOverride(runtimeLoaderConfig)
    }

    const runtimeLoaderServer = await createServer(runtimeLoaderConfig)

    // Load runtime config (uses separate Vite server for SSR)
    const runtimeConfig = await _loadRuntimeConfig({
      packagePath: cwd,
      viteServer: runtimeLoaderServer,
    })

    const scopes$ = _watchScopes({
      cwd,
      pattern: runtimeConfig?.pattern ?? DEFAULT_PATTERN,
    })

    // Write scopes
    const scopesSub = scopes$.subscribe({
      next: (scopes) => {
        const relativeScopes = scopes.map((f) => {
          return path.relative(runtimeDir, f)
        })

        const code = _compileModule(relativeScopes)

        fs.writeFileSync(path.resolve(runtimeDir, 'scopes.ts'), code)
      },
    })

    // Create the main dev server with runtime config
    const port = runtimeConfig?.server?.port ?? 1337

    const vite = await createDevServer({
      cwd,
      outDir,
      runtime: runtimeConfig,
      runtimeDir,
      port,
      _viteConfigOverride,
    })

    // Start listening
    await vite.listen()

    logger.log(`Listening on http://localhost:${port}`)

    // Set up watcher for runtime config changes
    let watcherCleanup: (() => void) | undefined
    const runtimeFilePath = _findRuntimeFile({packagePath: cwd})

    if (runtimeFilePath) {
      const absoluteRuntimePath = path.resolve(cwd, runtimeFilePath)

      // Use Vite's built-in watcher from the runtime loader server
      runtimeLoaderServer.watcher.add(absoluteRuntimePath)

      const changeHandler = (changedPath: string) => {
        if (changedPath === absoluteRuntimePath) {
          restartServer()
        }
      }

      runtimeLoaderServer.watcher.on('change', changeHandler)

      // Return cleanup function to remove the watcher
      watcherCleanup = () => {
        runtimeLoaderServer.watcher.off('change', changeHandler)
      }
    }

    return {vite, scopesSub, runtimeLoaderServer, watcherCleanup}
  }

  async function stopServer(instance: DevServerInstance) {
    // Clean up the watcher first
    if (instance.watcherCleanup) {
      instance.watcherCleanup()
    }

    instance.scopesSub.unsubscribe()

    // Force close HTTP servers immediately to prevent hanging
    const forceCloseHttpServer = (server: ViteDevServer) => {
      if (server.httpServer) {
        // Close existing connections (available in Node 18.2+)
        if ('closeAllConnections' in server.httpServer) {
          server.httpServer.closeAllConnections()
        }

        // Force close the HTTP server
        return new Promise<void>((resolve) => {
          server.httpServer?.close(() => resolve())
          // If close doesn't complete quickly, force resolve
          setTimeout(resolve, 100)
        })
      }
      return Promise.resolve()
    }

    // Close HTTP servers first to prevent new connections
    await Promise.all([
      forceCloseHttpServer(instance.vite),
      forceCloseHttpServer(instance.runtimeLoaderServer),
    ])

    // Then close Vite servers (this closes watchers, websockets, etc.)
    await Promise.all([
      instance.vite.close().catch(() => {}),
      instance.runtimeLoaderServer.close().catch(() => {}),
    ])
  }

  async function restartServer() {
    if (isRestarting) return
    isRestarting = true

    logger.log('Runtime config changed, restarting server...')

    if (currentServer) {
      await stopServer(currentServer)
    }

    currentServer = await startServer()
    isRestarting = false
  }

  // Start initial server
  currentServer = await startServer()

  // Synchronous cleanup function for signal handlers
  const cleanup = () => {
    if (currentServer) {
      if (currentServer.watcherCleanup) {
        currentServer.watcherCleanup()
      }
      currentServer.scopesSub.unsubscribe()
      // Note: We don't await server closes in signal handlers
      // The process will exit and Node will clean up connections
    }
  }

  // Handle signals (only in non-test mode)
  if (!_viteConfigOverride) {
    process.on('SIGINT', () => {
      // eslint-disable-next-line no-console
      console.log('')
      logger.log('Vite dev server is shutting down (SIGINT)')
      cleanup()
      process.exit()
    })

    process.on('SIGTERM', () => {
      logger.log('\nVite dev server is shutting down (SIGTERM)')
      cleanup()
      process.exit()
    })

    process.on('exit', (code) => {
      logger.log(`Vite process exited with code: ${code}`)
    })
  }

  // Return async cleanup function for programmatic control (used in tests)
  const asyncCleanup = async () => {
    logger.log('Shutting down gracefully...')

    if (currentServer) {
      await stopServer(currentServer)
    }
  }

  return asyncCleanup
}
